"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="home"
      className="hero-section border-b border-stone-200 bg-white"
      aria-labelledby="hero-title"
    >
      <div className="container-site hero-inner">
        <div className="hero-center">
          <div className="hero-rule" aria-hidden />

          <p className="hero-eyebrow label-caps">{pick(t.tagline, locale)}</p>

          <h1
            id="hero-title"
            className="hero-name font-display text-ink"
          >
            {pick(t.hero.headline, locale)}
          </h1>

          <p className="hero-statement">{pick(t.hero.lead, locale)}</p>

          <p className="hero-credential">{pick(t.hero.subtext, locale)}</p>

          <div className="hero-actions">
            <ButtonLink href="#contact" variant="primary">
              {pick(t.cta.consult, locale)}
            </ButtonLink>
            <ButtonLink href="#portfolio" variant="secondary">
              {pick(t.cta.portfolio, locale)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
