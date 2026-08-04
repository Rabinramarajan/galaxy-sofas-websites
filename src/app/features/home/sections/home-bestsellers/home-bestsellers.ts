import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../../../../core/data/products.data';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Best sellers — a quiet horizontal rail of the most-loved pieces. */
@Component({
  selector: 'app-home-bestsellers',
  imports: [RouterLink, ProductCard, AppIcon, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" aria-hidden="true"></div>

      <div class="section-shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Loved by 1.2M+ Homes
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              This season's best sellers
            </h2>
          </div>
          <a appReveal effect="fade-up" [delay]="200" routerLink="/products" class="group inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
            Shop all furniture
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (product of bestsellers(); track product.id; let i = $index) {
            <app-product-card [product]="product" />
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeBestsellers {
  readonly bestsellers = signal(
    PRODUCTS.filter((p) => p.badge === 'bestseller').slice(0, 4)
  );
}
