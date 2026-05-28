"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ButtonLink } from "@/components/ui/Button";
export function Header() {
  const { locale, toggleLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-luxury ${
        scrolled || menuOpen
          ? "border-b border-stone-200/90 bg-white/95 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-[color:var(--surface-warm)]/92 backdrop-blur-sm"
      }`}
    >
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          href="/#home"
          className="shrink-0 transition-opacity hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-wordmark text-base md:text-lg">
            {t.brand.en}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main"
        >
          {t.nav.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-body-sm text-stone-600 transition-colors hover:text-ink"
            >
              {pick(link.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={toggleLocale}
            suppressHydrationWarning
            className="label-caps !tracking-[0.14em] text-stone-500 transition-colors hover:text-ink"
          >
            {locale === "he" ? "EN" : "עב"}
          </button>
          <ButtonLink
            href="#contact"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {pick(t.cta.consult, locale)}
          </ButtonLink>
          <button
            type="button"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-stone-200 bg-white px-gutter py-6 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {t.nav.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="block py-3.5 text-body-sm font-medium text-stone-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {pick(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-6">
            <button
              type="button"
              onClick={toggleLocale}
              suppressHydrationWarning
              className="text-start label-caps text-stone-500"
            >
              {locale === "he" ? "English" : "עברית"}
            </button>
            <ButtonLink
              href="#contact"
              variant="primary"
              fullWidth
              onClick={() => setMenuOpen(false)}
            >
              {pick(t.cta.consult, locale)}
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
