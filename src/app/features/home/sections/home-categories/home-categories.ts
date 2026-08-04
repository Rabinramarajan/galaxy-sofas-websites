import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../../../core/data/categories.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Luxury categories — an asymmetric editorial grid with alternating aspect ratios. */
@Component({
  selector: 'app-home-categories',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Rooms of the Home
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Every room, one standard
            </h2>
          </div>
          <a appReveal effect="fade-up" [delay]="200" routerLink="/categories" class="group inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
            Browse all categories
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div class="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:grid-rows-2">
          @for (category of cats(); track category.id; let i = $index) {
            <a
              appReveal
              effect="fade-up"
              [delay]="i * 70"
              routerLink="{{ '/categories/' + category.slug }}"
              class="group relative block overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift"
              [class]="spanClass(i)"
            >
              <div class="relative h-full w-full overflow-hidden">
                <img
                  [src]="category.image"
                  [alt]="category.alt"
                  width="900"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent"></div>
                <div class="absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-white/25"></div>

                <span class="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-bone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bone backdrop-blur-md ring-1 ring-bone/20">
                  <app-icon name="grid" class="h-3 w-3 text-gold-light" />
                  {{ category.productCount }} pieces
                </span>

                <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 class="font-display text-xl font-semibold leading-tight text-bone sm:text-2xl">{{ category.name }}</h3>
                  <span class="mt-2 inline-flex translate-y-1 items-center gap-1.5 text-xs font-semibold text-gold-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore <app-icon name="arrowRight" class="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeCategories {
  readonly cats = signal(CATEGORIES.slice(0, 7));

  spanClass(index: number): string {
    const spans = [
      'col-span-2 row-span-2 lg:col-span-2',
      'lg:col-span-2',
      'col-span-1',
      'col-span-1',
      'col-span-1',
      'col-span-1',
    ];
    return spans[index] ?? 'col-span-1';
  }
}
