import { Component, computed, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { TestimonialCard } from '../../../../shared/components/testimonial-card/testimonial-card';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { TESTIMONIALS } from '../../../../core/data/testimonials.data';

/** Customer reviews carousel — auto-advancing testimonial row. */
@Component({
  selector: 'app-home-reviews',
  imports: [SectionHeader, TestimonialCard, AppIcon, AppButton],
  template: `
    <section class="bg-surface py-20 sm:py-28 dark:bg-dark-soft">
      <div class="section-shell">
        <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
          <app-section-header
            align="left"
            eyebrow="Customer Reviews"
            title="1.2 million homes, still counting"
            description="Real reviews from verified Galaxy owners — no edits, no cherry-picking."
          />
          <div class="flex items-center gap-3 pb-2">
            <button type="button" (click)="page.set((page() - 1 + totalPages) % totalPages)" class="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:border-secondary hover:text-secondary dark:border-white/15 dark:text-white" aria-label="Previous testimonials">
              <app-icon name="chevronRight" class="h-4 w-4 rotate-180" />
            </button>
            <button type="button" (click)="page.set((page() + 1) % totalPages)" class="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:border-secondary hover:text-secondary dark:border-white/15 dark:text-white" aria-label="Next testimonials">
              <app-icon name="chevronRight" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (t of visible(); track t.id) {
            <app-testimonial-card [t]="t" />
          }
        </div>

        <div class="mt-10 flex flex-col items-center gap-4">
          <div class="flex items-center gap-1 text-secondary">
            @for (_ of [1, 2, 3, 4, 5]; track $index) {
              <app-icon name="star" class="h-4 w-4 fill-current" />
            }
          </div>
          <p class="text-sm text-muted">4.9 average across {{ 12847 }} verified reviews</p>
          <app-button href="/testimonials" label="Read All Reviews" variant="ghost" />
        </div>
      </div>
    </section>
  `,
})
export class HomeReviews {
  readonly page = signal(0);
  readonly pageSize = 3;
  readonly all = signal(TESTIMONIALS);
  readonly totalPages = Math.ceil(this.all().length / 3);

  readonly visible = computed(() => this.all().slice(this.page() * this.pageSize, (this.page() + 1) * this.pageSize));
}
