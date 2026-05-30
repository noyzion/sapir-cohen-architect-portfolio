function sanitizeName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "image";
}

export function buildUploadPathname(filename: string): string {
  return `uploads/${Date.now()}-${sanitizeName(filename)}`;
}

export type UploadProgress = { percent: number };

type UploadJson = { url?: string; error?: string; clientToken?: string };

const MAX_DIMENSION = 2400;
const COMPRESS_IF_LARGER_THAN = 1.2 * 1024 * 1024; // 1.2 MB
const UPLOAD_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes

/** Shrink large photos before upload so uploads finish in seconds, not minutes. */
export async function compressImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  if (typeof createImageBitmap !== "function") {
    return file;
  }

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const needsResize =
      width > MAX_DIMENSION || height > MAX_DIMENSION;
    const needsCompress = file.size > COMPRESS_IF_LARGER_THAN;

    if (!needsResize && !needsCompress) {
      return file;
    }

    const scale = needsResize
      ? Math.min(1, MAX_DIMENSION / Math.max(width, height))
      : 1;
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    bitmap = null;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", 0.86);
    });
    if (!blob) return file;

    const base = file.name.replace(/\.[^.]+$/i, "") || "image";
    return new File([blob], `${base}.webp`, { type: "image/webp" });
  } catch {
    return file;
  } finally {
    bitmap?.close();
  }
}

/** Parse API responses safely (413/HTML errors are not JSON). */
export async function parseUploadResponse(res: Response): Promise<UploadJson> {
  const text = await res.text();
  if (!text) {
    return { error: res.ok ? "תשובה ריקה מהשרת" : `שגיאת שרת (${res.status})` };
  }
  try {
    return JSON.parse(text) as UploadJson;
  } catch {
    if (
      res.status === 413 ||
      /request entity too large/i.test(text) ||
      text.startsWith("Request En")
    ) {
      return {
        error:
          "התמונה גדולה מדי. נסו שוב — ההעלאה אמורה לעבור ישירות לאחסון.",
      };
    }
    return { error: text.slice(0, 160) || `שגיאת שרת (${res.status})` };
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise
      .then((v) => {
        clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

async function fetchBlobClientToken(pathname: string): Promise<string> {
  const res = await fetch("/api/admin/blob-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ pathname }),
  });
  const data = await parseUploadResponse(res);
  if (!res.ok || !data.clientToken) {
    throw new Error(data.error || "לא ניתן להתחיל העלאה");
  }
  return data.clientToken;
}

/**
 * Upload via Vercel Blob client `put` + server-issued token.
 * Simpler than handleUploadUrl — avoids hanging on the final callback step.
 */
async function uploadViaBlobToken(
  pathname: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  onProgress?.({ percent: 8 });

  const clientToken = await fetchBlobClientToken(pathname);
  onProgress?.({ percent: 12 });

  const { put } = await import("@vercel/blob/client");
  const blob = await put(pathname, file, {
    access: "public",
    token: clientToken,
    multipart: file.size > 8 * 1024 * 1024,
    contentType: file.type || undefined,
    onUploadProgress: ({ percentage }) => {
      const raw = Math.round(percentage ?? 0);
      const pct = Math.min(98, Math.max(12, 12 + Math.round(raw * 0.86)));
      onProgress?.({ percent: pct });
    },
  });

  return blob.url;
}

/**
 * Upload an image for the admin panel.
 * Compresses large photos, uploads directly to Vercel Blob (no 4.5MB server limit).
 */
export async function uploadAdminImage(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  onProgress?.({ percent: 0 });
  const prepared = await compressImageForUpload(file);
  onProgress?.({ percent: 5 });

  const pathname = buildUploadPathname(prepared.name);

  const uploadPromise = (async () => {
    try {
      return await uploadViaBlobToken(pathname, prepared, onProgress);
    } catch (blobErr) {
      if (prepared.size > 4 * 1024 * 1024) {
        const msg =
          blobErr instanceof Error ? blobErr.message : "ההעלאה נכשלה";
        throw new Error(
          `${msg}. ודאו ש-Vercel Blob מחובר (BLOB_READ_WRITE_TOKEN).`
        );
      }
    }

    const fd = new FormData();
    fd.append("file", prepared);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const data = await parseUploadResponse(res);
    if (!res.ok || !data.url) {
      throw new Error(data.error || "ההעלאה נכשלה");
    }
    return data.url;
  })();

  const url = await withTimeout(
    uploadPromise,
    UPLOAD_TIMEOUT_MS,
    "ההעלאה לקחה יותר מדי זמן. נסו שוב עם תמונה קטנה יותר או חיבור אינטרנט מהיר יותר."
  );

  onProgress?.({ percent: 100 });
  return url;
}
