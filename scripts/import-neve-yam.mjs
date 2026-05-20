/**
 * Import Neve Yam gallery images from incoming/ (01–08, any image extension).
 * Run after saving chat images as 01.png … 08.png in:
 *   images/portfolio/beit-neve-yam/incoming/
 *
 * Usage: npm run import-neve-yam
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const incoming = path.join(root, "images", "portfolio", "beit-neve-yam", "incoming");
const sourceDir = path.join(root, "images", "portfolio", "beit-neve-yam");
const publicDir = path.join(root, "public", "images", "portfolio", "beit-neve-yam");

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const SLOT_COUNT = 8;

function listIncoming() {
  if (!fs.existsSync(incoming)) {
    fs.mkdirSync(incoming, { recursive: true });
    return [];
  }
  return fs
    .readdirSync(incoming)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function unlinkIfExists(filePath) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

function clearSlotFiles(dir, slot) {
  const base = String(slot).padStart(2, "0");
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (new RegExp(`^${base}\\.(png|jpe?g|webp)$`, "i").test(entry)) {
      unlinkIfExists(full);
    }
    if (new RegExp(`^${base}-thumb\\.webp$`, "i").test(entry)) {
      unlinkIfExists(full);
    }
  }
}

function removeLegacy(dir) {
  for (const legacy of ["09", "10", "cover"]) {
    for (const entry of fs.readdirSync(dir)) {
      if (new RegExp(`^${legacy}(\\.|-)`, "i").test(entry)) {
        unlinkIfExists(path.join(dir, entry));
      }
    }
  }
}

const files = listIncoming();
if (files.length < SLOT_COUNT) {
  console.error(
    `\nNeed ${SLOT_COUNT} images in:\n  ${incoming}\n\nName them 01.png … 08.png (order from your message).\nFound: ${files.length}\n`
  );
  process.exit(1);
}

const ordered = files.slice(0, SLOT_COUNT);
console.log("Importing Neve Yam images:\n");
for (let i = 0; i < SLOT_COUNT; i++) {
  const slot = String(i + 1).padStart(2, "0");
  const ext = path.extname(ordered[i]).toLowerCase();
  const destName = `${slot}${ext}`;
  console.log(`  ${ordered[i]} → ${destName}`);
  for (const dir of [sourceDir, publicDir]) {
    clearSlotFiles(dir, slot);
    fs.copyFileSync(path.join(incoming, ordered[i]), path.join(dir, destName));
  }
}

const coverExt = path.extname(ordered[1]).toLowerCase();
const slot02 = `02${coverExt}`;
for (const dir of [sourceDir, publicDir]) {
  removeLegacy(dir);
  for (const entry of fs.readdirSync(dir)) {
    if (/^cover(\.|$)/i.test(entry)) {
      unlinkIfExists(path.join(dir, entry));
    }
  }
  fs.copyFileSync(path.join(dir, slot02), path.join(dir, `cover${coverExt}`));
}

console.log("\nOptimizing WebP…");
const result = spawnSync("npm", ["run", "optimize-images"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});
process.exit(result.status ?? 1);
