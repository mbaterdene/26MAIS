import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMINS_FILE = path.join(__dirname, "..", "data", "admins.json");

const BCRYPT_ROUNDS = 10;
const DEFAULT_SUPERADMIN_USERNAME = "mais11";
const DEFAULT_SUPERADMIN_PASSWORD = "Mais@10.";
const DEFAULT_SUPERADMIN_DISPLAY = "Main Super Admin";

export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  NEWS_EDITOR: "news_editor",
};

// Helper to read admins data
function readAdminsData() {
  try {
    const data = fs.readFileSync(ADMINS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

// Helper to write admins data
function writeAdminsData(data) {
  fs.writeFileSync(ADMINS_FILE, JSON.stringify(data, null, 2));
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
  try {
    const admins = readAdminsData();
    return admins.map(toPublicAdmin);
  } catch (error) {
    console.error("Error listing admins:", error);
    return [];
  }
}

export async function getAdminCount() {
  try {
    const admins = readAdminsData();
    return admins.length;
  } catch (error) {
    console.error("Error getting admin count:", error);
    return 0;
  }
}

export async function ensureInitialSuperAdmin() {
  try {
    const admins = readAdminsData();
    if (admins.length > 0) {
      return null;
    }

    const usernameHash = crypto.createHash("sha256").update(DEFAULT_SUPERADMIN_USERNAME).digest("hex");
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

    admins.push(seeded);
    writeAdminsData(admins);
    return toPublicAdmin(seeded);
  } catch (error) {
    console.error("Error ensuring initial super admin:", error);
    return null;
  }
}

export async function createAdmin({ username, password, displayName, role, createdBy }) {
  try {
    const admins = readAdminsData();
    const usernameHash = crypto.createHash("sha256").update(username).digest("hex");
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
    writeAdminsData(admins);
    return toPublicAdmin(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

export async function verifyAdminLogin(username, password) {
  try {
    const admins = readAdminsData();
    const usernameHash = crypto.createHash("sha256").update(username).digest("hex");

    for (const admin of admins) {
      if (admin.usernameHash !== usernameHash) continue;

      const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      return toPublicAdmin(admin);
    }

    throw new Error("Admin not found");
  } catch (error) {
    console.error("Error verifying admin login:", error);
    throw error;
  }
}

export async function deleteAdminById({ targetId, requestedById }) {
  try {
    const admins = readAdminsData();
    const targetIndex = admins.findIndex((a) => a.id === targetId);
    
    if (targetIndex === -1) {
      throw new Error("Admin account not found.");
    }

    const target = admins[targetIndex];

    if (target.id === requestedById) {
      throw new Error("You cannot delete your own account.");
    }

    if (target.role === ADMIN_ROLES.SUPER_ADMIN) {
      const superCount = admins.filter((a) => a.role === ADMIN_ROLES.SUPER_ADMIN).length;
      if (superCount <= 1) {
        throw new Error("Cannot delete the last super admin.");
      }
    }

    admins.splice(targetIndex, 1);
    writeAdminsData(admins);
    return toPublicAdmin(target);
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
}
