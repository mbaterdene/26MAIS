import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const ADMINS_FILE = path.join(DATA_DIR, "admins.json");
const BCRYPT_ROUNDS = 10;
const DEFAULT_SUPERADMIN_USERNAME = "mais11";
const DEFAULT_SUPERADMIN_PASSWORD = "Mais@10.";
const DEFAULT_SUPERADMIN_DISPLAY = "Main Super Admin";

export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  NEWS_EDITOR: "news_editor",
};

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ADMINS_FILE);
  } catch {
    await fs.writeFile(ADMINS_FILE, "[]\n", "utf8");
  }
}

async function readAdmins() {
  await ensureStoreFile();
  const text = await fs.readFile(ADMINS_FILE, "utf8");
  const parsed = JSON.parse(text);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeAdmins(admins) {
  await ensureStoreFile();
  await fs.writeFile(ADMINS_FILE, `${JSON.stringify(admins, null, 2)}\n`, "utf8");
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

export async function listAdminsPublic() {
  const admins = await readAdmins();
  return admins.map(toPublicAdmin);
}

export async function getAdminCount() {
  const admins = await readAdmins();
  return admins.length;
}

export async function ensureInitialSuperAdmin() {
  const admins = await readAdmins();
  if (admins.length > 0) {
    return null;
  }

  const usernameHash = await bcrypt.hash(DEFAULT_SUPERADMIN_USERNAME, BCRYPT_ROUNDS);
  const passwordHash = await bcrypt.hash(DEFAULT_SUPERADMIN_PASSWORD, BCRYPT_ROUNDS);

  const seeded = {
    id: crypto.randomUUID(),
    displayName: DEFAULT_SUPERADMIN_DISPLAY,
    role: ADMIN_ROLES.SUPER_ADMIN,
    usernameHash,
    passwordHash,
    createdBy: "system-seed",
    createdAt: new Date().toISOString(),
  };

  await writeAdmins([seeded]);
  return toPublicAdmin(seeded);
}

export async function createAdmin({ username, password, displayName, role, createdBy }) {
  const admins = await readAdmins();

  for (const existing of admins) {
    const duplicate = await bcrypt.compare(username, existing.usernameHash);
    if (duplicate) {
      throw new Error("Username is already in use.");
    }
  }

  const usernameHash = await bcrypt.hash(username, BCRYPT_ROUNDS);
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const newAdmin = {
    id: crypto.randomUUID(),
    displayName,
    role,
    usernameHash,
    passwordHash,
    createdBy,
    createdAt: new Date().toISOString(),
  };

  admins.push(newAdmin);
  await writeAdmins(admins);
  return toPublicAdmin(newAdmin);
}

export async function verifyAdminLogin(username, password) {
  const admins = await readAdmins();

  for (const admin of admins) {
    const usernameMatch = await bcrypt.compare(username, admin.usernameHash);
    if (!usernameMatch) continue;

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) return null;

    return toPublicAdmin(admin);
  }

  return null;
}

export async function deleteAdminById({ targetId, requestedById }) {
  const admins = await readAdmins();
  const target = admins.find((a) => a.id === targetId);
  if (!target) {
    throw new Error("Admin account not found.");
  }

  if (target.id === requestedById) {
    throw new Error("You cannot delete your own account.");
  }

  if (target.role === ADMIN_ROLES.SUPER_ADMIN) {
    const superCount = admins.filter((a) => a.role === ADMIN_ROLES.SUPER_ADMIN).length;
    if (superCount <= 1) {
      throw new Error("Cannot delete the last super admin.");
    }
  }

  const next = admins.filter((a) => a.id !== targetId);
  await writeAdmins(next);
  return toPublicAdmin(target);
}
