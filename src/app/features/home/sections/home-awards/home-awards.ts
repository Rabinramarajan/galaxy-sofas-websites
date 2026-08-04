import { Component, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Award {
  year: string;
  name: string;
  body: string;
}

const AWARDS: Award[] = [
  { year: '2024', name: 'India Furniture Design Awards', body: 'Best Luxury Sofa Manufacturer' },
  { year: '2023', name: 'Retail Design & Furnishing Expo', body: 'Most Trusted Furniture Brand — South' },
  { year: '2021', name: 'Make in India Excellence', body: 'Outstanding Craftsmanship' },
  { year: '2019', name: 'Home Decor Leaders Forum', body: 'Design Innovation of the Year' },
];

/** Recognition — a quiet, confident wall of awards. */
@Component({
  selector: 'app-home-awards',
  imports: [AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-28 dark:bg-espresso">
      <div class="section-shell">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Recognition
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Trophies don't<br />make sofas.<br /><em class="italic text-gradient-gold font-semibold">Care does.</em>
            </h2>
            <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-sm text-base leading-relaxed text-umber dark:text-fawn">
              Still, a little recognition never hurt. Here's what the industry keeps saying about us.
            </p>
          </div>

          <ol class="lg:col-span-8">
            @for (award of awards(); track award.name; let i = $index) {
              <li appReveal effect="fade-up" [delay]="i * 90" class="group border-t border-line py-7 transition-colors duration-500 last:border-b hover:bg-linen dark:border-line-dark dark:hover:bg-espresso-soft">
                <div class="flex flex-wrap items-center gap-4 px-2">
                  <span class="font-display text-2xl font-light text-gold/50 transition-colors duration-300 group-hover:text-gold">{{ award.year }}</span>
                  <span class="flex h-10 w-10 items-center justify-center rounded-full border border-line text-taupe transition-all duration-500 group-hover:border-gold group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold dark:border-line-dark">
                    <app-icon name="award" class="h-4 w-4" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block font-display text-lg font-semibold text-ink dark:text-bone">{{ award.name }}</span>
                    <span class="block text-sm text-taupe dark:text-fawn">{{ award.body }}</span>
                  </span>
                  <span class="hidden h-px w-16 bg-line transition-all duration-500 group-hover:w-24 group-hover:bg-gold sm:block dark:bg-line-dark"></span>
                </div>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
})
export class HomeAwards {
  readonly awards = signal(AWARDS);
}
