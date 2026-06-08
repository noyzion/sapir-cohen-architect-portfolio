import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteCopy = await getSiteCopy();
  return {
    title: `${siteCopy.accessibility.title.he} | ${siteCopy.brand.he}`,
    description: siteCopy.accessibility.intro.he.slice(0, 160),
  };
}

export default function AccessibilityPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <LegalDocument docKey="accessibility" />
    </div>
  );
}
