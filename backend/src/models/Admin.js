import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String, // UUID
      unique: true,
      required: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "news_editor"],
      required: true,
    },
    usernameHash: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, // UUID
      required: true,
    },
    createdAt: {
      type: String, // ISO String
      default: () => new Date().toISOString(),
    },
  },
  { collection: "admins" }
);

// Index for faster queries
adminSchema.index({ role: 1 });

export const Admin = mongoose.model("Admin", adminSchema);
