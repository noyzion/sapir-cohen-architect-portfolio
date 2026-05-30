"use client";

import { createContext, useContext } from "react";
import type { Project, ProjectType, ServicePackage } from "@/types";

export type ContentValue = {
  projects: Project[];
  services: ServicePackage[];
  projectTypes: ProjectType[];
};

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: ContentValue;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
