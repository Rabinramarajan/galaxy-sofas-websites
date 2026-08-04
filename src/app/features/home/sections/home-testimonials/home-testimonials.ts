import { Component, signal } from '@angular/core';
import { TESTIMONIALS } from '../../../../core/data/testimonials.data';
import { TestimonialCard } from '../../../../shared/components/testimonial-card/testimonial-card';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Testimonials — a large voice on the left, the chorus on the right. */
@Component({
  selector: 'app-home-testimonials',
  imports: [TestimonialCard, AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" aria-hidden="true"></div>

      <div class="section-shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              From Our Homes
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              1.2 million homes,<br />one shared opinion
            </h2>
            <div appReveal effect="fade-up" [delay]="240" class="mt-7 flex items-center gap-4">
              <span class="font-display text-5xl font-semibold text-ink dark:text-bone">4.9</span>
              <span>
                <span class="flex items-center gap-0.5">
                  @for (_ of [1, 2, 3, 4, 5]; track $index) {
                    <app-icon name="star" class="h-4 w-4 text-gold fill-current" />
                  }
                </span>
                <span class="mt-1 block text-xs text-taupe dark:text-fawn">Based on 2.4 lakh verified reviews</span>
              </span>
            </div>
            <div appReveal effect="fade-up" [delay]="360" class="mt-8">
              <app-button href="/testimonials" label="Read All Stories" variant="outline" size="lg" [arrow]="true" />
            </div>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:col-span-8">
          @for (t of testimonials(); track t.id; let i = $index) {
            <app-testimonial-card [t]="t" />
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeTestimonials {
  readonly testimonials = signal(TESTIMONIALS.slice(0, 4));
}
