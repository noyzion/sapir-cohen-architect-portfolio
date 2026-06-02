import Link from "next/link";
import { isBlobConfigured } from "@/lib/blobAccess";
import { storeMode } from "@/lib/store";

export const dynamic = "force-dynamic";

const SECTIONS = [
  {
    href: "/admin/projects",
    title: "פרויקטים",
    desc: "הוספה, עריכה, מחיקה וסידור של פרויקטים בתיק העבודות, כולל תמונות וגלריות.",
  },
  {
    href: "/admin/texts",
    title: "טקסטים באתר",
    desc: "עריכת כל הטקסטים: שער, אודות, יצירת קשר, תפריט, אימייל וכותרות.",
  },
  {
    href: "/admin/services",
    title: "שירותים",
    desc: "עריכת שלושת המסלולים, התיאורים ולמי הם מתאימים.",
  },
  {
    href: "/admin/types",
    title: "סוגי פרויקטים",
    desc: "עריכת רשימת סוגי הפרויקטים שמופיעה בעמוד הבית.",
  },
];

export default function AdminDashboard() {
  const mode = storeMode();
  const blobReady = isBlobConfigured();
  const redisReady = mode === "redis";

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1 className="admin-page__title">ברוכה הבאה 👋</h1>
          <p className="admin-page__desc">
            כאן ניתן לערוך את תוכן האתר. כל שינוי נשמר ומתעדכן באתר אוטומטית.
          </p>
        </div>
      </div>

      {(!redisReady || !blobReady) && (
        <div className="admin-notice">
          <p className="admin-notice__title">להגדרה לפני שימוש בשרת:</p>
          <ul className="admin-notice__list">
            {!redisReady && (
              <li>
                אחסון התוכן עדיין לא מחובר (Upstash Redis). בסביבת הפיתוח השינויים
                נשמרים מקומית בלבד. בשרת יש לחבר אחסון כדי שהשמירה תעבוד.
              </li>
            )}
            {!blobReady && (
              <li>
                אחסון התמונות (Vercel Blob) לא מחובר. בסביבת הפיתוח התמונות נשמרות
                מקומית בתיקיית public/uploads.
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="admin-cards">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="admin-card">
            <h2 className="admin-card__title">{s.title}</h2>
            <p className="admin-card__desc">{s.desc}</p>
            <span className="admin-card__cta">פתיחה ←</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
