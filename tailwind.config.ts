import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#141414",
          muted: "#2a2a2a",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-body-en)",
          "system-ui",
          "sans-serif",
        ],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 7vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.5rem, 2.5vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" },
        ],
        body: ["1.0625rem", { lineHeight: "1.75" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.65" }],
        label: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.16em" },
        ],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 8rem)",
        "section-sm": "clamp(3.5rem, 8vw, 5rem)",
        gutter: "clamp(1.25rem, 4vw, 2.5rem)",
      },
      maxWidth: {
        prose: "42rem",
        content: "76rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(0, 0, 0, 0.05)",
        card: "0 20px 48px rgba(0, 0, 0, 0.07)",
        lift: "0 4px 24px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
