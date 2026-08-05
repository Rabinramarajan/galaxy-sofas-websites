import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../../../core/data/categories.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Rooms of the Home — a horizontal lookbook rail, images with type captions below. */
@Component({
  selector: 'app-home-categories',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <div class="max-w-2xl">
          <span appReveal effect="fade-up" class="eyebrow text-gold">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            Rooms of the Home
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Every room,<br />one standard
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-5 text-base leading-relaxed text-umber dark:text-fawn">
            Slide through the house — from the first sofa to the final wardrobe, each room furnished
            to a single uncompromising standard.
          </p>
        </div>
      </div>

      <!-- Lookbook rail -->
      <div appReveal effect="fade-up" [delay]="200" class="section-shell mt-14">
        <div
          class="mask-fade-x flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 overscroll-x-contain lg:gap-8"
          role="list"
          aria-label="Furniture categories"
        >
          @for (cat of cats(); track cat.id; let i = $index) {
            <a
              role="listitem"
              routerLink="{{ '/categories/' + cat.slug }}"
              class="group w-[72%] flex-shrink-0 snap-start sm:w-[46%] lg:w-[27%]"
            >
              <div class="relative overflow-hidden rounded-3xl ring-1 ring-line transition-all duration-500 group-hover:shadow-lift group-hover:ring-gold/40 dark:ring-line-dark">
                <div class="relative aspect-[3/4] overflow-hidden">
                  <img
                    [src]="cat.image"
                    [alt]="cat.alt"
                    width="900"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent"></div>
                  <span class="absolute left-5 top-5 font-display text-2xl font-light text-bone/70 transition-colors duration-500 group-hover:text-gold-light">
                    {{ (i + 1) < 10 ? '0' + (i + 1) : i + 1 }}
                  </span>
                  <span class="absolute bottom-5 left-5 right-5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-light">
                    {{ cat.productCount }} pieces
                  </span>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between border-t border-line pt-3 dark:border-line-dark">
                <h3 class="font-display text-2xl font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-gold sm:text-3xl dark:text-bone">
                  {{ cat.name }}
                </h3>
                <span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line text-taupe transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-gold dark:border-line-dark">
                  <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          }

          <!-- Editorial end tile -->
          <a
            role="listitem"
            routerLink="/categories"
            class="group flex w-[60%] flex-shrink-0 snap-start items-center justify-center rounded-3xl border border-dashed border-line bg-linen px-8 text-center transition-colors duration-500 hover:border-gold/60 hover:bg-linen sm:w-[38%] lg:w-[22%] dark:border-line-dark dark:bg-espresso-soft"
          >
            <div>
              <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold">
                <app-icon name="plus" class="h-5 w-5" />
              </span>
              <h3 class="mt-5 font-display text-2xl font-medium leading-snug text-ink dark:text-bone">Explore all {{ cats().length + 8 }} rooms</h3>
              <span class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                Browse categories <app-icon name="arrowRight" class="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </div>

        <div class="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-taupe dark:text-fawn" aria-hidden="true">
          <span>Swipe to explore</span>
          <span class="h-px w-16 bg-gold/40"></span>
          <span class="inline-block h-3 w-3 border border-gold/50"></span>
        </div>
      </div>
    </section>
  `,
})
export class HomeCategories {
  readonly cats = signal(CATEGORIES.slice(0, 6));
}
