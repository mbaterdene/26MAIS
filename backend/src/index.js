import crypto from "crypto";
import express from "express";
import cors from "cors";
import { z } from "zod";
import mongoose from "mongoose";
import { config } from "./config.js";
import {
  ADMIN_ROLES,
  createAdmin,
  deleteAdminById,
  ensureInitialSuperAdmin,
  listAdminsPublic,
  verifyAdminLogin,
} from "./adminStore.js";
import {
  getAllNews,
  getNewsByStatus,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  submitForApproval,
  approveNews,
  rejectNews,
  searchNews,
} from "./newsStore.js";

const app = express();
const authSecret = config.authSecret || crypto.randomBytes(48).toString("hex");

const corsOrigins = config.corsOrigins;
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (corsOrigins.includes("*") || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);
app.use(express.json({ limit: "5mb" }));

const CONTENT_WRITE_ROLES = [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.NEWS_EDITOR];

function signAuthToken(payload) {
  const base64Payload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", authSecret)
    .update(base64Payload)
    .digest("base64url");
  return `${base64Payload}.${signature}`;
}

function verifyAuthToken(token) {
  const [base64Payload, incomingSig] = token.split(".");
  if (!base64Payload || !incomingSig) return null;

  const expectedSig = crypto
    .createHmac("sha256", authSecret)
    .update(base64Payload)
    .digest("base64url");

  const expectedBuffer = Buffer.from(expectedSig);
  const incomingBuffer = Buffer.from(incomingSig);
  if (expectedBuffer.length !== incomingBuffer.length) return null;
  if (!crypto.timingSafeEqual(expectedBuffer, incomingBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(base64Payload, "base64url").toString("utf8"));
    if (!payload?.exp || Date.now() > Number(payload.exp)) return null;
    return payload;
  } catch {
    return null;
  }
}

function getRequestAuth(req) {
  const bearer = req.headers.authorization;
  if (typeof bearer === "string" && bearer.startsWith("Bearer ")) {
    const token = bearer.slice(7).trim();
    const payload = verifyAuthToken(token);
    if (payload) {
      return {
        role: payload.role,
        adminId: payload.sub,
        displayName: payload.displayName,
      };
    }
  }

  return null;
}

function requireRole(allowedRoles) {
  return (req, res, next) => {
    const auth = getRequestAuth(req);
    if (!auth) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(auth.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    req.auth = auth;
    return next();
  };
}

function requireSuperAdmin(req, res, next) {
  const auth = getRequestAuth(req);
  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (auth.role !== ADMIN_ROLES.SUPER_ADMIN) {
    return res.status(403).json({ error: "Super admin access required" });
  }
  req.auth = auth;
  return next();
}

function canWritePath(role, path) {
  if (role === ADMIN_ROLES.SUPER_ADMIN || role === ADMIN_ROLES.ADMIN) {
    return true;
  }
  if (role === ADMIN_ROLES.NEWS_EDITOR) {
    return path === "news.json";
  }
  return false;
}

async function githubRequest(path, init = {}) {
  const url = `https://api.github.com${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${config.github.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  return response;
}

function buildRepoPath(path) {
  const base = config.github.contentBasePath.replace(/^\/+|\/+$/g, "");
  const relative = path.replace(/^\/+/, "");
  return `${base}/${relative}`;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "mais-backend" });
});

const roleSchema = z.enum([
  ADMIN_ROLES.SUPER_ADMIN,
  ADMIN_ROLES.ADMIN,
  ADMIN_ROLES.NEWS_EDITOR,
]);

const loginSchema = z.object({
  username: z.string().min(3).max(80),
  password: z.string().min(4).max(200),
});

app.post("/api/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid credentials payload" });
  }

  const admin = await verifyAdminLogin(parsed.data.username, parsed.data.password);
  if (!admin) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = signAuthToken({
    sub: admin.id,
    role: admin.role,
    displayName: admin.displayName,
    exp: Date.now() + 1000 * 60 * 60 * 10,
  });

  return res.json({
    token,
    admin,
  });
});

app.get("/api/auth/me", requireRole(CONTENT_WRITE_ROLES), (req, res) => {
  return res.json({
    admin: {
      id: req.auth.adminId,
      role: req.auth.role,
      displayName: req.auth.displayName,
    },
  });
});

const createAdminSchema = z.object({
  username: z.string().min(3).max(80),
  password: z.string().min(4).max(200),
  displayName: z.string().min(2).max(120),
  role: roleSchema,
});

app.get("/api/auth/admins", requireSuperAdmin, async (_req, res) => {
  const admins = await listAdminsPublic();
  return res.json({ admins });
});

app.post("/api/auth/admins", requireSuperAdmin, async (req, res) => {
  const parsed = createAdminSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid admin payload", details: parsed.error.flatten() });
  }

  try {
    const admin = await createAdmin({
      username: parsed.data.username,
      password: parsed.data.password,
      displayName: parsed.data.displayName,
      role: parsed.data.role,
      createdBy: req.auth.adminId,
    });
    return res.json({ ok: true, admin });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create admin" });
  }
});

app.delete("/api/auth/admins/:id", requireSuperAdmin, async (req, res) => {
  try {
    const deleted = await deleteAdminById({
      targetId: req.params.id,
      requestedById: req.auth.adminId,
    });
    return res.json({ ok: true, deleted });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to delete admin" });
  }
});

app.get("/api/cloudinary/config", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), (_req, res) => {
  const clouds = [config.cloudinary.primary.name, ...config.cloudinary.fallbackNames];
  res.json({
    primary: config.cloudinary.primary.name,
    fallbackOrder: clouds,
  });
});

const signSchema = z.object({
  folder: z.string().min(1),
  publicId: z.string().min(1),
  timestamp: z.number().int().optional(),
  tags: z.string().optional(),
  context: z.string().optional(),
  overwrite: z.boolean().optional(),
});

app.post("/api/cloudinary/sign-upload", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), (req, res) => {
  const parsed = signSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const payload = parsed.data;
  const timestamp = payload.timestamp || Math.floor(Date.now() / 1000);

  const params = {
    context: payload.context,
    folder: payload.folder,
    overwrite: payload.overwrite ? "true" : undefined,
    public_id: payload.publicId,
    tags: payload.tags,
    timestamp: String(timestamp),
  };

  const signingString = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(`${signingString}${config.cloudinary.primary.secret}`)
    .digest("hex");

  return res.json({
    cloudName: config.cloudinary.primary.name,
    apiKey: config.cloudinary.primary.key,
    timestamp,
    signature,
    folder: payload.folder,
    publicId: payload.publicId,
    fallbackClouds: config.cloudinary.fallbackNames,
  });
});

// ==================== NEWS ENDPOINTS ====================

const newsCreateSchema = z.object({
  title_mn: z.string().min(1).max(200),
  title_en: z.string().min(1).max(200),
  content_mn: z.string().min(1),
  content_en: z.string().min(1),
  image: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "pending", "published"]).optional(),
});

// GET /api/news/fetch - Get all news (admin only, include all statuses)
app.get("/api/news/fetch", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  try {
    const { status = "all", search } = req.query;

    let news;
    if (status === "all") {
      news = await getAllNews();
    } else {
      news = await getNewsByStatus(status);
    }

    if (search) {
      news = await searchNews(search);
    }

    return res.json({ data: news });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch news" });
  }
});

// GET /api/news/fetch/:id - Get single news by ID (admin only)
app.get("/api/news/fetch/:id", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const news = await getNewsById(id);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.json(news);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch news" });
  }
});

// POST /api/news/create - Create new news
app.post("/api/news/create", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  try {
    const parsed = newsCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const news = await createNews({
      ...parsed.data,
      createdBy: req.auth.adminId,
      author: parsed.data.author || req.auth.displayName,
    });

    return res.json({ ok: true, data: news });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create news" });
  }
});

// PUT /api/news/:id/update - Update existing news
app.put("/api/news/:id/update", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const parsed = newsCreateSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }

    const existing = await getNewsById(id);
    if (!existing) {
      return res.status(404).json({ error: "News not found" });
    }

    // Check permissions: only creator or admin can edit
    if (req.auth.role === "news_editor" && existing.createdBy !== req.auth.adminId) {
      return res.status(403).json({ error: "You can only edit your own articles" });
    }

    const updated = await updateNews(id, parsed.data);
    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update news" });
  }
});

// DELETE /api/news/:id - Delete news (admin only)
app.delete("/api/news/:id", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteNews(id);

    return res.json({ ok: true, data: deleted });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to delete news" });
  }
});

// PUT /api/news/:id/submit - Submit for approval (draft → pending)
app.put("/api/news/:id/submit", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await submitForApproval(id);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to submit for approval" });
  }
});

// PUT /api/news/:id/approve - Approve news (pending → published)
app.put("/api/news/:id/approve", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await approveNews(id, req.auth.adminId);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to approve news" });
  }
});

// PUT /api/news/:id/reject - Reject news (pending → draft)
app.put("/api/news/:id/reject", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await rejectNews(id);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to reject news" });
  }
});

// ==================== ANALYTICS ENDPOINTS ====================

// GET /api/analytics/overview - Analytics overview (admin+)
app.get("/api/analytics/overview", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const allNews = await getAllNews();
    const publishedNews = allNews.filter((n) => n.status === "published");
    const pendingNews = allNews.filter((n) => n.status === "pending");
    const draftNews = allNews.filter((n) => n.status === "draft");

    // Simulate view counts (in production, would use tracking system)
    const totalViews = allNews.reduce((sum) => sum + Math.floor(Math.random() * 500) + 10, 0);
    const avgViews = publishedNews.length > 0 ? Math.round(totalViews / publishedNews.length) : 0;

    return res.json({
      totalViews,
      totalArticles: allNews.length,
      publishedArticles: publishedNews.length,
      pendingArticles: pendingNews.length,
      draftArticles: draftNews.length,
      avgViewsPerArticle: avgViews,
      growthRate: 12,
      engagementRate: 68,
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch analytics" });
  }
});

// GET /api/analytics/top-articles - Top performing articles (admin+)
app.get("/api/analytics/top-articles", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const published = await getNewsByStatus("published");
    const limit = parseInt(req.query.limit) || 5;

    // Add simulated view counts
    const articlesWithViews = published.map((article) => ({
      ...article,
      views: Math.floor(Math.random() * 500) + 10,
    }));

    // Sort by views descending
    const topArticles = articlesWithViews.sort((a, b) => b.views - a.views).slice(0, limit);

    return res.json({ data: topArticles });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch top articles" });
  }
});

// GET /api/analytics/activity - Activity timeline (admin+)
app.get("/api/analytics/activity", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const allNews = await getAllNews();

    // Group by created_at date
    const activityByDate = {};
    allNews.forEach((article) => {
      const date = article.created_at?.split("T")[0] || new Date().toISOString().split("T")[0];
      activityByDate[date] = (activityByDate[date] || 0) + 1;
    });

    // Return last 30 days
    const activity = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      activity.push({
        date: dateStr,
        count: activityByDate[dateStr] || 0,
      });
    }

    return res.json({ data: activity });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch activity" });
  }
});

// ==================== PUBLIC NEWS ENDPOINT ====================

// GET /api/news - Public endpoint (only published news)
app.get("/api/news", async (req, res) => {
  try {
    const published = await getNewsByStatus("published");
    return res.json({ data: published });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch news" });
  }
});

// GET /api/news/:slug - Get single published article by slug (public)
app.get("/api/news/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const published = await getNewsByStatus("published");
    const article = published.find((n) => n.slug === slug);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    return res.json({ ...article, image: article.image || null });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch news" });
  }
});

const upsertSchema = z.object({
  path: z.string().min(1),
  data: z.any(),
  message: z.string().min(3).max(140).optional(),
});

app.post("/api/content/upsert", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  try {
    const { path, data, message } = parsed.data;
    if (!path.endsWith(".json")) {
      return res.status(400).json({ error: "Only .json files are allowed." });
    }

    if (!canWritePath(req.auth.role, path)) {
      return res.status(403).json({ error: "You do not have permission to edit this file." });
    }

    const repoPath = buildRepoPath(path);
    const encodedPath = encodeURIComponent(repoPath);
    const readPath = `/repos/${config.github.owner}/${config.github.repo}/contents/${encodedPath}?ref=${config.github.branch}`;

    let sha;
    try {
      const readResp = await githubRequest(readPath, { method: "GET" });
      const readData = await readResp.json();
      sha = readData.sha;
    } catch {
      sha = undefined;
    }

    const content = Buffer.from(`${JSON.stringify(data, null, 2)}\n`, "utf8").toString("base64");

    const writePath = `/repos/${config.github.owner}/${config.github.repo}/contents/${encodeURIComponent(repoPath)}`;
    const commitMessage = message || `content: update ${path}`;

    const writeResp = await githubRequest(writePath, {
      method: "PUT",
      body: JSON.stringify({
        message: commitMessage,
        content,
        sha,
        branch: config.github.branch,
      }),
    });

    const result = await writeResp.json();
    return res.json({
      ok: true,
      path: repoPath,
      commitSha: result.commit?.sha,
      commitUrl: result.commit?.html_url,
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to upsert content" });
  }
});

const deleteSchema = z.object({
  path: z.string().min(1),
  message: z.string().min(3).max(140).optional(),
});

app.post("/api/content/delete", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  const parsed = deleteSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  try {
    const { path, message } = parsed.data;
    if (!path.endsWith(".json")) {
      return res.status(400).json({ error: "Only .json files are allowed." });
    }

    const repoPath = buildRepoPath(path);
    const readPath = `/repos/${config.github.owner}/${config.github.repo}/contents/${encodeURIComponent(repoPath)}?ref=${config.github.branch}`;

    const readResp = await githubRequest(readPath, { method: "GET" });
    const readData = await readResp.json();

    const delPath = `/repos/${config.github.owner}/${config.github.repo}/contents/${encodeURIComponent(repoPath)}`;
    const delResp = await githubRequest(delPath, {
      method: "DELETE",
      body: JSON.stringify({
        message: message || `content: delete ${path}`,
        sha: readData.sha,
        branch: config.github.branch,
      }),
    });

    const result = await delResp.json();
    return res.json({ ok: true, commitSha: result.commit?.sha, commitUrl: result.commit?.html_url });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete content" });
  }
});

async function start() {
  try {
    // Connect to MongoDB
    if (!config.mongoUri) {
      throw new Error("MONGO_URI environment variable is required");
    }

    await mongoose.connect(config.mongoUri);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");

    const seeded = await ensureInitialSuperAdmin();
    if (seeded) {
      // eslint-disable-next-line no-console
      console.log(`Initial super admin created: ${seeded.displayName} (${seeded.role})`);
    }

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`mais-backend listening on :${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start backend:", error);
  process.exit(1);
});
