import { site, absoluteUrl } from "@/lib/site";
import type { Product } from "@/types/product";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FurnitureStore", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    email: site.email,
    telephone: site.phoneE164,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressLine,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.openingHoursSpecification.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    })),
    areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })),
    sameAs: [site.social.instagram, site.social.facebook, site.social.pinterest],
    priceRange: "₹₹₹",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/sofas")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: site.name },
    material: product.material,
    color: product.colors.map((color) => color.name),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/${product.category}/${product.slug}`),
      priceCurrency: product.currency,
      ...(product.price != null ? { price: product.price } : {}),
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : product.availability === "limited"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; path: string; image?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
