/**
 * Generates optimized WebP assets at role-specific widths and blur placeholders.
 * Run: npm run optimize-images
 * Remove JPG/PNG after conversion: npm run optimize-images:clean
 */
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imagesRoot = path.join(root, "public", "images");
const metaOut = path.join(root, "src", "data", "imageMeta.ts");

const WIDTH = {
  hero: 2560,
  detail: 1600,
  thumb: 800,
  portrait: 800,
};

/** Project page header images (from projects.ts coverImage) */
const PROJECT_COVER_PATHS = [
  "/images/portfolio/duplex-ramat-aviv/cover.webp",
  "/images/portfolio/beit-neve-yam/02.webp",
  "/images/portfolio/joseph-bar/02.webp",
  "/images/portfolio/final-project/06-pool.webp",
];

const WEBP_QUALITY = 82;
const WEBP_QUALITY_HERO = 92;
const BLUR_SIZE = 16;
const DELETE_ORIGINALS = process.argv.includes("--delete-originals");

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const SKIP_DIRS = new Set(["boutique-spa"]);
const SKIP_FILES = /-(thumb|blur)\.webp$/i;

/** @type {Record<string, { width: number; height: number; blurDataURL: string }>} */
const manifest = {};

function toPublicPath(absPath) {
  const rel = path.relative(path.join(root, "public"), absPath).replace(/\\/g, "/");
  return `/${rel}`;
}

function thumbPathFor(webpPath) {
  return webpPath.replace(/\.webp$/i, "-thumb.webp");
}

function isCoverBase(name) {
  return /^cover(\.|$)/i.test(name);
}

function roleForFile(relPath, baseName) {
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized === "hero" || normalized.startsWith("hero.")) return "hero";
  if (normalized.startsWith("images/about/") || normalized.startsWith("about/")) {
    return "portrait";
  }
  if (isCoverBase(baseName)) return "cover";
  return "gallery";
}

async function encodeWebp(input, maxWidth, quality) {
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input);
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }
  return pipeline.webp({ quality }).toBuffer();
}

async function writeBufferToPath(outPath, buffer) {
  const tmp = path.join(
    os.tmpdir(),
    `sc-hero-${Date.now()}-${path.basename(outPath)}`
  );
  await fs.promises.writeFile(tmp, buffer);
  try {
    await fs.promises.copyFile(tmp, outPath);
  } finally {
    await fs.promises.unlink(tmp).catch(() => {});
  }
}

async function blurDataURL(input) {
  const buffer = await sharp(input)
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function writeWebp(sourcePath, outPath, maxWidth, quality = WEBP_QUALITY) {
  const sameFile = path.resolve(sourcePath) === path.resolve(outPath);
  const input = sameFile ? await fs.promises.readFile(sourcePath) : sourcePath;
  const buffer = await encodeWebp(input, maxWidth, quality);
  await writeBufferToPath(outPath, buffer);

  const outMeta = await sharp(outPath).metadata();
  return {
    width: outMeta.width ?? maxWidth,
    height: outMeta.height ?? Math.round(maxWidth * 0.67),
  };
}

async function processOutput(webpPath, sourcePath, maxWidth, quality = WEBP_QUALITY) {
  const dims = await writeWebp(sourcePath, webpPath, maxWidth, quality);
  const publicPath = toPublicPath(webpPath);
  manifest[publicPath] = {
    width: dims.width,
    height: dims.height,
    blurDataURL: await blurDataURL(webpPath),
  };
  const kb = (fs.statSync(webpPath).size / 1024).toFixed(0);
  console.log(`  ${publicPath} (${dims.width}×${dims.height}, ${kb}KB)`);
  return webpPath;
}

function pickSource(dir, baseWithoutExt) {
  const candidates = [".jpg", ".jpeg", ".png", ".webp"].map((ext) =>
    path.join(dir, baseWithoutExt + ext)
  );
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/** Prefer lossless PNG/JPEG for hero re-encode (skip existing webp when possible). */
function pickHeroSource(dir, baseWithoutExt) {
  for (const ext of [".png", ".jpg", ".jpeg"]) {
    const candidate = path.join(dir, baseWithoutExt + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  const webp = path.join(dir, baseWithoutExt + ".webp");
  return fs.existsSync(webp) ? webp : null;
}

function collectBaseNames(dir) {
  const names = new Set();
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !IMAGE_EXT.test(entry.name) || SKIP_FILES.test(entry.name)) {
      continue;
    }
    names.add(entry.name.replace(/\.(png|jpe?g|webp)$/i, ""));
  }
  return [...names];
}

async function processBase(dir, baseName) {
  const sourcePath = pickSource(dir, baseName);
  if (!sourcePath) return;

  const relFromImages = path.relative(imagesRoot, path.join(dir, baseName));
  const role = roleForFile(relFromImages, baseName);
  const webpPath = path.join(dir, `${baseName}.webp`);

  console.log(`\n${relFromImages} [${role}]`);

  if (role === "cover" || role === "hero") {
    await processOutput(webpPath, sourcePath, WIDTH.hero, WEBP_QUALITY_HERO);
    await processOutput(thumbPathFor(webpPath), webpPath, WIDTH.thumb);
  } else if (role === "portrait") {
    await processOutput(webpPath, sourcePath, WIDTH.portrait);
  } else {
    await processOutput(webpPath, sourcePath, WIDTH.detail);
    if (/^0?\d+$/.test(baseName)) {
      await processOutput(thumbPathFor(webpPath), webpPath, WIDTH.thumb);
    }
  }

  if (
    DELETE_ORIGINALS &&
    sourcePath !== webpPath &&
    /\.(jpe?g|png)$/i.test(sourcePath)
  ) {
    fs.unlinkSync(sourcePath);
    console.log(`  removed ${path.basename(sourcePath)}`);
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        console.log(`Skip unused folder: ${entry.name}`);
        continue;
      }
      await walk(full);
      continue;
    }
  }

  const bases = collectBaseNames(dir);
  for (const baseName of bases) {
    await processBase(dir, baseName);
  }
}

function writeMetaFile() {
  const sorted = Object.keys(manifest).sort();
  const lines = sorted.map((key) => {
    const { width, height, blurDataURL } = manifest[key];
    return `  ${JSON.stringify(key)}: { width: ${width}, height: ${height}, blurDataURL: ${JSON.stringify(blurDataURL)} },`;
  });

  const content = `/* eslint-disable */
// Auto-generated by npm run optimize-images — do not edit manually.

export type ImageMeta = {
  width: number;
  height: number;
  blurDataURL: string;
};

export const imageMeta: Record<string, ImageMeta> = {
${lines.join("\n")}
};

export function getImageMeta(src: string): ImageMeta | undefined {
  return imageMeta[src];
}
`;

  fs.writeFileSync(metaOut, content, "utf8");
  console.log(`\nWrote ${sorted.length} entries to src/data/imageMeta.ts`);
}

if (!fs.existsSync(imagesRoot)) {
  console.error("Images folder not found:", imagesRoot);
  process.exit(1);
}

async function processProjectCovers() {
  console.log("\n--- Project header covers (high quality) ---");
  for (const publicPath of PROJECT_COVER_PATHS) {
    const webpPath = path.join(root, "public", publicPath.replace(/^\//, ""));
    const dir = path.dirname(webpPath);
    const base = path.basename(webpPath, ".webp");
    const sourcePath = pickHeroSource(dir, base);
    if (!sourcePath) {
      console.warn(`  skip (no source): ${publicPath}`);
      continue;
    }
    console.log(`\n${publicPath} [hero-cover]`);
    await processOutput(webpPath, sourcePath, WIDTH.hero, WEBP_QUALITY_HERO);
  }
}

const heroOnly = process.argv.includes("--hero-only");

if (heroOnly) {
  console.log("Hero covers only");
} else {
  console.log("Optimizing images in", imagesRoot);
  await walk(imagesRoot);
}
await processProjectCovers();
writeMetaFile();
console.log("\nDone. Portfolio cards should use *-thumb.webp paths.");
