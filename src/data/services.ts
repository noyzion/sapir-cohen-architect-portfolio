import type { ServicePackage } from "@/types";

export const servicePackages: ServicePackage[] = [
  {
    id: "light",
    tier: "LIGHT",
    name: {
      he: "ייעוץ וגיבוש קונספט",
      en: "Consultation & concept",
    },
    summary: {
      he: "כיוון מקצועי, לוח השראה וסקיצה ראשונית ליציאה עצמאית לדרך.",
      en: "Professional direction, mood board, and an initial sketch to move forward on your own.",
    },
    description: {
      he: "פגישה ממוקדת לבחינת הפוטנציאל של החלל, גיבוש פלטת חומרים וגוונים ולוח השראה דיגיטלי, לצד סקיצת העמדה ראשונית שתעניק לכם כיוון וביטחון ליציאה לדרך עצמאית.",
      en: "A focused session to assess your space's potential, define materials and tones, and deliver a digital mood board plus an initial layout sketch, giving you direction and confidence to move forward independently.",
    },
    suitableFor: {
      he: "מתאים לפני שיפוץ, לדירת קבלן או לחלל מסחרי שצריך זריקת כיוון וסדר בראש, עם תקציב מוגדר ורצון להמשיך ברכש באופן עצמאי.",
      en: "Ideal before a renovation, for a contractor apartment, or a commercial space that needs clarity and a defined budget while you manage purchases yourself.",
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
      he: "תכנון ועיצוב מקיף",
      en: "Full planning & design",
    },
    summary: {
      he: "המעטפת המלאה: קונספט, הדמיות תלת-ממד ותוכניות עבודה לביצוע.",
      en: "The full envelope: concept, 3D visualizations, and working drawings for execution.",
    },
    description: {
      he: "המעטפת התכנונית המלאה לחלל שלכם. משלב הסקיצות הרעיוניות, דרך הדמיות פוטו-ריאליסטיות תלת-ממדיות להמחשה מושלמת, ועד להפקת סט תוכניות עבודה מפורטות לביצוע עבור אנשי המקצוע בשטח.",
      en: "The full planning envelope, from concept sketches and photorealistic 3D visualizations to a detailed set of working drawings for execution on site.",
    },
    suitableFor: {
      he: "המסלול הפופולרי ביותר לשיפוץ או רכישה של בית, דירה או חלל מסחרי. מתאים למי שצריך תוכניות מלאות לביצוע מול קבלן ומנהל רכש ושטח בעצמו.",
      en: "Our most popular path for renovating or buying a home, apartment, or commercial space. For those who need complete plans for a contractor while managing procurement and site themselves.",
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
      he: "ליווי וניהול מלא",
      en: "Full direction & management",
    },
    summary: {
      he: "שקט נפשי מא' עד ת': רכש, פיקוח בשטח וסטיילינג מסכם.",
      en: "Peace of mind from A to Z: sourcing, site supervision, and final styling.",
    },
    description: {
      he: "שקט נפשי מא' ועד ת'. ליווי אישי צמוד לימי רכש וקניות מרוכזים בחנויות הספקים, תיאום מול אנשי מקצוע, פיקוח קפדני בשטח בנקודות המפתח, ויום הלבשה (סטיילינג) סופי להענקת הניצוץ האחרון והחותם הייחודי לחלל שלכם.",
      en: "Peace of mind from A to Z, personal accompaniment on sourcing days, coordination with trades, key-site supervision, and a final styling day for your space's distinctive signature.",
    },
    suitableFor: {
      he: "למי שרוצה חלל יוצא דופן בלי פשרות, עם לו\"ז צפוף, ליווי צמוד לספקים ותוצאה ייחודית עם נגרות מותאמת. מותאם לתקציב גמיש יותר.",
      en: "For clients who want an exceptional space without compromise, a tight schedule, hands-on supplier guidance, and custom carpentry. Suited to a more flexible budget.",
    },
    highlights: [
      { he: "ליווי אישי לימי רכש", en: "Personal sourcing days" },
      { he: "תיאום מול ספקים ואנשי מקצוע", en: "Vendor coordination" },
      { he: "פיקוח בשטח", en: "Site supervision" },
      { he: "יום הלבשה וסטיילינג", en: "Final styling day" },
    ],
  },
];
