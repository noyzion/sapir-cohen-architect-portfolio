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
            <h2 id="about-title" className="section-heading text-balance">
              {pick(about.title, locale)}
            </h2>
            <div className="section-heading-rule" aria-hidden />
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

            <p className="about-approach-flow about-paragraph">
              <span>{pick(about.approachIntro, locale)} </span>
              {about.approachPillars.map((item, i) => {
                const isLast = i === about.approachPillars.length - 1;
                const isFirst = i === 0;
                let separator = "";
                if (!isFirst) {
                  separator =
                    isLast && locale === "he"
                      ? " ו"
                      : locale === "he"
                        ? ", "
                        : isLast
                          ? ", and "
                          : ", ";
                }

                return (
                  <span key={i}>
                    {separator}
                    <span className="about-pillar-label">
                      {pick(item, locale)}
                    </span>
                  </span>
                );
              })}
              .
            </p>

            <p className="about-highlight">{pick(about.highlight, locale)}</p>

            {about.closing.map((paragraph, i) => (
              <p
                key={`close-${i}`}
                className={
                  i === about.closing.length - 1
                    ? "about-closing-emphasis"
                    : "about-paragraph"
                }
              >
                {pick(paragraph, locale)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
