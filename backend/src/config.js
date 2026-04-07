import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.BACKEND_PORT || 8787),
  corsOrigins: (process.env.CORS_ORIGIN || "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  authSecret: process.env.ADMIN_AUTH_SECRET || "",
  mongoUri: process.env.MONGO_URI,
  github: {
    owner: requireEnv("GITHUB_OWNER"),
    repo: requireEnv("GITHUB_REPO"),
    token: requireEnv("GITHUB_TOKEN"),
    branch: process.env.GITHUB_BRANCH || "main",
    contentBasePath: process.env.GITHUB_CONTENT_BASE_PATH || "content",
  },
  cloudinary: {
    primary: {
      name: requireEnv("CLOUDINARY_PRIMARY_NAME"),
      key: requireEnv("CLOUDINARY_PRIMARY_KEY"),
      secret: requireEnv("CLOUDINARY_PRIMARY_SECRET"),
    },
    fallbackNames: (process.env.CLOUDINARY_FALLBACK_NAMES || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },
};
