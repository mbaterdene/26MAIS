# MAIS Backend (Minimal Admin API)

A lightweight Express backend for role-based admin content updates and Cloudinary signed uploads.

## APIs

- `GET /api/health`
  - Health check.

- `POST /api/auth/bootstrap`
  - Create the very first super admin account (one-time use).
  - Requires body `setupKey` equal to `API_ADMIN_KEY`.
  - Body:
    ```json
    {
      "setupKey": "<API_ADMIN_KEY>",
      "displayName": "Main Admin",
      "username": "mainadmin",
      "password": "strong-password"
    }
    ```

- `POST /api/auth/login`
  - Admin login with username + password.
  - Returns auth token + admin profile.

- `GET /api/auth/me`
  - Returns currently authenticated admin profile.
  - Requires header: `Authorization: Bearer <token>`.

- `GET /api/auth/admins`
  - List admin accounts (public profile fields only).
  - Super admin only.

- `POST /api/auth/admins`
  - Create admin account.
  - Super admin only.
  - Body:
    ```json
    {
      "displayName": "News Team",
      "username": "news01",
      "password": "strong-password",
      "role": "news_editor"
    }
    ```

- `GET /api/cloudinary/config`
  - Returns primary cloud + fallback order.
  - Roles: `super_admin`, `admin`.

- `POST /api/cloudinary/sign-upload`
  - Creates signed upload payload for Cloudinary (primary cloud).
  - Roles: `super_admin`, `admin`.
  - Body:
    ```json
    {
      "folder": "news",
      "publicId": "news-2026-001",
      "tags": "news,school",
      "context": "alt=Parent Open Day"
    }
    ```

- `POST /api/content/upsert`
  - Create/update a JSON content file in GitHub repo.
  - Roles:
    - `super_admin`: all content files
    - `admin`: all content files
    - `news_editor`: only `news.json`
  - Body:
    ```json
    {
      "path": "news.json",
      "data": { "version": 1, "items": [] },
      "message": "content: update news"
    }
    ```

- `POST /api/content/delete`
  - Delete a JSON content file from GitHub repo.
  - Roles: `super_admin`, `admin`.

## Auth Model

- Admin accounts are saved in `backend/data/admins.json`.
- Both username and password are stored as bcrypt hashes.
- Login issues a signed bearer token. Use `Authorization: Bearer <token>`.
- For backward compatibility, `x-admin-key` still works as super admin access.

## Roles

- `super_admin`
  - Edit all content.
  - Create any admin account including another super admin.

- `admin`
  - Edit all content.
  - Cannot create admin accounts.

- `news_editor`
  - Can only update `news.json`.
  - Cannot create admin accounts.

## Environment Variables (from root `.env`)

Required:

- `CLOUDINARY_PRIMARY_NAME`
- `CLOUDINARY_PRIMARY_KEY`
- `CLOUDINARY_PRIMARY_SECRET`
- `CLOUDINARY_FALLBACK_NAMES` (comma-separated)
- `API_ADMIN_KEY`
- `ADMIN_AUTH_SECRET` (optional but recommended; defaults to `API_ADMIN_KEY`)
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_TOKEN`

Optional:

- `GITHUB_BRANCH` (default: `main`)
- `GITHUB_CONTENT_BASE_PATH` (default: `content`)
- `CORS_ORIGIN` (default: `*`)
- `BACKEND_PORT` (default: `8787`)

## Run Locally

From project root:

```bash
npm run backend:install
npm run backend:dev
```

## Render Deployment

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm run start`
- Add all required env vars in Render dashboard.
