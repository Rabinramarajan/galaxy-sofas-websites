import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../app-image/app-image';
import { AppBadge } from '../app-badge/app-badge';
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
  imports: [RouterLink, AppImage, AppBadge, AppRating, AppIcon, TiltDirective, RevealDirective],
  template: `
    <article appReveal effect="fade-up" class="group relative">
      <div appTilt class="relative h-full overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:shadow-lift dark:bg-dark-card dark:ring-white/5">
        <!-- Image -->
        <a [routerLink]="'/products/' + product().slug" class="block">
          <div class="relative aspect-[4/3] overflow-hidden">
            <app-img [src]="product().images[0] ?? ''" [alt]="product().alt" class="block h-full w-full" priority="auto" />
            <!-- badges -->
            <div class="absolute left-4 top-4 flex flex-col gap-2">
              @if (product().discount > 0) {
                <app-badge variant="gold" icon="tag">{{ product().discount }}% OFF</app-badge>
              }
              @if (product().badge === 'bestseller') {
                <app-badge variant="dark" icon="award">Bestseller</app-badge>
              } @else if (product().badge === 'new') {
                <app-badge variant="dark" icon="sparkles">New</app-badge>
              } @else if (product().badge === 'premium') {
                <app-badge variant="primary" icon="crown">Premium</app-badge>
              }
            </div>
          </div>
        </a>

        <!-- Wishlist -->
        <button
          (click)="toggleWishlist()"
          [attr.aria-label]="wishlisted() ? 'Remove from wishlist' : 'Add to wishlist'"
          class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass text-primary transition-all duration-300 hover:scale-110 dark:glass-dark dark:text-white"
          [class.!text-rose-500]="wishlisted()"
        >
          <app-icon name="heart" class="h-4 w-4" [class.fill-current]="wishlisted()" />
        </button>

        <!-- Body -->
        <div class="flex flex-col gap-2 p-5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-secondary">{{ categoryName() }}</span>
            <app-rating [value]="product().rating" [showValue]="true" />
          </div>
          <a [routerLink]="'/products/' + product().slug" class="font-display text-lg font-semibold leading-snug text-primary transition-colors hover:text-secondary dark:text-white">
            {{ product().name }}
          </a>
          <p class="line-clamp-2 text-sm text-muted">{{ product().short }}</p>

          <div class="mt-2 flex items-end justify-between">
            <div class="flex items-baseline gap-2">
              <span class="text-xl font-bold text-primary dark:text-white">{{ price() }}</span>
              <span class="text-sm text-muted line-through">{{ mrp() }}</span>
            </div>
            <span class="flex items-center gap-1 text-xs font-medium text-success">
              <app-icon name="check" class="h-3 w-3" /> {{ product().inStock ? 'In stock' : 'Call us' }}
            </span>
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
