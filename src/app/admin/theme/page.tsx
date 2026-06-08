import { ThemeEditor } from "@/components/admin/ThemeEditor";

export const dynamic = "force-dynamic";

export default function AdminThemePage() {
  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1 className="admin-page__title">עיצוב האתר</h1>
          <p className="admin-page__desc">
            עריכת צבעים, מסגרות, כפתורים, שער, כרטיסים, מסלול מומלץ ועוד. השינויים
            מתעדכנים באתר מיד אחרי שמירה.
          </p>
        </div>
      </div>
      <ThemeEditor />
    </div>
  );
}
