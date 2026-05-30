"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn--ghost"
      onClick={logout}
      disabled={busy}
    >
      {busy ? "מתנתק..." : "התנתקות"}
    </button>
  );
}
