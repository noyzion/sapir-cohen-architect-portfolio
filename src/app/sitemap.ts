import type { MetadataRoute } from "next";
import type { Project } from "@/types";
import { getProjects } from "@/lib/content";
import { seedProjects } from "@/lib/seed";
import { absoluteUrl, isPublicProjectSlug, projectPageUrl } from "@/lib/seo";

export const revalidate = 3600;

async function loadProjects(): Promise<Project[]> {
  try {
    return await getProjects();
  } catch {
    return seedProjects;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await loadProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
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

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => isPublicProjectSlug(project.slug))
    .map((project) => ({
      url: projectPageUrl(project.slug),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}
