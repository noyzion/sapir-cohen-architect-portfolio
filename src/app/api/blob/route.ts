import { NextRequest } from "next/server";
import { get } from "@vercel/blob";

export const runtime = "nodejs";

/**
 * Serves images from a private Vercel Blob store on the public portfolio site.
 * Only blob URLs under our store are accepted.
 */
export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.searchParams.get("pathname");
  const url = req.nextUrl.searchParams.get("url");

  const target = pathname?.trim() || url?.trim();
  if (!target) {
    return new Response("Missing pathname or url", { status: 400 });
  }

  if (url) {
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes(".private.blob.vercel-storage.com")) {
        return new Response("Forbidden", { status: 403 });
      }
    } catch {
      return new Response("Invalid url", { status: 400 });
    }
  }

  if (pathname && (pathname.includes("..") || pathname.startsWith("/"))) {
    return new Response("Invalid pathname", { status: 400 });
  }

  try {
    const result = await get(target, { access: "private" });
    if (!result?.stream) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "image/webp",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
      },
    });
  } catch {
    return new Response("Failed to load image", { status: 500 });
  }
}
