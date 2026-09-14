import type { Metadata } from "next";
import { site } from "@/constants/site";

/**
 * Date the page copy / product data was last genuinely edited.
 * Update this when content actually changes — it feeds `lastModified` in the
 * sitemap. It is deliberately a fixed date and not `new Date()`, so rebuilds
 * do not falsely signal fresh content to crawlers.
 */
export const CONTENT_LAST_MODIFIED = new Date("2026-09-14T00:00:00.000Z");

/** Site-relative path -> absolute production URL (trailing slash preserved). */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  /** Page title without the brand suffix; the layout template appends " | Galaxy Sofas". */
  title: string;
  /** Use when the title should not receive the brand template (e.g. the home page). */
  absoluteTitle?: string;
  description: string;
  /** Path including the trailing slash, e.g. "/products/l-shape/". */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Builds unique, self-canonicalising metadata for a route.
 * Every indexable page goes through this so canonical, Open Graph and Twitter
 * data can never drift apart.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image = site.ogImage,
  imageAlt,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ?? `${title} | ${site.name}`;
  // Only the dedicated OG asset is guaranteed to be 1200x630.
  const imageEntry =
    image === site.ogImage
      ? { url: image, width: 1200, height: 630, alt: imageAlt ?? socialTitle }
      : { url: image, alt: imageAlt ?? socialTitle };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_IN",
      siteName: site.name,
      url,
      title: socialTitle,
      description,
      images: [imageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
