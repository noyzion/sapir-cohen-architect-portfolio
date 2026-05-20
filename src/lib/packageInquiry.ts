import { servicePackages } from "@/data/services";
import type { Locale } from "@/types";

const STORAGE_KEY = "sapir-package-inquiry";

export function setPackageInquiry(packageId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, packageId);
  window.dispatchEvent(new CustomEvent("sapir-package-inquiry"));
}

export function getStoredPackageInquiry(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function getPackageInquiryMessage(
  packageId: string,
  locale: Locale
): string {
  const pkg = servicePackages.find((p) => p.id === packageId);
  if (!pkg) return "";

  if (locale === "he") {
    return `אשמח לקבל פרטים על מסלול ${pkg.tier}.`;
  }
  return `I'd like to receive details about the ${pkg.tier} package.`;
}
