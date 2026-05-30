export type BlobAccessMode = "public" | "private";

/**
 * Blob access mode must match the Vercel Blob store (set at store creation).
 * New Vercel projects often use private stores — default to private.
 */
export function getBlobAccess(): BlobAccessMode {
  const raw =
    process.env.BLOB_ACCESS ?? process.env.NEXT_PUBLIC_BLOB_ACCESS ?? "public";
  return raw.toLowerCase() === "private" ? "private" : "public";
}

/** Client-safe access mode (set NEXT_PUBLIC_BLOB_ACCESS in Vercel). */
export function getBlobAccessClient(): BlobAccessMode {
  if (typeof window === "undefined") return getBlobAccess();
  const raw = process.env.NEXT_PUBLIC_BLOB_ACCESS ?? "public";
  return raw.toLowerCase() === "private" ? "private" : "public";
}

/**
 * Private blob URLs are not readable in the browser directly.
 * Rewrite them to our streaming proxy route.
 */
export function resolveBlobSrc(src: string): string {
  if (!src) return src;
  if (src.startsWith("/api/blob")) return src;
  if (src.startsWith("/images/") || src.startsWith("/uploads/")) return src;

  try {
    const url = src.startsWith("http") ? new URL(src) : null;
    if (url?.hostname.includes(".private.blob.vercel-storage.com")) {
      const pathname = url.pathname.replace(/^\//, "");
      return `/api/blob?pathname=${encodeURIComponent(pathname)}`;
    }
  } catch {
    // not a URL
  }

  return src;
}
