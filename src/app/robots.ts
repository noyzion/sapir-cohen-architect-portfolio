import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteHost } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteHost(),
  };
}
