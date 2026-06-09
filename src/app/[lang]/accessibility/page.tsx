import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { getSiteCopy } from "@/lib/content";
import { parseLocale } from "@/lib/i18n";
import { buildLegalMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).lang);
  const siteCopy = await getSiteCopy();
  return buildLegalMetadata(siteCopy, "accessibility", locale);
}

export default function AccessibilityPage() {
  return (
    <div className="pt-[4.25rem] md:pt-[4.5rem]">
      <LegalDocument docKey="accessibility" />
    </div>
  );
}
