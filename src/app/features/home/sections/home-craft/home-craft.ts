import { Component, signal } from '@angular/core';
import { PROCESS_STEPS } from '../../../../core/data/content.data';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Craftsmanship — a numbered, image-led look inside the atelier. */
@Component({
  selector: 'app-home-craft',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell grid gap-14 lg:grid-cols-12">
        <!-- Sticky intro -->
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Craftsmanship
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Eight weeks.<br />One signature.
            </h2>
            <p appReveal effect="fade-up" [delay]="240" class="mt-6 text-base leading-relaxed text-umber dark:text-fawn">
              Every piece passes through eight hands-first stages — from timber selection to the
              white-glove team that places it in your room. No shortcuts between week one and week eight.
            </p>
            <div appReveal effect="fade-up" [delay]="360" class="mt-8">
              <app-button href="/manufacturing-process" label="See the Full Process" variant="outline" size="lg" [arrow]="true" />
            </div>
          </div>
        </div>

        <!-- Step cards -->
        <div class="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          @for (step of steps(); track step.id; let i = $index) {
            <article
              appReveal
              effect="fade-up"
              [delay]="i * 80"
              class="group relative overflow-hidden rounded-3xl bg-snow shadow-soft ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-lift dark:bg-espresso-soft dark:ring-line-dark"
            >
              <div class="relative h-44 overflow-hidden sm:h-48">
                <img
                  [src]="step.image ?? ''"
                  [alt]="step.title"
                  width="700"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent"></div>
                <span class="absolute bottom-3 right-4 font-display text-4xl font-semibold text-bone/60">{{ step.index }}</span>
              </div>
              <div class="p-6">
                <span class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  <app-icon [name]="step.icon" class="h-3.5 w-3.5" />
                  {{ step.duration }}
                </span>
                <h3 class="mt-2 font-display text-xl font-semibold text-ink dark:text-bone">{{ step.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-taupe dark:text-fawn">{{ step.description }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeCraft {
  readonly steps = signal(PROCESS_STEPS.slice(0, 4));
}
