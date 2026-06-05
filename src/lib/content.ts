import "server-only";
import { cache } from "react";
import type { Project, ProjectType, ServicePackage, SiteCopy } from "@/types";
import { storeGet } from "@/lib/store";
import {
  seedProjects,
  seedProjectTypes,
  seedServices,
  seedSiteCopy,
} from "@/lib/seed";

export const CONTENT_KEYS = [
  "siteCopy",
  "projects",
  "services",
  "projectTypes",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const getSiteCopy = cache(
  async (): Promise<SiteCopy> => {
    const stored = await storeGet<SiteCopy>("siteCopy");
    if (!stored) return seedSiteCopy;
    return {
      ...seedSiteCopy,
      ...stored,
      about: { ...seedSiteCopy.about, ...stored.about },
    };
  }
);

export const getProjects = cache(
  async (): Promise<Project[]> =>
    (await storeGet<Project[]>("projects")) ?? seedProjects
);

export const getServices = cache(
  async (): Promise<ServicePackage[]> =>
    (await storeGet<ServicePackage[]>("services")) ?? seedServices
);

export const getProjectTypes = cache(
  async (): Promise<ProjectType[]> =>
    (await storeGet<ProjectType[]>("projectTypes")) ?? seedProjectTypes
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> => {
    const projects = await getProjects();
    return projects.find((project) => project.slug === slug);
  }
);

export async function getContentByKey(key: ContentKey): Promise<unknown> {
  switch (key) {
    case "siteCopy":
      return getSiteCopy();
    case "projects":
      return getProjects();
    case "services":
      return getServices();
    case "projectTypes":
      return getProjectTypes();
  }
}

export async function getAllContent() {
  const [siteCopy, projects, services, projectTypes] = await Promise.all([
    getSiteCopy(),
    getProjects(),
    getServices(),
    getProjectTypes(),
  ]);
  return { siteCopy, projects, services, projectTypes };
}
