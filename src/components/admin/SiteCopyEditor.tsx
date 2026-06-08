"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { humanizeFieldKey, JsonNode } from "@/components/admin/JsonEditor";
import type { SiteCopy } from "@/types";

type SiteCopySection = {
  id: string;
  label: string;
  hint: string;
  keys: (keyof SiteCopy)[];
};

const SITE_COPY_SECTIONS: SiteCopySection[] = [
  {
    id: "general",
    label: "כללי - מותג, תפריט ו-SEO",
    hint: "כל האתר",
    keys: ["meta", "brand", "nav", "cta", "footer"],
  },
  {
    id: "hero",
    label: "דף הבית - שער (Hero)",
    hint: "דף הבית - שם, כותרת משנה ורמז גלילה",
    keys: ["hero"],
  },
  {
    id: "portfolio",
    label: "דף הבית - תיק עבודות",
    hint: "/#portfolio",
    keys: ["portfolio", "projectTypes", "ctaBand"],
  },
  {
    id: "services",
    label: "דף הבית - שירותים",
    hint: "/#services",
    keys: ["services"],
  },
  {
    id: "contact",
    label: "דף הבית - יצירת קשר",
    hint: "/#contact",
    keys: ["contact"],
  },
  {
    id: "about",
    label: "עמוד אודות",
    hint: "/about",
    keys: ["about"],
  },
  {
    id: "process",
    label: "תהליך העבודה",
    hint: "טקסטים לקטע תהליך (אם מוצג באתר)",
    keys: ["process"],
  },
  {
    id: "privacy",
    label: "מדיניות פרטיות",
    hint: "/privacy-policy",
    keys: ["privacy"],
  },
  {
    id: "accessibility",
    label: "הצהרת נגישות",
    hint: "/accessibility",
    keys: ["accessibility"],
  },
  {
    id: "terms",
    label: "תנאי שימוש",
    hint: "/terms-of-use",
    keys: ["terms"],
  },
  {
    id: "cookies",
    label: "מדיניות Cookies",
    hint: "/cookies",
    keys: ["cookies"],
  },
];

function sanitizeSiteCopy(copy: SiteCopy): SiteCopy {
  return {
    ...copy,
    hero: {
      headline: copy.hero.headline,
      scrollHint: copy.hero.scrollHint,
    },
  };
}

function HeroSectionEditor({
  data,
  setData,
}: {
  data: SiteCopy;
  setData: (next: SiteCopy) => void;
}) {
  return (
    <>
      <JsonNode
        fieldKey="headline"
        label="שם בשער (מוצג תמיד באנגלית — ערכו את שדה EN)"
        value={data.hero.headline}
        onChange={(next) =>
          setData({
            ...data,
            hero: { ...data.hero, headline: next as SiteCopy["hero"]["headline"] },
          })
        }
      />
      <JsonNode
        fieldKey="tagline"
        label="כותרת משנה בשער (מוצגת תמיד באנגלית — EN; HE מופיע בפוטר בעברית)"
        value={data.tagline}
        onChange={(next) =>
          setData({ ...data, tagline: next as SiteCopy["tagline"] })
        }
      />
      <JsonNode
        fieldKey="scrollHint"
        label="רמז גלילה (נגישות - כפתור בתחתית השער)"
        value={data.hero.scrollHint}
        onChange={(next) =>
          setData({
            ...data,
            hero: { ...data.hero, scrollHint: next as SiteCopy["hero"]["scrollHint"] },
          })
        }
      />
    </>
  );
}

export function SiteCopyEditor() {
  const [data, setData] = useState<SiteCopy | null>(null);
  const [sectionId, setSectionId] = useState(SITE_COPY_SECTIONS[0].id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch("/api/admin/content/siteCopy")
      .then((r) => r.json())
      .then((d: { data?: SiteCopy; error?: string }) => {
        if (!active) return;
        if (d.error) throw new Error(d.error);
        setData(d.data ? sanitizeSiteCopy(d.data) : null);
      })
      .catch(() => active && setError("טעינת התוכן נכשלה"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const section = useMemo(
    () => SITE_COPY_SECTIONS.find((s) => s.id === sectionId) ?? SITE_COPY_SECTIONS[0],
    [sectionId]
  );

  const save = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/admin/content/siteCopy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sanitizeSiteCopy(data) }),
      });
      const d = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !d.ok) throw new Error(d.error || "השמירה נכשלה");
      setStatus("נשמר בהצלחה ✓");
      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "השמירה נכשלה");
    } finally {
      setSaving(false);
    }
  }, [data]);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1 className="admin-page__title">טקסטים באתר</h1>
          <p className="admin-page__desc">
            בחרי עמוד או אזור מהרשימה, וערכי רק את הטקסטים הרלוונטיים. כל שדה
            כולל גרסה בעברית ובאנגלית.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="admin-muted">טוען...</p>
      ) : !data ? (
        <p className="admin-muted">לא נמצא תוכן לעריכה.</p>
      ) : (
        <>
          <div className="admin-section-picker">
            <label className="admin-field" htmlFor="site-copy-section">
              <span className="admin-field-label">עמוד / אזור לעריכה</span>
              <select
                id="site-copy-section"
                className="admin-input admin-section-picker__select"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
              >
                {SITE_COPY_SECTIONS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p className="admin-field-hint">
                {section.hint ? `באתר: ${section.hint}` : null}
              </p>
            </label>
          </div>

          <div className="admin-editor">
            {section.id === "hero" ? (
              <HeroSectionEditor data={data} setData={setData} />
            ) : (
              section.keys.map((key) => {
                const value = data[key];
                if (value === undefined) return null;
                return (
                  <JsonNode
                    key={key}
                    fieldKey={key}
                    label={humanizeFieldKey(key)}
                    value={value}
                    onChange={(next) =>
                      setData({ ...data, [key]: next as SiteCopy[typeof key] })
                    }
                  />
                );
              })
            )}
          </div>

          <div className="admin-savebar">
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={save}
              disabled={saving}
            >
              {saving ? "שומר..." : "שמירת שינויים"}
            </button>
            {status && <span className="admin-savebar__ok">{status}</span>}
            {error && <span className="admin-savebar__err">{error}</span>}
          </div>
        </>
      )}
    </div>
  );
}
