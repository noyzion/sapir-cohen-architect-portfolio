import "server-only";
import { cache } from "react";
import type { Project, ProjectType, ServicePackage, SiteCopy, SiteTheme } from "@/types";
import { storeGet } from "@/lib/store";
import {
  seedProjects,
  seedProjectTypes,
  seedServices,
  seedSiteCopy,
  seedSiteTheme,
} from "@/lib/seed";
import { mergeSiteTheme } from "@/lib/themeCss";

export const CONTENT_KEYS = [
  "siteCopy",
  "projects",
  "services",
  "projectTypes",
  "siteTheme",
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
      footer: { ...seedSiteCopy.footer, ...stored.footer },
      privacy: {
        ...seedSiteCopy.privacy,
        ...stored.privacy,
        sections: stored.privacy?.sections?.length
          ? stored.privacy.sections
          : seedSiteCopy.privacy.sections,
      },
      accessibility: {
        ...seedSiteCopy.accessibility,
        ...stored.accessibility,
        sections: stored.accessibility?.sections?.length
          ? stored.accessibility.sections
          : seedSiteCopy.accessibility.sections,
      },
      terms: {
        ...seedSiteCopy.terms,
        ...stored.terms,
        sections: stored.terms?.sections?.length
          ? stored.terms.sections
          : seedSiteCopy.terms.sections,
      },
      cookies: {
        ...seedSiteCopy.cookies,
        ...stored.cookies,
        sections: stored.cookies?.sections?.length
          ? stored.cookies.sections
          : seedSiteCopy.cookies.sections,
      },
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

export const getSiteTheme = cache(async (): Promise<SiteTheme> => {
  const stored = await storeGet<Partial<SiteTheme>>("siteTheme");
  return mergeSiteTheme(stored);
});

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
    case "siteTheme":
      return getSiteTheme();
  }
}

export async function getAllContent() {
  const [siteCopy, projects, services, projectTypes, siteTheme] =
    await Promise.all([
      getSiteCopy(),
      getProjects(),
      getServices(),
      getProjectTypes(),
      getSiteTheme(),
    ]);
  return { siteCopy, projects, services, projectTypes, siteTheme };
}
