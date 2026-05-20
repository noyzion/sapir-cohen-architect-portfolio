"use client";

import { useId, useState } from "react";
import type { ServicePackage } from "@/types";
import type { Locale } from "@/types";
import { pick } from "@/context/LanguageContext";
import { ButtonLink } from "@/components/ui/Button";

type ServicePackageCardProps = {
  pkg: ServicePackage;
  locale: Locale;
  popularLabel: string;
  suitableLabel: string;
  includesLabel: string;
  readMoreLabel: string;
  readLessLabel: string;
  ctaLabel: string;
  consultCtaLabel: string;
};

export function ServicePackageCard({
  pkg,
  locale,
  popularLabel,
  suitableLabel,
  includesLabel,
  readMoreLabel,
  readLessLabel,
  ctaLabel,
  consultCtaLabel,
}: ServicePackageCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const featured = Boolean(pkg.featured);

  return (
    <article
      className={`service-package-card ${
        featured ? "service-package-card--featured" : "service-package-card--standard"
      }`}
    >
      {featured && (
        <span className="service-package-badge">{popularLabel}</span>
      )}

      <header className="service-card-header">
        <span className="service-card-tier">{pkg.tier}</span>
        <h3 className="service-card-title">{pick(pkg.name, locale)}</h3>
        <p className="service-card-summary">{pick(pkg.summary, locale)}</p>
      </header>

      <div className="service-card-includes">
        <p className="service-card-includes-label">{includesLabel}</p>
        <ul className="service-card-list">
          {pkg.highlights.map((h, j) => (
            <li key={j}>{pick(h, locale)}</li>
          ))}
        </ul>
      </div>

      <div className="service-card-more">
        <button
          type="button"
          className="service-card-toggle"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? readLessLabel : readMoreLabel}
          <span className="service-card-toggle-icon" aria-hidden>
            {expanded ? "−" : "+"}
          </span>
        </button>

        <div
          id={detailsId}
          className={`service-card-details ${expanded ? "is-open" : ""}`}
          hidden={!expanded}
        >
          <p className="service-card-details-text">{pick(pkg.description, locale)}</p>
          <div className="service-card-audience-block">
            <p className="service-card-audience-label">{suitableLabel}</p>
            <p className="service-card-audience">{pick(pkg.suitableFor, locale)}</p>
          </div>
        </div>
      </div>

      <div className="service-card-cta">
        <ButtonLink
          href="#contact"
          variant={featured ? "primary" : "secondary"}
          className={`w-full ${featured ? "service-card-cta-featured" : ""}`}
        >
          {featured ? consultCtaLabel : ctaLabel}
        </ButtonLink>
      </div>
    </article>
  );
}
