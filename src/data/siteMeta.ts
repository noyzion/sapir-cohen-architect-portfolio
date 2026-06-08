/** Fixed footer copyright (not editable in admin). */
export const SITE_COPYRIGHT = {
  he: "© {year} ספיר כהן · כל הזכויות שמורות",
  en: "© {year} Sapir Cohen · All rights reserved",
} as const;

/** Fixed site-builder credit (not editable in admin). */
export const SITE_BUILDER_CREDIT = {
  he: "בניית אתר: נוי ציון",
  en: "Site by Noy Zion",
} as const;

export function formatSiteCopyright(locale: keyof typeof SITE_COPYRIGHT, year: number): string {
  return SITE_COPYRIGHT[locale].replace("{year}", String(year));
}
