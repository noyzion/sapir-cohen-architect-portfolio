import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { getBlobAccess } from "@/lib/blobAccess";
import { canUseLocalFilesystem } from "@/lib/runtime";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

function sanitizeName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "image";
}

async function requireAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/** Small-file fallback for local dev (multipart form, max 4MB). */
export async function POST(req: Request) {
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
          "התמונה גדולה מדי. בשרת יש להשתמש בהעלאה הישירה (דחיסה אוטומטית).",
      },
      { status: 413 }
    );
  }

  const filename = `${Date.now()}-${sanitizeName(file.name)}`;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (!canUseLocalFilesystem()) {
      return NextResponse.json(
        {
          error:
            "אחסון תמונות לא מחובר. ב-Vercel: Storage → Blob (Public) → Connect to Project, ואז Redeploy.",
        },
        { status: 503 }
      );
    }
  } else {
    try {
      const blob = await put(`uploads/${filename}`, file, {
        access: getBlobAccess(),
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  if (!canUseLocalFilesystem()) {
    return NextResponse.json(
      { error: "העלאה לשרת אינה זמינה בסביבה זו" },
      { status: 503 }
    );
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
