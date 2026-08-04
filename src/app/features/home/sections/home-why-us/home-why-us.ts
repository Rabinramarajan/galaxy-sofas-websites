import { Component, signal } from '@angular/core';
import { WHY_US_FEATURES } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Why choose Galaxy — a calm bento of six honest promises. */
@Component({
  selector: 'app-home-why-us',
  imports: [AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <div class="flex flex-col items-center text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold">The Galaxy Promise</span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Why homes choose us
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-5 max-w-xl text-base leading-relaxed text-umber dark:text-fawn">
            Six promises we've kept for over a decade — and put in writing on every invoice.
          </p>
        </div>

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of features(); track feature.title; let i = $index) {
            <article
              appReveal
              effect="fade-up"
              [delay]="i * 70"
              class="group relative overflow-hidden rounded-3xl bg-snow p-8 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-lift hover:ring-gold/30 dark:bg-espresso-soft dark:ring-line-dark"
              [class]="i === 0 ? 'lg:col-span-2' : ''"
            >
              <div class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true"></div>
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold">
                <app-icon [name]="feature.icon" class="h-5 w-5" />
              </span>
              <h3 class="mt-5 font-display text-xl font-semibold text-ink dark:text-bone">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-taupe dark:text-fawn">{{ feature.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeWhyUs {
  readonly features = signal(WHY_US_FEATURES);
}
