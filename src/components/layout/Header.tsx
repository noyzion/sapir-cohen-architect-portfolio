"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ButtonLink } from "@/components/ui/Button";
export function Header() {
  const { locale, toggleLocale, t, localizedPath } = useLanguage();
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
      className={`site-header ${scrolled || menuOpen ? "site-header--solid" : ""}`}
    >
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          href={localizedPath("/#home")}
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
              href={localizedPath(link.href)}
              className="site-header__nav-link"
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
            className="site-header__icon-btn"
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
              className={`site-header__burger-line ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`site-header__burger-line ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`site-header__burger-line ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
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
                  href={localizedPath(link.href)}
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
