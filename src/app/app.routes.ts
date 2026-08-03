import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/pages/home/home-page.component').then((m) => m.HomePageComponent) },
      { path: 'about', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'about' } },
      { path: 'products', loadComponent: () => import('./features/pages/products/products-page.component').then((m) => m.ProductsPageComponent) },
      { path: 'products/:slug', loadComponent: () => import('./features/pages/product-detail/product-detail-page.component').then((m) => m.ProductDetailPageComponent) },
      { path: 'categories', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'categories' } },
      { path: 'collections', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'collections' } },
      { path: 'why-galaxy-sofas', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'why-galaxy-sofas' } },
      { path: 'manufacturing-process', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'manufacturing-process' } },
      { path: 'custom-furniture', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'custom-furniture' } },
      { path: 'gallery', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'gallery' } },
      { path: 'interior-inspiration', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'interior-inspiration' } },
      { path: 'testimonials', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'testimonials' } },
      { path: 'faqs', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'faqs' } },
      { path: 'blog', loadComponent: () => import('./features/pages/blog/blog-page.component').then((m) => m.BlogPageComponent) },
      { path: 'blog/:slug', loadComponent: () => import('./features/pages/blog-detail/blog-detail-page.component').then((m) => m.BlogDetailPageComponent) },
      { path: 'contact', loadComponent: () => import('./features/pages/contact/contact-page.component').then((m) => m.ContactPageComponent) },
      { path: 'store-location', loadComponent: () => import('./features/pages/store/store-page.component').then((m) => m.StorePageComponent), data: { contentKey: 'store-location' } },
      { path: 'privacy-policy', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'privacy' } },
      { path: 'terms', loadComponent: () => import('./features/pages/content/content-page.component').then((m) => m.ContentPageComponent), data: { contentKey: 'terms' } },
      { path: '**', loadComponent: () => import('./features/pages/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent) }
    ]
  }
];
