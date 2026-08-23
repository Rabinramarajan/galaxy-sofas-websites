import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { products } from "@/data/products";
import { allSubcategories, primaryCategories } from "@/data/categories";
import { guides } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/sofas",
    "/beds",
    "/furniture",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/guides",
    "/sofa-showroom-chennai",
    "/sofa-showroom-virugambakkam",
  ];

  const subcategoryPaths = allSubcategories.map((item) => `/${item.category}/${item.slug}`);
  const productPaths = products.map((product) => `/${product.category}/${product.slug}`);
  const guidePaths = guides.map((guide) => `/guides/${guide.slug}`);

  return [...staticPaths, ...subcategoryPaths, ...productPaths, ...guidePaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : primaryCategories.some((item) => item.href === path) ? 0.9 : 0.7,
  }));
}
