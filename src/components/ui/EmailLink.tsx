"use client";

import type { MouseEvent } from "react";
import {
  buildMailtoHref,
  openMailto,
  resolveContactEmail,
} from "@/lib/contactEmail";
import { CONTACT_EMAIL } from "@/data/siteCopy";

type EmailLinkProps = {
  email: string;
  locale: "he" | "en";
  className?: string;
  fallbackEmail?: string;
};

export function EmailLink({
  email,
  locale,
  className = "",
  fallbackEmail = CONTACT_EMAIL,
}: EmailLinkProps) {
  const address = resolveContactEmail(email, fallbackEmail);
  const href = buildMailtoHref(address, locale);
  const label =
    locale === "he"
      ? `שליחת אימייל ל-${address}`
      : `Send email to ${address}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    openMailto(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`email-link ${className}`.trim()}
      aria-label={label}
    >
      {address}
    </a>
  );
}
