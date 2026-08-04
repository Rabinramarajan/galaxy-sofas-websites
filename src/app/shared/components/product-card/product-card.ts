import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../app-image/app-image';
import { AppRating } from '../app-rating/app-rating';
import { AppIcon } from '../app-icon/app-icon';
import { TiltDirective } from '../../directives/tilt.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { WishlistService } from '../../../core/services/store.services';
import { formatINR } from '../../../core/utils/utils';
import type { Product } from '../../../core/models/furniture.model';

/** Grid product card with hover zoom, wishlist toggle and quick views. */
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, AppImage, AppRating, AppIcon, TiltDirective, RevealDirective],
  template: `
    <article appReveal effect="fade-up" class="group relative">
      <div appTilt class="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift hover:ring-secondary/30 dark:bg-dark-card dark:ring-white/5">
        <!-- Image Container -->
        <a [routerLink]="'/products/' + product().slug" class="relative block overflow-hidden">
          <div class="relative aspect-[4/3] w-full overflow-hidden bg-surface dark:bg-dark-soft">
            <app-img
              [src]="product().images[0] ?? ''"
              [alt]="product().alt"
              class="block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              priority="auto"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <!-- Badges -->
            <div class="absolute left-3.5 top-3.5 flex flex-col gap-1.5 z-10">
              @if (product().discount > 0) {
                <span class="inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-gold backdrop-blur-md">
                  <app-icon name="tag" class="h-3 w-3" />
                  {{ product().discount }}% OFF
                </span>
              }
              @if (product().badge === 'bestseller') {
                <span class="inline-flex items-center gap-1 rounded-full bg-dark/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/20 dark:bg-white/90 dark:text-dark">
                  <app-icon name="award" class="h-3 w-3 text-secondary" />
                  Bestseller
                </span>
              } @else if (product().badge === 'new') {
                <span class="inline-flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md dark:bg-white/90 dark:text-primary">
                  <app-icon name="sparkles" class="h-3 w-3 text-secondary" />
                  New
                </span>
              } @else if (product().badge === 'premium') {
                <span class="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-gold">
                  <app-icon name="crown" class="h-3 w-3" />
                  Premium
                </span>
              }
            </div>
          </div>
        </a>

        <!-- Quick Wishlist Button -->
        <button
          (click)="toggleWishlist()"
          [attr.aria-label]="wishlisted() ? 'Remove from wishlist' : 'Add to wishlist'"
          class="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-primary backdrop-blur-md shadow-md transition-all duration-300 hover:scale-110 hover:bg-white dark:bg-dark/80 dark:text-white dark:hover:bg-dark"
          [class.!bg-rose-500]="wishlisted()"
          [class.!text-white]="wishlisted()"
        >
          <app-icon name="heart" class="h-4 w-4" [class.fill-current]="wishlisted()" />
        </button>

        <!-- Body -->
        <div class="flex flex-1 flex-col justify-between p-5">
          <div>
            <div class="mb-2 flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{{ categoryName() }}</span>
              <app-rating [value]="product().rating" [showValue]="true" />
            </div>

            <a [routerLink]="'/products/' + product().slug" class="block">
              <h3 class="font-display text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary dark:text-white">
                {{ product().name }}
              </h3>
            </a>
            <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{{ product().short }}</p>
          </div>

          <div class="mt-4 flex items-center justify-between border-t border-primary/5 pt-3.5 dark:border-white/5">
            <div class="flex flex-col">
              <span class="text-[10px] font-semibold uppercase tracking-wider text-muted/80">Starting at</span>
              <div class="flex items-baseline gap-2">
                <span class="font-display text-xl font-extrabold text-primary dark:text-white">{{ price() }}</span>
                @if (product().mrp > product().price) {
                  <span class="text-xs font-medium text-muted line-through">{{ mrp() }}</span>
                }
              </div>
            </div>

            <a
              [routerLink]="'/products/' + product().slug"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold dark:bg-white/10 dark:text-white"
              aria-label="View product details"
            >
              <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();

  readonly #wishlist = inject(WishlistService);

  readonly categoryName = computed(() => {
    const categories = new Map([
      ['sofas', 'Sofas'], ['recliner-sofas', 'Recliners'], ['wooden-sofas', 'Wooden Sofas'],
      ['l-shape-sofas', 'L Shape'], ['corner-sofas', 'Corner Sofas'], ['beds', 'Beds'],
      ['dining-tables', 'Dining'], ['tv-units', 'TV Units'], ['chairs', 'Chairs'],
      ['coffee-tables', 'Coffee Tables'], ['wardrobes', 'Wardrobes'],
      ['office-furniture', 'Office'], ['home-furniture', 'Home'], ['custom-furniture', 'Custom'],
    ]);
    return categories.get(this.product().categoryId) ?? 'Furniture';
  });

  readonly price = computed(() => formatINR(this.product().price));
  readonly mrp = computed(() => formatINR(this.product().mrp));
  readonly wishlisted = computed(() => this.#wishlist.has(this.product().id));

  toggleWishlist(): void {
    this.#wishlist.toggle(this.product().id);
  }
}
