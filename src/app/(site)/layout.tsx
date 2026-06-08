import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContentProvider } from "@/context/ContentContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllContent } from "@/lib/content";
import { buildSiteGraphSchema, getDefaultOgImage } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { siteCopy, projects } = await getAllContent();
  const defaultImage = getDefaultOgImage(projects);

  return {
    openGraph: {
      siteName: siteCopy.brand.he,
      locale: "he_IL",
      alternateLocale: ["en_US"],
      ...(defaultImage
        ? {
            images: [
              {
                url: defaultImage,
                alt: `${siteCopy.brand.he} – ${siteCopy.tagline.he}`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: defaultImage ? "summary_large_image" : "summary",
    },
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { siteCopy, projects, services, projectTypes } = await getAllContent();

  return (
    <>
      <JsonLd data={buildSiteGraphSchema(siteCopy)} />
      <LanguageProvider copy={siteCopy}>
        <ContentProvider value={{ projects, services, projectTypes }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </ContentProvider>
      </LanguageProvider>
    </>
  );
}
