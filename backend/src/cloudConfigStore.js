import mongoose from "mongoose";
import { encrypt, decrypt } from "./encryption.js";

// All clouds form one unified storage pool. No purpose tagging — each cloud
// is just a Cloudinary account. The isPrimary cloud receives new uploads;
// all others hold existing content and serve as URL sources.
const cloudConfigSchema = new mongoose.Schema(
  {
    label:    { type: String, required: true },   // Human-readable name: "Primary Upload"
    cloudName: { type: String, required: true },  // Cloudinary cloud name: "diumfxa7s"
    apiKey:   { type: String, default: "" },       // Not sensitive — stored plaintext
    apiSecretEncrypted: {                          // AES-256-GCM encrypted secret
      iv:         { type: String, default: "" },
      authTag:    { type: String, default: "" },
      ciphertext: { type: String, default: "" },
    },
    isPrimary: { type: Boolean, default: false },  // Only one cloud should be primary
    order:    { type: Number, default: 0 },        // Priority order (lower = higher priority)
    active:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CloudConfig = mongoose.model("CloudConfig", cloudConfigSchema);

// Maps a Mongoose doc to a safe public object (secret MASKED)
function toPublic(c) {
  const hasCredentials = !!(c.apiKey && c.apiSecretEncrypted?.ciphertext);
  return {
    id: c._id.toString(),
    label: c.label,
    cloudName: c.cloudName,
    apiKeyMasked: c.apiKey ? `${c.apiKey.slice(0, 6)}••••••••` : "",
    hasCredentials,
    isPrimary: c.isPrimary,
    order: c.order,
    active: c.active,
    createdAt: c.createdAt?.toISOString() ?? null,
    updatedAt: c.updatedAt?.toISOString() ?? null,
  };
}

/** Returns all configs sorted by order — secrets MASKED, safe for frontend */
export async function listCloudConfigsPublic() {
  const configs = await CloudConfig.find().sort({ order: 1 });
  return configs.map(toPublic);
}

/** Returns decrypted config for a single cloud — BACKEND USE ONLY, never send to frontend */
export async function getCloudConfigWithSecret(id) {
  const c = await CloudConfig.findById(id);
  if (!c) return null;
  return {
    id: c._id.toString(),
    cloudName: c.cloudName,
    apiKey: c.apiKey,
    secret: c.apiSecretEncrypted?.ciphertext ? decrypt(c.apiSecretEncrypted) : "",
  };
}

/** Returns primary cloud with decrypted secret — for signing uploads */
export async function getPrimaryUploadConfig() {
  const primary = await CloudConfig.findOne({ isPrimary: true, active: true });
  if (!primary) {
    throw new Error("No primary upload cloud configured. Set one in Admin → Clouds.");
  }
  const secret = primary.apiSecretEncrypted?.ciphertext
    ? decrypt(primary.apiSecretEncrypted)
    : "";
  const fallbacks = await CloudConfig.find({ isPrimary: false, active: true }).sort({ order: 1 });
  return {
    cloudName: primary.cloudName,
    apiKey: primary.apiKey,
    secret,
    fallbackNames: fallbacks.map((f) => f.cloudName),
  };
}

export async function createCloudConfig({ apiSecret, ...rest }) {
  const apiSecretEncrypted = apiSecret
    ? encrypt(apiSecret)
    : { iv: "", authTag: "", ciphertext: "" };
  const doc = await CloudConfig.create({ ...rest, apiSecretEncrypted });
  return toPublic(doc);
}

export async function updateCloudConfig(id, { apiSecret, ...rest }) {
  const update = { ...rest };
  // Only re-encrypt when a new secret is explicitly provided
  if (apiSecret !== undefined && apiSecret !== "") {
    update.apiSecretEncrypted = encrypt(apiSecret);
  }
  const doc = await CloudConfig.findByIdAndUpdate(id, update, { new: true });
  return doc ? toPublic(doc) : null;
}

export async function deleteCloudConfig(id) {
  return CloudConfig.findByIdAndDelete(id);
}

/** Atomically marks one cloud as primary, clears isPrimary on all others */
export async function setPrimaryCloud(id) {
  await CloudConfig.updateMany({}, { isPrimary: false });
  const doc = await CloudConfig.findByIdAndUpdate(id, { isPrimary: true }, { new: true });
  return doc ? toPublic(doc) : null;
}

/** Seeds cloud configs from env vars on first startup (when collection is empty) */
export async function seedFromEnvIfEmpty() {
  const count = await CloudConfig.countDocuments();
  if (count > 0) return; // Already seeded — skip

  // dotenv in config.js loads ../env so VITE_* vars are available in backend at seed time
  const seeds = [
    {
      label: "Primary Upload",
      cloudName: process.env.CLOUDINARY_PRIMARY_NAME || "",
      apiKey: process.env.CLOUDINARY_PRIMARY_KEY || "",
      apiSecret: process.env.CLOUDINARY_PRIMARY_SECRET || "",
      isPrimary: true,
      order: 0,
    },
    {
      label: "Alumni WebP A",
      cloudName: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME || "",
      apiKey: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_API_KEY || "",
      apiSecret: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_API_SECRET || "",
      order: 1,
    },
    {
      label: "Alumni WebP B",
      cloudName: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME || "",
      apiKey: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_API_KEY || "",
      apiSecret: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_API_SECRET || "",
      order: 2,
    },
    {
      label: "Alumni JPG",
      cloudName: process.env.VITE_CLOUDINARY_JPG_CLOUD_NAME || "",
      apiKey: process.env.VITE_CLOUDINARY_JPG_API_KEY || "",
      apiSecret: process.env.VITE_CLOUDINARY_JPG_API_SECRET || "",
      order: 3,
    },
    {
      label: "Fallback A",
      cloudName: "dvyiwlqra",
      apiKey: "",
      apiSecret: "",
      order: 4,
    },
    {
      label: "Fallback B",
      cloudName: "dyez98wtv",
      apiKey: "",
      apiSecret: "",
      order: 5,
    },
  ].filter((s) => s.cloudName); // skip any whose cloudName is missing from env

  for (const { apiSecret, ...rest } of seeds) {
    const apiSecretEncrypted = apiSecret
      ? encrypt(apiSecret)
      : { iv: "", authTag: "", ciphertext: "" };
    await CloudConfig.create({ ...rest, apiSecretEncrypted, active: true });
  }
  // eslint-disable-next-line no-console
  console.log(`[CloudConfig] Seeded ${seeds.length} cloud configs from environment variables`);
}
