"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { LegalDocKey } from "@/data/legalCopy";
import { LegalDocumentContent } from "@/components/legal/LegalDocumentContent";

type Props = {
  docKey: LegalDocKey;
  open: boolean;
  onClose: () => void;
};

export function LegalModal({ docKey, open, onClose }: Props) {
  const { locale, t } = useLanguage();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const page = t[docKey];

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="legal-modal" role="presentation" onMouseDown={onClose}>
      <div
        className="legal-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="legal-modal__header">
          <h2 id={titleId} className="legal-modal__title">
            {pick(page.title, locale)}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="legal-modal__close"
            onClick={onClose}
            aria-label={locale === "he" ? "סגירת חלון" : "Close dialog"}
          >
            ×
          </button>
        </header>

        <LegalDocumentContent docKey={docKey} variant="modal" />
      </div>
    </div>,
    document.body
  );
}
