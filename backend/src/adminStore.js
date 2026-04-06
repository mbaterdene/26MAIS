import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Admin } from "./models/Admin.js";

const BCRYPT_ROUNDS = 10;
const DEFAULT_SUPERADMIN_USERNAME = "mais11";
const DEFAULT_SUPERADMIN_PASSWORD = "Mais@10.";
const DEFAULT_SUPERADMIN_DISPLAY = "Main Super Admin";

export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  NEWS_EDITOR: "news_editor",
};

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
    const admins = await Admin.find().lean();
    return admins.map(toPublicAdmin);
  } catch (error) {
    console.error("Error listing admins:", error);
    throw error;
  }
}

export async function getAdminCount() {
  try {
    return await Admin.countDocuments();
  } catch (error) {
    console.error("Error getting admin count:", error);
    throw error;
  }
}

export async function ensureInitialSuperAdmin() {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return null;
    }

    const usernameHash = await bcrypt.hash(DEFAULT_SUPERADMIN_USERNAME, BCRYPT_ROUNDS);
    const passwordHash = await bcrypt.hash(DEFAULT_SUPERADMIN_PASSWORD, BCRYPT_ROUNDS);

    const seeded = new Admin({
      id: crypto.randomUUID(),
      displayName: DEFAULT_SUPERADMIN_DISPLAY,
      role: ADMIN_ROLES.SUPER_ADMIN,
      usernameHash,
      passwordHash,
      createdBy: "system-seed",
      createdAt: new Date().toISOString(),
    });

    const saved = await seeded.save();
    return toPublicAdmin(saved.toObject());
  } catch (error) {
    console.error("Error ensuring initial super admin:", error);
    throw error;
  }
}

export async function createAdmin({ username, password, displayName, role, createdBy }) {
  try {
    const usernameHash = await bcrypt.hash(username, BCRYPT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newAdmin = new Admin({
      id: crypto.randomUUID(),
      displayName,
      role,
      usernameHash,
      passwordHash,
      createdBy,
      createdAt: new Date().toISOString(),
    });

    const saved = await newAdmin.save();
    return toPublicAdmin(saved.toObject());
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

export async function verifyAdminLogin(username, password) {
  try {
    const admins = await Admin.find().lean();

    for (const admin of admins) {
      const usernameMatch = await bcrypt.compare(username, admin.usernameHash);
      if (!usernameMatch) continue;

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
    const target = await Admin.findOne({ id: targetId }).lean();
    if (!target) {
      throw new Error("Admin account not found.");
    }

    if (target.id === requestedById) {
      throw new Error("You cannot delete your own account.");
    }

    if (target.role === ADMIN_ROLES.SUPER_ADMIN) {
      const superCount = await Admin.countDocuments({ role: ADMIN_ROLES.SUPER_ADMIN });
      if (superCount <= 1) {
        throw new Error("Cannot delete the last super admin.");
      }
    }

    await Admin.findOneAndDelete({ id: targetId });
    return toPublicAdmin(target);
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
}
