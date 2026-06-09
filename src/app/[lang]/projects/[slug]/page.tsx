import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug } from "@/lib/content";
import { LOCALES, parseLocale } from "@/lib/i18n";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import {
  buildProjectBreadcrumbSchema,
  buildProjectCreativeWorkSchema,
  buildProjectMetadata,
  isPublicProjectSlug,
} from "@/lib/seo";
import { seedProjects } from "@/lib/seed";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const project of seedProjects) {
    if (isPublicProjectSlug(project.slug)) slugs.add(project.slug);
  }

  return LOCALES.flatMap((lang) =>
    [...slugs].map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = parseLocale(lang);
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildProjectMetadata(project, locale);
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = parseLocale(lang);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={buildProjectBreadcrumbSchema(project, locale)} />
      <JsonLd data={buildProjectCreativeWorkSchema(project, locale)} />
      <ProjectDetail project={project} />
    </>
  );
}
