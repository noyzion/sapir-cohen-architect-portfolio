import { CONTACT_EMAIL } from "@/data/siteCopy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAILTO_SUBJECT = {
  he: "פנייה מהאתר",
  en: "Inquiry from website",
} as const;

export function resolveContactEmail(
  email: string | undefined,
  fallback: string = CONTACT_EMAIL
): string {
  const candidate = email?.trim() ?? "";
  if (EMAIL_RE.test(candidate)) return candidate;

  const fallbackAddress = fallback.trim();
  return EMAIL_RE.test(fallbackAddress) ? fallbackAddress : CONTACT_EMAIL;
}

export function buildMailtoHref(
  email: string,
  locale: "he" | "en",
  options?: { subject?: string; body?: string }
): string {
  const subject = options?.subject ?? MAILTO_SUBJECT[locale];
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    options?.body ? `body=${encodeURIComponent(options.body)}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export function openMailto(href: string): void {
  window.location.href = href;
}
