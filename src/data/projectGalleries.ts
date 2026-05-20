import type { ProjectImage } from "@/types";

export const projectGalleries: Record<
  string,
  { gallery?: ProjectImage[]; renders?: ProjectImage[] }
> = {
  "duplex-ramat-aviv": {
    gallery: [
      {
        src: "/images/portfolio/duplex-ramat-aviv/01-before-living.webp",
        caption: {
          he: "סלון ומטבח  - לפני",
          en: "Living & kitchen  - before",
        },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/03-before-stairs.webp",
        caption: {
          he: "גרם מדרגות  - לפני",
          en: "Staircase  - before",
        },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/04-before-balcony.webp",
        caption: {
          he: "מרפסת  - לפני",
          en: "Balcony  - before",
        },
      },
    ],
    renders: [
      {
        src: "/images/portfolio/duplex-ramat-aviv/07-render-dining.webp",
        caption: {
          he: "פינת אוכל  - הדמיה",
          en: "Dining area  - render",
        },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/08-render-open-plan.webp",
        caption: {
          he: "תכנון פתוח  - מטבח, אוכל ומגורים",
          en: "Open plan  - kitchen, dining & living",
        },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/06-render-living.webp",
        caption: { he: "סלון  - הדמיה", en: "Living room  - render" },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/09-render-kitchen.webp",
        caption: { he: "מטבח  - הדמיה", en: "Kitchen  - render" },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/05-render-stairs.webp",
        caption: {
          he: "גרם מדרגות  - הדמיה",
          en: "Staircase  - render",
        },
      },
      {
        src: "/images/portfolio/duplex-ramat-aviv/10-render-bathroom.webp",
        caption: {
          he: "חדר רחצה ראשי  - הדמיה",
          en: "Master bathroom  - render",
        },
      },
    ],
  },
  "beit-neve-yam": {
    gallery: [
      { src: "/images/portfolio/beit-neve-yam/02.webp" },
      { src: "/images/portfolio/beit-neve-yam/01.webp" },
      { src: "/images/portfolio/beit-neve-yam/03.webp" },
      { src: "/images/portfolio/beit-neve-yam/04.webp" },
      { src: "/images/portfolio/beit-neve-yam/05.webp" },
      { src: "/images/portfolio/beit-neve-yam/06.webp" },
      { src: "/images/portfolio/beit-neve-yam/07.webp" },
      { src: "/images/portfolio/beit-neve-yam/08.webp" },
    ],
  },
  "joseph-bar": {
    gallery: [
      { src: "/images/portfolio/joseph-bar/01.webp" },
      { src: "/images/portfolio/joseph-bar/02.webp" },
      { src: "/images/portfolio/joseph-bar/06.webp" },
      { src: "/images/portfolio/joseph-bar/05.webp" },
      { src: "/images/portfolio/joseph-bar/04.webp" },
      { src: "/images/portfolio/joseph-bar/03.webp" },
    ],
  },
  "final-project": {
    gallery: [
      { src: "/images/portfolio/final-project/07-exterior.webp" },
      { src: "/images/portfolio/final-project/06-pool.webp" },
      { src: "/images/portfolio/final-project/05-spa.webp" },
      { src: "/images/portfolio/final-project/01-reception.webp" },
      { src: "/images/portfolio/final-project/04-reception-concrete.webp" },
      { src: "/images/portfolio/final-project/03-lounge.webp" },
      { src: "/images/portfolio/final-project/02-living-stairs.webp" },
    ],
  },
};
