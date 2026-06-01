import mongoose from "mongoose";

const VALID_ROLES = ["super_admin", "content_editor", "news_editor", "news_drafter"];

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: VALID_ROLES,
      required: true,
    },
    usernameHash: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: "system",
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
);

export const Admin = mongoose.model("Admin", adminSchema);
