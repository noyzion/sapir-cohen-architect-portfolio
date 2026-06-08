import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteCopy } from "@/lib/content";
import { buildLegalMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const siteCopy = await getSiteCopy();
  return buildLegalMetadata(siteCopy, "privacy");
}

export default function PrivacyPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <LegalDocument docKey="privacy" />
    </div>
  );
}
