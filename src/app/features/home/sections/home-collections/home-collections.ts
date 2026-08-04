import { Component, signal } from '@angular/core';
import { COLLECTIONS } from '../../../../core/data/collections.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Featured collections — a magazine-style numbered index with editorial rows. */
@Component({
  selector: 'app-home-collections',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="section-shell grid gap-14 lg:grid-cols-12">
        <!-- Sticky intro -->
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Signature Collections
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Six stories,<br />one atelier
            </h2>
            <p appReveal effect="fade-up" [delay]="240" class="mt-6 text-base leading-relaxed text-umber dark:text-fawn">
              Each collection is a world of its own — a palette, a silhouette, a way of living.
              Explore the line and find the one that sounds like home.
            </p>
            <div appReveal effect="fade-up" [delay]="360" class="mt-8">
              <app-button href="/collections" label="View All Collections" variant="primary" size="lg" icon="gem" />
            </div>
          </div>
        </div>

        <!-- Editorial index -->
        <div class="lg:col-span-8">
          <ol class="divide-y divide-line dark:divide-line-dark">
            @for (collection of collections(); track collection.id; let i = $index) {
              <li appReveal effect="fade-up" [delay]="i * 80">
                <a
                  href="/collections"
                  class="group flex items-center gap-5 py-7 transition-all duration-500 sm:gap-8 sm:py-8"
                >
                  <span class="font-display text-3xl font-light text-taupe/50 transition-colors duration-300 group-hover:text-gold sm:text-4xl">
                    {{ (i + 1) < 10 ? '0' + (i + 1) : i + 1 }}
                  </span>
                  <span class="h-24 w-32 flex-shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-44">
                    <img
                      [src]="collection.image"
                      [alt]="collection.alt"
                      width="700"
                      height="520"
                      loading="lazy"
                      decoding="async"
                      class="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      <app-icon name="gem" class="h-3 w-3" />
                      {{ collection.tag }}
                    </span>
                    <span class="mt-1 block truncate font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-gold sm:text-2xl dark:text-bone">
                      {{ collection.name }}
                    </span>
                    <span class="mt-1 hidden max-w-md text-sm leading-relaxed text-taupe sm:block dark:text-fawn">
                      {{ collection.description }}
                    </span>
                  </span>
                  <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-line text-taupe transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-gold dark:border-line-dark">
                    <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
})
export class HomeCollections {
  readonly collections = signal(COLLECTIONS);
}
