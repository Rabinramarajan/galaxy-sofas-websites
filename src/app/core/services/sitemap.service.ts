import { Injectable } from '@angular/core';
import { SITE } from '../config/site.config';
import { CatalogService } from '../services/catalog.service';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({ providedIn: 'root' })
export class SitemapService {
  readonly #catalog = new CatalogService();

  generate(): string {
    const urls = this.getAllUrls();
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
      ...urls.map(u => this.urlToXml(u)),
      '</urlset>',
    ].join('\n');
    return xml;
  }

  generateRobots(): string {
    return [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${SITE.url}/sitemap.xml`,
      '',
      'Host: www.galaxysofas.com',
    ].join('\n');
  }

  private getAllUrls(): SitemapUrl[] {
    const today = new Date().toISOString().split('T')[0];
    const products = this.#catalog.products();
    const categories = this.#catalog.categories();
    const collections = this.#catalog.collections();

    const staticUrls: SitemapUrl[] = [
      { url: SITE.url, lastmod: today, changefreq: 'daily', priority: 1.0 },
      { url: `${SITE.url}/about`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
      { url: `${SITE.url}/products`, lastmod: today, changefreq: 'daily', priority: 0.9 },
      { url: `${SITE.url}/categories`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
      { url: `${SITE.url}/collections`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
      { url: `${SITE.url}/why-galaxy-sofas`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/manufacturing-process`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/custom-furniture`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
      { url: `${SITE.url}/gallery`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
      { url: `${SITE.url}/interior-inspiration`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
      { url: `${SITE.url}/testimonials`, lastmod: today, changefreq: 'weekly', priority: 0.7 },
      { url: `${SITE.url}/faqs`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/blog`, lastmod: today, changefreq: 'daily', priority: 0.8 },
      { url: `${SITE.url}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
      { url: `${SITE.url}/store-location`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/privacy-policy`, lastmod: today, changefreq: 'yearly', priority: 0.3 },
      { url: `${SITE.url}/terms`, lastmod: today, changefreq: 'yearly', priority: 0.3 },
    ];

    const productUrls = products.map(p => ({
      url: `${SITE.url}/products/${p.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: p.badge === 'bestseller' ? 0.9 : 0.7,
    }));

    const categoryUrls = categories.map(c => ({
      url: `${SITE.url}/categories/${c.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.8,
    }));

    const collectionUrls = collections.map(c => ({
      url: `${SITE.url}/collections/${c.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: c.featured ? 0.85 : 0.75,
    }));

    return [...staticUrls, ...productUrls, ...categoryUrls, ...collectionUrls];
  }

  private urlToXml(u: SitemapUrl): string {
    return [
      '  <url>',
      `    <loc>${u.url}</loc>`,
      u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
      u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>` : '',
      u.priority ? `    <priority>${u.priority.toFixed(1)}</priority>` : '',
      '  </url>',
    ].filter(Boolean).join('\n');
  }
}