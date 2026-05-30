import { imageMeta } from "@/data/imageMeta";
import type { ProjectImage } from "@/types";

export type PortfolioSlideshowTiming = {
  intervalMs: number;
  fadeMs: number;
};

const DEFAULT_TIMING: PortfolioSlideshowTiming = {
  intervalMs: 3600,
  fadeMs: 850,
};

/** Per-project rhythm so cards don't feel identical on the homepage. */
const SLIDESHOW_TIMING: Record<string, PortfolioSlideshowTiming> = {
  "duplex-ramat-aviv": { intervalMs: 3400, fadeMs: 720 },
  "beit-neve-yam": { intervalMs: 3800, fadeMs: 920 },
  "joseph-bar": { intervalMs: 3100, fadeMs: 680 },
  "final-project": { intervalMs: 3500, fadeMs: 800 },
};

export function getPortfolioSlideshowTiming(slug: string): PortfolioSlideshowTiming {
  return SLIDESHOW_TIMING[slug] ?? DEFAULT_TIMING;
}

function resolvePortfolioSrc(src: string): string {
  const thumb = src.replace(/\.webp$/i, "-thumb.webp");
  if (imageMeta[thumb]) return thumb;
  if (imageMeta[src]) return src;
  return src;
}

export function getPortfolioSlideshowImages(project: {
  coverImage: string;
  thumbnailImage: string;
  gallery?: ProjectImage[];
  renders?: ProjectImage[];
}): string[] {
  const { coverImage, thumbnailImage } = project;
  const raw: string[] = [];

  if (project.renders?.length) {
    raw.push(...project.renders.map((img) => img.src));
  }
  if (project.gallery?.length) {
    raw.push(...project.gallery.map((img) => img.src));
  }
  raw.push(coverImage);

  const seen = new Set<string>();
  const images: string[] = [];

  const add = (src: string) => {
    const resolved = resolvePortfolioSrc(src);
    if (seen.has(resolved)) return;
    seen.add(resolved);
    images.push(resolved);
  };

  if (thumbnailImage) {
    seen.add(thumbnailImage);
    images.push(thumbnailImage);
  }

  for (const src of raw) {
    add(src);
  }

  return images.length > 0 ? images : [thumbnailImage || coverImage];
}
