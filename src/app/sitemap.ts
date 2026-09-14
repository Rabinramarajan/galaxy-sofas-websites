import type { MetadataRoute } from "next";
import { site } from "@/constants/site";
import { productCategories, products } from "@/data/products";
import { CONTENT_LAST_MODIFIED } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Sitemap entries are generated from the same product data the pages render,
 * so a new category or product can never be missing here.
 *
 * `lastModified` uses a fixed content date (see CONTENT_LAST_MODIFIED) rather
 * than build time — rebuilding the site is not a content change.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_LAST_MODIFIED;

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/products/", priority: 0.9 },
    { path: "/services/", priority: 0.9 },
    { path: "/gallery/", priority: 0.7 },
    { path: "/about/", priority: 0.7 },
    { path: "/contact/", priority: 0.7 },
  ];

  const pages: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${site.url}/products/${category.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${site.url}${category.image}`],
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${site.url}/products/${product.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${site.url}${product.image}`],
  }));

  return [...pages, ...categoryPages, ...productPages];
}
