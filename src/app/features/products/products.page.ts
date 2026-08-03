import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema, productsSchema } from '../../core/seo/schema';
import { CatalogService } from '../../core/services/catalog.service';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { Category } from '../../core/models/furniture.model';

const CATEGORIES: Category[] = [
  { id: 'sofas', slug: 'sofas', name: 'Sofas', short: 'Luxury 3 & 2 seater masterpieces', description: 'Handcrafted sofas in premium fabrics and leathers.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', alt: 'Luxury grey sofa', productCount: 24, accent: '#f59e0b' },
  { id: 'recliner-sofas', slug: 'recliner-sofas', name: 'Recliner Sofas', short: 'Cinematic comfort, powered', description: 'Motorized recline with zero-gravity positioning.', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80', alt: 'Recliner sofa', productCount: 12, accent: '#8b5cf6' },
  { id: 'wooden-sofas', slug: 'wooden-sofas', name: 'Wooden Sofas', short: 'Classic solid-wood elegance', description: 'Teak and sheesham frames with hand-carved details.', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80', alt: 'Wooden sofa', productCount: 18, accent: '#10b981' },
  { id: 'l-shape-sofas', slug: 'l-shape-sofas', name: 'L Shape Sofas', short: 'Maximal seating, minimal effort', description: 'Modular sectionals for expansive living.', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', alt: 'L-shape sofa', productCount: 15, accent: '#ec4899' },
  { id: 'corner-sofas', slug: 'corner-sofas', name: 'Corner Sofas', short: 'Wraparound family comfort', description: 'Space-optimizing corner units with chaise.', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80', alt: 'Corner sofa', productCount: 10, accent: '#f97316' },
  { id: 'beds', slug: 'beds', name: 'Beds', short: 'Sanctuary-grade sleeping', description: 'Platform, storage, and poster beds in solid wood.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', alt: 'Luxury bed', productCount: 22, accent: '#3b82f6' },
  { id: 'dining-tables', slug: 'dining-tables', name: 'Dining Tables', short: 'Gather in grand style', description: 'Solid wood dining tables for 6 to 12 guests.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80', alt: 'Dining table', productCount: 16, accent: '#06b6d4' },
  { id: 'tv-units', slug: 'tv-units', name: 'TV Units', short: 'Statement entertainment walls', description: 'Media consoles with integrated storage.', image: 'https://images.unsplash.com/photo-1593758518868-313620e1d5c2?auto=format&fit=crop&w=800&q=80', alt: 'TV unit', productCount: 14, accent: '#84cc16' },
  { id: 'chairs', slug: 'chairs', name: 'Chairs', short: 'Signature seating', description: 'Accent, dining, and lounge chairs.', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', alt: 'Accent chair', productCount: 20, accent: '#f43f5e' },
  { id: 'coffee-tables', slug: 'coffee-tables', name: 'Coffee Tables', short: 'The room\'s centerpiece', description: 'Marble, wood, and glass coffee tables.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Coffee table', productCount: 18, accent: '#6366f1' },
  { id: 'wardrobes', slug: 'wardrobes', name: 'Wardrobes', short: 'Bespoke storage, refined', description: 'Modular wardrobes with soft-close systems.', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80', alt: 'Wardrobe', productCount: 12, accent: '#14b8a6' },
  { id: 'office-furniture', slug: 'office-furniture', name: 'Office Furniture', short: 'Productivity, elevated', description: 'Executive desks, ergonomic chairs, bookcases.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', alt: 'Office chair', productCount: 10, accent: '#a855f7' },
];

@Component({
  selector: 'app-products-page',
  imports: [AppButton, AppIcon, CategoryCard, PageHero, ProductCard, SectionHeader],
  template: `
    <app-page-hero
      title="All Furniture"
      subtitle="Explore our complete collection of luxury furniture — each piece handcrafted from 100% solid wood."
      [showBreadcrumb]="true"
      breadcrumbLabel="Products"
    />

    <!-- Categories Overview -->
    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Shop by Category"
        title="Every Room, Every Style"
        description="12 categories. 180+ designs. One standard of excellence."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        @for (category of categories(); track category.slug) {
          <app-category-card [category]="category" />
        }
      </div>

      <div class="mt-10 text-center">
        <app-button href="/categories" label="View All Categories" variant="outline" size="lg" icon="grid" />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <app-section-header
            tagline="Best Sellers"
            title="Trending This Season"
            description="Our most-loved pieces, chosen by 1.2M+ homes."
            [showButton]="false"
          />
        </div>
        <app-button variant="ghost" label="View All Products" icon="arrowRight" (click)="scrollToProducts()" />
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" id="products">
        @for (product of featuredProducts(); track product.id) {
          <app-product-card [product]="product" />
        }
      </div>

      <div class="mt-10 text-center">
        <app-button href="/products" label="Explore All Products" variant="gold" size="lg" icon="sofa" />
      </div>
    </section>

    <!-- Collections Preview -->
    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Curated Stories"
        title="Signature Collections"
        description="Each collection tells a design story — cohesive, complete, ready for your home."
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        @for (collection of collections(); track collection.id) {
          <article class="group relative overflow-hidden rounded-2xl aspect-[4/3]">
            <img
              [src]="collection.image"
              [alt]="collection.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent">
              <div class="absolute bottom-6 left-6 right-6 text-white">
                <span class="inline-flex items-center gap-2 rounded-full bg-secondary/90 px-4 py-1.5 text-sm font-semibold">{{ collection.tag }}</span>
                <h3 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ collection.name }}</h3>
                <p class="mt-1 text-white/80">{{ collection.productCount }} pieces</p>
                <app-button
                  class="mt-4"
                  [href]="'/collections/' + collection.slug"
                  variant="white"
                  size="sm"
                  label="Shop Collection"
                  icon="arrowRight"
                />
              </div>
            </div>
          </article>
        }
      </div>

      <div class="mt-10 text-center">
        <app-button href="/collections" label="View All Collections" variant="outline" size="lg" icon="layers" />
      </div>
    </section>

    <!-- Why Buy -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="The Galaxy Promise"
        title="Why Choose Galaxy?"
      />

      <div class="mt-12 grid gap-6 lg:grid-cols-4">
        @for (promise of promises(); track promise.title) {
          <div class="text-center p-6">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <app-icon [name]="promise.icon" class="h-8 w-8" />
            </div>
            <h4 class="mt-5 font-display text-lg font-semibold text-primary dark:text-white">{{ promise.title }}</h4>
            <p class="mt-2 text-sm text-muted">{{ promise.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class ProductsPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #catalog = inject(CatalogService);

  protected readonly categories = signal(CATEGORIES);
  protected readonly collections = signal([
    {
      id: 'heritage',
      slug: 'heritage',
      name: 'The Heritage',
      tag: 'Classic',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      productCount: 24,
    },
    {
      id: 'nordic',
      slug: 'nordic',
      name: 'Urban Nordic',
      tag: 'Minimal',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      productCount: 18,
    },
    {
      id: 'velvet',
      slug: 'velvet',
      name: 'Royal Velvet',
      tag: 'Opulent',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      productCount: 15,
    },
  ]);

  protected readonly promises = signal([
    { icon: 'shield', title: '7-Year Warranty', description: 'Frame & joinery guaranteed' },
    { icon: 'truck2', title: 'White-Glove Delivery', description: 'Assembly & placement included' },
    { icon: 'leaf', title: '100% Solid Wood', description: 'No particle board, ever' },
    { icon: 'rotate-ccw', title: '15-Day Returns', description: 'Risk-free shopping' },
  ]);

  protected readonly featuredProducts = computed(() => {
    const all = this.#catalog.products();
    return all.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 8);
  });

  ngOnInit(): void {
    this.#seo.set({
      title: 'All Furniture — Luxury Sofas, Beds & More | Galaxy Sofas',
      description: 'Explore 180+ luxury furniture designs: sofas, beds, dining tables, recliners & more. Handcrafted from 100% solid wood. 7-year warranty. Free delivery.',
      canonical: '/products',
      ogType: 'website',
      jsonLd: [productsSchema(this.featuredProducts()), breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }])],
    });
  }

  scrollToProducts(): void {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }
}


