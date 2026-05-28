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
      en: "Private home, Planning & interior design",
    },
    location: { he: "נווה ים", en: "Neve Yam" },
    description: {
      he: "בית למשפחה שרוצה להרגיש בחופשה, שאוהבת אור טבעי ולא מוכנה להתפשר על פרקטיקה ופונקציונליות. על ידי שימוש בקווים נקיים וחומרים טבעיים, יצירת שפה אחידה והרמונית שניתן להרגיש מכל פינה בבית.",
      en: "A home for a family that wants to feel on vacation, lovers of natural light who won't compromise on practicality. Clean lines and natural materials create a unified, harmonious language felt from every corner.",
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
      en: "Apartment, Architecture & interior design",
    },
    location: { he: "רמת אביב", en: "Ramat Aviv" },
    description: {
      he: "דירה למשפחה דינמית המשלבת בין חיי עבודה אינטנסיביים לבין אהבה לחופש, סטייל ואירוח. הקו העיצובי מאפיין את המשפחה ומתבטא ביצירת חללים פתוחים ולא צפויים המאפיינים את אופי המשפחה.",
      en: "An apartment for a dynamic family balancing intensive work with love of freedom, style, and hosting. The design line characterizes the family through open, unexpected spaces that reflect their nature.",
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
      en: "Commercial, Restaurant renovation",
    },
    location: { he: "פחמים", en: "Pachmim" },
    description: {
      he: "מסעדה שעברה בין דורות ושאפה ליצירת שפה ייחודית. על בסיס הסיפור המשפחתי והאופי של המקום, בניתי קונספט שמבטא את החזון מכל זווית, שמתחיל בעיצוב ונגמר בצלחת.",
      en: "A restaurant passed between generations, aspiring to a unique language. Based on the family story and character of the place, I built a concept expressing the vision from design to the plate.",
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
      en: "Architecture & interior design",
    },
    location: { he: "תל אביב", en: "Tel Aviv" },
    description: {
      he: "הקונספט התבטא מתוך מחשבה על תחושות האדם המגיע לספא והציפיות שלו מהחוויה. הפרויקט מבטא תהליך של ניקוי רעלים, על ידי צורניות וחומריות של שינוי צורה ופירוק. מדמה את האדם שעובר תהליך שבסופו הגוף והנפש מתנקים.",
      en: "A concept born from the feelings of someone arriving at a spa and their expectations, expressing detox and renewal through form and materiality, like body and soul cleansed at the end of the process.",
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
