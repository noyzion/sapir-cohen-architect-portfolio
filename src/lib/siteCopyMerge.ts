import type { LegalPageCopy, SiteCopy } from "@/types";

function mergeLegalPage(
  base: LegalPageCopy,
  patch: Partial<LegalPageCopy> | undefined
): LegalPageCopy {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    sections: patch.sections?.length ? patch.sections : base.sections,
  };
}

/** Merge CMS-stored copy over seed defaults so new fields never go missing. */
export function mergeSiteCopy(
  seed: SiteCopy,
  stored: Partial<SiteCopy> | null | undefined
): SiteCopy {
  if (!stored) return seed;

  return {
    ...seed,
    ...stored,
    meta: { ...seed.meta, ...stored.meta },
    cta: { ...seed.cta, ...stored.cta },
    hero: { ...seed.hero, ...stored.hero },
    about: {
      ...seed.about,
      ...stored.about,
      opening: stored.about?.opening?.length
        ? stored.about.opening
        : seed.about.opening,
      approachPillars: stored.about?.approachPillars?.length
        ? stored.about.approachPillars
        : seed.about.approachPillars,
      closing: stored.about?.closing?.length
        ? stored.about.closing
        : seed.about.closing,
    },
    services: { ...seed.services, ...stored.services },
    projectTypes: { ...seed.projectTypes, ...stored.projectTypes },
    portfolio: { ...seed.portfolio, ...stored.portfolio },
    process: { ...seed.process, ...stored.process },
    contact: {
      ...seed.contact,
      ...stored.contact,
      form: {
        ...seed.contact.form,
        ...stored.contact?.form,
        projectTypeOptions: stored.contact?.form?.projectTypeOptions?.length
          ? stored.contact.form.projectTypeOptions
          : seed.contact.form.projectTypeOptions,
      },
    },
    footer: { ...seed.footer, ...stored.footer },
    legalDisclaimer: stored.legalDisclaimer ?? seed.legalDisclaimer,
    privacy: mergeLegalPage(seed.privacy, stored.privacy),
    accessibility: mergeLegalPage(seed.accessibility, stored.accessibility),
    terms: mergeLegalPage(seed.terms, stored.terms),
    cookies: mergeLegalPage(seed.cookies, stored.cookies),
    ctaBand: {
      afterPortfolio: {
        ...seed.ctaBand.afterPortfolio,
        ...stored.ctaBand?.afterPortfolio,
      },
    },
    nav: stored.nav?.length ? stored.nav : seed.nav,
  };
}
