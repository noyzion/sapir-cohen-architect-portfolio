import type { Locale } from "@/types";

/** SEO-friendly alt text for homepage portfolio slideshow images. */
const PROJECT_IMAGE_ALT: Record<string, Record<Locale, string>> = {
  "beit-neve-yam": {
    he: "עיצוב פנים ותכנון אדריכלי לבית פרטי בפרויקט הבית בנווה ים - ספיר כהן",
    en: "Interior design and architectural planning for a private home in Neve Yam - Sapir Cohen",
  },
  "duplex-ramat-aviv": {
    he: "עיצוב פנים לסלון מודרני בפרויקט דופלקס ברמת אביב - ספיר כהן",
    en: "Modern living room interior design in the Ramat Aviv duplex project - Sapir Cohen",
  },
  "joseph-bar": {
    he: "עיצוב פנים ושיפוץ מסעדה בפרויקט ג'וזף בר פחמים - ספיר כהן",
    en: "Restaurant interior renovation in the Joseph Bar Pachmim project - Sapir Cohen",
  },
  "final-project": {
    he: "פרויקט גמר באדריכלות ועיצוב פנים - ספיר כהן",
    en: "Architecture and interior design final project - Sapir Cohen",
  },
};

export function getProjectImageAlt(
  slug: string,
  locale: Locale,
  fallback: string
): string {
  const entry = PROJECT_IMAGE_ALT[slug];
  if (!entry) return fallback;
  return entry[locale] || entry.he || fallback;
}
