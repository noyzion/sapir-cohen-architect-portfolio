import type { MetadataRoute } from "next";
import {
  generateFallbackSitemapEntries,
  generateSitemapEntries,
} from "@/lib/sitemap";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    return await generateSitemapEntries();
  } catch {
    return generateFallbackSitemapEntries();
  }
}
