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

type UploadJson = { url?: string; error?: string };

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
          "התמונה גדולה מדי. ההעלאה תעבור ישירות לאחסון — אם השגיאה חוזרת, ודאו ש-Vercel Blob מחובר.",
      };
    }
    return { error: text.slice(0, 160) || `שגיאת שרת (${res.status})` };
  }
}

/**
 * Upload an image for the admin panel.
 * Uses Vercel Blob client upload in production (no 4.5MB server limit).
 * Falls back to a small multipart POST for local development.
 */
export async function uploadAdminImage(file: File): Promise<string> {
  const pathname = buildUploadPathname(file.name);

  try {
    const { upload } = await import("@vercel/blob/client");
    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      multipart: file.size > 4 * 1024 * 1024,
      contentType: file.type || undefined,
    });
    return blob.url;
  } catch (clientErr) {
    if (file.size > 4 * 1024 * 1024) {
      const msg =
        clientErr instanceof Error ? clientErr.message : "ההעלאה נכשלה";
      throw new Error(
        `${msg}. ודאו ש-Vercel Blob מחובר בפרויקט, או הקטינו את התמונה.`
      );
    }
  }

  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await parseUploadResponse(res);
  if (!res.ok || !data.url) {
    throw new Error(data.error || "ההעלאה נכשלה");
  }
  return data.url;
}
