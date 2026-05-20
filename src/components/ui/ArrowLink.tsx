"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  children: React.ReactNode;
};

export function ArrowLink({ children, className = "", ...props }: Props) {
  const { dir } = useLanguage();
  const arrow = dir === "rtl" ? "←" : "→";

  return (
    <Link className={`link-arrow ${className}`} {...props}>
      {children}
      <span aria-hidden>{arrow}</span>
    </Link>
  );
}
