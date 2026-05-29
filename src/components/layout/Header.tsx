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
            aria-label={locale === "he" ? "Switch to English" : "מעבר לעברית"}
            title={locale === "he" ? "Switch to English" : "מעבר לעברית"}
            className="flex items-center text-stone-500 transition-colors hover:text-ink"
          >
            <svg
              className="h-[19px] w-[19px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.6 3.9 5.8 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.8-3.9-9S9.5 5.6 12 3Z" />
            </svg>
          </button>
          <ButtonLink
            href="#contact"
            variant="primary"
            size="sm"
            className="hidden lg:inline-flex"
          >
            {pick(t.cta.consult, locale)}
          </ButtonLink>
          <button
            type="button"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Menu"
            suppressHydrationWarning
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
        <nav className="mobile-menu lg:hidden" aria-label="Mobile">
          <ul className="mobile-menu__list">
            {t.nav.map((link, i) => (
              <li
                key={link.id}
                className="mobile-menu__item"
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              >
                <Link
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {pick(link.label, locale)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__footer">
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
