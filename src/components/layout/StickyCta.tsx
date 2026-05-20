"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, pick } from "@/context/LanguageContext";

export function StickyCta() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur-sm p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      role="complementary"
    >
      <Link href="#contact" className="btn-primary w-full">
        {pick(t.cta.consult, locale)}
      </Link>
    </div>
  );
}
