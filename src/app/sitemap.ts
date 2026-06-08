import type { MetadataRoute } from "next";
import type { Project } from "@/types";
import { getProjects } from "@/lib/content";
import { seedProjects } from "@/lib/seed";
import { absoluteUrl, isPublicProjectSlug, projectPageUrl } from "@/lib/seo";

export const revalidate = 3600;

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

async function loadProjects(): Promise<Project[]> {
  try {
    return await withTimeout(getProjects(), 2500);
  } catch {
    return seedProjects;
  }
}

function buildProjectRoutes(projects: Project[]): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return projects
    .filter((project) => isPublicProjectSlug(project.slug))
    .flatMap((project) => {
      const url = projectPageUrl(project.slug);
      if (seen.has(url)) return [];
      seen.add(url);
      return [
        {
          url,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ];
    });
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const projects = await loadProjects();
    return [...buildStaticRoutes(), ...buildProjectRoutes(projects)];
  } catch {
    return [...buildStaticRoutes(), ...buildProjectRoutes(seedProjects)];
  }
}
