import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import type { SeoData } from '../models/seo.model';

/** Base SEO settings shared across the site. */
export const BASE_SEO: SeoData = {
  title: 'Galaxy Sofas — Luxury Furniture & Premium Sofas',
  description:
    'India\u2019s most premium luxury furniture brand. Handcrafted sofas, recliners, beds, dining sets and bespoke interiors, made with 100% solid wood.',
  ogImage: '/images/og-cover.webp',
};

/**
 * Centralised SEO service. Sets page title, meta description, canonical,
 * Open Graph + Twitter cards and injects JSON-LD structured data per route.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #meta = inject(Meta);
  readonly #title = inject(Title);
  readonly #doc = inject(DOCUMENT);

  private readonly SITE_URL = 'https://www.galaxysofas.com';

  /** Apply a full set of SEO data for the current page. */
  set(data: SeoData): void {
    const merged = { ...BASE_SEO, ...data };
    const title = merged.title;
    const description = merged.description;

    this.#title.setTitle(title);
    this.#meta.updateTag({ name: 'description', content: description });
    this.#meta.updateTag({ name: 'keywords', content: merged.keywords ?? '' });
    this.#meta.updateTag({ name: 'robots', content: merged.robots ?? 'index, follow' });

    this.#meta.updateTag({ property: 'og:title', content: title });
    this.#meta.updateTag({ property: 'og:description', content: description });
    this.#meta.updateTag({ property: 'og:type', content: merged.ogType ?? 'website' });
    this.#meta.updateTag({ property: 'og:url', content: merged.canonical ?? this.SITE_URL });
    this.#meta.updateTag({ property: 'og:image', content: merged.ogImage ?? BASE_SEO.ogImage! });

    this.#meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.#meta.updateTag({ name: 'twitter:title', content: title });
    this.#meta.updateTag({ name: 'twitter:description', content: description });
    this.#meta.updateTag({ name: 'twitter:image', content: merged.ogImage ?? BASE_SEO.ogImage! });

    if (merged.canonical) {
      this.#meta.updateTag({ rel: 'canonical', href: this.absUrl(merged.canonical) });
    }

    this.#injectJsonLd(merged.jsonLd ?? []);
  }

  /** Build an absolute URL from a relative path. */
  absUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${this.SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /** Replace all JSON-LD scripts with the given structured data. */
  #injectJsonLd(schemas: object[]): void {
    this.#clearJsonLd();
    schemas.forEach((schema) => {
      const script = this.#doc.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.setAttribute('data-seo', '');
      this.#doc.head.appendChild(script);
    });
  }

  #clearJsonLd(): void {
    this.#doc.querySelectorAll('script[data-seo]').forEach((el) => el.remove());
  }
}
