import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  index = true,
  image,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/opengraph-image");

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function hasFilterParams(searchParams: Record<string, string | string[] | undefined>) {
  const keys = ["q", "sort", "material", "color", "availability", "min", "max"];
  return keys.some((key) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value.some(Boolean) : Boolean(value);
  });
}
