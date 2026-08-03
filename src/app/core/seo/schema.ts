import { SITE } from '../config/site.config';
import type { Product } from '../models/furniture.model';

/** Structured data builders — Schema.org JSON-LD. */

export interface BreadcrumbCrumb {
  label: string;
  path: string;
}

export function furnitureStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: SITE.name,
    image: `${SITE.url}/images/og-cover.webp`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHours: 'Mo-Su 10:00-21:00',
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube],
  };
}

export function breadcrumbSchema(items: BreadcrumbCrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function productSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((src) => SITE.url + src).slice(0, 3),
    description: product.short,
    sku: product.id,
    brand: { '@type': 'Brand', name: SITE.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleSchema(post: { title: string; excerpt: string; date: string; author: string; cover: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: SITE.url + post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/images/logo.svg` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };
}

/** LocalBusiness / FurnitureStore schema for the About page. */
export function aboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: SITE.name,
    image: `${SITE.url}/images/og-cover.webp`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHours: 'Mo-Su 10:00-21:00',
    foundingDate: new Date(SITE.founded, 0, 1).toISOString().split('T')[0],
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube, SITE.social.pinterest, SITE.social.twitter],
  };
}

/** Product listing + BreadcrumbList schema for category/shop pages. */
export function productsSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Galaxy Sofas Product Catalogue',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.images.map((src) => SITE.url + src),
        description: product.short,
        sku: product.id,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: `${SITE.url}/products/${product.slug}`,
        },
      },
    })),
  };
}
