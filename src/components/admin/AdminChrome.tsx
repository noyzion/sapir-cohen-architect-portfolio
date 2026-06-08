"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin", label: "ראשי" },
  { href: "/admin/projects", label: "פרויקטים" },
  { href: "/admin/texts", label: "טקסטים" },
  { href: "/admin/theme", label: "עיצוב" },
  { href: "/admin/services", label: "שירותים" },
  { href: "/admin/types", label: "סוגי פרויקטים" },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="admin-auth">{children}</div>;
  }

  return (
    <div className="admin-shell" dir="rtl">
      <header className="admin-bar">
        <div className="admin-bar__inner">
          <span className="admin-bar__brand">ניהול האתר · ספיר כהן</span>
          <nav className="admin-nav" aria-label="ניהול">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav__link ${active ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-nav__link admin-nav__link--external"
            >
              צפייה באתר ↗
            </a>
          </nav>
          <LogoutButton />
        </div>
      </header>
      <main className="admin-content">{children}</main>
    </div>
  );
}
