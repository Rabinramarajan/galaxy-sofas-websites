import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../../../core/services/catalog.service';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { AppButton } from '../../../../shared/components/app-button/app-button';

/** Trending products carousel-row. */
@Component({
  selector: 'app-home-trending',
  imports: [SectionHeader, ProductCard, AppButton],
  template: `
    <section class="bg-cream py-20 sm:py-28 dark:bg-dark">
      <div class="section-shell">
        <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <app-section-header
            align="left"
            eyebrow="Trending Now"
            title="The pieces everyone is loving"
            description="Ranked by reviews, reordered daily. These are the designs making it into real homes right now."
          />
          <div class="shrink-0 pb-2">
            <app-button href="/products" label="Shop Everything" variant="gold" />
          </div>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeTrending {
  readonly #catalog = inject(CatalogService);
  readonly products = computed(() => this.#catalog.trending().slice(0, 4));
}
