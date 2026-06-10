"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { CONTACT_EMAIL } from "@/data/siteCopy";
import { SITE_BUILDER_CREDIT, formatSiteCopyright } from "@/data/siteMeta";
import { LEGAL_ROUTES } from "@/data/legalCopy";
import { ContactDetailLabel } from "@/components/ui/ContactIcons";
import { InstagramLink } from "@/components/ui/InstagramLink";

export function Footer() {
  const { locale, t, localizedPath } = useLanguage();
  const year = new Date().getFullYear();
  const email = t.contact.email || CONTACT_EMAIL;
  const instagramUrl = t.business?.sameAs?.instagram?.trim();

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
                href={localizedPath(link.href)}
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                {pick(link.label, locale)}
              </Link>
            ))}
          </nav>

          <div className="space-y-6">
            <div>
              <ContactDetailLabel icon="email">
                {pick(t.contact.emailLabel, locale)}
              </ContactDetailLabel>
              <a
                href={`mailto:${email}`}
                className="mt-3 block text-sm text-stone-700 transition-colors hover:text-stone-900"
              >
                {email}
              </a>
            </div>
            {instagramUrl ? (
              <div>
                <ContactDetailLabel icon="instagram">
                  {locale === "he" ? "אינסטגרם" : "Instagram"}
                </ContactDetailLabel>
                <InstagramLink
                  href={instagramUrl}
                  locale={locale}
                  className="mt-3 block text-sm text-stone-700 transition-colors hover:text-stone-900"
                />
              </div>
            ) : null}
          </div>
        </div>

        <nav
          className="site-footer__legal-nav mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs"
          aria-label={locale === "he" ? "מסמכים משפטיים" : "Legal"}
        >
          <Link href={localizedPath(LEGAL_ROUTES.privacy)} className="site-footer__legal-link">
            {pick(t.footer.privacyLabel, locale)}
          </Link>
          <Link href={localizedPath(LEGAL_ROUTES.accessibility)} className="site-footer__legal-link">
            {pick(t.footer.accessibilityLabel, locale)}
          </Link>
          <Link href={localizedPath(LEGAL_ROUTES.terms)} className="site-footer__legal-link">
            {pick(t.footer.termsLabel, locale)}
          </Link>
          <Link href={localizedPath(LEGAL_ROUTES.cookies)} className="site-footer__legal-link">
            {pick(t.footer.cookiesLabel, locale)}
          </Link>
        </nav>

        <p className="site-footer__divider mt-8 pt-8 text-center text-xs text-stone-400">
          {formatSiteCopyright(locale, year)}
          {" · "}
          {SITE_BUILDER_CREDIT[locale]}
        </p>
      </div>
    </footer>
  );
}
