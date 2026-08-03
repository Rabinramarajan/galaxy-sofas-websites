import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { breadcrumbSchema, productSchema } from '../../core/seo/schema';
import { CatalogService } from '../../core/services/catalog.service';
import { Product } from '../../core/models/furniture.model';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppRating } from '../../shared/components/app-rating/app-rating';
import { AppImage } from '../../shared/components/app-image/app-image';
import { BeforeAfter } from '../../shared/components/before-after/before-after';
import { formatINR } from '../../core/utils/utils';

@Component({
  selector: 'app-product-details-page',
  imports: [AppButton, AppIcon, AppImage, AppRating, BeforeAfter, PageHero, ProductCard, SectionHeader],
  template: `
    @if (product(); as p) {
      <app-page-hero
        [title]="p.name"
        [subtitle]="p.short"
        [showBreadcrumb]="true"
        breadcrumbLabel="Products"
        breadcrumbPath="/products"
      />

      <section class="section-shell py-12 lg:py-16">
        <div class="grid gap-12 lg:grid-cols-12">
          <!-- Gallery -->
          <div class="lg:col-span-7">
            <div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <app-img
              [src]="selectedImage()"
              [alt]="p.alt"
              [width]="1200"
              [height]="900"
              priority="high"
              class="h-full w-full object-cover"
            />
            </div>

            <!-- Thumbnails -->
            <div class="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              @for (img of p.images; track img; let i = $index) {
                <button
                  type="button"
                  (click)="selectedImage.set(img)"
                  class="flex-shrink-0 h-20 w-28 overflow-hidden rounded-xl border-2 transition-all duration-300"
                  [class.border-secondary]="selectedImage() === img"
                  [class.border-transparent]="selectedImage() !== img"
                  [attr.aria-label]="'View image ' + (i + 1)"
                  [attr.aria-current]="selectedImage() === img ? 'true' : 'false'"
                >
                  <img [src]="img" [alt]="p.alt + ' view ' + (i + 1)" loading="lazy" class="h-full w-full object-cover" />
                </button>
              }
            </div>

            <!-- Before/After -->
            <div class="mt-10">
              <h3 class="font-display text-xl font-semibold text-primary dark:text-white">Fabric & Finish Options</h3>
              <p class="mt-2 text-muted">Drag to compare fabric textures and wood finishes</p>
              <app-before-after
                [beforeSrc]="p.images[0] ?? ''"
                [afterSrc]="p.images[1] ?? p.images[0] ?? ''"
                [beforeAlt]="p.alt + ' standard fabric'"
                [afterAlt]="p.alt + ' premium fabric'"
                class="mt-6"
              />
            </div>
          </div>

          <!-- Details & Purchase -->
          <div class="lg:col-span-5">
            <div class="sticky top-24 space-y-6">
              <!-- Badge & Rating -->
              <div class="flex flex-wrap items-center gap-3">
                @if (p.badge) {
                  <span class="badge badge-gold">{{ formatBadge(p.badge) }}</span>
                }
                <app-rating [value]="p.rating" [count]="p.reviews" size="md" [showCount]="true" />
              </div>

              <h1 class="font-display text-3xl font-semibold tracking-tight text-primary dark:text-white sm:text-4xl">{{ p.name }}</h1>

              <p class="text-lg text-muted">{{ p.short }}</p>

              <!-- Price -->
              <div class="flex flex-wrap items-baseline gap-4">
                <span class="font-display text-3xl font-bold text-primary dark:text-white">{{ formatINR(p.price) }}</span>
                @if (p.mrp > p.price) {
                  <span class="text-lg line-through text-muted">{{ formatINR(p.mrp) }}</span>
                  <span class="badge badge-gold">{{ p.discount }}% OFF</span>
                }
              </div>

              <p class="text-sm text-success font-medium">Inclusive of all taxes • Free delivery above ₹25,000</p>

              <!-- Quick Specs -->
              <div class="border-t border-primary/10 pt-6 dark:border-white/10">
                <dl class="grid gap-3 sm:grid-cols-2 text-sm">
                  @for (dim of p.dimensions; track dim.label) {
                    <div>
                      <dt class="text-muted">{{ dim.label }}</dt>
                      <dd class="font-semibold text-primary dark:text-white">{{ dim.value }}</dd>
                    </div>
                  }
                </dl>
              </div>

              <!-- Features -->
              <div class="border-t border-primary/10 pt-6 dark:border-white/10">
                <h4 class="font-semibold text-primary dark:text-white mb-3">Key Features</h4>
                <ul class="space-y-2 text-sm text-muted">
                  @for (feature of p.features; track feature) {
                    <li class="flex items-center gap-2">
                      <app-icon name="check" class="h-4 w-4 text-secondary" />
                      {{ feature }}
                    </li>
                  }
                </ul>
              </div>

              <!-- Actions -->
              <div class="border-t border-primary/10 pt-6 dark:border-white/10 space-y-3">
                <app-button
                  label="Add to Cart"
                  variant="gold"
                  size="xl"
                  [block]="true"
                  icon="cart"
                  (click)="addToCart(p)"
                />
                <div class="flex gap-3">
                  <button
                    type="button"
                    class="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary dark:border-white/25 dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
                  >
                    <app-icon name="heart" class="h-5 w-5" />
                    Wishlist
                  </button>
                  <button
                    type="button"
                    class="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary dark:border-white/25 dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
                  >
                    <app-icon name="compare" class="h-5 w-5" />
                    Compare
                  </button>
                </div>
              </div>

              <!-- Assurances -->
              <div class="border-t border-primary/10 pt-6 dark:border-white/10">
                <div class="grid gap-4 sm:grid-cols-2">
                  @for (assurance of assurances(); track assurance.label) {
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <app-icon [name]="assurance.icon" class="h-5 w-5" />
                      </span>
                      <div>
                        <div class="font-semibold text-primary dark:text-white">{{ assurance.label }}</div>
                        <div class="text-sm text-muted">{{ assurance.description }}</div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Full Description -->
      <section class="section-shell py-12 lg:py-16 bg-surface dark:bg-dark-card">
        <div class="mx-auto max-w-3xl">
          <h2 class="font-display text-2xl font-semibold text-primary dark:text-white">Details & Specifications</h2>
          <div class="mt-6 prose dark:prose-invert max-w-none">
            <p class="text-muted leading-relaxed">{{ p.description }}</p>

            <h3 class="mt-8 font-display text-xl font-semibold text-primary dark:text-white">Materials</h3>
            <ul class="mt-3 space-y-2">
              @for (material of p.materials; track material.label) {
                <li class="flex justify-between py-2 border-b border-primary/10 dark:border-white/10">
                  <span class="text-muted">{{ material.label }}</span>
                  <span class="font-medium text-primary dark:text-white">{{ material.value }}</span>
                </li>
              }
            </ul>

            <h3 class="mt-8 font-display text-xl font-semibold text-primary dark:text-white">Dimensions</h3>
            <ul class="mt-3 space-y-2">
              @for (dim of p.dimensions; track dim.label) {
                <li class="flex justify-between py-2 border-b border-primary/10 dark:border-white/10">
                  <span class="text-muted">{{ dim.label }}</span>
                  <span class="font-medium text-primary dark:text-white">{{ dim.value }}</span>
                </li>
              }
            </ul>

            <div class="mt-8 grid gap-4 sm:grid-cols-2">
              <div class="rounded-xl bg-white p-6 dark:bg-dark">
                <h4 class="font-semibold text-primary dark:text-white">Warranty</h4>
                <p class="mt-2 text-muted">{{ p.warranty }}</p>
              </div>
              <div class="rounded-xl bg-white p-6 dark:bg-dark">
                <h4 class="font-semibold text-primary dark:text-white">Delivery</h4>
                <p class="mt-2 text-muted">{{ p.deliveryTime }} • White-glove assembly included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="section-shell py-12 lg:py-16">
        <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <app-section-header
            tagline="You May Also Like"
            title="Complete the Look"
            [showButton]="false"
          />
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (product of relatedProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </section>
    }
  `,
})
export class ProductDetailsPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #catalog = inject(CatalogService);
  readonly #route = inject(ActivatedRoute);

  protected readonly product = signal<Product | null>(null);
  protected readonly selectedImage = signal('');
  protected readonly formatINR = formatINR;

  protected readonly assurances = signal([
    { icon: 'shield', label: '7-Year Warranty', description: 'On frame and joinery' },
    { icon: 'truck2', label: 'Free Delivery', description: 'Above ₹25,000' },
    { icon: 'rotate-ccw', label: '15-Day Returns', description: 'No questions asked' },
    { icon: 'hammer', label: 'Free Assembly', description: 'White-glove service' },
  ]);

  protected readonly relatedProducts = computed(() => {
    const current = this.product();
    if (!current) return [];
    return this.#catalog
      .products()
      .filter(p => p.categoryId === current.categoryId && p.id !== current.id)
      .slice(0, 4);
  });

  formatBadge(badge: string): string {
    return badge.charAt(0).toUpperCase() + badge.slice(1).replace('-', ' ');
  }

  ngOnInit(): void {
    const slug = this.#route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.#catalog.getProductBySlug(slug);
      if (found) {
        this.product.set(found);
        this.selectedImage.set(found.images[0] ?? '');

        this.#seo.set({
          title: `${found.name} | Galaxy Sofas`,
          description: found.short,
          canonical: `/products/${found.slug}`,
          ogType: 'product',
          ogImage: found.images[0],
          jsonLd: [
            productSchema(found),
            breadcrumbSchema([
              { label: 'Home', path: '/' },
              { label: 'Products', path: '/products' },
              { label: found.name, path: `/products/${found.slug}` },
            ]),
          ],
        });
      }
    }
  }

  addToCart(product: Product): void {
    console.log('Add to cart:', product.id);
  }
}


