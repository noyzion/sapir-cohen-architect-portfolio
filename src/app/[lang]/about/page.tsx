import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { getAllContent } from "@/lib/content";
import { parseLocale } from "@/lib/i18n";
import { buildAboutMetadata, getDefaultOgImage } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).lang);
  const { siteCopy, projects } = await getAllContent();
  return buildAboutMetadata(siteCopy, getDefaultOgImage(projects), locale);
}

export default function AboutPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <About />
    </div>
  );
}
