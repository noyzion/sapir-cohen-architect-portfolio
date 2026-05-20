"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Process() {
  const { locale, t } = useLanguage();
  const stepCountLabel =
    locale === "he"
      ? `${processSteps.length} שלבים`
      : `${processSteps.length} steps`;

  return (
    <section id="process" className="process-section section-pad">
      <div className="container-site">
        <div className="process-header">
          <SectionHeader
            title={pick(t.process.title, locale)}
            subtitle={pick(t.process.subtitle, locale)}
            light
            className="!mb-0"
          />
          <p className="process-step-count label-caps">{stepCountLabel}</p>
        </div>

        <ol className="process-timeline" aria-label={pick(t.process.title, locale)}>
          {processSteps.map((step, index) => (
            <li key={step.id} className="process-step">
              <div className="process-step-rail" aria-hidden>
                <span className="process-marker">{step.id}</span>
                {index < processSteps.length - 1 && (
                  <span className="process-connector" />
                )}
              </div>

              <article className="process-card">
                <h3 className="process-card-title">
                  {pick(step.title, locale)}
                </h3>
                <p className="process-card-desc">
                  {pick(step.description, locale)}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
