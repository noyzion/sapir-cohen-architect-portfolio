"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminEnvStatus } from "@/components/admin/AdminEnvStatus";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { authenticated?: boolean }) => {
        setAlreadyLoggedIn(Boolean(d.authenticated));
      })
      .catch(() => setAlreadyLoggedIn(false));
  }, []);

  async function logout() {
    setBusy(true);
    setError("");
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setAlreadyLoggedIn(false);
      setPassword("");
    } catch {
      setError("לא הצלחנו להתנתק. נסו לרענן את הדף.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const d = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !d.ok) throw new Error(d.error || "ההתחברות נכשלה");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ההתחברות נכשלה");
      setBusy(false);
    }
  }

  return (
    <div className="admin-login" dir="rtl">
      <form className="admin-login__card" onSubmit={submit}>
        <p className="admin-login__brand brand-wordmark">Sapir Cohen</p>
        <h1 className="admin-login__title">כניסה לניהול האתר</h1>
        <p className="admin-login__subtitle">הזינו את הסיסמה כדי להמשיך</p>

        {alreadyLoggedIn && (
          <div className="admin-env-status__warn">
            <p>כבר מחוברת עם session פעיל בדפדפן (cookie).</p>
            <p>
              אם שינית סיסמה ב-Vercel — לחצי &quot;יציאה&quot; ואז התחברי עם
              הסיסמה החדשה. אחרי שינוי משתנים ב-Vercel חובה{" "}
              <strong>Redeploy</strong>.
            </p>
            <div className="admin-login__actions">
              <Link href="/admin" className="admin-btn admin-btn--primary">
                המשך לניהול
              </Link>
              <button
                type="button"
                className="admin-btn"
                onClick={logout}
                disabled={busy}
              >
                יציאה
              </button>
            </div>
          </div>
        )}

        <label className="admin-field">
          <span className="admin-field-label">סיסמה</span>
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button
          type="submit"
          className="admin-btn admin-btn--primary admin-login__submit"
          disabled={busy}
        >
          {busy ? "מתחבר..." : "כניסה"}
        </button>

        <AdminEnvStatus />
      </form>
    </div>
  );
}
