"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/context/LanguageContext";
import { projectSummaries } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Portfolio() {
  const { locale, t } = useLanguage();

  return (
    <section id="portfolio" className="section-pad bg-white">
      <div className="container-site">
        <SectionHeader
          title={pick(t.portfolio.title, locale)}
          subtitle={pick(t.portfolio.subtitle, locale)}
        />

        <div className="space-y-16 md:space-y-24">
          {projectSummaries.map((project, i) => (
            <article
              key={project.id}
              className={`grid items-center gap-8 lg:gap-14 ${
                i % 2 === 1
                  ? "lg:grid-cols-[1fr_1.15fr]"
                  : "lg:grid-cols-[1.15fr_1fr]"
              }`}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`group project-media block aspect-[4/3] lg:aspect-[16/10] ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <ProjectImage
                  src={project.thumbnailImage}
                  alt={pick(project.name, locale)}
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 55vw, 600px"
                />
                <span className="project-media-overlay" />
              </Link>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
