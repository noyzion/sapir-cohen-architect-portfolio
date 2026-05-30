import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/content";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
