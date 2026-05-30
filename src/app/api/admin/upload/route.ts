import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

async function requireAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

function sanitizeName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "image";
}

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

/** Client-side upload handshake (Vercel Blob) — bypasses the serverless body size limit. */
async function handleClientUpload(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "אחסון תמונות (Vercel Blob) לא מחובר בשרת" },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as HandleUploadBody;

    if (body.type === "blob.generate-client-token") {
      if (!(await requireAdminSession())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: IMAGE_TYPES,
        maximumSizeInBytes: 50 * 1024 * 1024,
      }),
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/** Small-file fallback: multipart form POST (mainly local dev). */
async function handleFormUpload(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "יש להעלות קובץ תמונה בלבד" },
      { status: 400 }
    );
  }

  const maxServerBytes = 4 * 1024 * 1024;
  if (file.size > maxServerBytes) {
    return NextResponse.json(
      {
        error:
          "התמונה גדולה מדי להעלאה דרך השרת. נסו שוב — ההעלאה אמורה לעבור ישירות לאחסון.",
      },
      { status: 413 }
    );
  }

  const filename = `${Date.now()}-${sanitizeName(file.name)}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`uploads/${filename}`, file, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return handleClientUpload(req);
  }

  return handleFormUpload(req);
}
