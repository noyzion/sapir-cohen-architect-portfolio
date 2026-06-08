"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { CONTACT_EMAIL } from "@/data/siteCopy";

export function Footer() {
  const { locale, t } = useLanguage();
  const year = new Date().getFullYear();
  const email = t.contact.email || CONTACT_EMAIL;

  return (
    <footer className="site-footer surface-warm">
      <div className="container-site section-pad-sm">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <p className="brand-wordmark text-lg">
              {t.brand.en}
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
              href={`mailto:${email}`}
              className="mt-3 block text-sm text-stone-700 transition-colors hover:text-stone-900"
            >
              {email}
            </a>
          </div>
        </div>

        <p className="site-footer__divider mt-14 pt-8 text-center text-xs text-stone-400">
          {pick(t.footer.rights, locale).replace("{year}", String(year))}
          <span className="site-footer__legal">
            {" · "}
            <Link href="/privacy" className="site-footer__legal-link">
              {pick(t.footer.privacyLabel, locale)}
            </Link>
            {" · "}
            <Link href="/accessibility" className="site-footer__legal-link">
              {pick(t.footer.accessibilityLabel, locale)}
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}
