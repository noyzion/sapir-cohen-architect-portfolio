"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { LegalDocKey } from "@/data/legalCopy";
import { LEGAL_ROUTES } from "@/data/legalCopy";

type Props = {
  docKey: LegalDocKey;
  /** Compact layout for modal dialogs */
  variant?: "page" | "modal";
};

export function LegalDocumentContent({ docKey, variant = "page" }: Props) {
  const { locale, t, localizedPath } = useLanguage();
  const page = t[docKey];
  const isModal = variant === "modal";

  return (
    <div className={isModal ? "legal-modal__body" : undefined}>
      {!isModal ? (
        <header className="legal-page__head">
          <h1 className="legal-page__title">{pick(page.title, locale)}</h1>
          <p className="legal-page__updated">{pick(page.updatedAt, locale)}</p>
        </header>
      ) : (
        <p className="legal-modal__updated">{pick(page.updatedAt, locale)}</p>
      )}

      <p className={isModal ? "legal-modal__intro" : "legal-page__intro"}>
        {pick(page.intro, locale)}
      </p>

      <div className={isModal ? "legal-modal__sections" : "legal-page__sections"}>
        {page.sections.map((section, i) => (
          <section key={i} className="legal-page__section">
            <h2 className={isModal ? "legal-modal__heading" : "legal-page__heading"}>
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

      {docKey === "privacy" && !isModal ? (
        <p className="legal-page__related">
          {locale === "he" ? "למידע נוסף: " : "See also: "}
          <Link href={localizedPath(LEGAL_ROUTES.cookies)} className="legal-page__link">
            {pick(t.footer.cookiesLabel, locale)}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
