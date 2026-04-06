import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Path to news content file
const CONTENT_DIR = path.join(process.cwd(), "..", "src", "content");
const NEWS_FILE = path.join(CONTENT_DIR, "news.json");

async function ensureContentDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

async function readNews() {
  await ensureContentDir();
  try {
    const text = await fs.readFile(NEWS_FILE, "utf8");
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeNews(news) {
  await ensureContentDir();
  await fs.writeFile(NEWS_FILE, `${JSON.stringify(news, null, 2)}\n`, "utf8");
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getNextId(existingNews) {
  if (existingNews.length === 0) return 1;
  return Math.max(...existingNews.map((n) => n.id || 0)) + 1;
}

export async function getNewsByStatus(status) {
  const news = await readNews();
  if (status === "all") return news;
  return news.filter((n) => n.status === status);
}

export async function getAllNews() {
  return readNews();
}

export async function getNewsById(id) {
  const news = await readNews();
  return news.find((n) => n.id === id);
}

export async function createNews(data) {
  const {
    title_mn,
    title_en,
    content_mn,
    content_en,
    image,
    category,
    author,
    status = "draft",
    createdBy,
  } = data;

  // Validate required fields
  if (!title_mn || !title_en || !content_mn || !content_en) {
    throw new Error("Missing required fields: title_mn, title_en, content_mn, content_en");
  }

  const news = await readNews();
  const id = getNextId(news);
  const slug = generateSlug(title_en);

  const newArticle = {
    id,
    slug,
    title_mn,
    title_en,
    content_mn,
    content_en,
    image: image || null,
    category: category || "news",
    author: author || "Anonymous",
    status: status || "draft",
    createdBy: createdBy || null,
    approvedBy: null,
    approvedAt: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  news.push(newArticle);
  await writeNews(news);
  return newArticle;
}

export async function updateNews(id, data) {
  const news = await readNews();
  const index = news.findIndex((n) => n.id === id);

  if (index === -1) {
    throw new Error(`News with id ${id} not found`);
  }

  const existing = news[index];
  const updated = {
    ...existing,
    ...data,
    id: existing.id, // Keep original id
    slug: existing.slug, // Keep original slug
    created_at: existing.created_at, // Keep original creation date
    updated_at: new Date().toISOString(),
  };

  news[index] = updated;
  await writeNews(news);
  return updated;
}

export async function deleteNews(id) {
  const news = await readNews();
  const index = news.findIndex((n) => n.id === id);

  if (index === -1) {
    throw new Error(`News with id ${id} not found`);
  }

  const deleted = news[index];
  news.splice(index, 1);
  await writeNews(news);
  return deleted;
}

export async function updateNewsStatus(id, newStatus, approverId) {
  const updated = await updateNews(id, {
    status: newStatus,
    approvedBy: newStatus === "published" ? approverId : null,
    approvedAt: newStatus === "published" ? new Date().toISOString() : null,
  });
  return updated;
}

export async function submitForApproval(id) {
  const article = await getNewsById(id);
  if (!article) {
    throw new Error(`News with id ${id} not found`);
  }
  if (article.status !== "draft") {
    throw new Error("Only draft articles can be submitted for approval");
  }
  return updateNews(id, { status: "pending" });
}

export async function approveNews(id, approverId) {
  const article = await getNewsById(id);
  if (!article) {
    throw new Error(`News with id ${id} not found`);
  }
  if (article.status !== "pending") {
    throw new Error("Only pending articles can be approved");
  }
  return updateNewsStatus(id, "published", approverId);
}

export async function rejectNews(id) {
  const article = await getNewsById(id);
  if (!article) {
    throw new Error(`News with id ${id} not found`);
  }
  if (article.status !== "pending") {
    throw new Error("Only pending articles can be rejected");
  }
  return updateNews(id, { status: "draft", approvedBy: null, approvedAt: null });
}

export async function searchNews(query) {
  const news = await readNews();
  const lowerQuery = query.toLowerCase();
  return news.filter(
    (n) =>
      n.title_mn.toLowerCase().includes(lowerQuery) ||
      n.title_en.toLowerCase().includes(lowerQuery) ||
      n.author.toLowerCase().includes(lowerQuery) ||
      n.content_mn.toLowerCase().includes(lowerQuery) ||
      n.content_en.toLowerCase().includes(lowerQuery)
  );
}
