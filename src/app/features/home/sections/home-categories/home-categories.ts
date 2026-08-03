import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../../../core/services/catalog.service';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { CategoryCard } from '../../../../shared/components/category-card/category-card';
import { AppButton } from '../../../../shared/components/app-button/app-button';

/** Premium categories grid — 8 highlighted categories. */
@Component({
  selector: 'app-home-categories',
  imports: [SectionHeader, CategoryCard, AppButton],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
        <app-section-header
          align="left"
          eyebrow="Premium Categories"
          title="Shop by room, mood or material"
          description="Every category is a family of designs sharing one uncompromising build standard."
        />
        <div class="shrink-0 pb-2">
          <app-button href="/categories" label="All Categories" variant="outline" />
        </div>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        @for (category of categories(); track category.id) {
          <app-category-card [category]="category" />
        }
      </div>
    </section>
  `,
})
export class HomeCategories {
  readonly #catalog = inject(CatalogService);
  readonly categories = computed(() => {
    const preferred = ['sofas', 'recliner-sofas', 'wooden-sofas', 'l-shape-sofas', 'corner-sofas', 'beds', 'dining-tables', 'tv-units'];
    const all = this.#catalog.categories();
    return preferred.map((id) => all.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);
  });
}
