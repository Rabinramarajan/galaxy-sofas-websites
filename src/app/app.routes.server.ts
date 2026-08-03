import { RenderMode } from '@angular/ssr';
import type { ServerRoute } from '@angular/ssr';

/**
 * Server-side rendering configuration. Static pages are prerendered at build
 * time; dynamic (parameterized) pages render on demand via SSR.
 */
export const SERVER_ROUTES: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'products/:slug', renderMode: RenderMode.Server },
  { path: 'categories', renderMode: RenderMode.Prerender },
  { path: 'categories/:categorySlug', renderMode: RenderMode.Server },
  { path: 'collections', renderMode: RenderMode.Prerender },
  { path: 'why-galaxy-sofas', renderMode: RenderMode.Prerender },
  { path: 'manufacturing-process', renderMode: RenderMode.Prerender },
  { path: 'custom-furniture', renderMode: RenderMode.Prerender },
  { path: 'gallery', renderMode: RenderMode.Prerender },
  { path: 'lookbook', renderMode: RenderMode.Prerender },
  { path: 'sitemap.xml', renderMode: RenderMode.Prerender },
  { path: 'robots.txt', renderMode: RenderMode.Prerender },
  { path: 'interior-inspiration', renderMode: RenderMode.Prerender },
  { path: 'testimonials', renderMode: RenderMode.Prerender },
  { path: 'faqs', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'blog/:slug', renderMode: RenderMode.Server },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'store-location', renderMode: RenderMode.Prerender },
  { path: 'wishlist', renderMode: RenderMode.Prerender },
  { path: 'compare', renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  { path: 'terms', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
