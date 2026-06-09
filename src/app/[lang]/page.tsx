import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Contact } from "@/components/sections/Contact";
import { getAllContent } from "@/lib/content";
import { parseLocale } from "@/lib/i18n";
import { buildHomeMetadata, getDefaultOgImage } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).lang);
  const { siteCopy, projects } = await getAllContent();
  return buildHomeMetadata(siteCopy, getDefaultOgImage(projects), locale);
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <ProjectTypes />
      <Contact />
    </>
  );
}
