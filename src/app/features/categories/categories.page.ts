import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { CatalogService } from '../../core/services/catalog.service';
import { Category } from '../../core/models/furniture.model';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';



const ALL_CATEGORIES: Category[] = [
  { id: 'sofas', slug: 'sofas', name: 'Sofas', short: 'Luxury 3 & 2 seater masterpieces', description: 'Handcrafted sofas in premium fabrics and leathers, designed for generations of comfort.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', alt: 'Luxury grey sofa in modern living room', productCount: 24, accent: '#f59e0b' },
  { id: 'recliner-sofas', slug: 'recliner-sofas', name: 'Recliner Sofas', short: 'Cinematic comfort, powered', description: 'Motorized recline with zero-gravity positioning, USB charging, and memory settings.', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80', alt: 'Motorized recliner sofa', productCount: 12, accent: '#8b5cf6' },
  { id: 'wooden-sofas', slug: 'wooden-sofas', name: 'Wooden Sofas', short: 'Classic solid-wood elegance', description: 'Teak and sheesham frames with hand-carved details, built to become heirlooms.', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80', alt: 'Solid wood sofa with carved details', productCount: 18, accent: '#10b981' },
  { id: 'l-shape-sofas', slug: 'l-shape-sofas', name: 'L Shape Sofas', short: 'Maximal seating, minimal effort', description: 'Modular sectionals for expansive living, configurable to your space.', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', alt: 'L-shape sectional sofa', productCount: 15, accent: '#ec4899' },
  { id: 'corner-sofas', slug: 'corner-sofas', name: 'Corner Sofas', short: 'Wraparound family comfort', description: 'Space-optimizing corner units with chaise, perfect for movie nights.', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80', alt: 'Corner sofa with chaise', productCount: 10, accent: '#f97316' },
  { id: 'beds', slug: 'beds', name: 'Beds', short: 'Sanctuary-grade sleeping', description: 'Platform, storage, and poster beds in solid wood with premium upholstery.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', alt: 'Luxury king bed with upholstered headboard', productCount: 22, accent: '#3b82f6' },
  { id: 'dining-tables', slug: 'dining-tables', name: 'Dining Tables', short: 'Gather in grand style', description: 'Solid wood dining tables for 6 to 12 guests, extendable options available.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80', alt: 'Solid wood dining table with chairs', productCount: 16, accent: '#06b6d4' },
  { id: 'tv-units', slug: 'tv-units', name: 'TV Units', short: 'Statement entertainment walls', description: 'Media consoles with integrated storage, cable management, and display shelves.', image: 'https://images.unsplash.com/photo-1593758518868-313620e1d5c2?auto=format&fit=crop&w=800&q=80', alt: 'Modern TV unit with storage', productCount: 14, accent: '#84cc16' },
  { id: 'chairs', slug: 'chairs', name: 'Chairs', short: 'Signature seating', description: 'Accent, dining, and lounge chairs — each a sculpture in comfort.', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', alt: 'Designer accent chair', productCount: 20, accent: '#f43f5e' },
  { id: 'coffee-tables', slug: 'coffee-tables', name: 'Coffee Tables', short: 'The room\'s centerpiece', description: 'Marble, wood, and glass coffee tables with hidden storage.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Marble top coffee table', productCount: 18, accent: '#6366f1' },
  { id: 'wardrobes', slug: 'wardrobes', name: 'Wardrobes', short: 'Bespoke storage, refined', description: 'Modular wardrobes with soft-close systems, customizable interiors.', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80', alt: 'Modular wardrobe system', productCount: 12, accent: '#14b8a6' },
  { id: 'office-furniture', slug: 'office-furniture', name: 'Office Furniture', short: 'Productivity, elevated', description: 'Executive desks, ergonomic chairs, bookcases for the modern workspace.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', alt: 'Executive office chair and desk', productCount: 10, accent: '#a855f7' },
];

@Component({
  selector: 'app-categories-page',
  imports: [AppButton, AppIcon, CategoryCard, PageHero, ProductCard, SectionHeader],
  template: `
    @if (selectedCategory(); as cat) {
      <!-- Category Detail View -->
      <app-page-hero
        [title]="cat.name"
        [subtitle]="cat.description"
        [showBreadcrumb]="true"
        breadcrumbLabel="Categories"
        breadcrumbPath="/categories"
      />

      <section class="section-shell py-12 lg:py-16">
        <div class="mx-auto max-w-4xl">
          <app-section-header
            tagline="All "
            [title]="cat.name + ' Designs'"
            [showButton]="false"
          />

          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            @for (product of categoryProducts(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>

          <div class="mt-10 text-center">
            <app-button variant="outline" label="Explore Other Categories" icon="arrowRight" (click)="clearCategory()" />
          </div>
        </div>
      </section>
    } @else {
      <!-- All Categories Grid -->
      <app-page-hero
        title="All Categories"
        subtitle="12 furniture categories, 180+ designs — each crafted from 100% solid wood with a 7-year warranty."
        [showBreadcrumb]="true"
        breadcrumbLabel="Categories"
      />

      <section class="section-shell py-12 lg:py-16">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          @for (category of categories(); track category.slug) {
            <app-category-card [category]="category" (select)="selectCategory(category)" />
          }
        </div>
      </section>

      <!-- Featured Products Across Categories -->
      <section class="section-shell py-12 lg:py-16 bg-surface dark:bg-dark-card">
        <app-section-header
          tagline="Best Sellers"
          title="Trending Across All Categories"
          [showButton]="false"
        />

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (product of featuredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>

        <div class="mt-10 text-center">
          <app-button href="/products" label="View All Products" variant="gold" size="lg" icon="sofa" />
        </div>
      </section>

      <!-- Why Galaxy -->
      <section class="section-shell py-12 lg:py-16">
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
    }
  `,
})
export class CategoriesPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #catalog = inject(CatalogService);
  readonly #route = inject(ActivatedRoute);

  protected readonly categories = signal(ALL_CATEGORIES);
  protected readonly selectedCategory = signal<Category | null>(null);

  protected readonly categoryProducts = computed(() => {
    const cat = this.selectedCategory();
    if (!cat) return [];
    return this.#catalog.getProductsByCategory(cat.slug);
  });

  protected readonly featuredProducts = computed(() =>
    this.#catalog.products().filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 8)
  );

  protected readonly promises = signal([
    { icon: 'shield', title: '7-Year Warranty', description: 'Frame & joinery guaranteed' },
    { icon: 'truck2', title: 'White-Glove Delivery', description: 'Assembly & placement included' },
    { icon: 'leaf', title: '100% Solid Wood', description: 'No particle board, ever' },
    { icon: 'rotate-ccw', title: '15-Day Returns', description: 'Risk-free shopping' },
  ]);

  selectCategory(category: Category): void {
    this.selectedCategory.set(category);
  }

  clearCategory(): void {
    this.selectedCategory.set(null);
  }

  ngOnInit(): void {
    const slug = this.#route.snapshot.paramMap.get('categorySlug');
    if (slug) {
      const found = this.categories().find(c => c.slug === slug);
      if (found) {
        this.selectedCategory.set(found);
        this.#seo.set({
          title: `${found.name} — Luxury ${found.name} | Galaxy Sofas`,
          description: found.description,
          canonical: `/categories/${found.slug}`,
          ogType: 'website',
          jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Categories', path: '/categories' }, { label: found.name, path: `/categories/${found.slug}` }])],
        });
      }
    } else {
      this.#seo.set({
        title: 'All Furniture Categories | Galaxy Sofas',
        description: 'Explore 12 luxury furniture categories: sofas, beds, dining tables, recliners & more. 180+ designs handcrafted from 100% solid wood. 7-year warranty.',
        canonical: '/categories',
        ogType: 'website',
        jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Categories', path: '/categories' }])],
      });
    }
  }
}


