"use client";

import { useLanguage, pick } from "@/context/LanguageContext";

export function Hero() {
  const { locale, t } = useLanguage();
  const headline = pick(t.hero.headline, locale);
  const tagline = pick(t.tagline, locale);

  return (
    <section
      id="home"
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="hero-backdrop" aria-hidden>
        <span className="hero-grid" />
        <span className="hero-corner hero-corner--tl" />
        <span className="hero-corner hero-corner--tr" />
        <span className="hero-corner hero-corner--bl" />
        <span className="hero-corner hero-corner--br" />
      </div>

      <div className="container-site hero-inner">
        <div className="hero-panel">
          <h1 id="hero-title" className="hero-name">
            {headline}
          </h1>
          <span className="hero-name-bar" aria-hidden />
          <p className="hero-subtitle">{tagline}</p>
        </div>
      </div>

      <a
        href="#portfolio"
        className="hero-scroll-hint"
        aria-label={pick(t.hero.scrollHint, locale)}
      >
        <span className="hero-scroll-hint__line" aria-hidden />
        <span className="hero-scroll-hint__icon" aria-hidden>
          ↓
        </span>
      </a>
    </section>
  );
}
