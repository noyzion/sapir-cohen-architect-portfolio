import type { ServicePackage } from "@/types";

export const servicePackages: ServicePackage[] = [
  {
    id: "light",
    tier: "LIGHT",
    name: {
      he: "ייעוץ ממוקד וגיבוש קונספט",
      en: "Focused consultation & concept",
    },
    summary: {
      he: "כיוון מקצועי, לוח השראה וסקיצה ראשונית ליציאה עצמאית לדרך.",
      en: "Professional direction, mood board, and an initial sketch to move forward on your own.",
    },
    description: {
      he: "פגישה ממוקדת לבחינת הפוטנציאל של החלל שתעניק לכם כיוון וביטחון ליציאה לדרך עצמאית.",
      en: "A focused session to assess your space's potential, giving you direction and confidence to move forward on your own.",
    },
    suitableFor: {
      he: "לקוחות שמרגישים שהם צריכים זריקת כיוון מקצועית, סדר ובהירות בתהליך.",
      en: "Clients who feel they need a professional direction boost, order, and clarity in the process.",
    },
    highlights: [
      { he: "פגישת ייעוץ ממוקדת", en: "Focused consultation" },
      { he: "לוח השראה דיגיטלי", en: "Digital mood board" },
      { he: "פלטת חומרים וגוונים", en: "Materials & color palette" },
      { he: "סקיצת העמדה ראשונית", en: "Initial layout sketch" },
    ],
  },
  {
    id: "smart",
    tier: "SMART",
    featured: true,
    name: {
      he: "תכנון אדריכלי ועיצוב פנים מקיף",
      en: "Architectural planning & interior design",
    },
    summary: {
      he: "המעטפת המלאה: קונספט, הדמיות תלת-ממד ותוכניות עבודה לביצוע.",
      en: "The full envelope: concept, 3D visualizations, and working drawings for execution.",
    },
    description: {
      he: "מעטפת תכנונית מלאה והפקת סט תוכניות עבודה מפורטות לביצוע בשטח.",
      en: "A full planning envelope and a detailed set of working drawings for on-site execution.",
    },
    suitableFor: {
      he: "לקוחות שצריכים תוכניות מקצועיות כדי לצאת לביצוע מול קבלן.",
      en: "Clients who need professional plans to execute with a contractor.",
    },
    highlights: [
      { he: "סקיצות רעיוניות", en: "Concept sketches" },
      { he: "הדמיות תלת-ממד פוטו-ריאליסטיות", en: "Photorealistic 3D renders" },
      { he: "סט תוכניות עבודה לביצוע", en: "Working drawing set" },
    ],
  },
  {
    id: "premium",
    tier: "PREMIUM",
    name: {
      he: "ליווי וניהול אמנותי מלא",
      en: "Full artistic direction & management",
    },
    summary: {
      he: "שקט נפשי מא' עד ת': רכש, פיקוח בשטח וסטיילינג מסכם.",
      en: "Peace of mind from A to Z: sourcing, site supervision, and final styling.",
    },
    description: {
      he: "שקט נפשי מא׳ עד ת׳. ליווי אישי צמוד הנותן מעטפת מלאה לכל הצרכים שלכם בפרויקט.",
      en: "Peace of mind from A to Z. Close personal guidance providing a full envelope for all your project needs.",
    },
    suitableFor: {
      he: "לקוחות שרוצים מעטפת תכנונית ועיצובית מלאה ללא פשרות.",
      en: "Clients who want a complete, no-compromise planning and design envelope.",
    },
    highlights: [
      { he: "ליווי אישי לימי רכש", en: "Personal sourcing days" },
      { he: "תיאום מול ספקים ואנשי מקצוע", en: "Vendor coordination" },
      { he: "פיקוח בשטח", en: "Site supervision" },
      { he: "יום הלבשה וסטיילינג", en: "Final styling day" },
    ],
  },
];
