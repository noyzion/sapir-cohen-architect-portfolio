import type { Metadata } from "next";
import { Heebo, Outfit, Plus_Jakarta_Sans, Josefin_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  title: "ספיר כהן | אדריכלות ועיצוב פנים",
  description:
    "אדריכלות ועיצוב פנים. תכנון מדויק, עיצוב על-זמני וחללים שמספרים את הסיפור שלכם.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={`${heebo.variable} ${outfit.variable} ${plusJakarta.variable} ${josefinSans.variable} font-body`}
      >
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
