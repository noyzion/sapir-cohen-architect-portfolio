import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteCopy = await getSiteCopy();
  return {
    title: `${siteCopy.privacy.title.he} | ${siteCopy.brand.he}`,
    description: siteCopy.privacy.intro.he.slice(0, 160),
  };
}

export default function PrivacyPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <LegalDocument docKey="privacy" />
    </div>
  );
}
