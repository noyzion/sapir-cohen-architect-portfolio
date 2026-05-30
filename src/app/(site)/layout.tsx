import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContentProvider } from "@/context/ContentContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { siteCopy } = await getAllContent();
  return {
    title: siteCopy.meta.title.he,
    description: siteCopy.meta.description.he,
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { siteCopy, projects, services, projectTypes } = await getAllContent();

  return (
    <LanguageProvider copy={siteCopy}>
      <ContentProvider value={{ projects, services, projectTypes }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </ContentProvider>
    </LanguageProvider>
  );
}
