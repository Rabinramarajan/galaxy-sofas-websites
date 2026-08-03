import { Component, computed, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { CompareService } from '../../core/services/store.services';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppRating } from '../../shared/components/app-rating/app-rating';
import { AppImage } from '../../shared/components/app-image/app-image';
import { formatINR } from '../../core/utils/utils';





@Component({
  selector: 'app-compare-page',
  imports: [AppButton, AppIcon, AppImage, AppRating, PageHero],
  template: `
    <app-page-hero
      title="Compare Furniture"
      subtitle="Side-by-side comparison of up to 4 products."
      [showBreadcrumb]="true"
      breadcrumbLabel="Compare"
    >
      <span slot="cta">
        <app-button label="Clear All" variant="ghost" icon="rotate-ccw" (click)="clearAll()" />
      </span>
    </app-page-hero>

    @if (items().length === 0) {
      <section class="section-shell py-24 text-center">
        <div class="mb-6 flex justify-center">
          <span class="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
            <app-icon name="compare" class="h-10 w-10 text-muted" />
          </span>
        </div>
        <h3 class="font-display text-2xl font-semibold text-primary dark:text-white">No items to compare</h3>
        <p class="mt-3 text-muted">Add products to compare them side by side.</p>
        <app-button label="Browse Furniture" href="/products" variant="gold" class="mt-6" icon="cart" />
      </section>
    }

    @if (items().length > 0) {
      <section class="section-shell py-16 lg:py-24">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] table-fixed border-collapse">
            <thead>
              <tr>
                <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Feature</th>
                @for (p of items(); track p.id) {
                  <th class="p-4 text-center">
                    <div class="flex flex-col items-center gap-2">
                      <app-img [src]="p.images[0] ?? ''" [alt]="p.name" class="h-20 w-20 rounded-xl object-cover" />
                      <p class="font-display text-sm font-semibold text-primary dark:text-white">{{ p.name }}</p>
                    </div>
                  </th>
                }
              </tr>
            </thead>
            <tbody class="border-t border-primary/10">
              <tr class="border-t border-primary/10">
                <td class="p-4 font-medium text-muted">Price</td>
                @for (p of items(); track p.id) {
                  <td class="p-4 text-center font-semibold text-secondary">{{ formatINR(p.price) }}</td>
                }
              </tr>
              <tr class="border-t border-primary/10">
                <td class="p-4 font-medium text-muted">Rating</td>
                @for (p of items(); track p.id) {
                  <td class="p-4 text-center">
                    <app-rating [value]="p.rating" [showValue]="true" size="sm" />
                  </td>
                }
              </tr>
              <tr class="border-t border-primary/10">
                <td class="p-4 font-medium text-muted">Warranty</td>
                @for (p of items(); track p.id) {
                  <td class="p-4 text-center">{{ p.warranty }}</td>
                }
              </tr>
              <tr class="border-t border-primary/10">
                <td class="p-4 font-medium text-muted">In Stock</td>
                @for (p of items(); track p.id) {
                  <td class="p-4 text-center">{{ p.inStock ? 'Yes' : 'No' }}</td>
                }
              </tr>
              <tr class="border-t border-primary/10">
                <td class="p-4 font-medium text-muted">Category</td>
                @for (p of items(); track p.id) {
                  <td class="p-4 text-center text-sm">{{ p.categoryId }}</td>
                }
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-8 text-center">
          <app-button label="Shop All Compared Items" href="/products" variant="gold" />
        </div>
      </section>
    }
  `,
})
export class ComparePage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #compare = inject(CompareService);

  protected readonly items = computed(() => this.#compare.items());
  protected readonly formatINR = formatINR;

  clearAll(): void {
    this.#compare.clear();
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'Compare Furniture | Galaxy Sofas',
      description: 'Compare up to 4 furniture pieces side by side. Evaluate prices, ratings, warranty and features to make the perfect choice.',
      canonical: '/compare',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Compare', path: '/compare' },
        ]),
      ],
    });
  }
}


