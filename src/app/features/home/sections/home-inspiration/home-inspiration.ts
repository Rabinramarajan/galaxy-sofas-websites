import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTERIOR_GUIDES } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Interior inspiration — room-by-room style guides as editorial cards. */
@Component({
  selector: 'app-home-inspiration',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="section-shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Interior Inspiration
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Rooms, composed
            </h2>
          </div>
          <a appReveal effect="fade-up" [delay]="200" routerLink="/interior-inspiration" class="group inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
            All style guides
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (guide of guides(); track guide.id; let i = $index) {
            <a
              appReveal
              effect="fade-up"
              [delay]="i * 80"
              routerLink="/interior-inspiration"
              class="group relative flex flex-col overflow-hidden rounded-3xl bg-snow shadow-soft ring-1 ring-line transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift dark:bg-espresso-soft dark:ring-line-dark"
            >
              <div class="relative aspect-[4/5] overflow-hidden">
                <img
                  [src]="guide.image"
                  [alt]="guide.alt"
                  width="700"
                  height="880"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent"></div>
                <span class="absolute left-4 top-4 rounded-full bg-bone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bone backdrop-blur-md ring-1 ring-bone/20">
                  {{ guide.room }}
                </span>
                <span class="absolute bottom-4 right-4 font-display text-3xl font-light text-bone/70">{{ (i + 1) < 10 ? '0' + (i + 1) : i + 1 }}</span>
              </div>
              <div class="flex flex-1 flex-col p-6">
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{{ guide.style }}</span>
                <h3 class="mt-2 font-display text-lg font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-gold dark:text-bone">{{ guide.title }}</h3>
                <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-taupe dark:text-fawn">{{ guide.description }}</p>
                <div class="mt-4 flex flex-wrap gap-1.5">
                  @for (tag of guide.tags; track tag) {
                    <span class="rounded-full bg-linen px-2.5 py-0.5 text-[10px] font-semibold text-umber dark:bg-mocha dark:text-fawn">{{ tag }}</span>
                  }
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeInspiration {
  readonly guides = signal(INTERIOR_GUIDES);
}
