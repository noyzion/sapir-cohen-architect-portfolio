"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  shouldSyncSlugFromName,
  slugify,
  slugifyFromName,
} from "@/lib/slugify";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

type Localized = { he: string; en: string };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isLocalized(v: unknown): v is Localized {
  if (!isPlainObject(v)) return false;
  const keys = Object.keys(v);
  return (
    keys.length === 2 &&
    keys.includes("he") &&
    keys.includes("en") &&
    typeof v.he === "string" &&
    typeof v.en === "string"
  );
}

function isImageKey(key: string): boolean {
  return (
    key === "src" ||
    /image/i.test(key) ||
    /thumbnail/i.test(key) ||
    /cover/i.test(key) ||
    /photo/i.test(key)
  );
}

function isGalleryArrayKey(key: string): boolean {
  return key === "gallery" || key === "renders";
}

function isImageArrayKey(key: string): boolean {
  return isGalleryArrayKey(key);
}

function galleryItemTemplate(): { src: string; caption: Localized } {
  return { src: "", caption: { he: "", en: "" } };
}

/** Gallery items must be { src, caption } — older saves may contain bare URL strings. */
function normalizeGalleryItem(item: unknown): Record<string, unknown> {
  if (typeof item === "string") {
    return { src: item, caption: { he: "", en: "" } };
  }
  if (isPlainObject(item)) {
    const src = typeof item.src === "string" ? item.src : "";
    const caption = isLocalized(item.caption)
      ? item.caption
      : { he: "", en: "" };
    const normalized: Record<string, unknown> = { src, caption };
    if (item.phase === "before" || item.phase === "after") {
      normalized.phase = item.phase;
    }
    return normalized;
  }
  return galleryItemTemplate();
}

function arrayItemTemplate(fieldKey: string, items: unknown[]): unknown {
  if (items.length > 0) return blankLike(items[0]);
  if (isGalleryArrayKey(fieldKey)) return galleryItemTemplate();
  if (fieldKey === "highlights") return { he: "", en: "" };
  return "";
}

/** Build an empty value with the same shape as a sample, for "add item". */
function blankLike(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isLocalized(sample)) return { he: "", en: "" };
  if (isPlainObject(sample)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  return "";
}

const LABELS: Record<string, string> = {
  meta: "מטא / SEO",
  title: "כותרת",
  description: "תיאור",
  brand: "שם המותג",
  tagline: "כותרת משנה בשער",
  nav: "תפריט",
  cta: "כפתורים",
  hero: "שער (Hero)",
  about: "אודות",
  services: "שירותים",
  projectTypes: "סוגי פרויקטים",
  portfolio: "תיק עבודות",
  process: "תהליך",
  contact: "יצירת קשר",
  footer: "כותרת תחתונה",
  privacy: "מדיניות פרטיות",
  accessibility: "הצהרת נגישות",
  terms: "תנאי שימוש",
  cookies: "מדיניות Cookies",
  legalDisclaimer: "הערת אחריות משפטית",
  privacyLabel: "קישור מדיניות פרטיות",
  accessibilityLabel: "קישור הצהרת נגישות",
  termsLabel: "קישור תנאי שימוש",
  cookiesLabel: "קישור מדיניות Cookies",
  privacyConsentBefore: "טקסט לפני קישור (אישור פרטיות)",
  privacyConsentLink: "קישור מדיניות פרטיות (טופס)",
  privacyConsentAfter: "טקסט אחרי קישור (אישור פרטיות)",
  updatedAt: "תאריך עדכון",
  sections: "סעיפים",
  paragraphs: "פסקאות",
  heading: "כותרת סעיף",
  ctaBand: "רצועת קריאה לפעולה",
  headline: "שם בשער",
  lead: "משפט פתיחה",
  subtext: "טקסט משנה",
  scrollHint: "רמז גלילה (נגישות - כפתור בתחתית השער)",
  intro: "שם",
  credentials: "תפקיד",
  portraitImage: "תמונת תדמית (אודות)",
  opening: "פסקת פתיחה",
  approachIntro: "מבוא לגישה",
  approachPillars: "עקרונות הגישה",
  highlight: "פסקת הדגשה",
  closing: "פסקאות סיום",
  subtitle: "כותרת משנה",
  popular: "תווית מומלץ",
  suitableLabel: "תווית 'למי מתאים'",
  includesLabel: "תווית 'מה כלול'",
  readMore: "קרא עוד",
  readLess: "הצג פחות",
  locationLabel: "תווית מיקום",
  location: "מיקום",
  areaLabel: "תווית אזור",
  area: "אזור עבודה",
  emailLabel: "תווית אימייל",
  email: "כתובת אימייל",
  whatsapp: "מספר וואטסאפ",
  form: "טופס פנייה",
  name: "שם",
  phone: "טלפון",
  projectType: "סוג פרויקט",
  message: "הודעה",
  messagePlaceholder: "טקסט רמז בהודעה",
  projectTypeOptions: "אפשרויות סוג פרויקט",
  rights: "כל הזכויות",
  afterPortfolio: "אחרי תיק עבודות",
  text: "טקסט",
  consult: "יצירת קשר",
  packageDetails: "פרטי מסלול",
  viewProject: "צפייה בפרויקט",
  send: "שליחה",
  galleryTitle: "כותרת גלריה",
  rendersTitle: "כותרת הדמיות",
  beforeTitle: "כותרת 'לפני'",
  backToPortfolio: "חזרה לתיק עבודות",
  href: "קישור",
  id: "מזהה",
  label: "תווית",
  tier: "דרגה",
  summary: "תקציר",
  suitableFor: "למי זה מתאים",
  highlights: "נקודות בולטות",
  featured: "מומלץ (מודגש)",
  slug: "מזהה כתובת (slug)",
  type: "סוג / קטגוריה",
  coverImage: "תמונת שער",
  thumbnailImage: "תמונה ממוזערת",
  gallery: "גלריה",
  renders: "הדמיות וסקיצות",
  src: "תמונה",
  caption: "כיתוב",
  phase: "שלב (before/after)",
};

function isProjectShape(v: unknown): v is Record<string, unknown> & {
  slug: string;
  name: Localized;
} {
  if (!isPlainObject(v)) return false;
  return typeof v.slug === "string" && isLocalized(v.name);
}

export function humanizeFieldKey(key: string): string {
  if (LABELS[key]) return LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

function humanize(key: string): string {
  return humanizeFieldKey(key);
}

function itemTitle(value: unknown, index: number): string {
  if (isLocalized(value)) return value.he || value.en || `פריט ${index + 1}`;
  if (isPlainObject(value)) {
    const name = value.name;
    if (isLocalized(name)) return name.he || name.en || `פריט ${index + 1}`;
    const label = value.label;
    if (isLocalized(label)) return label.he || label.en || `פריט ${index + 1}`;
    if (typeof value.tier === "string" && value.tier) return value.tier;
    if (typeof value.title === "string" && value.title) return value.title;
    if (typeof value.id === "string" && value.id) return value.id;
  }
  if (typeof value === "string" && value) return value.slice(0, 50);
  return `פריט ${index + 1}`;
}

/* -------------------------------------------------------------------------- */
/* Field renderers                                                            */
/* -------------------------------------------------------------------------- */

function LocalizedField({
  value,
  onChange,
  label,
}: {
  value: Localized;
  onChange: (next: Localized) => void;
  label: string;
}) {
  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      <div className="admin-localized">
        <label className="admin-localized__col">
          <span className="admin-localized__tag">עברית</span>
          <textarea
            className="admin-input admin-textarea"
            dir="rtl"
            rows={Math.min(6, Math.max(1, Math.ceil(value.he.length / 60)))}
            value={value.he}
            onChange={(e) => onChange({ ...value, he: e.target.value })}
          />
        </label>
        <label className="admin-localized__col">
          <span className="admin-localized__tag">English</span>
          <textarea
            className="admin-input admin-textarea"
            dir="ltr"
            rows={Math.min(6, Math.max(1, Math.ceil(value.en.length / 60)))}
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}

function SlugField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
}) {
  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      <input
        className="admin-input"
        dir="ltr"
        spellCheck={false}
        autoComplete="off"
        value={value}
        placeholder="my-project-name"
        onChange={(e) => onChange(slugify(e.target.value))}
      />
      <p className="admin-field-hint">
        מתעדכן אוטומטית: אותיות קטנות באנגלית, מקפים במקום רווחים. ניתן לערוך
        ידנית.
      </p>
    </div>
  );
}

function StringField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
}) {
  const multiline = value.length > 60 || value.includes("\n");
  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      {multiline ? (
        <textarea
          className="admin-input admin-textarea"
          rows={Math.min(6, Math.max(2, Math.ceil(value.length / 60)))}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Object fields (shared by groups + array items)                             */
/* -------------------------------------------------------------------------- */

function ObjectFieldsNode({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  const isProject = isProjectShape(value);

  return (
    <>
      {Object.entries(value).map(([key, child]) => (
        <JsonNode
          key={key}
          value={child}
          fieldKey={key}
          label={humanize(key)}
          onChange={(next) => {
            if (isProject && key === "name" && isLocalized(next)) {
              const previousName = value.name as Localized;
              const previousSlug =
                typeof value.slug === "string" ? value.slug : "";
              const updates: Record<string, unknown> = {
                ...value,
                name: next,
              };
              if (shouldSyncSlugFromName(previousSlug, previousName)) {
                updates.slug = slugifyFromName(next);
              }
              onChange(updates);
              return;
            }
            onChange({ ...value, [key]: next });
          }}
        />
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Array field (collapsible items)                                            */
/* -------------------------------------------------------------------------- */

function ArrayNode({
  value,
  onChange,
  label,
  fieldKey,
}: {
  value: unknown[];
  onChange: (next: unknown[]) => void;
  label: string;
  fieldKey: string;
}) {
  const items = value;
  const [openItems, setOpenItems] = useState<boolean[]>(() => items.map(() => true));

  useEffect(() => {
    setOpenItems((prev) => {
      if (prev.length === items.length) return prev;
      if (prev.length < items.length) {
        return [...prev, ...Array(items.length - prev.length).fill(true)];
      }
      return prev.slice(0, items.length);
    });
  }, [items.length]);

  const update = (i: number, next: unknown) => {
    const copy = items.slice();
    copy[i] = next;
    onChange(copy);
  };

  const remove = (i: number) => {
    const copy = items.slice();
    copy.splice(i, 1);
    onChange(copy);
    setOpenItems((prev) => prev.filter((_, idx) => idx !== i));
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
    setOpenItems((prev) => {
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const add = () => {
    const template = arrayItemTemplate(fieldKey, items);
    onChange([...items, template]);
    setOpenItems((prev) => [...prev, true]);
  };

  const collapseAll = () => setOpenItems(items.map(() => false));
  const expandAll = () => setOpenItems(items.map(() => true));

  const setItemOpen = (index: number, open: boolean) => {
    setOpenItems((prev) => {
      if (prev[index] === open) return prev;
      const next = prev.slice();
      next[index] = open;
      return next;
    });
  };

  return (
    <details className="admin-group" open>
      <summary className="admin-group__summary">
        {label} <span className="admin-group__count">({items.length})</span>
      </summary>
      <div className="admin-group__body">
        {items.length > 0 ? (
          <div className="admin-group__toolbar">
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--compact"
              onClick={collapseAll}
            >
              סגירת הכל
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--compact"
              onClick={expandAll}
            >
              פתיחת הכל
            </button>
          </div>
        ) : null}
        {items.map((rawItem, i) => {
          const item = isImageArrayKey(fieldKey)
            ? normalizeGalleryItem(rawItem)
            : rawItem;

          return (
            <details
              className="admin-item"
              key={i}
              open={openItems[i] ?? false}
              onToggle={(e) => setItemOpen(i, e.currentTarget.open)}
            >
              <summary className="admin-item__summary">
                <span className="admin-item__title">{itemTitle(item, i)}</span>
                <span className="admin-item__tools">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="העבר למעלה"
                    onClick={(e) => {
                      e.preventDefault();
                      move(i, -1);
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    title="העבר למטה"
                    onClick={(e) => {
                      e.preventDefault();
                      move(i, 1);
                    }}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn admin-icon-btn--danger"
                    title="מחיקה"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("למחוק פריט זה?")) remove(i);
                    }}
                  >
                    ✕
                  </button>
                </span>
              </summary>
              <div className="admin-item__body">
                {isPlainObject(item) && !isLocalized(item) ? (
                  <ObjectFieldsNode
                    value={item}
                    onChange={(next) => update(i, next)}
                  />
                ) : (
                  <JsonNode
                    value={item}
                    onChange={(next) => {
                      if (isImageArrayKey(fieldKey) && typeof next === "string") {
                        update(i, { ...normalizeGalleryItem(item), src: next });
                        return;
                      }
                      update(i, next);
                    }}
                    label={itemTitle(item, i)}
                  />
                )}
              </div>
            </details>
          );
        })}
        <button type="button" className="admin-btn admin-btn--add" onClick={add}>
          + הוספת פריט
        </button>
      </div>
    </details>
  );
}

/* -------------------------------------------------------------------------- */
/* Recursive node                                                             */
/* -------------------------------------------------------------------------- */

export function JsonNode({
  value,
  onChange,
  label,
  fieldKey = "",
}: {
  value: unknown;
  onChange: (next: unknown) => void;
  label: string;
  fieldKey?: string;
}) {
  // Localized string -> dual textarea
  if (isLocalized(value)) {
    return (
      <LocalizedField
        value={value}
        label={label}
        onChange={(next) => onChange(next)}
      />
    );
  }

  // Image-like string -> uploader
  if (typeof value === "string" && isImageKey(fieldKey)) {
    return (
      <ImageUploader value={value} label={label} onChange={(url) => onChange(url)} />
    );
  }

  if (typeof value === "string" && fieldKey === "slug") {
    return <SlugField value={value} label={label} onChange={onChange} />;
  }

  if (typeof value === "string") {
    return <StringField value={value} label={label} onChange={onChange} />;
  }

  if (typeof value === "number") {
    return (
      <div className="admin-field">
        <span className="admin-field-label">{label}</span>
        <input
          type="number"
          className="admin-input"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-field admin-field--inline">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="admin-field-label">{label}</span>
      </label>
    );
  }

  // Array -> list with controls
  if (Array.isArray(value)) {
    return (
      <ArrayNode
        value={value}
        onChange={(next) => onChange(next)}
        label={label}
        fieldKey={fieldKey}
      />
    );
  }

  // Plain object -> section
  if (isPlainObject(value)) {
    return (
      <details className="admin-group" open>
        <summary className="admin-group__summary">{label}</summary>
        <div className="admin-group__body">
          <ObjectFieldsNode
            value={value}
            onChange={(next) => onChange(next)}
          />
        </div>
      </details>
    );
  }

  // Fallback (null/undefined) -> treat as editable string
  return (
    <StringField
      value={value == null ? "" : String(value)}
      label={label}
      onChange={onChange}
    />
  );
}

export function JsonEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  // Top-level object: render each section as its own group (no extra wrapper).
  if (isPlainObject(value) && !isLocalized(value)) {
    return (
      <div className="admin-editor">
        {Object.entries(value).map(([key, child]) => (
          <JsonNode
            key={key}
            value={child}
            fieldKey={key}
            label={humanize(key)}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
      </div>
    );
  }

  // Top-level array (projects, services, types)
  return (
    <div className="admin-editor">
      <JsonNode value={value} onChange={onChange} label="פריטים" />
    </div>
  );
}
