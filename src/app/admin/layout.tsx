import type { Metadata } from "next";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const metadata: Metadata = {
  title: "ניהול האתר | ספיר כהן",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminChrome>{children}</AdminChrome>;
}
