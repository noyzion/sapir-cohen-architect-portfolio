"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { getImageMeta } from "@/data/imageMeta";
import type { Locale } from "@/types";

const IMAGE_QUALITY = 80;

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string | null;
};

type ImageLightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  locale: Locale;
};

export function ImageLightbox({
  items,
  index,
  onClose,
  onNavigate,
  locale,
}: ImageLightboxProps) {
  const open = index !== null && items[index];
  const current = open ? items[index] : null;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < items.length - 1;

  const goPrev = useCallback(() => {
    if (index !== null && index > 0) onNavigate(index - 1);
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index !== null && index < items.length - 1) onNavigate(index + 1);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") (locale === "he" ? goNext : goPrev)();
      if (e.key === "ArrowRight") (locale === "he" ? goPrev : goNext)();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext, locale]);

  if (!open || !current) return null;

  const meta = getImageMeta(current.src);
  const closeLabel = locale === "he" ? "סגירה" : "Close";
  const prevLabel = locale === "he" ? "תמונה קודמת" : "Previous image";
  const nextLabel = locale === "he" ? "תמונה הבאה" : "Next image";

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        ×
      </button>

      {hasPrev && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label={prevLabel}
        >
          ‹
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label={nextLabel}
        >
          ›
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrap">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            quality={IMAGE_QUALITY}
            placeholder={meta?.blurDataURL ? "blur" : "empty"}
            blurDataURL={meta?.blurDataURL}
            className="object-contain"
          />
        </div>
        {current.caption && (
          <figcaption className="lightbox-caption">{current.caption}</figcaption>
        )}
      </figure>
    </div>
  );
}
