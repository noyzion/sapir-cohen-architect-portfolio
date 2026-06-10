const MAILTO_SUBJECT = {
  he: "פנייה מהאתר",
  en: "Inquiry from website",
} as const;

type EmailLinkProps = {
  email: string;
  locale: "he" | "en";
  className?: string;
};

export function EmailLink({ email, locale, className = "" }: EmailLinkProps) {
  const address = email.trim();
  const href = `mailto:${address}?subject=${encodeURIComponent(MAILTO_SUBJECT[locale])}`;
  const label =
    locale === "he"
      ? `שליחת אימייל ל-${address}`
      : `Send email to ${address}`;

  return (
    <a
      href={href}
      className={`email-link ${className}`.trim()}
      aria-label={label}
    >
      {address}
    </a>
  );
}
