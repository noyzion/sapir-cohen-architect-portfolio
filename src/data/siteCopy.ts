import type { SiteCopy } from "@/types";
import {
  accessibilityStatementCopy,
  cookiesPolicyCopy,
  privacyPolicyCopy,
  termsOfUseCopy,
} from "@/data/legalCopy";

export const siteCopy: SiteCopy = {
  meta: {
    title: {
      he: "ספיר כהן | אדריכלות ועיצוב פנים",
      en: "Sapir Cohen | Architecture & Interior Design",
    },
    description: {
      he: "הנדסאית אדריכלות ומעצבת פנים. תכנון פונקציונלי, עיצוב נקי ועל-זמני, וחללים עם חותם אישי.",
      en: "Architectural technologist & interior designer. Functional planning, clean timeless design, spaces with a personal signature.",
    },
  },
  brand: { he: "ספיר כהן", en: "Sapir Cohen" },
  tagline: {
    he: "אדריכלות ועיצוב פנים",
    en: "Architecture & Interior Design",
  },
  nav: [
    { id: "about", href: "/about", label: { he: "אודות", en: "About" } },
    { id: "portfolio", href: "/#portfolio", label: { he: "תיק עבודות", en: "Portfolio" } },
    { id: "services", href: "/#services", label: { he: "שירותים", en: "Services" } },
  ],
  cta: {
    consult: { he: "ליצירת קשר", en: "Get in Touch" },
    portfolio: { he: "צפייה בתיק עבודות", en: "View portfolio" },
    packageDetails: { he: "לקבלת פרטים על המסלול", en: "Request package details" },
    viewProject: { he: "צפייה בפרויקט", en: "View Project" },
    send: { he: "שליחת פנייה", en: "Send Inquiry" },
    whatsapp: { he: "שליחה בוואטסאפ", en: "Message on WhatsApp" },
  },
  hero: {
    headline: { he: "ספיר כהן", en: "Sapir Cohen" },
    scrollHint: {
      he: "גלילה למטה לתוכן האתר",
      en: "Scroll down to explore the site",
    },
  },
  about: {
    title: { he: "אודות", en: "About" },
    intro: {
      he: "ספיר כהן",
      en: "Sapir Cohen",
    },
    credentials: {
      he: "אדריכלית ומעצבת פנים",
      en: "Architect & Interior Designer",
    },
    portraitImage: "",
    opening: [
      {
        he: "המפגש שלי עם עולם העיצוב התחיל מגיל צעיר, דרך ציור ואומנות ועד לסיום לימודים בשנקר בהצטיינות יתרה.",
        en: "My journey into the world of design began at a young age, through drawing, art, and a deep sensitivity to aesthetics. This path eventually led me to graduate from Shenkar with highest honors.",
      },
    ],
    approachIntro: {
      he: "הגישה המקצועית שלי מבוססת על",
      en: "My professional approach is rooted in",
    },
    approachPillars: [
      { he: "תכנון פונקציונלי", en: "functional planning" },
      {
        he: "חשיבה עיצובית נקייה ועל-זמנית",
        en: "clean and timeless design thinking",
      },
      { he: "כבוד לחומרים טבעיים", en: "respect for natural materials" },
      { he: "משחק נכון של אור יום", en: "the thoughtful use of daylight" },
      {
        he: "קווים מינימליסטיים שמייצרים שקט בעיניים ובלב",
        en: "minimalist lines that bring a sense of calm to both the eye and the heart",
      },
    ],
    highlight: {
      he: "בעיניי, הסוד של חלל מנצח טמון בפרטים הקטנים ביותר. אני מאמינה שאין פרויקט אחד שדומה למשנהו, פשוט כי אין לקוח שדומה לאחר. התשוקה שלי היא לרדת לרזולוציות התכנון הגבוהות ביותר, לדייק כל מפגש חומר וכל קו, כדי ליצור עבורכם מרחב בעל חותם ייחודי ובלתי נשכח, כזה שמספר את הסיפור האישי שלכם ולא של אף אחד אחר.",
      en: "I believe the secret to an exceptional space lies in the smallest details. No two projects are alike, because no two clients are alike. My passion is to work at the highest level of precision, refining every material junction, every proportion, and every line, in order to create a space with a distinct and memorable signature. A space that tells your story, and no one else's.",
    },
    closing: [
      {
        he: "מתוך הקשבה עמוקה לצרכים, לרצונות ולאורח החיים שלכם, המטרה הגדולה שלי היא ליצור עבורכם תהליך תכנון ועיצוב מסודר, שקוף ונעים, המקנה לכם ביטחון מלא ושקט להמשיך בשגרת החיים שלכם לצד התפתחות והגשמת החלומות שלכם.",
        en: "Through deep listening to your needs, desires, and lifestyle, my goal is to lead a planning and design process that feels structured, transparent, and pleasant. A process that gives you confidence, clarity, and peace of mind, while your vision gradually takes shape.",
      },
      {
        he: "יחד, מתוך קבלת החלטות נכונות, נתרגם את השאיפות שלכם לשפה עיצובית מזוקקת וניצור מרחב מגורים או עבודה איכותי, מדויק ומרגש שילווה אתכם לאורך זמן.",
        en: "Together, through thoughtful decisions and a clear design direction, we will translate your aspirations into a refined visual language and create a home or work environment that feels precise, elegant, and deeply personal. A space that stays with you over time.",
      },
    ],
  },
  services: {
    title: { he: "שירותים", en: "Services" },
    subtitle: {
      he: "שלושה מסלולים, בחרו את המסלול המתאים לשלב שבו אתם נמצאים",
      en: "Three design paths. Choose the one that fits where you are today.",
    },
    popular: { he: "מומלץ", en: "Recommended" },
    suitableLabel: { he: "למי זה מתאים", en: "Who is it for" },
    includesLabel: { he: "מה כלול", en: "What's included" },
    readMore: { he: "לפרטים נוספים", en: "Read more" },
    readLess: { he: "הצג פחות", en: "Show less" },
  },
  projectTypes: { title: { he: "סוגי פרויקטים", en: "Project Types" } },
  portfolio: {
    title: { he: "תיק עבודות", en: "Portfolio" },
    subtitle: {
      he: "כל פרויקט, סיפור אישי, מתורגם לשפה עיצובית ייחודית",
      en: "Every project tells a personal story through a distinct design language.",
    },
    viewProject: { he: "לצפייה בפרויקט", en: "View Project" },
    galleryTitle: { he: "גלריה", en: "Gallery" },
    rendersTitle: { he: "הדמיות וסקיצות", en: "Renders & sketches" },
    beforeTitle: { he: "לפני", en: "Before" },
    backToPortfolio: { he: "חזרה לתיק עבודות", en: "Back to portfolio" },
  },
  process: {
    title: { he: "תהליך העבודה", en: "Our process" },
    subtitle: {
      he: "תהליך מסודר ושקוף, מהקשבה ראשונית ועד חלל מוגמר",
      en: "A clear, calm process, from first conversation to finished space",
    },
  },
  contact: {
    title: { he: "בואו ניצור את החלל הבא שלכם", en: "Let's Create Your Next Space" },
    prompt: {
      he: "מתלבטים מאיפה להתחיל?",
      en: "Not sure where to begin?",
    },
    text: {
      he: "ספרו לי בקצרה על החלל, השלב שבו אתם נמצאים והחלום שלכם, ואחזור אליכם לתיאום שיחת היכרות.",
      en: "Tell me briefly about your space, where you are in the process, and what you are dreaming of. I'll get back to you to schedule an introductory call.",
    },
    locationLabel: { he: "מיקום", en: "Location" },
    location: { he: "תל אביב", en: "Tel Aviv" },
    areaLabel: { he: "אזורי עבודה", en: "Service Area" },
    area: { he: "פריסה ארצית", en: "Nationwide" },
    emailLabel: { he: "אימייל", en: "Email" },
    email: "sapircohenarc@gmail.com",
    whatsapp: "972524664443",
    form: {
      name: { he: "שם מלא", en: "Full Name" },
      phone: { he: "טלפון", en: "Phone" },
      email: { he: "אימייל", en: "Email" },
      projectType: { he: "סוג הפרויקט", en: "Project Type" },
      message: { he: "ספרו לי על הפרויקט", en: "Tell me about your project" },
      messagePlaceholder: {
        he: "איזה חלל, באיזה שלב אתם, ומה החלום שלכם...",
        en: "Which space are you planning, what stage are you currently at, and what are you hoping to create?",
      },
      projectTypeOptions: [
        { he: "בית פרטי / דירה", en: "Private home / apartment" },
        { he: "דופלקס / פנטהאוז", en: "Duplex / penthouse" },
        { he: "חלל מסחרי", en: "Commercial space" },
        { he: "שדרוג דירת קבלן", en: "Contractor apartment upgrade" },
        { he: "ייעוץ / קונספט", en: "Consultation / concept" },
        { he: "אחר", en: "Other" },
      ],
      privacyConsentBefore: {
        he: "אני מאשר/ת את ",
        en: "I agree to the ",
      },
      privacyConsentLink: {
        he: "מדיניות הפרטיות",
        en: "Privacy Policy",
      },
      privacyConsentAfter: {
        he: " ואת השימוש בפרטים שמסרתי לצורך יצירת קשר.",
        en: " and to the use of the details I provided for contact purposes.",
      },
    },
  },
  footer: {
    privacyLabel: { he: "מדיניות פרטיות", en: "Privacy Policy" },
    accessibilityLabel: { he: "הצהרת נגישות", en: "Accessibility Statement" },
    termsLabel: { he: "תנאי שימוש", en: "Terms of Use" },
    cookiesLabel: { he: "מדיניות Cookies", en: "Cookies Policy" },
  },
  privacy: privacyPolicyCopy,
  accessibility: accessibilityStatementCopy,
  terms: termsOfUseCopy,
  cookies: cookiesPolicyCopy,
  ctaBand: {
    afterPortfolio: {
      title: { he: "יש לכם פרויקט בראש?", en: "Have a project in mind?" },
      text: {
        he: "אשמח לשמוע, לייעץ ולבנות יחד את החלל הבא שלכם.",
        en: "I'd love to hear, advise, and build your next space together.",
      },
    },
  },
};

export const CONTACT_EMAIL = "sapircohenarc@gmail.com";
export const WHATSAPP_NUMBER = "972524664443";
