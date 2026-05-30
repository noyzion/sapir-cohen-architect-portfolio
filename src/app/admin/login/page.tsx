"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      </form>
    </div>
  );
}
