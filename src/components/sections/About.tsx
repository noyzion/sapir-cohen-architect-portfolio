"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { ProjectImage } from "@/components/ui/ProjectImage";

export function About() {
  const { locale, t } = useLanguage();
  const { about } = t;
  const portraitSrc = about.portraitImage?.trim() ?? "";
  const portraitAlt =
    locale === "he"
      ? `${pick(about.intro, locale)} - ${pick(about.credentials, locale)}, אדריכלות ועיצוב פנים`
      : `${pick(about.intro, locale)} - ${pick(about.credentials, locale)}, architecture and interior design`;

  return (
    <section
      id="about"
      className="about-section border-b border-stone-200 bg-white"
      aria-labelledby="about-title"
    >
      <div className="container-site about-section-inner">
        <div className="about-layout">
          <header className="about-title-col">
            <h1 id="about-title" className="section-heading text-balance">
              {pick(about.title, locale)}
            </h1>
            <div className="section-heading-rule" aria-hidden />

            <figure className="about-portrait">
              <div
                className={`about-portrait-frame${
                  portraitSrc ? " about-portrait-frame--photo" : ""
                }`}
              >
                {portraitSrc ? (
                  <ProjectImage
                    src={portraitSrc}
                    alt={portraitAlt}
                    sizes="(max-width: 768px) 16rem, 20vw"
                    priority
                  />
                ) : (
                  <>
                    <svg
                      className="about-portrait-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M12 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                      <path d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
                    </svg>
                    <span className="about-portrait-label">
                      {locale === "he" ? "תמונת תדמית" : "Portrait photo"}
                    </span>
                  </>
                )}
              </div>
            </figure>
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
