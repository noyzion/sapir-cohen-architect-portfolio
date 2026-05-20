"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { ButtonLink } from "@/components/ui/Button";

type CtaBandProps = {
  variant: "afterPortfolio";
};

export function CtaBand({ variant }: CtaBandProps) {
  const { locale, t } = useLanguage();
  const copy = t.ctaBand[variant];

  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="container-site section-pad-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <h2 className="font-display text-display-md text-ink">
              {pick(copy.title, locale)}
            </h2>
            <p className="mt-3 text-prose">{pick(copy.text, locale)}</p>
          </div>
          <ButtonLink href="#contact" variant="primary" className="shrink-0 md:min-w-[14rem]">
            {pick(t.cta.consult, locale)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
