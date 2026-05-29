import crypto from "crypto";
import express from "express";
import cors from "cors";
import { z } from "zod";
import mongoose from "mongoose";
import { config } from "./config.js";
import {
  ADMIN_ROLES,
  ASSIGNABLE_ROLES,
  createAdmin,
  updateAdminById,
  resetAdminPassword,
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
import {
  listCloudConfigsPublic,
  createCloudConfig,
  updateCloudConfig,
  deleteCloudConfig,
  setPrimaryCloud,
  getPrimaryUploadConfig,
  getCloudConfigWithSecret,
  seedFromEnvIfEmpty,
} from "./cloudConfigStore.js";

const app = express();
const authSecret = config.authSecret || crypto.randomBytes(48).toString("hex");

// ── Upload config cache ───────────────────────────────────────────────────────
// Avoids a DB hit on every signed-upload request. Invalidated on any CRUD change.
let _uploadConfigCache = null;
let _uploadConfigCacheTime = 0;
const UPLOAD_CACHE_TTL = 60_000; // 60 seconds

function invalidateUploadCache() {
  _uploadConfigCache = null;
  _uploadConfigCacheTime = 0;
}

async function getCachedUploadConfig() {
  const now = Date.now();
  if (_uploadConfigCache && now - _uploadConfigCacheTime < UPLOAD_CACHE_TTL) {
    return _uploadConfigCache;
  }
  _uploadConfigCache = await getPrimaryUploadConfig();
  _uploadConfigCacheTime = now;
  return _uploadConfigCache;
}
// ─────────────────────────────────────────────────────────────────────────────

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

// Role arrays — keep in sync with ADMIN_ROLES in adminStore.js
const ALL_ADMIN_ROLES     = [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.CONTENT_EDITOR, ADMIN_ROLES.NEWS_EDITOR, ADMIN_ROLES.NEWS_DRAFTER];
const CONTENT_WRITE_ROLES = [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.CONTENT_EDITOR];
const NEWS_WRITE_ROLES    = [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.NEWS_EDITOR, ADMIN_ROLES.NEWS_DRAFTER];
const NEWS_PUBLISH_ROLES  = [ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.NEWS_EDITOR];

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

function canWritePath(role, contentPath) {
  if (role === ADMIN_ROLES.SUPER_ADMIN || role === ADMIN_ROLES.CONTENT_EDITOR) {
    return true;
  }
  if (role === ADMIN_ROLES.NEWS_EDITOR) {
    return contentPath === "news.json";
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

// Only assignable roles — super_admin cannot be assigned via API
const roleSchema = z.enum([
  ADMIN_ROLES.CONTENT_EDITOR,
  ADMIN_ROLES.NEWS_EDITOR,
  ADMIN_ROLES.NEWS_DRAFTER,
]);

const loginSchema = z.object({
  username: z.string().min(3).max(80),
  password: z.string().min(4).max(200),
});

app.post("/api/auth/login", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

app.get("/api/auth/me", requireRole(ALL_ADMIN_ROLES), (req, res) => {
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
  // Guard: cannot create a super_admin
  if (parsed.data.role === ADMIN_ROLES.SUPER_ADMIN) {
    return res.status(403).json({ error: "Cannot create super_admin accounts." });
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

const updateAdminSchema = z.object({
  displayName: z.string().min(2).max(120).optional(),
  role: roleSchema.optional(), // roleSchema already excludes super_admin
});

app.put("/api/auth/admins/:id", requireSuperAdmin, async (req, res) => {
  const parsed = updateAdminSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }
  if (req.params.id === req.auth.adminId) {
    return res.status(400).json({ error: "Cannot change your own role or display name via this endpoint." });
  }
  try {
    const updated = await updateAdminById(req.params.id, parsed.data);
    return res.json({ ok: true, admin: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update admin" });
  }
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6).max(200),
});

app.put("/api/auth/admins/:id/password", requireSuperAdmin, async (req, res) => {
  const parsed = resetPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }
  try {
    await resetAdminPassword(req.params.id, parsed.data.newPassword);
    return res.json({ ok: true, message: "Password reset successfully." });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to reset password" });
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

app.get("/api/cloudinary/config", requireRole(ALL_ADMIN_ROLES), async (_req, res) => {
  try {
    const uploadConfig = await getCachedUploadConfig();
    res.json({
      primary: uploadConfig.cloudName,
      fallbackOrder: [uploadConfig.cloudName, ...uploadConfig.fallbackNames],
    });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to get cloud config" });
  }
});

const signSchema = z.object({
  folder: z.string().min(1),
  publicId: z.string().min(1),
  timestamp: z.number().int().optional(),
  tags: z.string().optional(),
  context: z.string().optional(),
  overwrite: z.boolean().optional(),
});

app.post("/api/cloudinary/sign-upload", requireRole(ALL_ADMIN_ROLES), async (req, res) => {
  const parsed = signSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  let uploadConfig;
  try {
    uploadConfig = await getCachedUploadConfig();
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "No primary upload cloud configured",
    });
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
    .update(`${signingString}${uploadConfig.secret}`)
    .digest("hex");

  return res.json({
    cloudName: uploadConfig.cloudName,
    apiKey: uploadConfig.apiKey,
    timestamp,
    signature,
    folder: payload.folder,
    publicId: payload.publicId,
    fallbackClouds: uploadConfig.fallbackNames,
  });
});

// ==================== NEWS ENDPOINTS ====================

const newsCreateSchema = z.object({
  title_mn: z.string().min(1).max(200),
  title_en: z.string().min(1).max(200),
  content_mn: z.string().min(1),
  content_en: z.string().min(1),
  images: z.array(z.string()).optional(), // multi-image (new)
  image: z.string().optional(),           // legacy single-image (still accepted for compat)
  category: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "pending", "published"]).optional(),
  publishedDate: z.string().optional(),
});

// GET /api/news/fetch - Get all news (all admin roles)
app.get("/api/news/fetch", requireRole(NEWS_WRITE_ROLES), async (req, res) => {
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

// GET /api/news/fetch/:id - Get single news by ID (all news roles)
app.get("/api/news/fetch/:id", requireRole(NEWS_WRITE_ROLES), async (req, res) => {
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

// POST /api/news/create - Create new news (all news roles)
app.post("/api/news/create", requireRole(NEWS_WRITE_ROLES), async (req, res) => {
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

// PUT /api/news/:id/update - Update existing news (all news roles)
app.put("/api/news/:id/update", requireRole(NEWS_WRITE_ROLES), async (req, res) => {
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

    // news_drafter and news_editor can only edit their own articles
    const restrictedRoles = [ADMIN_ROLES.NEWS_EDITOR, ADMIN_ROLES.NEWS_DRAFTER];
    if (restrictedRoles.includes(req.auth.role) && existing.createdBy !== req.auth.adminId) {
      return res.status(403).json({ error: "You can only edit your own articles" });
    }
    // news_drafter cannot publish
    if (req.auth.role === ADMIN_ROLES.NEWS_DRAFTER && parsed.data.status === "published") {
      return res.status(403).json({ error: "News drafters cannot publish articles directly." });
    }

    const updated = await updateNews(id, parsed.data);
    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update news" });
  }
});

// DELETE /api/news/:id - Delete news (super_admin and news_editor only)
app.delete("/api/news/:id", requireRole(NEWS_PUBLISH_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteNews(id);

    return res.json({ ok: true, data: deleted });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to delete news" });
  }
});

// PUT /api/news/:id/submit - Submit for approval (all news roles)
app.put("/api/news/:id/submit", requireRole(NEWS_WRITE_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await submitForApproval(id);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to submit for approval" });
  }
});

// PUT /api/news/:id/approve - Approve news (pending → published) — news_drafter excluded
app.put("/api/news/:id/approve", requireRole(NEWS_PUBLISH_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await approveNews(id, req.auth.adminId);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to approve news" });
  }
});

// PUT /api/news/:id/reject - Reject news (pending → draft) — news_drafter excluded
app.put("/api/news/:id/reject", requireRole(NEWS_PUBLISH_ROLES), async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await rejectNews(id);

    return res.json({ ok: true, data: updated });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to reject news" });
  }
});

// ==================== BRAND COLOR ENDPOINTS ====================

const TAILWIND_CONFIG_PATH = "tailwind.config.js";

function parseBrandColors(fileContent) {
  const extract = (name) => {
    const m = fileContent.match(new RegExp(`'${name}':\\s*'(#[0-9A-Fa-f]{6})'`));
    return m ? m[1] : null;
  };
  return {
    cardinalRed:  extract("cardinal-red"),
    digitalRed:   extract("digital-red"),
    digitalBlue:  extract("digital-blue"),
    sand:         extract("sand"),
    black:        extract("black"),
  };
}

function applyBrandColors(fileContent, colors) {
  let out = fileContent;
  const pairs = [
    ["cardinal-red",  colors.cardinalRed],
    ["digital-red",   colors.digitalRed],
    ["digital-blue",  colors.digitalBlue],
    ["sand",          colors.sand],
    ["black",         colors.black],
  ];
  for (const [name, hex] of pairs) {
    if (!hex) continue;
    out = out.replace(
      new RegExp(`('${name}':\\s*')(#[0-9A-Fa-f]{6})'`),
      `$1${hex}'`
    );
  }
  return out;
}

const brandColorSchema = z.object({
  cardinalRed:  z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  digitalRed:   z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  digitalBlue:  z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  sand:         z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  black:        z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

// GET /api/brand/colors — read current colors from tailwind.config.js in repo (super_admin only)
app.get("/api/brand/colors", requireSuperAdmin, async (_req, res) => {
  try {
    const apiPath = `/repos/${config.github.owner}/${config.github.repo}/contents/${TAILWIND_CONFIG_PATH}?ref=${config.github.branch}`;
    const resp = await githubRequest(apiPath, { method: "GET" });
    const data = await resp.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const colors = parseBrandColors(content);
    return res.json({ ok: true, colors });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : "Failed to read brand colors" });
  }
});

// PUT /api/brand/colors — write updated colors back to tailwind.config.js via GitHub commit
app.put("/api/brand/colors", requireSuperAdmin, async (req, res) => {
  const parsed = brandColorSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid color values", details: parsed.error.flatten() });

  try {
    const apiPath = `/repos/${config.github.owner}/${config.github.repo}/contents/${TAILWIND_CONFIG_PATH}?ref=${config.github.branch}`;
    const readResp = await githubRequest(apiPath, { method: "GET" });
    const readData = await readResp.json();
    const currentContent = Buffer.from(readData.content, "base64").toString("utf-8");
    const updatedContent = applyBrandColors(currentContent, parsed.data);

    if (updatedContent === currentContent) {
      return res.json({ ok: true, message: "No changes detected" });
    }

    const writePath = `/repos/${config.github.owner}/${config.github.repo}/contents/${TAILWIND_CONFIG_PATH}`;
    const writeResp = await githubRequest(writePath, {
      method: "PUT",
      body: JSON.stringify({
        message: "brand: update primary color palette via admin",
        content: Buffer.from(updatedContent, "utf-8").toString("base64"),
        sha: readData.sha,
        branch: config.github.branch,
      }),
    });
    const writeData = await writeResp.json();
    return res.json({
      ok: true,
      commitSha: writeData.commit?.sha,
      commitUrl: writeData.commit?.html_url,
      colors: parseBrandColors(updatedContent),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : "Failed to update brand colors" });
  }
});

// ==================== ANALYTICS ENDPOINTS ====================

// GET /api/analytics/overview - Analytics overview (super_admin + content_editor)
app.get("/api/analytics/overview", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
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

// GET /api/analytics/top-articles - Top performing articles (super_admin + content_editor)
app.get("/api/analytics/top-articles", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
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

// GET /api/analytics/activity - Activity timeline (super_admin + content_editor)
app.get("/api/analytics/activity", requireRole(CONTENT_WRITE_ROLES), async (req, res) => {
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

// ==================== CLOUD CONFIG ENDPOINTS ====================

const cloudConfigCreateSchema = z.object({
  label:     z.string().min(1).max(100),
  cloudName: z.string().min(1).max(100),
  apiKey:    z.string().default(""),
  apiSecret: z.string().default(""),
  isPrimary: z.boolean().default(false),
  order:     z.number().int().min(0).default(0),
  active:    z.boolean().default(true),
});
const cloudConfigUpdateSchema = cloudConfigCreateSchema.partial();

// GET /api/cloud-configs — list all clouds with masked secrets
app.get("/api/cloud-configs", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (_req, res) => {
  try {
    const configs = await listCloudConfigsPublic();
    return res.json({ data: configs });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to list cloud configs" });
  }
});

// POST /api/cloud-configs — add a new cloud
app.post("/api/cloud-configs", requireRole([ADMIN_ROLES.SUPER_ADMIN]), async (req, res) => {
  const parsed = cloudConfigCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  try {
    const created = await createCloudConfig(parsed.data);
    invalidateUploadCache();
    return res.status(201).json({ ok: true, data: created });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to create cloud config" });
  }
});

// PUT /api/cloud-configs/:id — update a cloud
app.put("/api/cloud-configs/:id", requireRole([ADMIN_ROLES.SUPER_ADMIN]), async (req, res) => {
  const parsed = cloudConfigUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  try {
    const updated = await updateCloudConfig(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ error: "Cloud config not found" });
    invalidateUploadCache();
    return res.json({ ok: true, data: updated });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to update cloud config" });
  }
});

// DELETE /api/cloud-configs/:id — remove a cloud
app.delete("/api/cloud-configs/:id", requireRole([ADMIN_ROLES.SUPER_ADMIN]), async (req, res) => {
  try {
    const deleted = await deleteCloudConfig(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cloud config not found" });
    invalidateUploadCache();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to delete cloud config" });
  }
});

// PATCH /api/cloud-configs/:id/primary — set as primary upload cloud
app.patch("/api/cloud-configs/:id/primary", requireRole([ADMIN_ROLES.SUPER_ADMIN]), async (req, res) => {
  try {
    const updated = await setPrimaryCloud(req.params.id);
    if (!updated) return res.status(404).json({ error: "Cloud config not found" });
    invalidateUploadCache();
    return res.json({ ok: true, data: updated });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Failed to set primary cloud" });
  }
});

// POST /api/cloud-configs/:id/test — verify Cloudinary credentials are valid
app.post("/api/cloud-configs/:id/test", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const cfg = await getCloudConfigWithSecret(req.params.id);
    if (!cfg) return res.status(404).json({ ok: false, error: "Cloud config not found" });
    if (!cfg.apiKey || !cfg.secret) {
      return res.json({ ok: false, error: "No credentials stored for this cloud" });
    }
    const creds = Buffer.from(`${cfg.apiKey}:${cfg.secret}`).toString("base64");
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/usage`, {
      headers: { Authorization: `Basic ${creds}` },
    });
    if (response.ok) {
      return res.json({ ok: true });
    }
    const body = await response.json().catch(() => ({}));
    return res.json({ ok: false, error: body.error?.message || `HTTP ${response.status}` });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : "Test failed" });
  }
});

// GET /api/cloud-configs/:id/usage — fetch live storage usage from Cloudinary
app.get("/api/cloud-configs/:id/usage", requireRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN]), async (req, res) => {
  try {
    const cfg = await getCloudConfigWithSecret(req.params.id);
    if (!cfg) return res.status(404).json({ ok: false, error: "Cloud config not found" });
    if (!cfg.apiKey || !cfg.secret) {
      return res.json({ ok: false, error: "No credentials for this cloud" });
    }
    const creds = Buffer.from(`${cfg.apiKey}:${cfg.secret}`).toString("base64");
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/usage`, {
      headers: { Authorization: `Basic ${creds}` },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return res.json({ ok: false, error: body.error?.message || `HTTP ${response.status}` });
    }
    const data = await response.json();
    return res.json({
      ok: true,
      plan: data.plan,
      storage: data.storage,   // { usage: bytes, limit: bytes, used_percent: number }
      objects: data.objects,   // { usage: count, limit: count }
      bandwidth: data.bandwidth,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : "Failed to fetch usage" });
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

    await seedFromEnvIfEmpty();
    const seeded = await ensureInitialSuperAdmin();
    if (seeded) {
      // eslint-disable-next-line no-console
      console.log(`Initial super admin created: ${seeded.displayName} (${seeded.role})`);
    }

    // Global error handling middleware (must be last)
    app.use((err, req, res, next) => {
      // eslint-disable-next-line no-console
      console.error("Express error:", err.message, err.stack);
      const statusCode = err.status || err.statusCode || 500;
      return res.status(statusCode).json({
        error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
      });
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason, promise) => {
      // eslint-disable-next-line no-console
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      // eslint-disable-next-line no-console
      console.error("Uncaught Exception:", error);
      // Keep the process running instead of crashing
    });

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
