import type { ProjectImage } from "@/types";

const duplexGallery: ProjectImage[] = [
  {
    src: "/images/portfolio/duplex-ramat-aviv/01-before-living.webp",
    phase: "before",
    caption: { he: "סלון ומטבח", en: "Living & kitchen" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/03-before-stairs.webp",
    phase: "before",
    caption: { he: "גרם מדרגות", en: "Staircase" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/04-before-balcony.webp",
    phase: "before",
    caption: { he: "מרפסת", en: "Balcony" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/05-render-stairs.webp",
    phase: "after",
    caption: { he: "גרם מדרגות", en: "Staircase" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/06-render-living.webp",
    phase: "after",
    caption: { he: "סלון", en: "Living room" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/07-render-dining.webp",
    phase: "after",
    caption: { he: "פינת אוכל", en: "Dining area" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/08-render-open-plan.webp",
    phase: "after",
    caption: { he: "מטבח ופינת אוכל", en: "Kitchen & dining area" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/09-render-kitchen.webp",
    phase: "after",
    caption: { he: "מטבח", en: "Kitchen" },
  },
  {
    src: "/images/portfolio/duplex-ramat-aviv/10-render-bathroom.webp",
    phase: "after",
    caption: { he: "חדר רחצה", en: "Bathroom" },
  },
];

export const projectGalleries: Record<
  string,
  { gallery?: ProjectImage[]; renders?: ProjectImage[] }
> = {
  "duplex-ramat-aviv": {
    gallery: duplexGallery
      .filter((img) => img.phase === "before")
      .map(({ phase: _phase, ...img }) => img),
    renders: duplexGallery
      .filter((img) => img.phase === "after")
      .map(({ phase: _phase, ...img }) => img),
  },
  "beit-neve-yam": (() => {
    const neveYamGallery: ProjectImage[] = [
      {
        src: "/images/portfolio/beit-neve-yam/06.webp",
        phase: "before",
        caption: { he: "חלל מגורים", en: "Living space" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/07.webp",
        phase: "before",
        caption: { he: "מרפסת", en: "Balcony" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/08.webp",
        phase: "before",
        caption: { he: "מטבח", en: "Kitchen" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/09.webp",
        phase: "before",
        caption: { he: "גרם מדרגות", en: "Staircase" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/01.webp",
        phase: "after",
        caption: { he: "סלון", en: "Living room" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/02.webp",
        phase: "after",
        caption: { he: "מטבח", en: "Kitchen" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/03.webp",
        phase: "after",
        caption: { he: "חלל מגורים", en: "Living area" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/04.webp",
        phase: "after",
        caption: { he: "אוכל ומטבח", en: "Dining & kitchen" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/05.webp",
        phase: "after",
        caption: { he: "חדר רחצה", en: "Bathroom" },
      },
      {
        src: "/images/portfolio/beit-neve-yam/10.webp",
        phase: "after",
        caption: { he: "גרם מדרגות", en: "Staircase" },
      },
    ];
    return {
      gallery: neveYamGallery
        .filter((img) => img.phase === "before")
        .map(({ phase: _phase, ...img }) => img),
      renders: neveYamGallery
        .filter((img) => img.phase === "after")
        .map(({ phase: _phase, ...img }) => img),
    };
  })(),
  "joseph-bar": {
    gallery: ["01", "02", "03", "04", "05", "06"].map((n) => ({
      src: `/images/portfolio/joseph-bar/${n}.webp`,
    })),
  },
  "final-project": {
    gallery: [
      { src: "/images/portfolio/final-project/01-reception.webp" },
      { src: "/images/portfolio/final-project/02-living-stairs.webp" },
      { src: "/images/portfolio/final-project/03-lounge.webp" },
      { src: "/images/portfolio/final-project/04-reception-concrete.webp" },
      { src: "/images/portfolio/final-project/05-spa.webp" },
      { src: "/images/portfolio/final-project/06-pool.webp" },
      { src: "/images/portfolio/final-project/07-exterior.webp" },
    ],
  },
};
