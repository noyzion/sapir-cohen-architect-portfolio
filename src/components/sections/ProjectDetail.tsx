"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { ButtonLink } from "@/components/ui/Button";

type Props = { project: Project };

export function ProjectDetail({ project }: Props) {
  const { locale, t, dir } = useLanguage();
  const name = pick(project.name, locale);
  const type = pick(project.type, locale);
  const location = project.location[locale]
    ? pick(project.location, locale)
    : null;
  const gallery = project.gallery ?? [];
  const renders = project.renders ?? [];
  const hasGallery = gallery.length > 0;
  const hasRenders = renders.length > 0;
  const backArrow = dir === "rtl" ? "→" : "←";

  return (
    <article className="project-detail">
      <div className="project-detail-hero project-media">
        <ProjectImage
          src={project.coverImage}
          alt={name}
          priority
          sizes="100vw"
          loading="eager"
        />
        <div className="project-detail-hero-shade" aria-hidden />
      </div>

      <div className="container-site project-detail-body">
        <div className="project-detail-back-bar">
          <Link
            href="/#portfolio"
            className="project-detail-back inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-ink md:text-body-sm"
          >
            <span aria-hidden>{backArrow}</span>
            {pick(t.portfolio.backToPortfolio, locale)}
          </Link>
        </div>

        <header className="project-detail-header">
          <p className="label-caps text-stone-400">
            {type}
            {location && `, ${location}`}
          </p>
          <h1 className="mt-4 font-display text-display-lg text-ink">{name}</h1>
          <p className="project-detail-desc mt-6 max-w-2xl text-prose-lg">
            {pick(project.description, locale)}
          </p>
        </header>

        {hasGallery && (
          <section className="project-detail-section" aria-labelledby="project-gallery">
            <h2 id="project-gallery" className="label-caps mb-8 text-stone-500">
              {hasRenders
                ? pick(t.portfolio.beforeTitle, locale)
                : pick(t.portfolio.galleryTitle, locale)}
            </h2>
            <ProjectGallery
              gallery={gallery}
              fallbackAlt={name}
              locale={locale}
            />
          </section>
        )}

        {hasRenders && (
          <section className="project-detail-section" aria-labelledby="project-renders">
            <h2 id="project-renders" className="label-caps mb-8 text-stone-500">
              {pick(t.portfolio.rendersTitle, locale)}
            </h2>
            <ProjectGallery
              gallery={renders}
              fallbackAlt={name}
              locale={locale}
            />
          </section>
        )}

        {!hasGallery && !hasRenders && (
          <section className="project-detail-section">
            <h2 className="label-caps mb-8 text-stone-500">
              {pick(t.portfolio.galleryTitle, locale)}
            </h2>
            <div className="project-media aspect-[16/9] max-w-4xl">
              <ProjectImage src={project.coverImage} alt={name} sizes="90vw" />
            </div>
          </section>
        )}

        <div className="project-detail-cta">
          <ButtonLink href="/#contact" variant="primary">
            {pick(t.cta.consult, locale)}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
