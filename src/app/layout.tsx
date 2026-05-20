import type { Metadata } from "next";
import { Heebo, Outfit, DM_Serif_Display } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
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

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
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
        className={`${heebo.variable} ${outfit.variable} ${dmSerif.variable} font-body`}
      >
        <LanguageProvider>
          <Header />
          <main className="has-sticky-cta">{children}</main>
          <Footer />
          <StickyCta />
        </LanguageProvider>
      </body>
    </html>
  );
}
