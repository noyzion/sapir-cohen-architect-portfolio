"use client";

import type { ServicePackage } from "@/types";
import type { Locale } from "@/types";
import { pick } from "@/context/LanguageContext";

type ServicePackageCardProps = {
  pkg: ServicePackage;
  locale: Locale;
  popularLabel: string;
  suitableLabel: string;
};

export function ServicePackageCard({
  pkg,
  locale,
  popularLabel,
  suitableLabel,
}: ServicePackageCardProps) {
  const featured = Boolean(pkg.featured);

  const cardBody = (
    <>
      <h3 className="service-pkg-tier">{pkg.tier}</h3>
      <p className="service-pkg-desc">{pick(pkg.description, locale)}</p>
      <div className="service-pkg-fit">
        <p className="service-pkg-fit-label">{suitableLabel}?</p>
        <p className="service-pkg-fit-text">{pick(pkg.suitableFor, locale)}</p>
      </div>
    </>
  );

  return (
    <article
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`service-package-card ${
        featured ? "service-package-card--featured" : "service-package-card--standard"
      }`}
    >
      {featured && (
        <span className="service-package-badge">{popularLabel}</span>
      )}

      {featured ? (
        <div className="service-package-card__frame">{cardBody}</div>
      ) : (
        cardBody
      )}
    </article>
  );
}
