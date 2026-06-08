"use client";

import { LegalDocumentContent } from "@/components/legal/LegalDocumentContent";
import type { LegalDocKey } from "@/data/legalCopy";

type Props = {
  docKey: LegalDocKey;
};

export function LegalDocument({ docKey }: Props) {
  return (
    <article className="legal-page">
      <div className="container-site legal-page__inner">
        <LegalDocumentContent docKey={docKey} variant="page" />
      </div>
    </article>
  );
}
