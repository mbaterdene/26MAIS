import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      sparse: true, // Allow null for backward compatibility
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    title_mn: {
      type: String,
      required: true,
    },
    title_en: {
      type: String,
      required: true,
    },
    content_mn: {
      type: String,
      required: true,
    },
    content_en: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: "news",
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    status: {
      type: String,
      enum: ["draft", "pending", "published"],
      default: "draft",
    },
    createdBy: {
      type: String, // UUID
      default: null,
    },
    approvedBy: {
      type: String, // UUID
      default: null,
    },
    approvedAt: {
      type: String, // ISO String
      default: null,
    },
    created_at: {
      type: String, // ISO String
      default: () => new Date().toISOString(),
    },
    updated_at: {
      type: String, // ISO String
      default: () => new Date().toISOString(),
    },
  },
  { collection: "news" }
);

// Index for text search
newsSchema.index({
  title_mn: "text",
  title_en: "text",
  content_mn: "text",
  content_en: "text",
  author: "text",
});

// Index for status queries
newsSchema.index({ status: 1 });
newsSchema.index({ created_at: -1 });

export const News = mongoose.model("News", newsSchema);

// Auto-increment counter for id field
const CounterSchema = new mongoose.Schema(
  {
    _id: String,
    seq: Number,
  },
  { collection: "counters" }
);

const Counter = mongoose.model("Counter", CounterSchema);

export async function getNextNewsId() {
  const counter = await Counter.findByIdAndUpdate(
    "news_id",
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}
