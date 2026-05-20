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

  return (
    <section id="services" className="section-pad bg-stone-50">
      <div className="container-site">
        <SectionHeader
          title={pick(t.services.title, locale)}
          subtitle={pick(t.services.subtitle, locale)}
        />

        <div className="services-packages">
          {orderedPackages.map((pkg) => (
            <ServicePackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              popularLabel={pick(t.services.popular, locale)}
              suitableLabel={pick(t.services.suitableLabel, locale)}
              includesLabel={pick(t.services.includesLabel, locale)}
              readMoreLabel={pick(t.services.readMore, locale)}
              readLessLabel={pick(t.services.readLess, locale)}
              ctaLabel={pick(t.cta.packageDetails, locale)}
              consultCtaLabel={pick(t.cta.consult, locale)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
