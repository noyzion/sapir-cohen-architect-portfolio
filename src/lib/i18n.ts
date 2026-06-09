import { notFound } from "next/navigation";
import type { Locale } from "@/types";

export const LOCALES = ["he", "en"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "he";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function parseLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

/** Path segment after locale, e.g. `/about` or `/`. */
export function stripLocaleFromPathname(pathname: string): {
  locale: Locale | null;
  pathname: string;
} {
  const match = pathname.match(/^\/(he|en)(\/.*)?$/);
  if (!match) return { locale: null, pathname };
  const locale = match[1] as Locale;
  const rest = match[2] ?? "";
  return { locale, pathname: rest || "/" };
}

export function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function localizedPath(locale: Locale, href: string): string {
  const hashIndex = href.indexOf("#");
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hashPart = hashIndex >= 0 ? href.slice(hashIndex) : "";

  if (pathPart === "/" || pathPart === "") {
    return `/${locale}${hashPart}`;
  }

  const normalized = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  return `/${locale}${normalized}${hashPart}`;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const { pathname: withoutLocale } = stripLocaleFromPathname(pathname);
  return localizedPath(targetLocale, withoutLocale);
}

export function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const languages = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? Number.parseFloat(qPart.slice(2)) : 1;
      const code = lang.split("-")[0]?.toLowerCase() ?? "";
      return { code, q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (code === "he" || code === "iw") return "he";
    if (code === "en") return "en";
  }

  return DEFAULT_LOCALE;
}
