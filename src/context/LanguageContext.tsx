"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale, SiteCopy } from "@/types";
import { siteCopy as seedSiteCopy } from "@/data/siteCopy";
import { localizedPath, localeDir, switchLocalePath } from "@/lib/i18n";
import { mergeSiteCopy } from "@/lib/siteCopyMerge";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  localizedPath: (href: string) => string;
  t: SiteCopy;
  dir: "rtl" | "ltr";
  isHe: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  copy,
  locale,
}: {
  children: React.ReactNode;
  /** Editable site copy loaded server-side; falls back to built-in defaults. */
  copy?: SiteCopy;
  locale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useMemo(() => mergeSiteCopy(seedSiteCopy, copy), [copy]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDir(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      router.push(switchLocalePath(pathname, next));
    },
    [locale, pathname, router]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "he" ? "en" : "he");
  }, [locale, setLocale]);

  const resolvePath = useCallback(
    (href: string) => localizedPath(locale, href),
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      localizedPath: resolvePath,
      t,
      dir: localeDir(locale),
      isHe: locale === "he",
    }),
    [locale, setLocale, toggleLocale, resolvePath, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function pick<T extends Record<Locale, string>>(
  obj: T | undefined | null,
  locale: Locale
) {
  return obj?.[locale] ?? "";
}
