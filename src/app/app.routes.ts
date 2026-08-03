import type { Routes } from '@angular/router';

/**
 * Application routes — every page lazy-loaded for optimal bundle splits.
 * Per-route `title` powers SSR + crawlers before the app hydrates.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    title: 'Galaxy Sofas — Luxury Furniture & Premium Sofas',
    data: { seo: { description: 'India\u2019s most premium luxury furniture brand. Handcrafted sofas, recliners, beds and bespoke interiors in 100% solid wood.' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.page').then((m) => m.AboutPage),
    title: 'About Us — The Galaxy Sofas Story',
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.page').then((m) => m.ProductsPage),
    title: 'All Furniture — Luxury Sofas, Beds & More | Galaxy Sofas',
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/product-details/product-details.page').then((m) => m.ProductDetailsPage),
    title: 'Product | Galaxy Sofas',
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.page').then((m) => m.CategoriesPage),
    title: 'All Furniture Categories | Galaxy Sofas',
  },
  {
    path: 'categories/:categorySlug',
    loadComponent: () => import('./features/categories/categories.page').then((m) => m.CategoriesPage),
    title: 'Furniture Category | Galaxy Sofas',
  },
  {
    path: 'collections',
    loadComponent: () => import('./features/collections/collections.page').then((m) => m.CollectionsPage),
    title: 'Signature Collections | Galaxy Sofas',
  },
  {
    path: 'why-galaxy-sofas',
    loadComponent: () => import('./features/why-galaxy/why-galaxy.page').then((m) => m.WhyGalaxyPage),
    title: 'Why Galaxy Sofas — Quality, Warranty & Craft',
  },
  {
    path: 'manufacturing-process',
    loadComponent: () => import('./features/manufacturing/manufacturing.page').then((m) => m.ManufacturingPage),
    title: 'Manufacturing Process — 8 Steps of Craft | Galaxy Sofas',
  },
  {
    path: 'custom-furniture',
    loadComponent: () => import('./features/custom/custom.page').then((m) => m.CustomPage),
    title: 'Custom Furniture — Designed Around Your Life | Galaxy Sofas',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery.page').then((m) => m.GalleryPage),
    title: 'Gallery — Real Homes, Real Galaxy | Galaxy Sofas',
  },
  {
    path: 'lookbook',
    loadComponent: () => import('./features/lookbook/lookbook.page').then((m) => m.LookbookPage),
    title: 'Lookbook — Curated Room Designs | Galaxy Sofas',
  },
  {
    path: 'sitemap.xml',
    loadComponent: () => import('./features/sitemap/sitemap.component').then((m) => m.SitemapComponent),
    title: 'Sitemap | Galaxy Sofas',
  },
  {
    path: 'robots.txt',
    loadComponent: () => import('./features/robots/robots.component').then((m) => m.RobotsComponent),
    title: 'Robots | Galaxy Sofas',
  },
  {
    path: 'interior-inspiration',
    loadComponent: () => import('./features/interior/interior.page').then((m) => m.InteriorPage),
    title: 'Interior Inspiration — Room-by-Room Style Guides',
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./features/testimonials/testimonials.page').then((m) => m.TestimonialsPage),
    title: 'Customer Testimonials — Love from 1.2M+ Homes',
  },
  {
    path: 'faqs',
    loadComponent: () => import('./features/faqs/faqs.page').then((m) => m.FaqsPage),
    title: 'FAQs — Delivery, Warranty & Returns | Galaxy Sofas',
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.page').then((m) => m.BlogPage),
    title: 'Blog — Design Notes from the Galaxy Studio',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog-details/blog-details.page').then((m) => m.BlogDetailsPage),
    title: 'Blog Story | Galaxy Sofas',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.page').then((m) => m.ContactPage),
    title: 'Contact Us — Book a Consultation | Galaxy Sofas',
  },
  {
    path: 'store-location',
    loadComponent: () => import('./features/store/store.page').then((m) => m.StorePage),
    title: 'Store Locations — Visit a Galaxy Showroom',
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist.page').then((m) => m.WishlistPage),
    title: 'My Wishlist | Galaxy Sofas',
  },
  {
    path: 'compare',
    loadComponent: () => import('./features/compare/compare.page').then((m) => m.ComparePage),
    title: 'Compare Furniture | Galaxy Sofas',
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/privacy/privacy.page').then((m) => m.PrivacyPage),
    title: 'Privacy Policy | Galaxy Sofas',
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/terms/terms.page').then((m) => m.TermsPage),
    title: 'Terms & Conditions | Galaxy Sofas',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'Page Not Found | Galaxy Sofas',
  },
];
