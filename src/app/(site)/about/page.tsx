import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { getAllContent } from "@/lib/content";
import { buildAboutMetadata, getDefaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { siteCopy, projects } = await getAllContent();
  return buildAboutMetadata(siteCopy, getDefaultOgImage(projects));
}

export default function AboutPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <About />
    </div>
  );
}
