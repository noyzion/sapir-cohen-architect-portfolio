"use client";

import { useMemo, useState } from "react";
import type { GalleryPhase, Locale, ProjectImage as ProjectImageType } from "@/types";
import { pick } from "@/context/LanguageContext";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";

const PHASE_ORDER: GalleryPhase[] = ["before", "after"];

const phaseSectionTitle: Record<GalleryPhase, Record<Locale, string>> = {
  before: { he: "לפני", en: "Before" },
  after: { he: "אחרי", en: "After" },
};

type ProjectGalleryProps = {
  gallery: ProjectImageType[];
  fallbackAlt: string;
  locale: Locale;
  title?: string;
  className?: string;
};

function imageAlt(
  img: ProjectImageType,
  locale: Locale,
  phase: GalleryPhase | null | undefined,
  imageNumber: number
) {
  if (img.caption) {
    const room = pick(img.caption, locale);
    if (phase) return `${phaseSectionTitle[phase][locale]}, ${room}`;
    return room;
  }
  if (phase) return phaseSectionTitle[phase][locale];
  return locale === "he" ? `תמונה ${imageNumber}` : `Image ${imageNumber}`;
}

export function ProjectGallery({
  gallery,
  fallbackAlt,
  locale,
  title,
  className = "",
}: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasPhases = gallery.some((img) => img.phase);

  const sections = useMemo(() => {
    if (!hasPhases) return [{ phase: null as GalleryPhase | null, items: gallery }];
    return PHASE_ORDER.map((phase) => ({
      phase,
      items: gallery.filter((img) => img.phase === phase),
    })).filter((section) => section.items.length > 0);
  }, [gallery, hasPhases]);

  const flatItems: LightboxItem[] = useMemo(() => {
    let imageNumber = 0;
    return sections.flatMap((section) =>
      section.items.map((img) => {
        imageNumber += 1;
        return {
          src: img.src,
          alt: imageAlt(
            img,
            locale,
            section.phase ?? img.phase,
            imageNumber
          ),
          caption: img.caption ? pick(img.caption, locale) : null,
        };
      })
    );
  }, [sections, locale]);

  const indexedSections = useMemo(() => {
    let index = 0;
    return sections.map((section) => ({
      ...section,
      items: section.items.map((img) => ({ img, index: index++ })),
    }));
  }, [sections]);

  const expandLabel = locale === "he" ? "הגדלת תמונה" : "Enlarge image";

  return (
    <>
      <div className={`space-y-10 md:space-y-12 ${className}`}>
        {indexedSections.map((section) => (
          <section key={section.phase ?? "all"}>
            {section.phase && (
              <h2 className="label-caps mb-6 text-stone-500">
                {phaseSectionTitle[section.phase][locale]}
              </h2>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3">
              {section.items.map(({ img, index }) => {
                const caption = flatItems[index]?.caption;
                const alt = flatItems[index]?.alt ?? fallbackAlt;

                return (
                  <figure key={img.src} className="gallery-item">
                    <button
                      type="button"
                      className="gallery-thumb group w-full text-start"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`${expandLabel}: ${alt}`}
                    >
                      <span className="project-media relative block aspect-[4/3]">
                        <ProjectImage
                          src={img.src}
                          alt={alt}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <span className="gallery-zoom-hint" aria-hidden>
                          +
                        </span>
                      </span>
                    </button>
                    {caption && (
                      <figcaption className="gallery-caption">{caption}</figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <ImageLightbox
        items={flatItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        locale={locale}
      />
    </>
  );
}
