import type { MetadataRoute } from "next";
import { site } from "@/constants/site";

export const dynamic = "force-static";

/**
 * Production robots policy: everything crawlable, nothing blocked.
 * CSS, JS and images are deliberately left open so Google can render pages.
 * Pages that must stay out of the index use a `noindex` robots meta tag
 * instead (see not-found.tsx) — robots.txt is not used for that.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
