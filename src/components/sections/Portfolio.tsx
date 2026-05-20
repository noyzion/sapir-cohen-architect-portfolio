"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { projectSummaries } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioSlideshow } from "@/components/ui/PortfolioSlideshow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import {
  getPortfolioSlideshowImages,
  getPortfolioSlideshowTiming,
} from "@/lib/portfolioSlideshow";

export function Portfolio() {
  const { locale, t } = useLanguage();

  return (
    <section id="portfolio" className="section-pad bg-white">
      <div className="container-site">
        <SectionHeader
          title={pick(t.portfolio.title, locale)}
          subtitle={pick(t.portfolio.subtitle, locale)}
        />

        <div className="space-y-14 max-lg:space-y-12 lg:space-y-24">
          {projectSummaries.map((project, i) => {
            const imageOnStart = i % 2 === 0;

            const slideshowImages = getPortfolioSlideshowImages(
              project.slug,
              project.coverImage,
              project.thumbnailImage
            );
            const { intervalMs, fadeMs } = getPortfolioSlideshowTiming(
              project.slug
            );

            const media = (
              <Link
                href={`/projects/${project.slug}`}
                className="group project-media block aspect-[4/3] lg:aspect-[16/10]"
              >
                <PortfolioSlideshow
                  images={slideshowImages}
                  alt={pick(project.name, locale)}
                  intervalMs={intervalMs}
                  fadeMs={fadeMs}
                  priority={i === 0}
                />
                <span className="project-media-overlay" />
              </Link>
            );

            const copy = (
              <div>
                <p className="label-caps">
                  {pick(project.type, locale)}
                  {project.location[locale] &&
                    `, ${pick(project.location, locale)}`}
                </p>
                <h3 className="mt-3 font-display text-display-lg text-ink">
                  {pick(project.name, locale)}
                </h3>
                <p className="mt-4 max-w-lg text-prose">
                  {pick(project.description, locale)}
                </p>
                <ArrowLink
                  href={`/projects/${project.slug}`}
                  className="mt-8"
                >
                  {pick(t.cta.viewProject, locale)}
                </ArrowLink>
              </div>
            );

            return (
              <article
                key={project.id}
                className={`portfolio-project grid grid-cols-1 items-center gap-6 max-lg:gap-5 lg:gap-14 ${
                  imageOnStart
                    ? "lg:grid-cols-[1.15fr_1fr]"
                    : "lg:grid-cols-[1fr_1.15fr]"
                }`}
              >
                <div
                  className={
                    imageOnStart
                      ? "portfolio-project__media lg:col-start-1"
                      : "portfolio-project__media lg:col-start-2"
                  }
                >
                  {media}
                </div>
                <div
                  className={
                    imageOnStart
                      ? "portfolio-project__copy lg:col-start-2"
                      : "portfolio-project__copy lg:col-start-1"
                  }
                >
                  {copy}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
