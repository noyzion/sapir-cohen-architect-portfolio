"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioSlideshow } from "@/components/ui/PortfolioSlideshow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import {
  getPortfolioSlideshowImages,
  getPortfolioSlideshowTiming,
} from "@/lib/portfolioSlideshow";

export function Portfolio() {
  const { locale, t } = useLanguage();
  const { projects } = useContent();

  return (
    <section id="portfolio" className="section-pad bg-white">
      <div className="container-site">
        <SectionHeader
          title={pick(t.portfolio.title, locale)}
          subtitle={pick(t.portfolio.subtitle, locale)}
        />

        <div className="space-y-10 max-lg:space-y-9 lg:space-y-16">
          {projects.map((project, i) => {
            const imageOnStart = i % 2 === 0;

            const slideshowImages = getPortfolioSlideshowImages(project);
            const { intervalMs, fadeMs } = getPortfolioSlideshowTiming(
              project.slug
            );
            const projectLocation = project.location?.[locale]
              ? pick(project.location, locale)
              : null;
            const slideshowAlt = projectLocation
              ? `${pick(project.name, locale)} – ${pick(project.type, locale)}, ${projectLocation}`
              : `${pick(project.name, locale)} – ${pick(project.type, locale)}`;

            const media = (
              <Link
                href={`/projects/${project.slug}`}
                className="group project-media block aspect-[4/3] lg:aspect-[16/10]"
              >
                <PortfolioSlideshow
                  images={slideshowImages}
                  alt={slideshowAlt}
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
                  {project.location?.[locale] &&
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
                className={`portfolio-project gap-6 max-lg:flex max-lg:gap-5 lg:grid lg:items-center lg:gap-14 ${
                  imageOnStart
                    ? "max-lg:flex-col lg:grid-cols-[1.15fr_1fr]"
                    : "max-lg:flex-col-reverse lg:grid-cols-[1fr_1.15fr]"
                }`}
              >
                {imageOnStart ? (
                  <>
                    {media}
                    {copy}
                  </>
                ) : (
                  <>
                    {copy}
                    {media}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
