#!/usr/bin/env node

/**
 * Script to create a new admin account in MongoDB.
 * Usage: node create-admin.js <username> <password> <displayName> <role>
 * Example: node create-admin.js zlog Password123 zlog super_admin
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load .env from project root and backend directories
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

// Import the Admin model
import { Admin } from "../src/models/Admin.js";

const BCRYPT_ROUNDS = 10;

const ADMIN_ROLES = {
  SUPER_ADMIN:    "super_admin",
  CONTENT_EDITOR: "content_editor",
  NEWS_EDITOR:    "news_editor",
  NEWS_DRAFTER:   "news_drafter",
};

function hashUsername(username) {
  return crypto.createHash("sha256").update(username).digest("hex");
}

async function createAdmin(username, password, displayName, role) {
  try {
    // Validate role
    const validRoles = Object.values(ADMIN_ROLES);
    if (!validRoles.includes(role)) {
      console.error(`Invalid role: ${role}. Valid roles are: ${validRoles.join(", ")}`);
      process.exit(1);
    }

    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("MONGO_URI environment variable not set");
      process.exit(1);
    }

    console.log(`Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    // Check if username already exists
    const usernameHash = hashUsername(username);
    const existing = await Admin.findOne({ usernameHash });
    if (existing) {
      console.error(`Admin with username "${username}" already exists`);
      await mongoose.disconnect();
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create admin
    const newAdmin = await Admin.create({
      id: crypto.randomUUID(),
      displayName,
      role,
      usernameHash,
      passwordHash,
      createdBy: "admin-script",
      createdAt: new Date().toISOString(),
    });

    console.log(`✓ Admin account created successfully!`);
    console.log(`  Username: ${username}`);
    console.log(`  Display Name: ${displayName}`);
    console.log(`  Role: ${role}`);
    console.log(`  ID: ${newAdmin.id}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.log("Usage: node create-admin.js <username> <password> <displayName> <role>");
  console.log("Example: node create-admin.js zlog Password123 zlog super_admin");
  console.log("Valid roles:", Object.keys(ADMIN_ROLES).map(k => ADMIN_ROLES[k]).join(", "));
  process.exit(1);
}

const [username, password, displayName, role] = args;
createAdmin(username, password, displayName, role);
