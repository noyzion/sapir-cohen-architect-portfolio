import type { Metadata } from "next";
import type { Locale, LocalizedString, Project, SiteCopy } from "@/types";
import type { LegalDocKey } from "@/data/legalCopy";
import { LEGAL_ROUTES } from "@/data/legalCopy";
import { localizedPath } from "@/lib/i18n";
import {
  buildKnowsAbout,
  buildLocalBusinessSchemaFields,
  buildServiceTypes,
} from "@/lib/localBusinessSchema";

export const SEO_KEYWORDS_HE = [
  "אדריכלות ועיצוב פנים",
  "אדריכלית פנים",
  "מעצבת פנים",
  "עיצוב פנים במרכז",
  "עיצוב דירת קבלן",
  "עיצוב בית פרטי",
  "תכנון ועיצוב פנים",
  "אדריכלית במרכז",
  "עיצוב פנים לדירה",
  "תכנון דירות",
  "ליווי שיפוץ",
  "ספיר כהן",
] as const;

export const SEO_KEYWORDS_EN = [
  "architecture and interior design",
  "interior designer",
  "interior architect",
  "Tel Aviv interior design",
  "apartment planning",
  "private home design",
  "Sapir Cohen",
] as const;

export const SITE_NAME_HE = "ספיר כהן";
export const SITE_NAME_EN = "Sapir Cohen";

/** Production site URL (Vercel) - used for canonical, sitemap, and Open Graph. */
export const DEFAULT_SITE_URL = "https://sapir-cohen-portfolio.vercel.app";

export const HOME_TITLE = "ספיר כהן | אדריכלות ועיצוב פנים";
export const HOME_DESCRIPTION =
  "סטודיו לאדריכלות ועיצוב פנים המתמחה בתכנון בתים פרטיים, דירות וחללים בהתאמה אישית.";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    const normalized = configured.replace(/\/$/, "");
    if (/^https?:\/\//i.test(normalized)) return normalized;
    return `https://${normalized}`;
  }

  if (process.env.VERCEL === "1") {
    return DEFAULT_SITE_URL;
  }

  return "http://localhost:3000";
}

export function getSiteHost(): string {
  try {
    return new URL(getSiteUrl()).host;
  } catch {
    return "localhost:3000";
  }
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Slugs used in public URLs must be URL-safe (no spaces or special chars). */
export function isPublicProjectSlug(slug: string): boolean {
  const normalized = slug.trim();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(normalized);
}

export function projectPageUrl(slug: string, locale: Locale = "he"): string {
  const normalized = slug.trim();
  return absoluteUrl(
    localizedPath(
      locale,
      `/projects/${encodeURIComponent(normalized).replace(/%2F/g, "/")}`
    )
  );
}

function buildLanguageAlternates(path: string, locale: Locale) {
  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages: {
      he: absoluteUrl(localizedPath("he", path)),
      en: absoluteUrl(localizedPath("en", path)),
      "x-default": absoluteUrl(localizedPath("he", path)),
    },
  };
}

export function truncateDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function pickLocalized(value: LocalizedString, locale: "he" | "en" = "he"): string {
  return value[locale] || value.he || value.en;
}

export type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  titleAbsolute?: boolean;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  keywords?: string[];
  ogType?: "website" | "article";
};

export function buildPageMetadata(options: PageSeoOptions): Metadata {
  const {
    title,
    description,
    path,
    locale,
    titleAbsolute = false,
    image,
    imageAlt,
    noIndex = false,
    keywords = locale === "en" ? [...SEO_KEYWORDS_EN] : [...SEO_KEYWORDS_HE],
    ogType = path.startsWith("/projects/") ? "article" : "website",
  } = options;

  const canonical = absoluteUrl(localizedPath(locale, path));
  const summary = truncateDescription(description);
  const ogImage = image ? absoluteUrl(image) : undefined;
  const siteName = locale === "en" ? SITE_NAME_EN : SITE_NAME_HE;
  const socialTitle = titleAbsolute ? title : `${title} | ${siteName}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description: summary,
    keywords,
    alternates: buildLanguageAlternates(path, locale),
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      url: canonical,
      title: socialTitle,
      description: summary,
      siteName,
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? ["en_US"] : ["he_IL"],
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: imageAlt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: socialTitle,
      description: summary,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function buildHomeMetadata(
  siteCopy: SiteCopy,
  defaultImage: string | undefined,
  locale: Locale
): Metadata {
  return buildPageMetadata({
    title: siteCopy.meta.title[locale],
    titleAbsolute: true,
    description: siteCopy.meta.description[locale],
    path: "/",
    locale,
    image: defaultImage,
    imageAlt: `${siteCopy.brand[locale]} - ${siteCopy.tagline[locale]}`,
  });
}

export function buildAboutMetadata(
  siteCopy: SiteCopy,
  defaultImage: string | undefined,
  locale: Locale
): Metadata {
  const description = truncateDescription(
    `${pickLocalized(siteCopy.about.intro, locale)} - ${pickLocalized(siteCopy.about.credentials, locale)}. ${pickLocalized(siteCopy.about.opening[0] ?? siteCopy.meta.description, locale)}`
  );

  const title =
    locale === "en"
      ? "About - Architecture & Interior Design"
      : "אודות - אדריכלות ועיצוב פנים";

  return buildPageMetadata({
    title,
    description,
    path: "/about",
    locale,
    image: defaultImage,
    imageAlt: `${pickLocalized(siteCopy.about.intro, locale)} - ${pickLocalized(siteCopy.about.credentials, locale)}`,
  });
}

export function buildProjectMetadata(project: Project, locale: Locale): Metadata {
  const name = pickLocalized(project.name, locale);
  const type = pickLocalized(project.type, locale);
  const location = pickLocalized(project.location, locale).trim();
  const locationPart = location ? `, ${location}` : "";
  const title = `${name} | ${type}`;
  const description = truncateDescription(
    `${name} - ${type}${locationPart}. ${pickLocalized(project.description, locale)}`
  );

  return buildPageMetadata({
    title,
    description,
    path: `/projects/${project.slug}`,
    locale,
    image: project.coverImage,
    imageAlt: `${name} - ${type}${locationPart}`,
    ogType: "article",
    keywords: [
      name,
      type,
      ...(location ? [location] : []),
      ...(locale === "en" ? SEO_KEYWORDS_EN.slice(0, 6) : SEO_KEYWORDS_HE.slice(0, 6)),
    ],
  });
}

export function buildLegalMetadata(
  siteCopy: SiteCopy,
  docKey: LegalDocKey,
  locale: Locale
): Metadata {
  const page = siteCopy[docKey];
  const title = pickLocalized(page.title, locale);
  const path = LEGAL_ROUTES[docKey];

  return buildPageMetadata({
    title,
    description: pickLocalized(page.intro, locale),
    path,
    locale,
    keywords: [
      title,
      pickLocalized(siteCopy.brand, locale),
      ...(locale === "en" ? SEO_KEYWORDS_EN.slice(0, 4) : SEO_KEYWORDS_HE.slice(0, 4)),
    ],
  });
}

export function buildSiteGraphSchema(siteCopy: SiteCopy, locale: Locale = "he") {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const localBusiness = buildLocalBusinessSchemaFields(siteCopy, locale);
  const serviceTypes = buildServiceTypes(locale);

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: siteCopy.brand[locale],
    alternateName: siteCopy.brand[locale === "he" ? "en" : "he"],
    url: absoluteUrl(localizedPath(locale, "/")),
    email: siteCopy.contact.email,
    telephone: `+${siteCopy.contact.whatsapp}`,
    description: siteCopy.meta.description[locale],
    areaServed: {
      "@type": "Country",
      name: locale === "he" ? "ישראל" : "Israel",
    },
    address: localBusiness.address,
    knowsAbout: buildKnowsAbout(locale),
    ...(localBusiness.sameAs ? { sameAs: localBusiness.sameAs } : {}),
    ...(localBusiness.openingHoursSpecification
      ? { openingHoursSpecification: localBusiness.openingHoursSpecification }
      : {}),
    ...(localBusiness.geo ? { geo: localBusiness.geo } : {}),
    ...(localBusiness.hasMap ? { hasMap: localBusiness.hasMap } : {}),
  };

  const professionalService = {
    "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
    "@id": `${siteUrl}/#professional-service`,
    name: `${siteCopy.brand[locale]} - ${siteCopy.tagline[locale]}`,
    alternateName: `${siteCopy.brand[locale === "he" ? "en" : "he"]} - ${siteCopy.tagline[locale === "he" ? "en" : "he"]}`,
    url: absoluteUrl(localizedPath(locale, "/")),
    parentOrganization: { "@id": organizationId },
    image: absoluteUrl(localizedPath(locale, "/")),
    email: siteCopy.contact.email,
    telephone: `+${siteCopy.contact.whatsapp}`,
    description: siteCopy.meta.description[locale],
    address: localBusiness.address,
    areaServed: [
      {
        "@type": "City",
        name: siteCopy.contact.location[locale],
      },
      {
        "@type": "AdministrativeArea",
        name:
          siteCopy.business.addressRegion[locale] ||
          (locale === "he" ? "מרכז" : "Central District"),
      },
      {
        "@type": "Country",
        name: locale === "he" ? "ישראל" : "Israel",
      },
    ],
    serviceType: serviceTypes,
    priceRange: "$$",
    ...(localBusiness.sameAs ? { sameAs: localBusiness.sameAs } : {}),
    ...(localBusiness.openingHoursSpecification
      ? { openingHoursSpecification: localBusiness.openingHoursSpecification }
      : {}),
    ...(localBusiness.geo ? { geo: localBusiness.geo } : {}),
    ...(localBusiness.hasMap ? { hasMap: localBusiness.hasMap } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl(localizedPath(locale, "/")),
    name: siteCopy.brand[locale],
    alternateName: siteCopy.brand[locale === "he" ? "en" : "he"],
    description: siteCopy.meta.description[locale],
    inLanguage: locale === "he" ? "he-IL" : "en",
    publisher: { "@id": organizationId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, professionalService, website],
  };
}

export function buildProjectBreadcrumbSchema(project: Project, locale: Locale = "he") {
  const projectUrl = projectPageUrl(project.slug, locale);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "בית",
        item: absoluteUrl(localizedPath(locale, "/")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "en" ? "Portfolio" : "תיק עבודות",
        item: absoluteUrl(localizedPath(locale, "/#portfolio")),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pickLocalized(project.name, locale),
        item: projectUrl,
      },
    ],
  };
}

export function buildProjectCreativeWorkSchema(project: Project, locale: Locale = "he") {
  const projectUrl = projectPageUrl(project.slug, locale);
  const location = pickLocalized(project.location, locale).trim();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    name: pickLocalized(project.name, locale),
    alternateName: pickLocalized(project.name, locale === "he" ? "en" : "he"),
    description: pickLocalized(project.description, locale),
    url: projectUrl,
    image: absoluteUrl(project.coverImage),
    creator: {
      "@type": "Person",
      name: locale === "en" ? SITE_NAME_EN : SITE_NAME_HE,
      jobTitle:
        locale === "en"
          ? "Architect & Interior Designer"
          : "אדריכלית ומעצבת פנים",
    },
    ...(location
      ? {
          contentLocation: {
            "@type": "Place",
            name: location,
            address: {
              "@type": "PostalAddress",
              addressLocality: location,
              addressCountry: "IL",
            },
          },
        }
      : {}),
    about: pickLocalized(project.type, locale),
  };
}

export function getDefaultOgImage(projects: Project[]): string | undefined {
  const cover = projects.find((project) => project.coverImage.trim())?.coverImage;
  return cover?.trim() || undefined;
}
