"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { uploadAdminImage } from "@/lib/adminUpload";
import { resolveBlobSrc } from "@/lib/blobAccess";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploader({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setProgress(0);
    setError("");
    try {
      const url = await uploadAdminImage(file, (p) => setProgress(p.percent));
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ההעלאה נכשלה");
    } finally {
      setBusy(false);
      setProgress(null);
      e.target.value = "";
    }
  }

  const statusLabel =
    busy && progress !== null
      ? progress < 10
        ? "מכינה תמונה..."
        : progress >= 98
          ? "מסיימת..."
          : `מעלה... ${progress}%`
      : busy
        ? "מעלה..."
        : "העלאת תמונה";

  return (
    <div className="admin-image">
      {label && <span className="admin-field-label">{label}</span>}
      <div className="admin-image__row">
        <div className="admin-image__preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolveBlobSrc(value)} alt="" />
          ) : (
            <span className="admin-image__empty">אין תמונה</span>
          )}
        </div>
        <div className="admin-image__controls">
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-image__btn"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {statusLabel}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={busy}
            hidden
          />
          {busy && progress !== null && progress >= 10 && (
            <div
              className="admin-upload-progress"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="admin-upload-progress__bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
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
              disabled={busy}
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
