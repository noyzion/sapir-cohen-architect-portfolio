import type { MetadataRoute } from "next";
import type { Project } from "@/types";
import { getProjects } from "@/lib/content";
import { seedProjects } from "@/lib/seed";
import { absoluteUrl, isPublicProjectSlug, projectPageUrl } from "@/lib/seo";

const REDIS_TIMEOUT_MS = 2000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

function collectValidSlugs(projects: Project[]): string[] {
  const slugs = new Set<string>();
  for (const project of projects) {
    if (isPublicProjectSlug(project.slug)) {
      slugs.add(project.slug.trim());
    }
  }
  return [...slugs];
}

function buildStaticRoutes(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/accessibility"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

function buildProjectRoutes(slugs: string[]): MetadataRoute.Sitemap {
  return slugs.map((slug) => ({
    url: projectPageUrl(slug),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

async function loadRemoteProjects(): Promise<Project[] | null> {
  try {
    return await withTimeout(getProjects(), REDIS_TIMEOUT_MS);
  } catch {
    return null;
  }
}

/** Build sitemap entries from seed data + optional CMS projects (Redis). */
export async function generateSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = buildStaticRoutes();
  const remoteProjects = await loadRemoteProjects();
  const slugs = collectValidSlugs(
    remoteProjects ? [...seedProjects, ...remoteProjects] : seedProjects
  );

  return [...staticRoutes, ...buildProjectRoutes(slugs)];
}

/** Last-resort fallback: static pages + seed projects only. */
export function generateFallbackSitemapEntries(): MetadataRoute.Sitemap {
  return [
    ...buildStaticRoutes(),
    ...buildProjectRoutes(collectValidSlugs(seedProjects)),
  ];
}
