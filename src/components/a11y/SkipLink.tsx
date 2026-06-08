"use client";

import { useLanguage } from "@/context/LanguageContext";

export function SkipLink() {
  const { locale } = useLanguage();

  return (
    <a href="#main-content" className="skip-link">
      {locale === "he" ? "דלג לתוכן הראשי" : "Skip to main content"}
    </a>
  );
}
