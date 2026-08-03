import { Component, input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { AppRating } from '../app-rating/app-rating';
import { RevealDirective } from '../../directives/reveal.directive';
import type { Testimonial } from '../../../core/models/furniture.model';

/** Single testimonial card with avatar, quote mark and product context. */
@Component({
  selector: 'app-testimonial-card',
  imports: [AppIcon, AppRating, RevealDirective],
  template: `
    <figure
      appReveal
      effect="fade-up"
      class="relative flex h-full flex-col gap-5 rounded-2xl bg-white p-7 shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:shadow-lift dark:bg-dark-card dark:ring-white/5"
    >
      <span class="absolute -top-3 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold">
        <app-icon name="quote" class="h-4 w-4" />
      </span>

      <app-rating [value]="t().rating" [showValue]="false" />

      <blockquote class="flex-1 text-[15px] leading-relaxed text-primary/90 dark:text-white/85">
        “{{ t().text }}”
      </blockquote>

      <figcaption class="flex items-center gap-4 border-t border-primary/10 pt-5 dark:border-white/10">
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white" [class]="t().avatarColor">
          {{ t().initials }}
        </span>
        <div>
          <div class="font-semibold text-primary dark:text-white">{{ t().name }}</div>
          <div class="text-xs text-muted">{{ t().location }}</div>
        </div>
        <span class="ml-auto hidden rounded-full bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary dark:bg-dark-soft sm:block">
          {{ t().product }}
        </span>
      </figcaption>
    </figure>
  `,
})
export class TestimonialCard {
  readonly t = input.required<Testimonial>();
}
