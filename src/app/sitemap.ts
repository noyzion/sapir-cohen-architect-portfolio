import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

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

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
