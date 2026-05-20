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
      he: "פגישה ממוקדת לבחינת הפוטנציאל של החלל, גיבוש פלטת חומרים וגוונים ולוח השראה דיגיטלי, לצד סקיצת העמדה ראשונית שתעניק לכם כיוון וביטחון ליציאה לדרך עצמאית.",
      en: "A focused session to assess your space's potential, define materials and tones, and deliver a digital mood board plus an initial layout sketch, giving you direction and confidence to move forward independently.",
    },
    suitableFor: {
      he: "אם אתם עומדים לפני שיפוץ, או אם קניתם דירה מקבלן/שכרתם חלל מסחרי ואתם מרגישים שאתם צריכים \"זריקת כיוון\" מקצועית וסדר בראש כדי להמשיך את הרכישות עצמאית. מתאים במיוחד למי שמנהל פרויקט בתקציב מוגדר וממוקד, תוך קבלת החלטות תכנוניות חכמות וחסכוניות שימנעו טעויות יקרות בשטח.",
      en: "If you are facing a renovation, bought a contractor apartment, or leased a commercial space and need a professional \"direction boost\" and clarity to continue purchases on your own. Especially suited for those managing a defined, focused budget while making smart, economical planning decisions that prevent costly mistakes on site.",
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
      he: "המעטפת התכנונית המלאה לחלל שלכם. משלב הסקיצות הרעיוניות, דרך הדמיות פוטו-ריאליסטיות תלת-ממדיות להמחשה מושלמת, ועד להפקת סט תוכניות עבודה מפורטות לביצוע עבור אנשי המקצוע בשטח.",
      en: "The full planning envelope for your space-from concept sketches and photorealistic 3D visualizations to a detailed set of working drawings for execution by professionals on site.",
    },
    suitableFor: {
      he: "המסלול הפופולרי ביותר, המיועד למי שעומד בפני שיפוץ/רכישה כולל של בית, דירה או חלל מסחרי. מי שצריך את כל התוכניות המקצועיות כדי לצאת לביצוע מול קבלן, אבל מנהל את הרכש והשטח בעצמו. מסלול זה מותאם לניהול פרויקט עם תקציב מבוקר ומוגדר מראש.",
      en: "Our most popular path for a full home, apartment, or commercial renovation or purchase. For those who need complete professional plans to execute with a contractor while managing procurement and site themselves. Suited to project management with a controlled, predefined budget.",
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
      he: "שקט נפשי מא' ועד ת'. ליווי אישי צמוד לימי רכש וקניות מרוכזים בחנויות הספקים, תיאום מול אנשי מקצוע, פיקוח קפדני בשטח בנקודות המפתח, ויום הלבשה (סטיילינג) סופי להענקת הניצוץ האחרון והחותם הייחודי לחלל שלכם.",
      en: "Peace of mind from A to Z-personal accompaniment on sourcing days and focused supplier visits, coordination with trades, meticulous supervision at key site milestones, and a final styling day that adds the last spark and your space's unique signature.",
    },
    suitableFor: {
      he: "לקוחות שרוצים חלל יוצא דופן ויוצאים לדרך ללא פשרות. אם הלו\"ז שלכם צפוף ואתם רוצים להמשיך בשגרת החיים ובקריירה שלכם בזמן שהפרויקט מתקדם, מחפשים עין מקצועית שתלווה אתכם צעד-צעד בכל חנויות הספקים, ושואפים לתוצאה ייחודית בעלת חותם אישי ופרטי נגרות מורכבים. חבילה זו מכוונת לפרויקטים בעלי תקציב גמיש ורחב יותר, המאפשר השקעה בחומרי גלם וליווי VIP מקיף לאורך כל הדרך.",
      en: "Clients who want an exceptional space and a no-compromise journey. If your schedule is tight and you want to maintain daily life and career while the project progresses, need a professional eye step by step in every supplier showroom, and aspire to a unique result with a personal signature and complex custom carpentry. This package targets projects with a more flexible, generous budget, allowing investment in premium materials and comprehensive VIP guidance throughout.",
    },
    highlights: [
      { he: "ליווי אישי לימי רכש", en: "Personal sourcing days" },
      { he: "תיאום מול ספקים ואנשי מקצוע", en: "Vendor coordination" },
      { he: "פיקוח בשטח", en: "Site supervision" },
      { he: "יום הלבשה וסטיילינג", en: "Final styling day" },
    ],
  },
];
