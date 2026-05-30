"use client";

import { useCallback, useEffect, useState } from "react";
import { JsonEditor } from "@/components/admin/JsonEditor";

type Props = {
  docKey: "siteCopy" | "projects" | "services" | "projectTypes";
  title: string;
  description?: string;
  /** Optional extra action rendered in the toolbar (e.g. "add project"). */
  onData?: (data: unknown, setData: (d: unknown) => void) => React.ReactNode;
};

export function DocEditor({ docKey, title, description, onData }: Props) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/admin/content/${docKey}`)
      .then((r) => r.json())
      .then((d: { data?: unknown; error?: string }) => {
        if (!active) return;
        if (d.error) throw new Error(d.error);
        setData(d.data ?? null);
      })
      .catch(() => active && setError("טעינת התוכן נכשלה"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [docKey]);

  const save = useCallback(async () => {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch(`/api/admin/content/${docKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
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
  }, [data, docKey]);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1 className="admin-page__title">{title}</h1>
          {description && <p className="admin-page__desc">{description}</p>}
        </div>
        {onData && data !== null && (
          <div className="admin-page__head-actions">{onData(data, setData)}</div>
        )}
      </div>

      {loading ? (
        <p className="admin-muted">טוען...</p>
      ) : (
        <>
          <JsonEditor value={data} onChange={setData} />

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
