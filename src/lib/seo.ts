import type { Metadata } from "next";
import type { LocalizedString, Project, SiteCopy } from "@/types";

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

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    const normalized = configured.replace(/\/$/, "");
    if (/^https?:\/\//i.test(normalized)) return normalized;
    return `https://${normalized}`;
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    const host = productionHost.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

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
    titleAbsolute = false,
    image,
    imageAlt,
    noIndex = false,
    keywords = [...SEO_KEYWORDS_HE],
    ogType = path.startsWith("/projects/") ? "article" : "website",
  } = options;

  const canonical = absoluteUrl(path);
  const summary = truncateDescription(description);
  const ogImage = image ? absoluteUrl(image) : undefined;
  const socialTitle = titleAbsolute ? title : `${title} | ${SITE_NAME_HE}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description: summary,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      url: canonical,
      title: socialTitle,
      description: summary,
      siteName: SITE_NAME_HE,
      locale: "he_IL",
      alternateLocale: ["en_US"],
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

export function buildHomeMetadata(siteCopy: SiteCopy, defaultImage?: string): Metadata {
  const description =
    `${siteCopy.meta.description.he} שירותי אדריכלות ועיצוב פנים במרכז: תכנון דירות, עיצוב דירת קבלן, בתים פרטיים וליווי שיפוץ.`;

  return buildPageMetadata({
    title: siteCopy.meta.title.he,
    titleAbsolute: true,
    description,
    path: "/",
    image: defaultImage,
    imageAlt: `${SITE_NAME_HE} – ${siteCopy.tagline.he}`,
  });
}

export function buildAboutMetadata(siteCopy: SiteCopy, defaultImage?: string): Metadata {
  const description = truncateDescription(
    `${pickLocalized(siteCopy.about.intro)} – ${pickLocalized(siteCopy.about.credentials)}. ${pickLocalized(siteCopy.about.opening[0] ?? { he: siteCopy.meta.description.he, en: siteCopy.meta.description.en })}`
  );

  return buildPageMetadata({
    title: "אודות – אדריכלות ועיצוב פנים",
    description,
    path: "/about",
    image: defaultImage,
    imageAlt: `${pickLocalized(siteCopy.about.intro)} – ${pickLocalized(siteCopy.about.credentials)}`,
  });
}

export function buildProjectMetadata(project: Project): Metadata {
  const name = project.name.he;
  const type = project.type.he;
  const location = project.location.he.trim();
  const locationPart = location ? `, ${location}` : "";
  const title = `${name} | ${type}`;
  const description = truncateDescription(
    `${name} – ${type}${locationPart}. ${project.description.he}`
  );

  return buildPageMetadata({
    title,
    description,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
    imageAlt: `${name} – ${type}${locationPart}`,
    ogType: "article",
    keywords: [
      name,
      type,
      ...(location ? [location] : []),
      ...SEO_KEYWORDS_HE.slice(0, 6),
    ],
  });
}

export function buildLegalMetadata(
  siteCopy: SiteCopy,
  docKey: "privacy" | "accessibility"
): Metadata {
  const page = siteCopy[docKey];
  const title = page.title.he;

  return buildPageMetadata({
    title,
    description: page.intro.he,
    path: `/${docKey}`,
    keywords: [page.title.he, siteCopy.brand.he, ...SEO_KEYWORDS_HE.slice(0, 4)],
  });
}

export function buildSiteGraphSchema(siteCopy: SiteCopy) {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: siteCopy.brand.he,
    alternateName: siteCopy.brand.en,
    url: siteUrl,
    email: siteCopy.contact.email,
    telephone: `+${siteCopy.contact.whatsapp}`,
    description: siteCopy.meta.description.he,
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteCopy.contact.location.he,
      addressRegion: "מרכז",
      addressCountry: "IL",
    },
    knowsAbout: [
      "אדריכלות",
      "עיצוב פנים",
      "תכנון דירות",
      "עיצוב דירות קבלן",
      "עיצוב בתים פרטיים",
      "ליווי שיפוץ",
    ],
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#professional-service`,
    name: `${siteCopy.brand.he} – ${siteCopy.tagline.he}`,
    alternateName: `${siteCopy.brand.en} – ${siteCopy.tagline.en}`,
    url: siteUrl,
    parentOrganization: { "@id": organizationId },
    image: absoluteUrl("/"),
    email: siteCopy.contact.email,
    telephone: `+${siteCopy.contact.whatsapp}`,
    description: siteCopy.meta.description.he,
    areaServed: [
      {
        "@type": "City",
        name: siteCopy.contact.location.he,
      },
      {
        "@type": "AdministrativeArea",
        name: "מרכז",
      },
    ],
    serviceType: [
      "אדריכלות",
      "עיצוב פנים",
      "תכנון דירות",
      "עיצוב דירות קבלן",
      "עיצוב בתים פרטיים",
      "ליווי שיפוץ",
      "תכנון ועיצוב פנים",
    ],
    priceRange: "$$",
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteCopy.brand.he,
    alternateName: siteCopy.brand.en,
    description: siteCopy.meta.description.he,
    inLanguage: ["he-IL", "en"],
    publisher: { "@id": organizationId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, professionalService, website],
  };
}

export function buildProjectBreadcrumbSchema(project: Project) {
  const siteUrl = getSiteUrl();
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "בית",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "תיק עבודות",
        item: `${siteUrl}/#portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name.he,
        item: projectUrl,
      },
    ],
  };
}

export function buildProjectCreativeWorkSchema(project: Project) {
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);
  const location = project.location.he.trim();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    name: project.name.he,
    alternateName: project.name.en,
    description: project.description.he,
    url: projectUrl,
    image: absoluteUrl(project.coverImage),
    creator: {
      "@type": "Person",
      name: SITE_NAME_HE,
      jobTitle: "אדריכלית ומעצבת פנים",
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
    about: project.type.he,
  };
}

export function getDefaultOgImage(projects: Project[]): string | undefined {
  const cover = projects.find((project) => project.coverImage.trim())?.coverImage;
  return cover?.trim() || undefined;
}
