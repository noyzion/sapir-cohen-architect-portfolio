"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { projectTypes } from "@/data/projectTypes";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProjectTypes() {
  const { locale, t } = useLanguage();

  return (
    <section id="types" className="section-pad-sm border-y border-stone-200 bg-stone-50">
      <div className="container-site">
        <SectionHeader title={pick(t.projectTypes.title, locale)} />

        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {projectTypes.map((item, i) => (
            <li
              key={item.id}
              className="card card-pad transition-colors hover:border-ink hover:shadow-soft"
            >
              <span className="label-caps text-stone-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-body-sm leading-relaxed text-ink md:text-body">
                {pick(item.label, locale)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
