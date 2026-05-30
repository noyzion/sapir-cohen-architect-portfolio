"use client";

import { useState, type ChangeEvent } from "react";
import { uploadAdminImage } from "@/lib/adminUpload";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploader({ value, onChange, label }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await uploadAdminImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ההעלאה נכשלה");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="admin-image">
      {label && <span className="admin-field-label">{label}</span>}
      <div className="admin-image__row">
        <div className="admin-image__preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <span className="admin-image__empty">אין תמונה</span>
          )}
        </div>
        <div className="admin-image__controls">
          <label className="admin-btn admin-btn--ghost admin-image__btn">
            {busy ? "מעלה..." : "העלאת תמונה"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={busy}
              hidden
            />
          </label>
          <input
            className="admin-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="או הדביקי כתובת תמונה"
            dir="ltr"
          />
          {value && (
            <button
              type="button"
              className="admin-link-danger"
              onClick={() => onChange("")}
            >
              הסרת תמונה
            </button>
          )}
        </div>
      </div>
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
