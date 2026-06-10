import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

export function EnvelopeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
      <path d="M3.5 8 12 14.25 20.5 8" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ContactDetailLabelProps = {
  icon: "email" | "instagram";
  children: ReactNode;
  className?: string;
};

export function ContactDetailLabel({
  icon,
  children,
  className = "",
}: ContactDetailLabelProps) {
  return (
    <span
      className={`contact-detail-label label-caps text-stone-400 ${className}`.trim()}
    >
      {icon === "email" ? (
        <EnvelopeIcon className="contact-detail-label__icon" />
      ) : (
        <InstagramIcon className="contact-detail-label__icon contact-detail-label__icon--instagram" />
      )}
      {children}
    </span>
  );
}
