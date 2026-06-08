"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteTheme } from "@/types";
import { seedSiteTheme } from "@/lib/themeCss";

type ThemeSection = {
  id: string;
  title: string;
  fields: ThemeFieldDef[];
};

type ThemeFieldDef = {
  path: string[];
  label: string;
  type: "color" | "text" | "shadow";
  hint?: string;
};

const THEME_SECTIONS: ThemeSection[] = [
  {
    id: "colors",
    title: "צבעים כלליים",
    fields: [
      { path: ["colors", "ink"], label: "צבע ראשי (טקסט כהה)", type: "color" },
      { path: ["colors", "inkSoft"], label: "צבע ראשי — hover", type: "color" },
      { path: ["colors", "text"], label: "טקסט גוף", type: "color" },
      { path: ["colors", "textMuted"], label: "טקסט משני", type: "color" },
      { path: ["colors", "textSubtle"], label: "טקסט עדין", type: "color" },
      { path: ["colors", "surfaceWarm"], label: "רקע חם", type: "color" },
      { path: ["colors", "surfaceWhite"], label: "רקע לבן", type: "color" },
      { path: ["colors", "pageBackground"], label: "רקע עמוד", type: "color" },
    ],
  },
  {
    id: "borders",
    title: "מסגרות וקווים",
    fields: [
      { path: ["borders", "color"], label: "צבע מסגרת רגיל", type: "color" },
      { path: ["borders", "colorLight"], label: "מסגרת בהירה", type: "color" },
      { path: ["borders", "colorStrong"], label: "מסגרת בולטת", type: "color" },
      { path: ["borders", "width"], label: "עובי מסגרת", type: "text", hint: "למשל 1px" },
      {
        path: ["borders", "widthStrong"],
        label: "עובי מסגרת חזק",
        type: "text",
        hint: "למשל 2px",
      },
      {
        path: ["borders", "radius"],
        label: "עיגול פינות",
        type: "text",
        hint: "0px = פינות חדות",
      },
    ],
  },
  {
    id: "hero",
    title: "שער (Hero)",
    fields: [
      { path: ["hero", "panelBackground"], label: "רקע הפאנל", type: "color" },
      { path: ["hero", "panelBorder"], label: "מסגרת הפאנל", type: "color" },
      { path: ["hero", "cornerColor"], label: "פינות דекораטивיות", type: "color" },
      { path: ["hero", "titleColor"], label: "צבע כותרת", type: "color" },
      { path: ["hero", "subtitleColor"], label: "צבע תת-כותרת", type: "color" },
      { path: ["hero", "accentBar"], label: "פס תחתון לשם", type: "color" },
      { path: ["hero", "sectionBorder"], label: "קו תחתון לסקשן", type: "color" },
    ],
  },
  {
    id: "cards",
    title: "כרטיסים וצללים",
    fields: [
      { path: ["cards", "background"], label: "רקע כרטיס", type: "color" },
      { path: ["cards", "border"], label: "מסגרת כרטיס", type: "color" },
      {
        path: ["cards", "shadow"],
        label: "צל כרטיס",
        type: "shadow",
        hint: "CSS box-shadow",
      },
    ],
  },
  {
    id: "featured",
    title: "מסלול מומלץ (Featured)",
    fields: [
      { path: ["featured", "background"], label: "רקע", type: "color" },
      { path: ["featured", "text"], label: "טקסט", type: "color" },
      { path: ["featured", "textMuted"], label: "טקסט משני", type: "color" },
      { path: ["featured", "border"], label: "מסגרת חיצונית", type: "color" },
      { path: ["featured", "innerBorder"], label: "מסגרת פנימית", type: "color" },
      { path: ["featured", "badgeBackground"], label: "רקע תגית «מומלץ»", type: "color" },
      { path: ["featured", "badgeBorder"], label: "מסגרת תגית", type: "color" },
      { path: ["featured", "badgeText"], label: "טקסט תגית", type: "color" },
    ],
  },
  {
    id: "buttons",
    title: "כפתורים",
    fields: [
      { path: ["buttons", "primaryBackground"], label: "כפתור ראשי — רקע", type: "color" },
      { path: ["buttons", "primaryText"], label: "כפתור ראשי — טקסט", type: "color" },
      { path: ["buttons", "primaryHover"], label: "כפתור ראשי — hover", type: "color" },
      { path: ["buttons", "outlineBorder"], label: "כפתור מסגרת — border", type: "color" },
      { path: ["buttons", "outlineText"], label: "כפתור מסגרת — טקסט", type: "color" },
      {
        path: ["buttons", "ghostHoverBorder"],
        label: "כפתור שקוף — hover border",
        type: "color",
      },
    ],
  },
  {
    id: "header",
    title: "כותרת עליונה",
    fields: [
      { path: ["header", "border"], label: "קו תחתון", type: "color" },
      { path: ["header", "background"], label: "רקע", type: "color" },
      { path: ["header", "backgroundScrolled"], label: "רקע בגלילה", type: "color" },
    ],
  },
  {
    id: "forms",
    title: "טפסים",
    fields: [
      { path: ["forms", "inputBorder"], label: "מסגרת שדה", type: "color" },
      { path: ["forms", "inputBackground"], label: "רקע שדה", type: "color" },
      { path: ["forms", "inputText"], label: "טקסט בשדה", type: "color" },
    ],
  },
  {
    id: "about",
    title: "אודות",
    fields: [
      { path: ["about", "portraitBorder"], label: "מסגרת תמונת תדמית", type: "color" },
      { path: ["about", "portraitBackground"], label: "רקע תמונת תדמית", type: "color" },
      {
        path: ["about", "portraitPlaceholderBorder"],
        label: "מסגרת placeholder",
        type: "color",
      },
      { path: ["about", "highlightBorder"], label: "מסגרת הדגשה", type: "color" },
    ],
  },
  {
    id: "project",
    title: "פרויקטים",
    fields: [
      { path: ["project", "mediaBorder"], label: "מסגרת תמונה", type: "color" },
      { path: ["project", "overlay"], label: "שכבת hover על תמונה", type: "color" },
    ],
  },
  {
    id: "footer",
    title: "כותרת תחתונה",
    fields: [
      { path: ["footer", "background"], label: "רקע", type: "color" },
      { path: ["footer", "border"], label: "קו עליון", type: "color" },
    ],
  },
  {
    id: "accents",
    title: "הדגשות",
    fields: [
      { path: ["accents", "selectionBackground"], label: "בחירת טקסט — רקע", type: "color" },
      { path: ["accents", "selectionText"], label: "בחירת טקסט — צבע", type: "color" },
      { path: ["accents", "focusRing"], label: "טבעת focus", type: "color" },
      { path: ["accents", "sectionRule"], label: "קו תחתון לכותרות", type: "color" },
      { path: ["accents", "linkUnderline"], label: "קו תחתון לקישורים", type: "color" },
    ],
  },
];

function getNestedValue(obj: SiteTheme, path: string[]): string {
  let current: unknown = obj;
  for (const key of path) {
    if (!current || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : "";
}

function setNestedValue(obj: SiteTheme, path: string[], value: string): SiteTheme {
  const copy = structuredClone(obj) as SiteTheme;
  let current: Record<string, unknown> = copy as unknown as Record<string, unknown>;
  for (let i = 0; i < path.length - 1; i += 1) {
    current = current[path[i]] as Record<string, unknown>;
  }
  current[path[path.length - 1]] = value;
  return copy;
}

function toColorInputValue(value: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
  return "#000000";
}

function ThemeField({
  def,
  value,
  onChange,
}: {
  def: ThemeFieldDef;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-theme-field">
      <span className="admin-theme-field__label">{def.label}</span>
      {def.hint && <span className="admin-theme-field__hint">{def.hint}</span>}
      <div className="admin-theme-field__row">
        {def.type === "color" && (
          <input
            type="color"
            className="admin-theme-color"
            value={toColorInputValue(value)}
            onChange={(e) => onChange(e.target.value)}
            aria-label={def.label}
          />
        )}
        <input
          className="admin-input admin-theme-input"
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}

export function ThemeEditor() {
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content/siteTheme")
      .then((r) => r.json())
      .then((d: { data?: SiteTheme; error?: string }) => {
        if (!active) return;
        if (d.error) throw new Error(d.error);
        setTheme(d.data ?? seedSiteTheme);
      })
      .catch(() => active && setError("טעינת ערכת העיצוב נכשלה"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const save = useCallback(async () => {
    if (!theme) return;
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/admin/content/siteTheme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: theme }),
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
  }, [theme]);

  const resetDefaults = () => {
    if (window.confirm("לאפס את כל צבעי ומסגרות האתר לברירת המחדל?")) {
      setTheme(structuredClone(seedSiteTheme));
    }
  };

  if (loading || !theme) {
    return <p className="admin-muted">טוען...</p>;
  }

  return (
    <>
      <div className="admin-theme-actions">
        <button type="button" className="admin-btn" onClick={resetDefaults}>
          איפוס לברירת מחדל
        </button>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn--ghost"
        >
          צפייה באתר ↗
        </a>
      </div>

      <div className="admin-theme-grid">
        {THEME_SECTIONS.map((section) => (
          <details key={section.id} className="admin-group" open>
            <summary className="admin-group__summary">{section.title}</summary>
            <div className="admin-group__body admin-theme-section">
              {section.fields.map((field) => {
                const value = getNestedValue(theme, field.path);
                return (
                  <ThemeField
                    key={field.path.join(".")}
                    def={field}
                    value={value}
                    onChange={(next) =>
                      setTheme((current) =>
                        current ? setNestedValue(current, field.path, next) : current
                      )
                    }
                  />
                );
              })}
            </div>
          </details>
        ))}
      </div>

      <div className="admin-savebar">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={save}
          disabled={saving}
        >
          {saving ? "שומר..." : "שמירת עיצוב"}
        </button>
        {status && <span className="admin-savebar__ok">{status}</span>}
        {error && <span className="admin-savebar__err">{error}</span>}
      </div>
    </>
  );
}
