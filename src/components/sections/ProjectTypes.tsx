"use client";

import { useLanguage, pick } from "@/context/LanguageContext";
import { projectTypes } from "@/data/projectTypes";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProjectTypes() {
  const { locale, t } = useLanguage();

  return (
    <section id="types" className="section-pad-sm surface-warm">
      <div className="container-site">
        <SectionHeader title={pick(t.projectTypes.title, locale)} />

        <ul className="flex max-w-3xl flex-col gap-4">
          {projectTypes.map((item, i) => (
            <li
              key={item.id}
              className="card card-pad flex items-center gap-5 transition-colors hover:border-ink hover:shadow-soft"
            >
              <span className="label-caps shrink-0 text-stone-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-body-sm leading-relaxed text-ink md:text-body">
                {pick(item.label, locale)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
