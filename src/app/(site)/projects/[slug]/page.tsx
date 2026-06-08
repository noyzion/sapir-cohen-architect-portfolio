import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug } from "@/lib/content";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import {
  buildProjectBreadcrumbSchema,
  buildProjectCreativeWorkSchema,
  buildProjectMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildProjectMetadata(project);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={buildProjectBreadcrumbSchema(project)} />
      <JsonLd data={buildProjectCreativeWorkSchema(project)} />
      <ProjectDetail project={project} />
    </>
  );
}
