"use client";

import { FormEvent, useEffect, useState } from "react";
import { useLanguage, pick } from "@/context/LanguageContext";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/siteCopy";
import { buildMailtoHref, openMailto, resolveContactEmail } from "@/lib/contactEmail";
import {
  getPackageInquiryMessage,
  getStoredPackageInquiry,
} from "@/lib/packageInquiry";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ContactDetailLabel } from "@/components/ui/ContactIcons";
import { EmailLink } from "@/components/ui/EmailLink";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { LegalModal } from "@/components/legal/LegalModal";

function WhatsAppIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  const { locale, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const contactEmail = resolveContactEmail(t.contact.email, CONTACT_EMAIL);
  const whatsappNumber = t.contact.whatsapp || WHATSAPP_NUMBER;
  const instagramUrl = t.business?.sameAs?.instagram?.trim();

  useEffect(() => {
    function applyPackageFromInquiry() {
      const packageId = getStoredPackageInquiry();
      if (!packageId) return;

      setSelectedPackage(packageId);
      setMessage(getPackageInquiryMessage(packageId, locale));
    }

    applyPackageFromInquiry();
    window.addEventListener("sapir-package-inquiry", applyPackageFromInquiry);
    window.addEventListener("hashchange", applyPackageFromInquiry);
    return () => {
      window.removeEventListener("sapir-package-inquiry", applyPackageFromInquiry);
      window.removeEventListener("hashchange", applyPackageFromInquiry);
    };
  }, [locale]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const projectType = String(data.get("projectType") || "");
    const inquiryMessage = String(data.get("message") || "");

    const subject =
      locale === "he"
        ? `פנייה חדשה מהאתר, ${name}`
        : `New inquiry, ${name}`;
    const body = [
      locale === "he" ? `שם: ${name}` : `Name: ${name}`,
      `Email: ${email}`,
      phone ? (locale === "he" ? `טלפון: ${phone}` : `Phone: ${phone}`) : "",
      locale === "he" ? `סוג פרויקט: ${projectType}` : `Project: ${projectType}`,
      "",
      inquiryMessage,
    ]
      .filter(Boolean)
      .join("\n");

    openMailto(
      buildMailtoHref(contactEmail, locale, { subject, body })
    );
    setSubmitted(true);
  }

  const whatsappText =
    locale === "he"
      ? "היי ספיר, הגעתי דרך האתר ואשמח להתייעץ איתך לגבי פרויקט."
      : "Hi Sapir, I found you through your website and would love to consult with you about a project.";

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section id="contact" className="section-pad surface-warm">
      <LegalModal
        docKey="privacy"
        open={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="contact-intro">
            <h2 className="section-heading text-balance">
              {pick(t.contact.title, locale)}
            </h2>
            <div className="section-heading-rule" aria-hidden />
            <p className="contact-prompt mt-4 font-display text-display-md text-ink">
              {pick(t.contact.prompt, locale)}
            </p>
            <p className="contact-lead mt-5 text-body leading-relaxed text-stone-600">
              {pick(t.contact.text, locale)}
            </p>

            <ul className="contact-details mt-10 space-y-5 border-t border-stone-200 pt-8">
              <li>
                <span className="label-caps block text-stone-400">
                  {pick(t.contact.locationLabel, locale)}
                </span>
                <span className="mt-1 block text-body-sm text-ink">
                  {pick(t.contact.location, locale)}
                </span>
              </li>
              <li>
                <span className="label-caps block text-stone-400">
                  {pick(t.contact.areaLabel, locale)}
                </span>
                <span className="mt-1 block text-body-sm text-ink">
                  {pick(t.contact.area, locale)}
                </span>
              </li>
              <li>
                <ContactDetailLabel icon="email" className="block">
                  {pick(t.contact.emailLabel, locale)}
                </ContactDetailLabel>
                <EmailLink
                  email={contactEmail}
                  locale={locale}
                  className="mt-1 block text-body-sm text-ink"
                />
              </li>
              {instagramUrl ? (
                <li>
                  <ContactDetailLabel icon="instagram" className="block">
                    {locale === "he" ? "אינסטגרם" : "Instagram"}
                  </ContactDetailLabel>
                  <InstagramLink
                    href={instagramUrl}
                    locale={locale}
                    className="mt-1 block text-body-sm text-ink transition-opacity hover:opacity-70"
                  />
                </li>
              ) : null}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="contact-form card card-pad">
            <p className="label-caps mb-6 text-stone-400">
              {locale === "he" ? "טופס פנייה" : "Inquiry Form"}
            </p>

            {selectedPackage ? (
              <p className="mb-5 rounded-sm border border-stone-200 bg-white px-4 py-3 text-body-sm text-stone-600">
                {locale === "he"
                  ? `מסלול נבחר: ${selectedPackage.toUpperCase()}`
                  : `Selected package: ${selectedPackage.toUpperCase()}`}
              </p>
            ) : null}

            <input type="hidden" name="package" value={selectedPackage} />

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="label-caps mb-2 block">
                  {pick(t.contact.form.name, locale)}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="input-field"
                  suppressHydrationWarning
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="label-caps mb-2 block">
                    {pick(t.contact.form.phone, locale)}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="input-field"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label-caps mb-2 block">
                    {pick(t.contact.form.email, locale)}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div>
                <label htmlFor="projectType" className="label-caps mb-2 block">
                  {pick(t.contact.form.projectType, locale)}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="input-field"
                  suppressHydrationWarning
                >
                  {t.contact.form.projectTypeOptions.map((opt, i) => (
                    <option key={i} value={pick(opt, locale)}>
                      {pick(opt, locale)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="label-caps mb-2 block">
                  {pick(t.contact.form.message, locale)}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={pick(t.contact.form.messagePlaceholder, locale)}
                  className="input-field min-h-[140px] resize-y placeholder:text-stone-400"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="contact-privacy mt-6 border-t border-stone-200 pt-6">
              <div className="contact-privacy__row flex items-start gap-3 text-start">
                <input
                  id="privacy-consent"
                  type="checkbox"
                  name="privacyConsent"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked);
                    if (e.target.checked) setPrivacyError(false);
                  }}
                  className="contact-privacy__input mt-0.5"
                  aria-invalid={privacyError}
                  aria-describedby={
                    privacyError ? "privacy-consent-error privacy-consent-text" : "privacy-consent-text"
                  }
                />
                <p
                  id="privacy-consent-text"
                  className="text-body-sm leading-relaxed text-stone-600"
                >
                  {pick(t.contact.form.privacyConsentBefore, locale)}
                  <button
                    type="button"
                    className="contact-privacy__link"
                    onClick={() => setPrivacyModalOpen(true)}
                  >
                    {pick(t.contact.form.privacyConsentLink, locale)}
                  </button>
                  {pick(t.contact.form.privacyConsentAfter, locale)}
                </p>
              </div>
              {privacyError ? (
                <p
                  id="privacy-consent-error"
                  className="contact-privacy__error mt-2 text-[0.8125rem] text-stone-600"
                  role="alert"
                >
                  {locale === "he"
                    ? "יש לאשר את מדיניות הפרטיות לפני שליחת הטופס."
                    : "Please accept the Privacy Policy before submitting."}
                </p>
              ) : null}
            </div>

            <div className="contact-actions mt-8">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                suppressHydrationWarning
              >
                {pick(t.cta.send, locale)}
              </Button>
              <ButtonLink
                href={whatsappHref}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                {pick(t.cta.whatsapp, locale)}
              </ButtonLink>
              {submitted && (
                <p className="text-center text-label text-stone-500">
                  {locale === "he"
                    ? "נפתח חלון המייל שלכם"
                    : "Your email app should open"}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
