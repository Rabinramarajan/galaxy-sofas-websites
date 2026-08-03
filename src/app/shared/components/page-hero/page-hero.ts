import { Component, computed, input } from '@angular/core';
import { AppBreadcrumb, Crumb } from '../app-breadcrumb/app-breadcrumb';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Inner-page hero — consistent premium opening for every non-home page:
 * breadcrumbs, display heading, description and a parallax visual backdrop.
 */
@Component({
  selector: 'app-page-hero',
  imports: [AppBreadcrumb, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-cream dark:bg-dark" aria-labelledby="page-title">
      <!-- decorative glow -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-gradient opacity-[0.07] blur-3xl animate-aurora"></div>
        <div class="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-secondary opacity-[0.06] blur-3xl animate-aurora" [style.animation-delay]="'-4s'"></div>
      </div>

      <div class="section-shell relative flex flex-col gap-6 pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div appReveal effect="fade-up">
          <app-breadcrumb [crumbs]="computedCrumbs()" />
        </div>

        <div appReveal effect="fade-up" [delay]="100">
          <span class="eyebrow text-secondary">
            <span class="h-px w-8 bg-gradient-to-r from-secondary to-transparent"></span>
            {{ eyebrow() }}
          </span>
        </div>

        <h1
          id="page-title"
          appReveal
          effect="fade-up"
          [delay]="160"
          class="max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-primary sm:text-5xl lg:text-6xl dark:text-white"
        >
          {{ title() }}
        </h1>

        @if (displayDescription()) {
          <p appReveal effect="fade-up" [delay]="240" class="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {{ displayDescription() }}
          </p>
        }

        @if (hasCTA) {
          <div appReveal effect="fade-up" [delay]="320" class="mt-2">
            <ng-content select="[slot=cta]" />
          </div>
        }
      </div>
    </section>
  `,
})
export class PageHero {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly description = input('');
  readonly eyebrow = input('Galaxy Sofas');
  readonly crumbs = input<Crumb[]>([]);
  readonly breadcrumbLabel = input('');
  readonly breadcrumbPath = input('');
  readonly showBreadcrumb = input(false);
  readonly hasCTA = true;

  readonly computedCrumbs = computed<Crumb[]>(() => {
    const crumbs = this.crumbs();
    if (crumbs.length > 0) return crumbs;
    if (!this.showBreadcrumb() || !this.breadcrumbLabel()) return [];
    if (this.breadcrumbPath()) {
      return [{ label: 'Home', path: '/' }, { label: this.breadcrumbLabel() }];
    }
    return [{ label: this.breadcrumbLabel() }];
  });

  readonly displayDescription = computed(() => this.description() || this.subtitle());
}
