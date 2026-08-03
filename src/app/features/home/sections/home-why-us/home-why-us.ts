import { Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { MouseGlowDirective } from '../../../../shared/directives/mouse-glow.directive';
import { WHY_US_FEATURES } from '../../../../core/data/content.data';

/** Why choose Galaxy — mouse-glow feature cards. */
@Component({
  selector: 'app-home-why-us',
  imports: [SectionHeader, AppIcon, RevealDirective, MouseGlowDirective],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <app-section-header
        eyebrow="Why Galaxy Sofas"
        title="The reasons people never look back"
        description="Six promises we've kept since 2012 — and will keep on every piece we ship."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (feature of features(); track feature.title; let i = $index) {
          <div
            appReveal
            effect="fade-up"
            [delay]="(i % 3) * 100"
            appMouseGlow
            class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift dark:bg-dark-card dark:ring-white/5"
          >
            <span class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-white shadow-gold transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <app-icon [name]="feature.icon" class="h-6 w-6" />
            </span>
            <h3 class="relative mt-6 font-display text-xl font-semibold text-primary dark:text-white">{{ feature.title }}</h3>
            <p class="relative mt-3 text-sm leading-relaxed text-muted">{{ feature.description }}</p>
            <span class="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-secondary/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></span>
          </div>
        }
      </div>
    </section>
  `,
})
export class HomeWhyUs {
  readonly features = signal(WHY_US_FEATURES);
}
