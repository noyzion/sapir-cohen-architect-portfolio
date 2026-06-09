import type {
  BusinessOpeningHours,
  BusinessSocialLinks,
  Locale,
  SiteBusinessProfile,
  SiteCopy,
} from "@/types";

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

export function collectSameAsUrls(social: BusinessSocialLinks | undefined): string[] {
  if (!social) return [];
  return Object.values(social)
    .map((url) => (typeof url === "string" ? url.trim() : ""))
    .filter((url) => url.length > 0 && isHttpUrl(url));
}

export function buildPostalAddress(siteCopy: SiteCopy, locale: Locale) {
  const business = siteCopy.business;
  const street =
    business.streetAddress[locale]?.trim() || business.streetAddress.he?.trim();

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: siteCopy.contact.location[locale],
    addressRegion:
      business.addressRegion[locale]?.trim() ||
      business.addressRegion.he ||
      (locale === "he" ? "מרכז" : "Central District"),
    addressCountry: "IL",
  };

  if (street) address.streetAddress = street;
  if (business.postalCode.trim()) address.postalCode = business.postalCode.trim();

  return address;
}

export function buildOpeningHoursSpecification(
  openingHours: BusinessOpeningHours[] | undefined
) {
  if (!openingHours?.length) return undefined;

  const specs = openingHours
    .filter((entry) => entry.opens?.trim() && entry.closes?.trim() && entry.days?.length)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: entry.days,
      opens: entry.opens.trim(),
      closes: entry.closes.trim(),
    }));

  return specs.length ? specs : undefined;
}

export function buildGeoCoordinates(business: SiteBusinessProfile | undefined) {
  if (!business) return undefined;

  const latitude = Number.parseFloat(business.latitude.trim());
  const longitude = Number.parseFloat(business.longitude.trim());

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return undefined;
  }

  return {
    "@type": "GeoCoordinates" as const,
    latitude,
    longitude,
  };
}

export function buildHasMapUrl(business: SiteBusinessProfile | undefined) {
  const url = business?.googleMapsUrl?.trim();
  if (!url || !isHttpUrl(url)) return undefined;
  return url;
}

export type LocalBusinessSchemaFields = {
  sameAs?: string[];
  address: ReturnType<typeof buildPostalAddress>;
  openingHoursSpecification?: NonNullable<
    ReturnType<typeof buildOpeningHoursSpecification>
  >;
  geo?: NonNullable<ReturnType<typeof buildGeoCoordinates>>;
  hasMap?: string;
};

export function buildLocalBusinessSchemaFields(
  siteCopy: SiteCopy,
  locale: Locale
): LocalBusinessSchemaFields {
  const business = siteCopy.business;
  const sameAs = collectSameAsUrls(business?.sameAs);
  const openingHoursSpecification = buildOpeningHoursSpecification(
    business?.openingHours
  );
  const geo = buildGeoCoordinates(business);
  const hasMap = buildHasMapUrl(business);

  return {
    address: buildPostalAddress(siteCopy, locale),
    ...(sameAs.length ? { sameAs } : {}),
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
    ...(geo ? { geo } : {}),
    ...(hasMap ? { hasMap } : {}),
  };
}

const SERVICE_TYPES_HE = [
  "אדריכלות",
  "עיצוב פנים",
  "תכנון דירות",
  "עיצוב דירות קבלן",
  "עיצוב בתים פרטיים",
  "ליווי שיפוץ",
  "תכנון ועיצוב פנים",
] as const;

const SERVICE_TYPES_EN = [
  "Architecture",
  "Interior design",
  "Apartment planning",
  "Contractor apartment design",
  "Private home design",
  "Renovation guidance",
  "Interior architecture",
] as const;

export function buildServiceTypes(locale: Locale): string[] {
  return locale === "en" ? [...SERVICE_TYPES_EN] : [...SERVICE_TYPES_HE];
}

export function buildKnowsAbout(locale: Locale): string[] {
  return buildServiceTypes(locale);
}
