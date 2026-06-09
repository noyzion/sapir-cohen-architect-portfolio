import type { Metadata } from "next";
import { headers } from "next/headers";
import { Heebo, Outfit, Plus_Jakarta_Sans, Josefin_Sans } from "next/font/google";
import { DEFAULT_LOCALE, isLocale, localeDir } from "@/lib/i18n";
import { getSiteUrl, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME_HE } from "@/lib/seo";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body-en",
  weight: ["300", "400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-hero-en",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME_HE}`,
  },
  description: HOME_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const headerLocale = headersList.get("x-locale");
  const locale = headerLocale && isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} dir={localeDir(locale)} suppressHydrationWarning>
      <body
        className={`${heebo.variable} ${outfit.variable} ${plusJakarta.variable} ${josefinSans.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
