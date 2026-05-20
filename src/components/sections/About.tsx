"use client";

import { useLanguage, pick } from "@/context/LanguageContext";

export function About() {
  const { locale, t } = useLanguage();
  const { about } = t;

  return (
    <section
      id="about"
      className="about-section border-b border-stone-200 bg-white"
      aria-labelledby="about-title"
    >
      <div className="container-site about-section-inner">
        <div className="about-layout">
          <header className="about-title-col">
            <h2
              id="about-title"
              className="about-heading font-display text-ink"
            >
              {pick(about.title, locale)}
            </h2>
            <div className="about-heading-rule" aria-hidden />
          </header>

          <div className="about-content">
            <div className="about-lead">
              <p className="about-intro">{pick(about.intro, locale)}</p>
              <p className="about-credentials">{pick(about.credentials, locale)}</p>
            </div>

            {about.opening.map((paragraph, i) => (
              <p key={`open-${i}`} className="about-paragraph">
                {pick(paragraph, locale)}
              </p>
            ))}

            <p className="about-highlight">{pick(about.highlight, locale)}</p>

            {about.closing.map((paragraph, i) => (
              <p key={`close-${i}`} className="about-paragraph">
                {pick(paragraph, locale)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
