import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTERIOR_GUIDES } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Interior Inspiration — an editorial grid: a featured guide, then a staggered composition. */
@Component({
  selector: 'app-home-inspiration',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-gold/10 blur-[130px]" aria-hidden="true"></div>

      <div class="section-shell">
        <!-- Editorial header -->
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Interior Inspiration
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Rooms,<br />composed
            </h2>
          </div>
          <p appReveal effect="fade-up" [delay]="200" class="max-w-xs font-display text-lg italic leading-relaxed text-umber/80 dark:text-fawn/80">
            "A room is a sentence. We help you write it well." — The Studio
          </p>
        </div>

        <!-- Featured + staggered grid -->
        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          @for (guide of guides(); track guide.id; let i = $index) {
            @if (i === 0) {
              <!-- Featured guide -->
              <a
                appReveal
                effect="scale"
                [delay]="120"
                routerLink="/interior-inspiration"
                class="group relative block overflow-hidden rounded-[2rem] shadow-soft lg:col-span-7"
              >
                <div class="relative aspect-[4/3] h-full overflow-hidden">
                  <img
                    [src]="guide.image"
                    [alt]="guide.alt"
                    width="1400"
                    height="1050"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent"></div>

                  <div class="absolute inset-x-7 bottom-7">
                    <span class="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur-md">
                      <app-icon name="compass" class="h-3 w-3" />
                      {{ guide.room }} · {{ guide.style }}
                    </span>
                    <h3 class="mt-4 max-w-xl font-display text-3xl font-medium leading-tight text-bone sm:text-4xl">
                      {{ guide.title }}
                    </h3>
                    <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-light">
                      Read the guide <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            } @else {
              <!-- Companion guides -->
              <a
                appReveal
                effect="fade-up"
                [delay]="200 + i * 100"
                routerLink="/interior-inspiration"
                class="group flex flex-col overflow-hidden rounded-3xl bg-snow shadow-soft ring-1 ring-line transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift dark:bg-espresso dark:ring-line-dark"
                [class]="spanClass(i)"
              >
                <div class="relative aspect-[4/5] overflow-hidden sm:aspect-[3/2] lg:aspect-[4/3]">
                  <img
                    [src]="guide.image"
                    [alt]="guide.alt"
                    width="900"
                    height="675"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent"></div>
                  <span class="absolute left-4 top-4 rounded-full bg-bone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bone backdrop-blur-md ring-1 ring-bone/20">
                    {{ guide.room }}
                  </span>
                </div>
                <div class="flex flex-1 flex-col p-6">
                  <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{{ guide.style }}</span>
                  <h3 class="mt-2 font-display text-lg font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-gold dark:text-bone">
                    {{ guide.title }}
                  </h3>
                  <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-taupe dark:text-fawn">{{ guide.description }}</p>
                </div>
              </a>
            }
          }
        </div>

        <div appReveal effect="fade-up" [delay]="300" class="mt-12 text-center">
          <a routerLink="/interior-inspiration" class="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-sm font-bold uppercase tracking-widest text-gold transition-colors hover:border-gold hover:text-gold-light">
            All style guides <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeInspiration {
  readonly guides = signal(INTERIOR_GUIDES);

  spanClass(index: number): string {
    const spans = [
      'lg:col-span-5 lg:mt-16',
      'lg:col-span-5',
      'lg:col-span-7',
    ];
    return spans[index] ?? 'lg:col-span-5';
  }
}
