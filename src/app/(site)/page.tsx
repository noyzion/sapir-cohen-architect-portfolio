import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Contact } from "@/components/sections/Contact";
import { getAllContent } from "@/lib/content";
import { buildHomeMetadata, getDefaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { siteCopy, projects } = await getAllContent();
  return buildHomeMetadata(siteCopy, getDefaultOgImage(projects));
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
