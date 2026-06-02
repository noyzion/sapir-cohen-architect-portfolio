"use client";

import { useEffect, useState } from "react";

type Health = {
  environment: string;
  host: string;
  isLocalDev: boolean;
  admin: { configured: boolean; passwordSet: boolean; sessionSecretSet: boolean };
  blob: {
    tokenSet: boolean;
    storeIdSet: boolean;
    webhookKeySet: boolean;
    access: string;
    partialConnection?: boolean;
  };
  contentStore: string;
  hint: string;
};

export function AdminEnvStatus() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    fetch("/api/admin/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  if (!health) return null;

  const ok = (v: boolean) => (v ? "✓" : "✗");

  return (
    <div className="admin-env-status" dir="rtl">
      <p className="admin-env-status__title">מצב השרver (לאבחון)</p>
      <p className="admin-env-status__hint">{health.hint}</p>
      <ul className="admin-env-status__list">
        <li>
          סביבה: <strong>{health.environment}</strong>
          {health.host !== "localhost" && ` (${health.host})`}
        </li>
        <li>
          סיסמת admin (ADMIN_PASSWORD): {ok(health.admin.passwordSet)}
        </li>
        <li>
          מפתח session (ADMIN_SESSION_SECRET): {ok(health.admin.sessionSecretSet)}
        </li>
        <li>
          Blob (BLOB_READ_WRITE_TOKEN): {ok(health.blob.tokenSet)}
        </li>
        {health.blob.partialConnection && (
          <li className="admin-env-status__warn-inline">
            ⚠ יש BLOB_STORE_ID אבל חסר BLOB_READ_WRITE_TOKEN — חיבור Blob חלקי.
            Storage → Blob → Connect to Project, ואז Redeploy.
          </li>
        )}
        <li>
          Redis/KV (תוכן): {ok(health.contentStore === "redis")} (
          {health.contentStore})
        </li>
      </ul>
      {health.isLocalDev && (
        <p className="admin-env-status__warn">
          במחשב שלך הסיסמה מגיעה מקובץ <code>.env.local</code>, לא מ-Vercel.
        </p>
      )}
      {health.environment === "preview" && (
        <p className="admin-env-status__warn">
          Preview משתמשת במשתנים נפרדים מ-Production. ודאי שהגדרת גם Preview וגם
          Production ב-Vercel.
        </p>
      )}
    </div>
  );
}
