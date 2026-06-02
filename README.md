# Sapir Cohen — Architecture & Interior Design

A bilingual (Hebrew / English) portfolio website with a premium minimalist design, plus a password-protected admin CMS for editing all site content without touching code.

**Live stack:** Next.js on Vercel · content in Upstash Redis · images in Vercel Blob

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Admin panel](#admin-panel)
- [Content storage](#content-storage)
- [Image uploads](#image-uploads)
- [Project structure](#project-structure)
- [Static content (seed data)](#static-content-seed-data)
- [Image optimization scripts](#image-optimization-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Features

### Public site

- **Full bilingual support** — switch between Hebrew (RTL) and English (LTR); preference saved in `localStorage`
- **Portfolio** — project grid on the home page and dedicated project pages at `/projects/<slug>` with galleries and lightbox
- **Service packages** — card layout on desktop, compact comparison on mobile
- **About page** — `/about` with personal copy and portrait
- **Contact** — inquiry form with project-type selection and WhatsApp link
- **Responsive design** — mobile, tablet, and desktop
- **Dynamic content** — the public site reads from the CMS store in production (falls back to built-in seed data)

### Admin CMS (`/admin`)

- **Password-protected login** with secure HTTP-only session cookie (7 days)
- **Edit everything:**
  - **Projects** — add, edit, reorder, delete; cover, thumbnail, gallery, renders
  - **Site texts** — hero, about, contact, navigation, footer, email copy, etc.
  - **Services** — all three packages, descriptions, highlights
  - **Project types** — home page project-type list
- **Visual JSON editor** — bilingual fields (Hebrew / English), image upload fields, arrays with add / reorder / delete
- **Image upload** — client-side compression, progress bar, Vercel Blob in production, local `public/uploads` in dev
- **Sessions tied to password** — changing `ADMIN_PASSWORD` invalidates existing sessions after redeploy

---

## Tech stack

| Area | Technology |
|------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + custom admin CSS |
| Fonts | Heebo, Outfit, Plus Jakarta Sans, Josefin Sans (`next/font`) |
| Auth | `jose` (JWT session cookie) |
| Content store | Upstash Redis (`@upstash/redis`) |
| Image storage | Vercel Blob (`@vercel/blob`) |
| Image processing | `sharp` (CLI scripts) |
| Linting | ESLint 9 + eslint-config-next |

---

## Getting started

### Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm

### Local development

```bash
npm install
cp .env.example .env.local   # then edit .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Clean dev server (clears `.next` cache):

```bash
npm run dev:clean
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:clean` | Clear `.next` and start dev server |
| `npm run build` | Production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint |
| `npm run optimize-images` | Convert images to WebP + thumbnails |
| `npm run optimize-hero-covers` | Optimize cover images only |
| `npm run optimize-images:clean` | Optimize and remove originals |
| `npm run import-neve-yam` | Import / prepare Neve Yam project images |

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. Set the same variables in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_PASSWORD` | Yes (admin) | Login password for `/admin` |
| `ADMIN_SESSION_SECRET` | Yes (admin) | Secret for signing session cookies (`openssl rand -base64 32`) |
| `UPSTASH_REDIS_REST_URL` | Prod | Redis URL for content storage |
| `UPSTASH_REDIS_REST_TOKEN` | Prod | Redis token (`KV_REST_API_*` also works) |
| `BLOB_STORE_ID` | Prod | Vercel Blob store ID (from Storage → Blob → Connect) |
| `BLOB_READ_WRITE_TOKEN` | Optional | Legacy token; enables direct browser uploads |
| `BLOB_ACCESS` | Prod | `public` or `private` — must match store type |
| `NEXT_PUBLIC_BLOB_ACCESS` | Prod | Same as `BLOB_ACCESS` for client-side uploads |

**Local dev without Redis/Blob:** content saves to `./.data/content.json`; images save to `./public/uploads/`.

**After any env change on Vercel:** redeploy the project.

### `ADMIN_PASSWORD` vs `ADMIN_SESSION_SECRET`

- **`ADMIN_PASSWORD`** — the password you type on the login page
- **`ADMIN_SESSION_SECRET`** — a random server secret used to sign cookies; never typed by users

---

## Admin panel

| URL | Description |
|-----|-------------|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/projects` | Projects CRUD + galleries |
| `/admin/texts` | All site copy |
| `/admin/services` | Service packages |
| `/admin/types` | Project types |

**Workflow:** log in → edit → click **Save changes** at the bottom of each section.

Protected routes and `/api/admin/*` (except login, logout, health) require a valid session cookie.

---

## Content storage

```
Production (Vercel)  →  Upstash Redis
Local dev            →  ./.data/content.json
Fallback (always)    →  built-in seed from src/data/*
```

Content keys: `siteCopy`, `projects`, `services`, `projectTypes`

API: `GET/PUT /api/admin/content/[key]`

---

## Image uploads

### Production (Vercel)

- Images upload to **Vercel Blob** under `uploads/`
- **New Blob stores** use OIDC: `BLOB_STORE_ID` + auto-injected `VERCEL_OIDC_TOKEN` (no manual token needed)
- **Legacy stores** may expose `BLOB_READ_WRITE_TOKEN` for direct browser uploads
- Large photos are compressed in the browser before upload (WebP, max 2400px)
- OIDC-only setups upload via the server (after compression, typically under 4.5 MB)
- **Private Blob stores:** URLs are proxied through `/api/blob` for public display

### Local development

- Without Blob credentials: files save to `public/uploads/`
- `BLOB_STORE_ID` alone is not enough locally — add `BLOB_READ_WRITE_TOKEN` or use local uploads

### Gallery items in the admin

Each gallery / render entry must be an object:

```json
{
  "src": "https://… or /uploads/…",
  "caption": { "he": "…", "en": "…" }
}
```

Use **+ Add item** inside the gallery section, then **Upload image**.

---

## Project structure

```
src/
  app/
    (site)/                 # Public pages
      page.tsx              # Home
      about/page.tsx
      projects/[slug]/
    admin/                  # CMS UI
      login/
      projects/ texts/ services/ types/
    api/
      admin/                # Auth, content, upload, blob token
      blob/                 # Private blob proxy
  components/
    admin/                  # DocEditor, JsonEditor, ImageUploader …
    layout/ sections/ ui/
  context/                  # Language + dynamic content providers
  lib/
    content.ts store.ts seed.ts session.ts adminUpload.ts blobAccess.ts
  data/                     # Static seed content
  middleware.ts             # Protects /admin and /api/admin
public/
  images/portfolio/<slug>/  # Static portfolio assets
  uploads/                  # Local dev uploads
.data/
  content.json              # Local dev content store
```

---

## Static content (seed data)

Built-in defaults live in `src/data/` and are used until the CMS store has data:

| File | Content |
|------|---------|
| `siteCopy.ts` | Headlines, about, contact, nav, footer |
| `projects.ts` | Project summaries |
| `projectGalleries.ts` | Gallery & render images per slug |
| `services.ts` | Service packages |
| `projectTypes.ts` | Project type labels |

Update `CONTACT_EMAIL` and `WHATSAPP_NUMBER` in `siteCopy.ts` for the seed defaults.

---

## Image optimization scripts

Static assets in `public/images/portfolio/<slug>/`:

| Asset | Path |
|-------|------|
| Cover | `cover.webp` |
| Gallery | same folder + entries in `projectGalleries.ts` |

After adding raw images:

```bash
npm run optimize-images
```

---

## Deployment

1. Push to GitHub
2. Connect the repo in Vercel
3. Add environment variables (Production + Preview if needed)
4. Connect **Upstash Redis** and **Vercel Blob** in Vercel Storage
5. Set `BLOB_ACCESS=public` and `NEXT_PUBLIC_BLOB_ACCESS=public` for a public store
6. Deploy

```bash
npm run build
npm start   # test production locally
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Old password still works | Click **Logout** on `/admin/login`, or clear site cookies. Redeploy after changing env vars. |
| New password does not work | Redeploy after changing `ADMIN_PASSWORD`. Value must be **without quotes** in Vercel. |
| Images fail to upload | Confirm Blob is connected; check `BLOB_STORE_ID` and `BLOB_ACCESS`. Redeploy. |
| Changes not visible on site | Click **Save changes** in admin; confirm Redis is connected in production. |
| Preview vs Production differ | Set env vars for both scopes in Vercel. |
| Gallery has no upload button | Add a new gallery item (+ Add item) — each item needs a `src` field. |
| Health check (optional) | `GET /api/admin/health` returns non-secret server diagnostics |

---

## License

Private project — Sapir Cohen Architecture & Interior Design.
