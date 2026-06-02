"use client";

import { useEffect, useState } from "react";

type Health = {
  environment: string;
  host: string;
  isLocalDev: boolean;
  admin: { configured: boolean; passwordSet: boolean; sessionSecretSet: boolean };
  blob: {
    configured: boolean;
    authMode: "readWrite" | "oidc" | "none";
    readWriteTokenSet: boolean;
    storeIdSet: boolean;
    oidcTokenSet: boolean;
    clientUploadAvailable: boolean;
    access: string;
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

  const blobAuthLabel =
    health.blob.authMode === "readWrite"
      ? "read-write token"
      : health.blob.authMode === "oidc"
        ? "OIDC (BLOB_STORE_ID)"
        : "לא מחובר";

  return (
    <div className="admin-env-status" dir="rtl">
      <p className="admin-env-status__title">מצב השרת (לאבחון)</p>
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
          Blob (אחסון תמונות): {ok(health.blob.configured)} — {blobAuthLabel}
        </li>
        <li>
          BLOB_STORE_ID: {ok(health.blob.storeIdSet)}
        </li>
        {!health.blob.readWriteTokenSet && health.blob.authMode === "oidc" && (
          <li className="admin-env-status__warn-inline">
            ℹ אין BLOB_READ_WRITE_TOKEN — זה תקין. Vercel משתמש ב-OIDC
            (BLOB_STORE_ID + VERCEL_OIDC_TOKEN). ההעלאה עוברת דרך השרת.
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
          BLOB_STORE_ID לבד לא מספיק מקומית — צריך BLOB_READ_WRITE_TOKEN או
          שמירה ב-<code>public/uploads</code>.
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
