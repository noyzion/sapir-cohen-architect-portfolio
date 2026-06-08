import type { SiteTheme } from "@/types";

/** Default visual theme — matches the shipped site design. */
export const siteTheme: SiteTheme = {
  colors: {
    ink: "#0a0a0a",
    inkSoft: "#141414",
    text: "#57534e",
    textMuted: "#78716c",
    textSubtle: "#a8a29e",
    surfaceWarm: "#fcfbfa",
    surfaceWhite: "#ffffff",
    pageBackground: "#ffffff",
  },
  borders: {
    color: "#e7e5e4",
    colorLight: "#f5f5f4",
    colorStrong: "#d6d3d1",
    width: "1px",
    widthStrong: "2px",
    radius: "0px",
  },
  hero: {
    panelBackground: "#ffffff",
    panelBorder: "#e7e5e4",
    cornerColor: "#a8a29e",
    titleColor: "#1a1a1a",
    subtitleColor: "#8a8a8a",
    accentBar: "#dcdcdc",
    sectionBorder: "#e7e5e4",
  },
  cards: {
    background: "#ffffff",
    border: "#e7e5e4",
    shadow: "0 12px 36px rgb(28 25 23 / 0.035)",
  },
  featured: {
    background: "#0a0a0a",
    text: "#ffffff",
    textMuted: "rgba(255, 255, 255, 0.75)",
    border: "#0a0a0a",
    badgeBackground: "#ffffff",
    badgeBorder: "#0a0a0a",
    badgeText: "#0a0a0a",
    innerBorder: "#ffffff",
  },
  buttons: {
    primaryBackground: "#0a0a0a",
    primaryText: "#ffffff",
    primaryHover: "#141414",
    outlineBorder: "#d6d3d1",
    outlineText: "#0a0a0a",
    ghostHoverBorder: "#d6d3d1",
  },
  header: {
    border: "rgba(231, 229, 228, 0.9)",
    background: "#fcfbfa",
    backgroundScrolled: "#ffffff",
  },
  forms: {
    inputBorder: "#e7e5e4",
    inputBackground: "#ffffff",
    inputText: "#0a0a0a",
  },
  footer: {
    background: "#fcfbfa",
    border: "rgba(231, 229, 228, 0.5)",
  },
  accents: {
    selectionBackground: "#0a0a0a",
    selectionText: "#ffffff",
    focusRing: "#0a0a0a",
    sectionRule: "#0a0a0a",
    linkUnderline: "rgba(10, 10, 10, 0.3)",
  },
  about: {
    portraitBorder: "#e7e5e4",
    portraitBackground: "#f5f5f4",
    portraitPlaceholderBorder: "#d6d3d1",
    highlightBorder: "rgba(10, 10, 10, 0.2)",
  },
  project: {
    mediaBorder: "#e7e5e4",
    overlay: "rgba(10, 10, 10, 0.08)",
  },
};
