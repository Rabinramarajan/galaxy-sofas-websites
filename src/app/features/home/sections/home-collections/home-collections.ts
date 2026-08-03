import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../../../core/services/catalog.service';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { CollectionCard } from '../../../../shared/components/collection-card/collection-card';
import { AppButton } from '../../../../shared/components/app-button/app-button';

/** Featured collections — editorial split layout. */
@Component({
  selector: 'app-home-collections',
  imports: [SectionHeader, CollectionCard, AppButton],
  template: `
    <section class="bg-surface py-20 sm:py-28 dark:bg-dark-soft">
      <div class="section-shell">
        <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <app-section-header
            align="left"
            eyebrow="Signature Collections"
            title="Six worlds of furniture, one standard"
            description="Each collection is a complete design language — pick one, and we\u2019ll furnish the room around it."
          />
          <div class="shrink-0 pb-2">
            <app-button href="/collections" label="View All Collections" variant="outline" />
          </div>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (collection of collections(); track collection.id; let i = $index) {
            <app-collection-card [collection]="collection" [index]="i + 1" />
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeCollections {
  readonly #catalog = inject(CatalogService);
  readonly collections = computed(() => this.#catalog.collections().slice(0, 6));
}
