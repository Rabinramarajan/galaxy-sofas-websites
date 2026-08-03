import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { CatalogService } from '../../core/services/catalog.service';
import { Collection } from '../../core/models/furniture.model';
import { CollectionCard } from '../../shared/components/collection-card/collection-card';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';

@Component({
  selector: 'app-collections-page',
  imports: [AppButton, AppIcon, CollectionCard, PageHero, ProductCard, RouterLink, SectionHeader],
  template: `
    @if (selectedCollection(); as col) {
      <!-- Collection Detail View -->
      <app-page-hero
        [title]="col.name"
        [description]="col.description"
        [showBreadcrumb]="true"
        breadcrumbLabel="Collections"
        breadcrumbPath="/collections"
      />

      <section class="section-shell py-12 lg:py-16">
        <div class="mx-auto max-w-4xl">
          <app-section-header
            [tagline]="'All ' + col.name"
            [title]="col.productCount + ' Designs'"
            [showButton]="false"
          />

          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            @for (product of collectionProducts(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>

          <div class="mt-10 text-center">
            <app-button variant="outline" label="Explore Other Collections" icon="arrowRight" (click)="clearCollection()" />
          </div>
        </div>
      </section>
    } @else {
      <!-- All Collections Grid -->
      <app-page-hero
        title="Signature Collections"
        subtitle="Curated furniture families, each with a distinct design language — from timeless classics to modern minimalism."
        [showBreadcrumb]="true"
        breadcrumbLabel="Collections"
      />

      <section class="section-shell py-12 lg:py-16">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (collection of featuredCollections(); track collection.id) {
            <app-collection-card [collection]="collection" (select)="selectCollection(collection)" />
          }
        </div>
      </section>

      <!-- Collections Philosophy -->
      <section class="section-shell py-12 lg:py-16 bg-surface dark:bg-dark-card">
        <app-section-header
          tagline="Design Philosophy"
          title="Why Collections Matter"
          description="A collection isn't just matching pieces — it's a cohesive design language that lets you furnish an entire home with confidence."
        />

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          @for (philosophy of philosophies(); track philosophy.title) {
            <div class="text-center p-6">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <app-icon [name]="philosophy.icon" class="h-8 w-8" />
              </div>
              <h4 class="mt-5 font-display text-lg font-semibold text-primary dark:text-white">{{ philosophy.title }}</h4>
              <p class="mt-2 text-sm text-muted">{{ philosophy.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Shop by Style -->
      <section class="section-shell py-12 lg:py-16">
        <app-section-header
          tagline="Browse by Style"
          title="Find Your Design Language"
          [showButton]="false"
        />

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (style of styles(); track style.label) {
            <a
              [routerLink]="['/products']"
              [queryParams]="{ style: style.value }"
              class="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-lift"
            >
              <div class="relative aspect-[4/5] overflow-hidden">
                <img [src]="style.image" [alt]="style.label" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute inset-x-0 bottom-0 p-6 text-center">
                  <h4 class="font-display text-xl font-semibold text-white">{{ style.label }}</h4>
                  <p class="mt-1 text-sm text-white/70">{{ style.count }} pieces</p>
                </div>
              </div>
            </a>
          }
        </div>
      </section>
    }
  `,
})
export class CollectionsPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #catalog = inject(CatalogService);
  readonly #route = inject(ActivatedRoute);

  protected readonly selectedCollection = signal<Collection | null>(null);

  protected readonly featuredCollections = computed(() =>
    this.#catalog.collections().filter(c => c.featured)
  );

  protected readonly collectionProducts = computed(() => {
    const col = this.selectedCollection();
    if (!col) return [];
    return this.#catalog.byCollection(col.id);
  });

  protected readonly philosophies = signal([
    { icon: 'palette', title: 'Cohesive Aesthetic', description: 'Every piece shares a DNA — colours, proportions, materials — so rooms feel designed, not accumulated.' },
    { icon: 'layers', title: 'Mix & Match Confidence', description: 'Buy the sofa today, the chairs next month — they\'re built to live together beautifully.' },
    { icon: 'sparkles', title: 'Curated by Experts', description: 'Our design studio hand-selects every finish, fabric and detail so you don\'t have to.' },
  ]);

  protected readonly styles = signal([
    { label: 'Classic Heritage', value: 'heritage', count: 36, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Modern Minimal', value: 'urban-nordic', count: 28, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Luxury Velvet', value: 'royal-velvet', count: 22, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
    { label: 'Artisan Organic', value: 'studio-raw', count: 19, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
  ]);

  selectCollection(collection: Collection): void {
    this.selectedCollection.set(collection);
  }

  clearCollection(): void {
    this.selectedCollection.set(null);
  }

  ngOnInit(): void {
    const slug = this.#route.snapshot.paramMap.get('collectionSlug');
    if (slug) {
      const found = this.#catalog.getCollection(slug);
      if (found) {
        this.selectedCollection.set(found);
        this.#seo.set({
          title: `${found.name} Collection | Galaxy Sofas`,
          description: found.description,
          canonical: `/collections/${found.slug}`,
          ogType: 'website',
          jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Collections', path: '/collections' }, { label: found.name, path: `/collections/${found.slug}` }])],
        });
      }
    } else {
      this.#seo.set({
        title: 'Signature Collections — Curated Furniture Families | Galaxy Sofas',
        description: 'Explore 7 signature furniture collections: Heritage, Urban Nordic, Royal Velvet, Studio Raw, Cloud Nine, Executive Suite. Cohesive design for every room.',
        canonical: '/collections',
        ogType: 'website',
        jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Collections', path: '/collections' }])],
      });
    }
  }
}


