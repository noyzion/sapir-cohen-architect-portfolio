import "server-only";
import sharp from "sharp";

/** Stay safely under Vercel's ~4.5MB serverless request body limit. */
const TARGET_MAX_BYTES = 3.2 * 1024 * 1024;
const MAX_SIDE = 2000;

export async function compressImageBufferForUpload(
  input: Buffer
): Promise<{ data: Buffer; contentType: string; ext: string }> {
  const base = sharp(input, { failOn: "none" }).rotate().resize({
    width: MAX_SIDE,
    height: MAX_SIDE,
    fit: "inside",
    withoutEnlargement: true,
  });

  for (const quality of [82, 72, 62, 52, 42]) {
    const data = await base.clone().webp({ quality }).toBuffer();
    if (data.length <= TARGET_MAX_BYTES) {
      return { data, contentType: "image/webp", ext: ".webp" };
    }
  }

  const data = await sharp(input, { failOn: "none" })
    .rotate()
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 38 })
    .toBuffer();

  return { data, contentType: "image/webp", ext: ".webp" };
}

export function isLikelyImageContentType(type: string): boolean {
  return type.startsWith("image/") && type !== "image/gif";
}
