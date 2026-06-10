import type {
  BusinessSocialLinks,
  LegalPageCopy,
  LocalizedString,
  SiteCopy,
} from "@/types";

function mergeSocialLinks(
  seed: BusinessSocialLinks,
  stored: BusinessSocialLinks | undefined
): BusinessSocialLinks {
  if (!stored) return seed;

  const merged = { ...seed };
  for (const key of Object.keys(seed) as (keyof BusinessSocialLinks)[]) {
    const value = stored[key]?.trim();
    if (value) merged[key] = value;
  }
  return merged;
}

function mergeLocalized(
  base: LocalizedString,
  patch: LocalizedString | undefined
): LocalizedString {
  if (!patch) return base;
  return {
    he: patch.he?.trim() ? patch.he : base.he,
    en: patch.en?.trim() ? patch.en : base.en,
  };
}

function mergeLegalPage(
  base: LegalPageCopy,
  patch: Partial<LegalPageCopy> | undefined
): LegalPageCopy {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    title: mergeLocalized(base.title, patch.title),
    updatedAt: mergeLocalized(base.updatedAt, patch.updatedAt),
    /** Legal intros are maintained in repo; do not let stale CMS copy override compliance text. */
    intro: base.intro,
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
    hero: {
      headline: mergeLocalized(seed.hero.headline, stored.hero?.headline),
      scrollHint: mergeLocalized(seed.hero.scrollHint, stored.hero?.scrollHint),
    },
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
    business: {
      ...seed.business,
      ...stored.business,
      streetAddress: mergeLocalized(
        seed.business.streetAddress,
        stored.business?.streetAddress
      ),
      addressRegion: mergeLocalized(
        seed.business.addressRegion,
        stored.business?.addressRegion
      ),
      sameAs: mergeSocialLinks(seed.business.sameAs, stored.business?.sameAs),
      openingHours: stored.business?.openingHours?.length
        ? stored.business.openingHours
        : seed.business.openingHours,
    },
    contact: {
      ...seed.contact,
      ...stored.contact,
      form: {
        ...seed.contact.form,
        ...stored.contact?.form,
        name: mergeLocalized(seed.contact.form.name, stored.contact?.form?.name),
        phone: mergeLocalized(seed.contact.form.phone, stored.contact?.form?.phone),
        email: mergeLocalized(seed.contact.form.email, stored.contact?.form?.email),
        projectType: mergeLocalized(
          seed.contact.form.projectType,
          stored.contact?.form?.projectType
        ),
        message: mergeLocalized(seed.contact.form.message, stored.contact?.form?.message),
        messagePlaceholder: mergeLocalized(
          seed.contact.form.messagePlaceholder,
          stored.contact?.form?.messagePlaceholder
        ),
        privacyConsentBefore: mergeLocalized(
          seed.contact.form.privacyConsentBefore,
          stored.contact?.form?.privacyConsentBefore
        ),
        privacyConsentLink: mergeLocalized(
          seed.contact.form.privacyConsentLink,
          stored.contact?.form?.privacyConsentLink
        ),
        privacyConsentAfter: mergeLocalized(
          seed.contact.form.privacyConsentAfter,
          stored.contact?.form?.privacyConsentAfter
        ),
        projectTypeOptions: stored.contact?.form?.projectTypeOptions?.length
          ? stored.contact.form.projectTypeOptions
          : seed.contact.form.projectTypeOptions,
      },
    },
    footer: {
      ...seed.footer,
      ...stored.footer,
      privacyLabel: mergeLocalized(seed.footer.privacyLabel, stored.footer?.privacyLabel),
      accessibilityLabel: mergeLocalized(
        seed.footer.accessibilityLabel,
        stored.footer?.accessibilityLabel
      ),
      termsLabel: mergeLocalized(seed.footer.termsLabel, stored.footer?.termsLabel),
      cookiesLabel: mergeLocalized(seed.footer.cookiesLabel, stored.footer?.cookiesLabel),
    },
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
