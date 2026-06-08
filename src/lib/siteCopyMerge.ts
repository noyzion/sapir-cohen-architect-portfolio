import type { LegalPageCopy, LocalizedString, SiteCopy } from "@/types";

function mergeLocalized(
  base: LocalizedString,
  patch: LocalizedString | undefined
): LocalizedString {
  return patch ? { ...base, ...patch } : base;
}

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
      rights: mergeLocalized(seed.footer.rights, stored.footer?.rights),
      privacyLabel: mergeLocalized(seed.footer.privacyLabel, stored.footer?.privacyLabel),
      accessibilityLabel: mergeLocalized(
        seed.footer.accessibilityLabel,
        stored.footer?.accessibilityLabel
      ),
      termsLabel: mergeLocalized(seed.footer.termsLabel, stored.footer?.termsLabel),
      cookiesLabel: mergeLocalized(seed.footer.cookiesLabel, stored.footer?.cookiesLabel),
    },
    legalDisclaimer: mergeLocalized(
      seed.legalDisclaimer,
      stored.legalDisclaimer ?? undefined
    ),
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
