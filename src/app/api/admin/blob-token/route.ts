import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";
import {
  canUseClientBlobUpload,
  getBlobAccess,
  isBlobConfigured,
} from "@/lib/blobAccess";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!(await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "אחסון תמונות (Vercel Blob) לא מחובר בשרת" },
      { status: 503 }
    );
  }

  if (!canUseClientBlobUpload()) {
    return NextResponse.json({
      useServerUpload: true,
      access: getBlobAccess(),
    });
  }

  const body = (await req.json().catch(() => null)) as {
    pathname?: string;
  } | null;

  const pathname = body?.pathname?.trim();
  if (!pathname || !pathname.startsWith("uploads/")) {
    return NextResponse.json({ error: "נתיב לא תקין" }, { status: 400 });
  }

  try {
    const clientToken = await generateClientTokenFromReadWriteToken({
      pathname,
      allowedContentTypes: IMAGE_TYPES,
      maximumSizeInBytes: 50 * 1024 * 1024,
    });

    return NextResponse.json({ clientToken, access: getBlobAccess() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Token generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
