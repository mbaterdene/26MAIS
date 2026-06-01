import crypto from "node:crypto";
import { config } from "./config.js";

// Derive a stable 32-byte AES key from the auth secret using scrypt KDF.
// scryptSync is intentionally blocking — runs once at module load time only.
// WARNING: changing the salt string below invalidates ALL stored secrets in the DB.
const ENCRYPTION_KEY = crypto.scryptSync(
  config.authSecret || "fallback-dev-key-change-in-production",
  "mais-cloudinary-encryption-v1",
  32
);

/**
 * Encrypts a plaintext string using AES-256-GCM (authenticated encryption).
 * Returns hex-encoded { iv, authTag, ciphertext } — safe to store in MongoDB.
 * Returns empty strings for empty/null input (no-op for optional fields).
 */
export function encrypt(plaintext) {
  if (!plaintext) return { iv: "", authTag: "", ciphertext: "" };
  const iv = crypto.randomBytes(12); // 96-bit IV required by GCM spec
  const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    authTag: cipher.getAuthTag().toString("hex"),
    ciphertext: ciphertext.toString("hex"),
  };
}

/**
 * Decrypts AES-256-GCM ciphertext.
 * Throws if the authTag doesn't match — indicates tampering or wrong key.
 * Returns empty string for empty input (inverse of encrypt no-op).
 */
export function decrypt({ iv, authTag, ciphertext }) {
  if (!iv || !authTag || !ciphertext) return "";
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]).toString("utf8");
}
