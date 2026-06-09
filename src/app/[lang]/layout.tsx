import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContentProvider } from "@/context/ContentContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeStyles } from "@/components/site/ThemeStyles";
import { SkipLink } from "@/components/a11y/SkipLink";
import { AccessibilityToolbar } from "@/components/a11y/AccessibilityToolbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllContent } from "@/lib/content";
import { LOCALES, parseLocale } from "@/lib/i18n";
import { buildSiteGraphSchema, getDefaultOgImage } from "@/lib/seo";
import type { Locale } from "@/types";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = parseLocale((await params).lang);
  const { siteCopy, projects } = await getAllContent();
  const defaultImage = getDefaultOgImage(projects);

  return {
    openGraph: {
      siteName: siteCopy.brand[locale],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? ["en_US"] : ["he_IL"],
      ...(defaultImage
        ? {
            images: [
              {
                url: defaultImage,
                alt: `${siteCopy.brand[locale]} - ${siteCopy.tagline[locale]}`,
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

export default async function LangLayout({ children, params }: Props) {
  const locale: Locale = parseLocale((await params).lang);
  const { siteCopy, projects, services, projectTypes, siteTheme } =
    await getAllContent();

  return (
    <>
      <ThemeStyles theme={siteTheme} />
      <JsonLd data={buildSiteGraphSchema(siteCopy, locale)} />
      <LanguageProvider copy={siteCopy} locale={locale}>
        <ContentProvider value={{ projects, services, projectTypes }}>
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <AccessibilityToolbar />
        </ContentProvider>
      </LanguageProvider>
    </>
  );
}
