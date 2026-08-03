import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../../../core/services/catalog.service';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { CollectionCard } from '../../../../shared/components/collection-card/collection-card';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';


/** Latest collections banner row. */
@Component({
  selector: 'app-home-latest-collections',
  imports: [SectionHeader, CollectionCard, AppIcon],
  template: `
    <section class="relative overflow-hidden bg-dark py-20 text-white sm:py-28">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-aurora"></div>
      </div>
      <div class="relative section-shell">
        <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <app-section-header
            align="left"
            eyebrow="Latest Collections"
            title="Fresh from the atelier"
            description="New editions and reimagined classics — released quarterly, crafted the Galaxy way."
            [light]="true"
          />
          <a href="/collections" class="group flex shrink-0 items-center gap-2 pb-2 text-sm font-semibold text-secondary-light transition-colors hover:text-white">
            All collections
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (collection of collections(); track collection.id) {
            <app-collection-card [collection]="collection" />
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeLatestCollections {
  readonly #catalog = inject(CatalogService);
  readonly collections = computed(() => this.#catalog.collections().slice(0, 4));
}
