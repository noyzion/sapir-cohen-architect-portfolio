"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { LegalDocKey } from "@/data/legalCopy";
import { LEGAL_ROUTES } from "@/data/legalCopy";

type Props = {
  docKey: LegalDocKey;
};

export function LegalDocument({ docKey }: Props) {
  const { locale, t } = useLanguage();
  const page = t[docKey];

  return (
    <article className="legal-page">
      <div className="container-site legal-page__inner">
        <header className="legal-page__head">
          <h1 className="legal-page__title">{pick(page.title, locale)}</h1>
          <p className="legal-page__updated">
            {pick(page.updatedAt, locale)}
          </p>
        </header>

        <p className="legal-page__intro">{pick(page.intro, locale)}</p>

        <div className="legal-page__sections">
          {page.sections.map((section, i) => (
            <section key={i} className="legal-page__section">
              <h2 className="legal-page__heading">
                {pick(section.heading, locale)}
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j} className="legal-page__paragraph">
                  {pick(paragraph, locale)}
                </p>
              ))}
            </section>
          ))}
        </div>

        {docKey === "privacy" ? (
          <p className="legal-page__related">
            {locale === "he" ? "למידע נוסף: " : "See also: "}
            <Link href={LEGAL_ROUTES.cookies} className="legal-page__link">
              {pick(t.footer.cookiesLabel, locale)}
            </Link>
          </p>
        ) : null}

        <p className="legal-page__disclaimer">
          {pick(t.legalDisclaimer, locale)}
        </p>
      </div>
    </article>
  );
}
