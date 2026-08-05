import { Component, signal } from '@angular/core';
import { PROCESS_STEPS } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Craftsmanship — a photographic timeline, stages alternating along a gold hairline. */
@Component({
  selector: 'app-home-craft',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-gold/10 blur-[130px]" aria-hidden="true"></div>

      <div class="section-shell">
        <!-- Centered header -->
        <div class="mx-auto max-w-2xl text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            Craftsmanship
            <span class="h-px w-10 bg-gradient-to-l from-gold to-transparent"></span>
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Eight weeks.<br />One signature.
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-6 text-base leading-relaxed text-umber dark:text-fawn">
            Four moments from timber to white gloves — every piece passes through the same hands
            that built the first one in 2012. No shortcuts between week one and week eight.
          </p>
        </div>

        <!-- Timeline -->
        <div class="relative mx-auto mt-20 max-w-6xl">
          <div class="absolute bottom-0 left-[1.15rem] top-0 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent lg:left-1/2" aria-hidden="true"></div>

          @for (step of steps(); track step.id; let i = $index) {
            <div appReveal effect="fade-up" [delay]="i * 100" class="group relative pb-16 pl-14 last:pb-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20 lg:pl-0 lg:pb-24">
              <!-- Node on the line -->
              <span class="absolute left-[1.15rem] top-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center lg:left-1/2" aria-hidden="true">
                <span class="absolute h-4 w-4 rounded-full bg-gold/25"></span>
                <span class="h-2 w-2 rounded-full bg-gold shadow-gold"></span>
              </span>

              <!-- Stage image -->
              <div [class]="imageCol(i)" class="group relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-line dark:ring-line-dark">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img
                    [src]="step.image ?? ''"
                    [alt]="step.title"
                    width="900"
                    height="675"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent"></div>
                  <span class="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-full glass-dark px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-light backdrop-blur-md">
                    <app-icon [name]="step.icon" class="h-3 w-3" />
                    {{ step.duration }}
                  </span>
                </div>
              </div>

              <!-- Stage text -->
              <div [class]="textCol(i)" class="mt-6 lg:mt-0">
                <span class="font-display text-5xl font-light text-gold/40 transition-colors duration-500 group-hover:text-gold">{{ step.index }}</span>
                <h3 class="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl dark:text-bone">{{ step.title }}</h3>
                <p class="mt-3 max-w-md text-sm leading-relaxed text-taupe dark:text-fawn">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>

        <div appReveal effect="fade-up" class="mt-16 flex justify-center">
          <app-button href="/manufacturing-process" label="See the Full Process" variant="outline" size="lg" [arrow]="true" />
        </div>
      </div>
    </section>
  `,
})
export class HomeCraft {
  readonly steps = signal(PROCESS_STEPS.slice(0, 4));

  imageCol(index: number): string {
    return index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
  }

  textCol(index: number): string {
    return index % 2 === 0 ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4 lg:text-right lg:[&>p]:ml-auto';
  }
}
