import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

function sanitizeName(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  return base || "image";
}

export async function POST(req: Request) {
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

  const filename = `${Date.now()}-${sanitizeName(file.name)}`;

  // Production: Vercel Blob
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

  // Local development: write into public/uploads
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
