"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { servicePackages } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicePackageCard } from "@/components/sections/ServicePackageCard";

export function Services() {
  const { locale, t } = useLanguage();

  const orderedPackages = [
    servicePackages.find((p) => p.id === "light")!,
    servicePackages.find((p) => p.id === "smart")!,
    servicePackages.find((p) => p.id === "premium")!,
  ];

  const popularLabel = pick(t.services.popular, locale);
  const suitableLabel = pick(t.services.suitableLabel, locale);

  return (
    <section id="services" className="section-pad bg-stone-50">
      <div className="container-site">
        <SectionHeader
          title={pick(t.services.title, locale)}
          subtitle={pick(t.services.subtitle, locale)}
        />

        {/* Mobile / tablet: compact comparison table */}
        <div className="services-table lg:hidden">
          {orderedPackages.map((pkg) => (
            <div
              key={pkg.id}
              dir={locale === "he" ? "rtl" : "ltr"}
              className={`services-col ${
                pkg.featured ? "services-col--featured" : ""
              }`}
            >
              {pkg.featured && (
                <span className="services-col-badge">{popularLabel}</span>
              )}
              <p className="services-col-tier">{pkg.tier}</p>
              <p className="services-col-desc">{pick(pkg.description, locale)}</p>
              <div className="services-col-fit">
                <p className="services-col-fit-label">{suitableLabel}?</p>
                <p className="services-col-fit-text">
                  {pick(pkg.suitableFor, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: elevated package cards */}
        <div className="services-packages hidden lg:grid">
          {orderedPackages.map((pkg) => (
            <ServicePackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              popularLabel={popularLabel}
              suitableLabel={suitableLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
