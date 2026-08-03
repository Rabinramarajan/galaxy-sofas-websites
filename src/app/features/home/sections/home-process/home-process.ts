import { Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PROCESS_STEPS } from '../../../../core/data/content.data';
import { AppButton } from '../../../../shared/components/app-button/app-button';

/** Furniture process — condensed 8-step timeline strip. */
@Component({
  selector: 'app-home-process',
  imports: [SectionHeader, AppIcon, RevealDirective, AppButton],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <app-section-header
        eyebrow="The Furniture Process"
        title="Eight steps between forest and home"
        description="A piece of Galaxy furniture is born over six weeks, across 1.5 lakh square feet of workshop."
      />

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        @for (step of steps; track step.id; let i = $index) {
          <div appReveal effect="fade-up" [delay]="(i % 4) * 90" class="relative rounded-2xl bg-white p-6 shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift dark:bg-dark-card dark:ring-white/5">
            @if (i < steps.length - 1) {
              <span class="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-secondary/30 lg:block">
                <app-icon name="chevronRight" class="h-5 w-5" />
              </span>
            }
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/12 text-secondary">
              <app-icon [name]="step.icon" class="h-6 w-6" />
            </span>
            <div class="mt-4 text-[11px] font-bold uppercase tracking-widest text-muted">{{ step.duration }}</div>
            <h3 class="mt-1 font-display text-lg font-semibold text-primary dark:text-white">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ step.description }}</p>
          </div>
        }
      </div>

      <div class="mt-12 text-center">
        <app-button href="/manufacturing-process" label="Deep Dive Into Manufacturing" variant="primary" [arrow]="true" />
      </div>
    </section>
  `,
})
export class HomeProcess {
  readonly steps = PROCESS_STEPS;
}
