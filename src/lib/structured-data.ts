import { site } from "@/constants/site";
import { absoluteUrl } from "@/lib/seo";
import type { Product, ProductCategory, ServiceItem } from "@/types";

/**
 * Structured data builders.
 *
 * Rule for this file: every property must be backed by a fact the business has
 * actually confirmed. No street address, postal code, coordinates, opening
 * hours, prices, ratings or review counts are emitted, because none of those
 * have been supplied. Add them here (in one place) once they are known.
 */

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Only emitted once the profiles are confirmed to be the real accounts. */
function sameAs(): string[] | undefined {
  if (!site.socialVerified) return undefined;
  return Object.values(site.social);
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": ORGANIZATION_ID,
    name: site.businessName,
    url: site.url,
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.ogImage),
    description:
      "Galaxy Sofas makes custom sofas and provides sofa repair, remodeling and upholstery services for homes in Chennai.",
    telephone: site.phoneE164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: site.city,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phoneE164,
      email: site.email,
      areaServed: site.countryCode,
      availableLanguage: ["en", "ta"],
    },
    ...(sameAs() ? { sameAs: sameAs() } : {}),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Product schema without `offers`, `price` or `review` — the site publishes no
 * prices and holds no verified reviews, so those properties are omitted rather
 * than invented.
 */
export function productSchema(product: Product, categoryName: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((image) => absoluteUrl(image)),
    category: categoryName,
    url: absoluteUrl(`/products/${product.slug}/`),
    brand: {
      "@type": "Brand",
      name: site.businessName,
    },
    manufacturer: { "@id": ORGANIZATION_ID },
  };
}

export function collectionSchema(
  name: string,
  description: string,
  path: string,
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function serviceListSchema(services: ServiceItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sofa services in Chennai",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        serviceType: service.title,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: site.city },
      },
    })),
  };
}

export function categoryProductListSchema(
  category: ProductCategory,
  items: Product[],
): Record<string, unknown> {
  return collectionSchema(
    `${category.name} in ${site.city}`,
    category.description,
    `/products/${category.slug}/`,
    items.map((item) => ({ name: item.name, path: `/products/${item.slug}/` })),
  );
}

export function faqSchema(items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
