import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Admin } from "./models/Admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Legacy JSON path — used only for one-time migration on first startup
const LEGACY_ADMINS_FILE = path.join(__dirname, "..", "data", "admins.json");

const BCRYPT_ROUNDS = 10;
const DEFAULT_SUPERADMIN_USERNAME = "mais11";
const DEFAULT_SUPERADMIN_PASSWORD = "Mais@10.";
const DEFAULT_SUPERADMIN_DISPLAY = "Main Super Admin";

export const ADMIN_ROLES = {
  SUPER_ADMIN:    "super_admin",
  CONTENT_EDITOR: "content_editor",
  NEWS_EDITOR:    "news_editor",
  NEWS_DRAFTER:   "news_drafter",
};

// Roles that are assignable by super_admin (cannot assign super_admin)
export const ASSIGNABLE_ROLES = [
  ADMIN_ROLES.CONTENT_EDITOR,
  ADMIN_ROLES.NEWS_EDITOR,
  ADMIN_ROLES.NEWS_DRAFTER,
];

function hashUsername(username) {
  return crypto.createHash("sha256").update(username).digest("hex");
}

function toPublicAdmin(admin) {
  return {
    id: admin.id,
    displayName: admin.displayName,
    role: admin.role,
    createdAt: admin.createdAt,
    createdBy: admin.createdBy,
  };
}

// ── Migration helper ──────────────────────────────────────────────────────────
// Reads the legacy admins.json (if present) and imports records into MongoDB.
// Old role "admin" is mapped to "content_editor".
async function migrateFromJson() {
  try {
    if (!fs.existsSync(LEGACY_ADMINS_FILE)) return 0;
    const raw = fs.readFileSync(LEGACY_ADMINS_FILE, "utf8");
    const records = JSON.parse(raw || "[]");
    if (!records.length) return 0;

    let imported = 0;
    for (const rec of records) {
      // Map old "admin" role to new "content_editor"
      const role = rec.role === "admin" ? "content_editor" : rec.role;
      const validRoles = Object.values(ADMIN_ROLES);
      if (!validRoles.includes(role)) continue;

      const exists = await Admin.findOne({ usernameHash: rec.usernameHash });
      if (exists) continue;

      await Admin.create({
        id: rec.id || crypto.randomUUID(),
        displayName: rec.displayName,
        role,
        usernameHash: rec.usernameHash,
        passwordHash: rec.passwordHash,
        createdBy: rec.createdBy || "migration",
        createdAt: rec.createdAt || new Date().toISOString(),
      });
      imported++;
    }
    console.log(`[adminStore] Migrated ${imported} admin(s) from legacy JSON.`);
    return imported;
  } catch (err) {
    console.error("[adminStore] Migration error:", err.message);
    return 0;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function listAdminsPublic() {
  const admins = await Admin.find({}, { usernameHash: 0, passwordHash: 0, __v: 0 });
  return admins.map(toPublicAdmin);
}

export async function getAdminCount() {
  return Admin.countDocuments();
}

export async function ensureInitialSuperAdmin() {
  // First: migrate any legacy JSON data
  const count = await Admin.countDocuments();
  if (count === 0) {
    const migrated = await migrateFromJson();
    if (migrated === 0) {
      // Seed the default super admin
      const usernameHash = hashUsername(DEFAULT_SUPERADMIN_USERNAME);
      const passwordHash = await bcrypt.hash(DEFAULT_SUPERADMIN_PASSWORD, BCRYPT_ROUNDS);
      const seeded = await Admin.create({
        id: crypto.randomUUID(),
        displayName: DEFAULT_SUPERADMIN_DISPLAY,
        role: ADMIN_ROLES.SUPER_ADMIN,
        usernameHash,
        passwordHash,
        createdBy: "system-seed",
        createdAt: new Date().toISOString(),
      });
      console.log("[adminStore] Seeded default super admin.");
      return toPublicAdmin(seeded);
    }
  }
  return null;
}

export async function createAdmin({ username, password, displayName, role, createdBy }) {
  const usernameHash = hashUsername(username);
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const newAdmin = await Admin.create({
    id: crypto.randomUUID(),
    displayName,
    role,
    usernameHash,
    passwordHash,
    createdBy,
    createdAt: new Date().toISOString(),
  });

  return toPublicAdmin(newAdmin);
}

export async function updateAdminById(targetId, { displayName, role }) {
  const updates = {};
  if (displayName !== undefined) updates.displayName = displayName;
  if (role !== undefined) updates.role = role;

  const updated = await Admin.findOneAndUpdate(
    { id: targetId },
    { $set: updates },
    { new: true }
  );

  if (!updated) throw new Error("Admin account not found.");
  return toPublicAdmin(updated);
}

export async function resetAdminPassword(targetId, newPassword) {
  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  const updated = await Admin.findOneAndUpdate(
    { id: targetId },
    { $set: { passwordHash } },
    { new: true }
  );
  if (!updated) throw new Error("Admin account not found.");
  return toPublicAdmin(updated);
}

export async function verifyAdminLogin(username, password) {
  const usernameHash = hashUsername(username);
  const admin = await Admin.findOne({ usernameHash });
  if (!admin) throw new Error("Admin not found");

  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatch) throw new Error("Invalid password");

  return toPublicAdmin(admin);
}

export async function deleteAdminById({ targetId, requestedById }) {
  const target = await Admin.findOne({ id: targetId });
  if (!target) throw new Error("Admin account not found.");
  if (target.id === requestedById) throw new Error("You cannot delete your own account.");

  if (target.role === ADMIN_ROLES.SUPER_ADMIN) {
    const superCount = await Admin.countDocuments({ role: ADMIN_ROLES.SUPER_ADMIN });
    if (superCount <= 1) throw new Error("Cannot delete the last super admin.");
  }

  await Admin.deleteOne({ id: targetId });
  return toPublicAdmin(target);
}
