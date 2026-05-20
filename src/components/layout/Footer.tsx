"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { CONTACT_EMAIL, siteCopy } from "@/data/siteCopy";

export function Footer() {
  const { locale, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="container-site section-pad-sm">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-display text-lg font-medium tracking-tight text-stone-900">
              {pick(siteCopy.brand, locale)}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
              {pick(t.tagline, locale)}
            </p>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="Footer">
            {t.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                {pick(link.label, locale)}
              </Link>
            ))}
          </nav>

          <div>
            <p className="label-caps text-stone-400">{pick(t.contact.emailLabel, locale)}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 block text-sm text-stone-700 transition-colors hover:text-stone-900"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <p className="mt-14 border-t border-stone-100 pt-8 text-center text-xs text-stone-400">
          {pick(t.footer.rights, locale).replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
