import { Component, signal } from '@angular/core';
import { PROCESS_STEPS } from '../../../../core/data/content.data';
import { AppCounter } from '../../../../shared/components/app-counter/app-counter';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Manufacturing — the eight-stage journey as a numbered ribbon + live stats band. */
@Component({
  selector: 'app-home-manufacturing',
  imports: [AppCounter, AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="section-shell">
        <div class="flex flex-col items-center text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold">Inside the Atelier</span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            The eight-stage journey,<br />from plank to parlour
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-5 max-w-xl text-base leading-relaxed text-umber dark:text-fawn">
            Precision where it matters, patience everywhere else. Our atelier turns certified timber
            into heirlooms in a disciplined six-week flow.
          </p>
        </div>

        <ol class="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-4 dark:bg-line-dark">
          @for (step of steps(); track step.id; let i = $index) {
            <li appReveal effect="fade-up" [delay]="i * 70" class="group relative bg-paper p-7 transition-colors duration-500 hover:bg-linen dark:bg-espresso dark:hover:bg-mocha">
              <div class="flex items-center justify-between">
                <span class="font-display text-4xl font-light text-gold/40 transition-colors duration-500 group-hover:text-gold">{{ step.index }}</span>
                <app-icon [name]="step.icon" class="h-5 w-5 text-gold" />
              </div>
              <h3 class="mt-5 font-display text-lg font-semibold text-ink dark:text-bone">{{ step.title }}</h3>
              <p class="mt-2 line-clamp-3 text-[13px] leading-relaxed text-taupe dark:text-fawn">{{ step.description }}</p>
              <span class="mt-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-taupe dark:text-fawn">{{ step.duration }}</span>
            </li>
          }
        </ol>

        <div appReveal effect="fade-up" class="mt-12 flex justify-center">
          <app-button href="/manufacturing-process" label="Explore Manufacturing" variant="outline" size="lg" [arrow]="true" />
        </div>
      </div>

      <!-- Stats band -->
      <div class="section-shell mt-20">
        <div class="grid grid-cols-2 gap-y-10 rounded-[2rem] bg-espresso px-6 py-12 text-bone sm:grid-cols-4 dark:bg-mocha">
          @for (stat of stats(); track stat.label) {
            <div class="flex flex-col items-center text-center">
              <app-counter [target]="stat.value" [suffix]="stat.suffix" [prefix]="stat.prefix" [decimals]="stat.decimals ?? 0" />
              <span class="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-bone/50">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeManufacturing {
  readonly steps = signal(PROCESS_STEPS);

  readonly stats = signal([
    { label: 'Atelier size', value: 150000, prefix: '', suffix: ' sq ft' },
    { label: 'Master artisans', value: 450, prefix: '', suffix: '+' },
    { label: 'Experience centres', value: 28, prefix: '', suffix: '+' },
    { label: 'Pieces delivered', value: 1.2, prefix: '', suffix: 'M+', decimals: 1 },
  ]);
}
