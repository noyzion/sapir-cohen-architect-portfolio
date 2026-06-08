import type { Project, ProjectType, ServicePackage, SiteCopy, SiteTheme } from "@/types";
import { siteCopy } from "@/data/siteCopy";
import { projectSummaries } from "@/data/projects";
import { projectGalleries } from "@/data/projectGalleries";
import { servicePackages } from "@/data/services";
import { projectTypes } from "@/data/projectTypes";
import { siteTheme } from "@/data/siteTheme";

/**
 * Default ("seed") content assembled from the built-in data files.
 * Used whenever the editable store has no value yet, so the public site
 * always renders even before the admin panel / storage is configured.
 */
export const seedSiteCopy: SiteCopy = siteCopy;

export const seedProjects: Project[] = projectSummaries.map((summary) => ({
  ...summary,
  ...(projectGalleries[summary.slug] ?? {}),
}));

export const seedServices: ServicePackage[] = servicePackages;

export const seedProjectTypes: ProjectType[] = projectTypes;

export const seedSiteTheme: SiteTheme = siteTheme;
