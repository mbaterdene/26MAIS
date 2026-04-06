import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWS_FILE = path.join(__dirname, "..", "data", "news.json");
const COUNTER_FILE = path.join(__dirname, "..", "data", "news-counter.json");

// Helper to read news data
function readNewsData() {
  try {
    const data = fs.readFileSync(NEWS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

// Helper to write news data
function writeNewsData(data) {
  fs.writeFileSync(NEWS_FILE, JSON.stringify(data, null, 2));
}

// Helper to get next ID
function getNextNewsId() {
  try {
    const counter = JSON.parse(fs.readFileSync(COUNTER_FILE, "utf8"));
    counter.nextId += 1;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counter, null, 2));
    return counter.nextId - 1;
  } catch {
    const counter = { nextId: 2 };
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counter, null, 2));
    return 1;
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getNewsByStatus(status) {
  try {
    const news = readNewsData();
    if (status === "all") {
      return news.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return news
      .filter((n) => n.status === status)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error("Error fetching news by status:", error);
    throw error;
  }
}

export async function getAllNews() {
  try {
    const news = readNewsData();
    return news.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error;
  }
}

export async function getNewsById(id) {
  try {
    const news = readNewsData();
    return news.find((n) => n.id === id);
  } catch (error) {
    console.error("Error fetching news by id:", error);
    throw error;
  }
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

  try {
    const news = readNewsData();
    const id = getNextNewsId();
    const slug = generateSlug(title_en);
    const now = new Date().toISOString();

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
      created_at: now,
      updated_at: now,
    };

    news.push(newArticle);
    writeNewsData(news);
    return newArticle;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

export async function updateNews(id, data) {
  try {
    const news = readNewsData();
    const index = news.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new Error(`News with id ${id} not found`);
    }

    news[index] = {
      ...news[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    writeNewsData(news);
    return news[index];
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

export async function deleteNews(id) {
  try {
    const news = readNewsData();
    const index = news.findIndex((n) => n.id === id);

    if (index === -1) {
      throw new Error(`News with id ${id} not found`);
    }

    const deleted = news.splice(index, 1)[0];
    writeNewsData(news);
    return deleted;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}

export async function updateNewsStatus(id, newStatus, approverId) {
  try {
    return await updateNews(id, {
      status: newStatus,
      approvedBy: newStatus === "published" ? approverId : null,
      approvedAt: newStatus === "published" ? new Date().toISOString() : null,
    });
  } catch (error) {
    console.error("Error updating news status:", error);
    throw error;
  }
}

export async function submitForApproval(id) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "draft") {
      throw new Error("Only draft articles can be submitted for approval");
    }
    return updateNews(id, { status: "pending" });
  } catch (error) {
    console.error("Error submitting for approval:", error);
    throw error;
  }
}

export async function approveNews(id, approverId) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "pending") {
      throw new Error("Only pending articles can be approved");
    }
    return updateNewsStatus(id, "published", approverId);
  } catch (error) {
    console.error("Error approving news:", error);
    throw error;
  }
}

export async function rejectNews(id) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "pending") {
      throw new Error("Only pending articles can be rejected");
    }
    return updateNews(id, { status: "draft", approvedBy: null, approvedAt: null });
  } catch (error) {
    console.error("Error rejecting news:", error);
    throw error;
  }
}

export async function searchNews(query) {
  try {
    const news = readNewsData();
    const lowerQuery = query.toLowerCase();
    return news.filter(
      (n) =>
        n.title_en.toLowerCase().includes(lowerQuery) ||
        n.title_mn.toLowerCase().includes(lowerQuery) ||
        n.author.toLowerCase().includes(lowerQuery) ||
        n.content_en.toLowerCase().includes(lowerQuery) ||
        n.content_mn.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}
