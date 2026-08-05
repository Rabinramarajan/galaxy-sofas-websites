import { Component, signal } from '@angular/core';
import { WHY_US_FEATURES } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** The Galaxy Promise — a quiet manifesto: six promises set in hairlined display rows. */
@Component({
  selector: 'app-home-why-us',
  imports: [AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <!-- Centered manifesto header -->
        <div class="mx-auto max-w-2xl text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            The Galaxy Promise
            <span class="h-px w-10 bg-gradient-to-l from-gold to-transparent"></span>
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Why homes choose us
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-5 text-base leading-relaxed text-umber dark:text-fawn">
            Six promises we've kept for over a decade — set down in writing on every single invoice,
            in the same ink as our signature.
          </p>
        </div>

        <!-- Manifesto rows -->
        <ol class="mx-auto mt-16 max-w-5xl">
          @for (feature of features(); track feature.title; let i = $index) {
            <li
              appReveal
              effect="fade-up"
              [delay]="i * 60"
              class="group grid items-center gap-4 border-t border-line py-7 transition-all duration-500 last:border-b hover:bg-linen/70 sm:grid-cols-12 sm:gap-6 sm:px-4 dark:border-line-dark dark:hover:bg-espresso-soft"
            >
              <span class="font-display text-3xl font-light text-gold/40 transition-colors duration-500 group-hover:text-gold sm:col-span-1">
                {{ (i + 1) < 10 ? '0' + (i + 1) : i + 1 }}
              </span>

              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/20 transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold sm:col-span-1">
                <app-icon [name]="feature.icon" class="h-5 w-5" />
              </span>

              <div class="sm:col-span-8">
                <h3 class="font-display text-xl font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-gold sm:text-2xl dark:text-bone">
                  {{ feature.title }}
                </h3>
                <p class="mt-1.5 max-w-lg text-sm leading-relaxed text-taupe dark:text-fawn">{{ feature.description }}</p>
              </div>

              <span class="flex h-9 w-9 items-center justify-center justify-self-start rounded-full border border-line text-taupe/0 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-gold sm:col-span-2 sm:justify-self-end dark:border-line-dark">
                <app-icon name="check" class="h-4 w-4" />
              </span>
            </li>
          }
        </ol>

        <!-- Signature line -->
        <div appReveal effect="fade-up" [delay]="360" class="mt-12 flex flex-col items-center gap-3 text-center">
          <span class="h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true"></span>
          <p class="font-display text-lg italic text-umber/80 dark:text-fawn/80">"Made slowly, promised in writing."</p>
          <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">The Galaxy Atelier · Since 2012</p>
        </div>
      </div>
    </section>
  `,
})
export class HomeWhyUs {
  readonly features = signal(WHY_US_FEATURES);
}
