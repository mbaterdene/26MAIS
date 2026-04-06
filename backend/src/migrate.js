#!/usr/bin/env node

/**
 * Migration script: Migrate data from JSON files to MongoDB
 * Run this once before switching to MongoDB backend
 */

import dotenv from "dotenv";

// Load environment variables from parent directory (.env is in 26MAIS root)
// When running npm scripts, cwd is the backend/ directory
const envPath = "../.env";
console.log(`📁 Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Failed to load .env:", result.error.message);
}

import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { News, getNextNewsId } from "./models/News.js";
import { Admin } from "./models/Admin.js";

const MONGO_URI = process.env.MONGO_URI;
const CONTENT_DIR = path.join(process.cwd(), "..", "src", "content");
const DATA_DIR = path.join(process.cwd(), "data");
const NEWS_FILE = path.join(CONTENT_DIR, "news.json");
const ADMINS_FILE = path.join(DATA_DIR, "admins.json");

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");
}

async function readJSON(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn(`⚠️ Could not read ${filePath}:`, error.message);
    return [];
  }
}

async function migrateNews() {
  console.log("\n📰 Migrating news articles...");
  const newsData = await readJSON(NEWS_FILE);

  if (newsData.length === 0) {
    console.log("ℹ️ No news articles to migrate");
    return;
  }

  for (const article of newsData) {
    try {
      const existing = await News.findOne({ id: article.id }).lean();
      if (existing) {
        console.log(`⏭️ News article ${article.id} already exists, skipping...`);
        continue;
      }

      const newArticle = new News(article);
      await newArticle.save();
      console.log(`✅ Migrated news article: ${article.title_en} (ID: ${article.id})`);
    } catch (error) {
      console.error(`❌ Error migrating news article ${article.id}:`, error.message);
    }
  }
}

async function migrateAdmins() {
  console.log("\n👤 Migrating admins...");
  const adminsData = await readJSON(ADMINS_FILE);

  if (adminsData.length === 0) {
    console.log("ℹ️ No admins to migrate");
    return;
  }

  for (const admin of adminsData) {
    try {
      const existing = await Admin.findOne({ id: admin.id }).lean();
      if (existing) {
        console.log(`⏭️ Admin ${admin.displayName} already exists, skipping...`);
        continue;
      }

      const newAdmin = new Admin(admin);
      await newAdmin.save();
      console.log(`✅ Migrated admin: ${admin.displayName} (ID: ${admin.id})`);
    } catch (error) {
      console.error(`❌ Error migrating admin ${admin.id}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log("🚀 Starting migration from JSON to MongoDB...\n");

    await connectDB();

    await migrateNews();
    await migrateAdmins();

    console.log("\n✨ Migration completed successfully!");
    console.log("💡 You can now safely delete the JSON files if needed.");
    console.log("   - backend/data/admins.json");
    console.log("   - src/content/news.json");

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    process.exit(1);
  }
}

main();
