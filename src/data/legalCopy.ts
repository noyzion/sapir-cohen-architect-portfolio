import type { LegalPageCopy, LocalizedString } from "@/types";

const CONTACT_EMAIL = "sapircohenarc@gmail.com";

/** Legal / site entity naming (the website, not the person). */
export const SITE_ENTITY_HE = "האתר של ספיר כהן";
/** Same entity after ל- (without ה): «לאתר של ספיר כהן», not «להאתר». */
export const SITE_ENTITY_HE_AFTER_L = "אתר של ספיר כהן";
export const SITE_ENTITY_EN = "the Sapir Cohen website";

/** Display phone derived from WhatsApp number (972524664443 → 052-466-4433). */
export const CONTACT_PHONE_DISPLAY = "052-466-4433";

export const privacyPolicyCopy: LegalPageCopy = {
  title: { he: "מדיניות פרטיות", en: "Privacy Policy" },
  updatedAt: {
    he: "עודכן לאחרונה: 30 במאי 2026",
    en: "Last updated: May 30, 2026",
  },
  intro: {
    he: `מדיניות פרטיות זו מתארת כיצד ${SITE_ENTITY_HE} (להלן: «האתר») אוסף, משתמש, שומר ומגין על מידע אישי במסגרת השימוש בו, לרבות מילוי טופס יצירת הקשר.`,
    en: `This Privacy Policy describes how ${SITE_ENTITY_EN} ("the website") collects, uses, stores, and protects personal information when you use the site, including the contact form.`,
  },
  sections: [
    {
      heading: { he: "איזה מידע נאסף", en: "What information we collect" },
      paragraphs: [
        {
          he: "בעת מילוי טופס יצירת הקשר: שם, מספר טלפון, כתובת אימייל, סוג פרויקט ותוכן ההודעה.",
          en: "When you submit the contact form: name, phone number, email address, project type, and message content.",
        },
        {
          he: "בנוסף, המערכת עשויה לאסוף מידע טכני ושימושי, כגון כתובת IP, סוג דפדפן, מערכת הפעלה, נתוני שימוש באתר, עוגיות (Cookies) ונתוני אנליטיקה - בכפוף להגדרות הדפדפן והכלים המותקנים באתר.",
          en: "The site may also collect technical and usage data such as IP address, browser type, operating system, usage data, cookies, and analytics data - subject to browser settings and tools installed on the site.",
        },
      ],
    },
    {
      heading: { he: "מדוע אנו אוספים מידע", en: "Why we collect information" },
      paragraphs: [
        {
          he: "המידע משמש ליצירת קשר עם המשתמשים, מתן מענה לפניות, תיאום שיחות ייעוץ, מתן שירות, שיפור חוויית השימוש באתר, אבטחה ותפעול תקין.",
          en: "We use the information to contact users, respond to inquiries, schedule consultations, provide services, improve the website, and maintain security and proper operation.",
        },
        {
          he: "שימוש במידע לצורכי שיווק או דיוור ייעשה רק אם ניתנה הסכמה מפורשת לכך.",
          en: "Marketing or mailing-list use of your data will only occur with your explicit consent.",
        },
      ],
    },
    {
      heading: { he: "עם מי המידע עשוי להיות משותף", en: "Who information may be shared with" },
      paragraphs: [
        {
          he: "איננו מוכרים מידע אישי. המידע עשוי להיות מעובד על ידי ספקי שירות טכניים הנדרשים להפעלת האתר, וביניהם: ספק אחסון (Hosting), כלי אנליטיקה (אם מותקנים), כלי CRM או ניהול פניות, שירותי דוא\"ל, WhatsApp וספקי תשתית נוספים - וכל זאת אך ורק לצורך הפעלת האתר, מתן השירות ותפעולו.",
          en: "We do not sell personal data. Information may be processed by technical service providers required to operate the site, including hosting, analytics tools (if installed), CRM or inquiry tools, email services, WhatsApp, and other infrastructure providers - solely to operate the site and provide services.",
        },
      ],
    },
    {
      heading: { he: "משך שמירת המידע", en: "How long information is stored" },
      paragraphs: [
        {
          he: "המידע יישמר כל עוד נדרש לטיפול בפנייה, מתן השירות, ניהול הקשר עם הלקוח, או ככל שנדרש על פי דין, צרכים עסקיים מוצדקים או חובות שמירה.",
          en: "Information is retained as long as needed to handle the inquiry, provide services, manage the client relationship, or as required by law, legitimate business needs, or retention obligations.",
        },
      ],
    },
    {
      heading: { he: "זכויותיכם", en: "Your rights" },
      paragraphs: [
        {
          he: "בכפוף לדין החל, ניתן לפנות אלינו בבקשה לעיון במידע, לתיקון, למחיקה, או להסרה מרשימות דיוור/שיווק (אם רלוונטי).",
          en: "Subject to applicable law, you may request access, correction, deletion, or removal from mailing or marketing lists (where relevant).",
        },
      ],
    },
    {
      heading: { he: "עוגיות (Cookies)", en: "Cookies" },
      paragraphs: [
        {
          he: "האתר עשוי להשתמש בעוגיות ובכלי אנליטיקה. לפרטים נוספים, ראו את מדיניות העוגיות שלנו.",
          en: "The site may use cookies and analytics tools. For details, see our Cookies Policy.",
        },
        {
          he: "ניתן לחסום או למחוק עוגיות דרך הגדרות הדפדפן. חסימת עוגיות מסוימות עלולה להשפיע על חוויית השימוש באתר.",
          en: "You can block or delete cookies through your browser settings. Blocking certain cookies may affect your experience on the site.",
        },
      ],
    },
    {
      heading: { he: "יצירת קשר בנושא פרטיות", en: "Privacy contact" },
      paragraphs: [
        {
          he: `לפניות בנושא פרטיות: ${CONTACT_EMAIL} | טלפון: ${CONTACT_PHONE_DISPLAY}`,
          en: `Privacy inquiries: ${CONTACT_EMAIL} | Phone: ${CONTACT_PHONE_DISPLAY}`,
        },
      ],
    },
  ],
};

export const accessibilityStatementCopy: LegalPageCopy = {
  title: { he: "הצהרת נגישות", en: "Accessibility Statement" },
  updatedAt: {
    he: "תאריך עדכון ההצהרה: 9 ביוני 2026",
    en: "Statement last updated: June 9, 2026",
  },
  intro: {
    he: `${SITE_ENTITY_HE} מקדיש מאמצים להנגיש את עצמו לאנשים עם מוגבלות, על מנת לאפשר לכל אדם גלישה שוויונית, נוחה ועצמאית ככל האפשר.`,
    en: `${SITE_ENTITY_EN} is committed to making the site accessible to people with disabilities, so that every person can browse with equity, comfort, and independence wherever possible.`,
  },
  sections: [
    {
      heading: { he: "רמת הנגישות", en: "Accessibility level" },
      paragraphs: [
        {
          he: "האתר נבנה במטרה לעמוד בדרישות הנגישות בישראל ובעקרונות WCAG 2.1 ברמה AA, בכפוף ליכולות המערכת והכלים בשימוש.",
          en: "The site was built to meet Israeli accessibility requirements and WCAG 2.1 Level AA principles where possible, subject to platform capabilities.",
        },
      ],
    },
    {
      heading: { he: "התאמות נגישות שבוצעו", en: "Accessibility adaptations" },
      paragraphs: [
        {
          he: "בין היתר: ניווט מקלדת, דילוג לתוכן הראשי, היררכיית כותרות ברורה, טקסט חלופי (Alt) לתמונות במידת האפשר, סימון פוקוס ברור, ניגודיות קריאה, עיצוב רספונסיבי למובייל, תמיכה בקוראי מסך במידת האפשר, קישורים וכפתורים ברורים, תמיכה בכיווניות RTL/LTR, מעבר בין עברית לאנגלית (כולל שמירת בחירת שפה), והפחתת אנימציות למשתמשים שביקשו זאת בהגדרות המערכת.",
          en: "Including: keyboard navigation, skip to main content, clear heading hierarchy, alt text for images where possible, visible focus indicators, readable contrast, responsive mobile design, screen reader support where possible, clear links and buttons, RTL/LTR support, Hebrew/English switching (with language preference saved), and reduced motion for users who request it in system settings.",
        },
        {
          he: "באתר מותקן תפריט נגישות - כפתור קבוע בפינה השמאלית התחתונה עם אייקון. התפריט מאפשר: שינוי גודל טקסט בשלוש רמות (A- / A+), מצב ניגודיות גבוהה, הדגשת קישורים, גופן קריא, הקראת טקסט מסומן או תוכן העמוד הראשי ועצירת ההקראה (בהתאם לתמיכת הדפדפן, בעברית או באנגלית), איפוס הגדרות, וקישור להצהרת נגישות זו. העדפות הנגישות נשמרות בדפדפן.",
          en: "The site includes an accessibility menu - a fixed icon button at the bottom-left corner. The menu offers: text size in three levels (A- / A+), high contrast mode, link underlining, readable font, reading selected text or main page content and stopping playback (subject to browser support, in Hebrew or English), reset settings, and a link to this statement. Accessibility preferences are saved in the browser.",
        },
        {
          he: "בנוסף: גלריית תמונות (Lightbox) הניתנת לסגירה ולניווט במקלדת, חלונות משפטיים (כגון מדיניות פרטיות בטופס יצירת הקשר) עם סגירה במקלדת ומיקוד נגיש, וטופס יצירת קשר עם תוויות, הודעות שגיאה וקישור למדיניות הפרטיות.",
          en: "In addition: an image gallery lightbox that can be closed and navigated by keyboard, legal dialogs (such as the Privacy Policy in the contact form) with keyboard close and accessible focus, and a contact form with labels, error messages, and a link to the Privacy Policy.",
        },
      ],
    },
    {
      heading: { he: "רכיבים חיצוניים", en: "Third-party components" },
      paragraphs: [
        {
          he: "ייתכן שחלק מהרכיבים, השירותים או הקישורים החיצוניים (כגון WhatsApp) אינם בשליטת מפעילת האתר במלואם, ולכן ייתכנו פערי נגישות. אנו פועלים לשפר את הנגישות באופן שוטף.",
          en: "Some third-party components, services, or external links (such as WhatsApp) may not be fully controlled by the site owner, and accessibility gaps may exist. We work to improve accessibility on an ongoing basis.",
        },
      ],
    },
    {
      heading: { he: "רכזת נגישות", en: "Accessibility coordinator" },
      paragraphs: [
        {
          he: `שם: ספיר כהן | אימייל: ${CONTACT_EMAIL} | טלפון: ${CONTACT_PHONE_DISPLAY}`,
          en: `Name: Sapir Cohen | Email: ${CONTACT_EMAIL} | Phone: ${CONTACT_PHONE_DISPLAY}`,
        },
        {
          he: "נתקלתם בבעיית נגישות? נשמח לקבל פנייה, לטפל בה בהקדם האפשרי ולסייע.",
          en: "Encountered an accessibility issue? We welcome your report and will address it as soon as possible.",
        },
      ],
    },
  ],
};

export const termsOfUseCopy: LegalPageCopy = {
  title: { he: "תנאי שימוש", en: "Terms of Use" },
  updatedAt: {
    he: "עודכן לאחרונה: 30 במאי 2026",
    en: "Last updated: May 30, 2026",
  },
  intro: {
    he: `ברוכים הבאים ל${SITE_ENTITY_HE_AFTER_L}. השימוש באתר כפוף לתנאים המפורטים להלן. גלישה באתר ו/או שימוש בו מהווים הסכמה לתנאים אלה.`,
    en: `Welcome to ${SITE_ENTITY_EN}. Use of this site is subject to the terms below. Browsing or using the site constitutes acceptance of these terms.`,
  },
  sections: [
    {
      heading: { he: "מהות התוכן", en: "Nature of content" },
      paragraphs: [
        {
          he: "התוכן באתר מהווה מידע כללי על שירותי אדריכלות ועיצוב פנים, ואינו מהווה ייעוץ מקצועי אישי. כל החלטה מקצועית תיעשה לאחר התייעצות ישירה ובהתאם לנסיבות.",
          en: "Site content is general information about architecture and interior design services and does not replace personal professional consultation.",
        },
      ],
    },
    {
      heading: { he: "זכויות יוצרים", en: "Copyright" },
      paragraphs: [
        {
          he: "כל הטקסטים, התמונות, תמונות הפרויקטים, העיצוב, הלוגו, המיתוג ותוכן האתר שייכים לספיר כהן או נעשה בהם שימוש בהרשאה.",
          en: "All texts, images, project photos, design, logo, branding, and website content belong to Sapir Cohen or are used with permission.",
        },
        {
          he: "אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות שימוש מסחרי בתוכן האתר ללא אישור מראש ובכתב.",
          en: "Do not copy, reproduce, distribute, publish, or commercially use website content without prior written permission.",
        },
      ],
    },
    {
      heading: { he: "שינויים באתר", en: "Changes to the site" },
      paragraphs: [
        {
          he: "מפעילת האתר של ספיר כהן רשאית לעדכן, לשנות, להסיר או להוסיף תוכן, וכן לשנות את מבנה האתר, בכל עת וללא הודעה מוקדמת.",
          en: "The site owner may update, change, remove, or add content, or modify the site structure, at any time without prior notice.",
        },
      ],
    },
    {
      heading: { he: "זמינות האתר", en: "Site availability" },
      paragraphs: [
        {
          he: "אין התחייבות שהאתר יהיה זמין בכל עת, ללא תקלות או הפסקות. ייתכנו תקלות טכניות, תחזוקה או שינויים שיؤثرו על הזמינות.",
          en: "There is no guarantee that the site will be available continuously or error-free. Technical issues, maintenance, or changes may affect availability.",
        },
      ],
    },
    {
      heading: { he: "קישורים חיצוניים", en: "External links" },
      paragraphs: [
        {
          he: "קישורים לאתרים או שירותים חיצוניים (אם קיימים) מוצגים לנוחות המשתמש בלבד. אין לנו שליטה על תוכן או מדיניות של צדדים שלישיים.",
          en: "Links to external sites or services (if any) are provided for convenience only. We do not control third-party content or policies.",
        },
      ],
    },
    {
      heading: { he: "דין וסמכות שיפוט", en: "Governing law" },
      paragraphs: [
        {
          he: "על תנאי שימוש אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בישראל.",
          en: "These terms are governed by the laws of the State of Israel. Exclusive jurisdiction lies with the competent courts in Israel.",
        },
      ],
    },
  ],
};

export const cookiesPolicyCopy: LegalPageCopy = {
  title: { he: "מדיניות Cookies", en: "Cookies Policy" },
  updatedAt: {
    he: "עודכן לאחרונה: 30 במאי 2026",
    en: "Last updated: May 30, 2026",
  },
  intro: {
    he: `מדיניות זו מסבירה מהן עוגיות (Cookies), כיצד ${SITE_ENTITY_HE} עשוי להשתמש בהן, וכיצד ניתן לנהל אותן.`,
    en: `This policy explains what cookies are, how ${SITE_ENTITY_EN} may use them, and how you can manage them.`,
  },
  sections: [
    {
      heading: { he: "מהן עוגיות?", en: "What are cookies?" },
      paragraphs: [
        {
          he: "עוגיות הן קבצי טקסט קטנים הנשמרים במכשיר הגלישה שלכם. הן מאפשרות לזכור העדפות, לשפר את חוויית השימוש ו/או לאסוף מידע סטטיסטי על השימוש באתר.",
          en: "Cookies are small text files stored on your device. They help remember preferences, improve user experience, and/or collect statistical usage data.",
        },
      ],
    },
    {
      heading: { he: "סוגי עוגיות", en: "Types of cookies" },
      paragraphs: [
        {
          he: "עוגיות הכרחיות - נדרשות לתפקוד בסיסי של האתר.",
          en: "Essential cookies - required for basic site operation.",
        },
        {
          he: "עוגיות העדפות - לדוגמה, שמירת בחירת שפה (עברית/אנגלית) בדפדפן.",
          en: "Preference cookies - for example, remembering language choice (Hebrew/English) in the browser.",
        },
        {
          he: "עוגיות אנליטיקה - לניתוח שימוש באתר. נכון לעדכון מדיניות זו, לא מותקנים באתר Google Analytics, Meta Pixel או כלי שיווק דומים.",
          en: "Analytics cookies - for usage analysis. As of this policy update, Google Analytics, Meta Pixel, or similar marketing tools are not installed on this site.",
        },
        {
          he: "עוגיות שיווק - יופיעו רק אם יותקנו בעתיד ויינתן הסכם מתאים. כרגע לא נעשה שימוש בעוגיות שיווק.",
          en: "Marketing cookies - would only apply if installed in the future with appropriate consent. Marketing cookies are not currently used.",
        },
      ],
    },
    {
      heading: { he: "ניהול עוגיות", en: "Managing cookies" },
      paragraphs: [
        {
          he: "ניתן לחסום, למחוק או להגביל עוגיות דרך הגדרות הדפדפן. חסימת עוגיות מסוימות עלולה להשפיע על תפקוד חלק מהאתר.",
          en: "You can block, delete, or restrict cookies through your browser settings. Blocking certain cookies may affect some site functionality.",
        },
      ],
    },
    {
      heading: { he: "יצירת קשר", en: "Contact" },
      paragraphs: [
        {
          he: `לשאלות בנושא עוגיות: ${CONTACT_EMAIL}`,
          en: `Cookie inquiries: ${CONTACT_EMAIL}`,
        },
      ],
    },
  ],
};

/** Route slug for each legal document key. */
export const LEGAL_ROUTES = {
  privacy: "/privacy-policy",
  accessibility: "/accessibility",
  terms: "/terms-of-use",
  cookies: "/cookies",
} as const;

export type LegalDocKey = keyof typeof LEGAL_ROUTES;
