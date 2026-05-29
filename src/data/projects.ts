import type { Project, ProjectSummary } from "@/types";

function thumbFromCover(coverImage: string): string {
  return coverImage.replace(/\.webp$/i, "-thumb.webp");
}

export const projectSummaries: ProjectSummary[] = [
  {
    id: "beit-neve-yam",
    slug: "beit-neve-yam",
    name: { he: "הבית בנווה ים", en: "The Neve Yam House" },
    type: {
      he: "בית פרטי, תכנון ועיצוב פנים",
      en: "Private Residence | Planning & Interior Design | Neve Yam",
    },
    location: { he: "נווה ים", en: "" },
    description: {
      he: "בית למשפחה שרוצה להרגיש בחופשה, שאוהבת אור טבעי ולא מוכנה להתפשר על פרקטיקה ופונקציונליות. על ידי שימוש בקווים נקיים וחומרים טבעיים, יצירת שפה אחידה והרמונית שניתן להרגיש מכל פינה בבית.",
      en: "A home designed for a family that wants to feel on vacation every day. Natural light, clean lines, and warm materials come together to create a practical yet refined living experience, with one harmonious design language flowing through every corner of the home.",
    },
    coverImage: "/images/portfolio/beit-neve-yam/02.webp",
    thumbnailImage: "/images/portfolio/beit-neve-yam/02-thumb.webp",
  },
  {
    id: "duplex-ramat-aviv",
    slug: "duplex-ramat-aviv",
    name: { he: "דופלקס ברמת אביב", en: "Ramat Aviv Duplex" },
    type: {
      he: "דירה, אדריכלות ועיצוב פנים",
      en: "Apartment | Architecture & Interior Design | Ramat Aviv",
    },
    location: { he: "רמת אביב", en: "" },
    description: {
      he: "דירה למשפחה דינמית המשלבת בין חיי עבודה אינטנסיביים לבין אהבה לחופש, סטייל ואירוח. הקו העיצובי מאפיין את המשפחה ומתבטא ביצירת חללים פתוחים ולא צפויים המאפיינים את אופי המשפחה.",
      en: "A duplex apartment designed for a dynamic family that balances a fast-paced lifestyle with a love for freedom, style, and hosting. The design reflects the family's character through open, unexpected spaces that feel both elegant and personal.",
    },
    coverImage: "/images/portfolio/duplex-ramat-aviv/cover.webp",
    thumbnailImage: "/images/portfolio/duplex-ramat-aviv/cover-thumb.webp",
  },
  {
    id: "joseph-bar",
    slug: "joseph-bar",
    name: { he: "ג'וזף בר פחמים", en: "Joseph Bar Pachmim" },
    type: {
      he: "מסחרי, שיפוץ מסעדה",
      en: "Commercial Space | Restaurant Renovation | Pachmim",
    },
    location: { he: "פחמים", en: "" },
    description: {
      he: "מסעדה שעברה בין דורות ושאפה ליצירת שפה ייחודית. על בסיס הסיפור המשפחתי והאופי של המקום, בניתי קונספט שמבטא את החזון מכל זווית, שמתחיל בעיצוב ונגמר בצלחת.",
      en: "A restaurant passed down through generations, reimagined with a fresh and distinctive design language. Inspired by the family story and the character of the place, the concept connects the restaurant's heritage with its future, from the spatial experience to the plate.",
    },
    coverImage: "/images/portfolio/joseph-bar/02.webp",
    thumbnailImage: "/images/portfolio/joseph-bar/02-thumb.webp",
  },
  {
    id: "final-project",
    slug: "final-project",
    name: { he: "פרויקט גמר", en: "Final Project" },
    type: {
      he: "אדריכלות ועיצוב פנים",
      en: "Architecture & Interior Design | Tel Aviv",
    },
    location: { he: "תל אביב", en: "" },
    description: {
      he: "הקונספט התבטא מתוך מחשבה על תחושות האדם המגיע לספא והציפיות שלו מהחוויה. הפרויקט מבטא תהליך של ניקוי רעלים, על ידי צורניות וחומריות של שינוי צורה ופירוק. מדמה את האדם שעובר תהליך שבסופו הגוף והנפש מתנקים.",
      en: "A conceptual project inspired by the emotional experience of arriving at a spa. Through form, materiality, and spatial flow, the design expresses a process of detox, renewal, and quiet transformation, as if both body and soul are cleansed by the end of the journey.",
    },
    coverImage: "/images/portfolio/final-project/06-pool.webp",
    thumbnailImage: "/images/portfolio/final-project/06-pool-thumb.webp",
  },
];

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const summary = projectSummaries.find((p) => p.slug === slug);
  if (!summary) return undefined;
  const { projectGalleries } = await import("@/data/projectGalleries");
  return {
    ...summary,
    ...projectGalleries[slug],
  };
}

export function getAllProjectSlugs(): string[] {
  return projectSummaries.map((p) => p.slug);
}
