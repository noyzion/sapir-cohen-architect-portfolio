"use client";

import { useLanguage, pick } from "@/context/LanguageContext";

type Props = {
  docKey: "privacy" | "accessibility";
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
      </div>
    </article>
  );
}
