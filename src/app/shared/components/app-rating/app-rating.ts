import { Component, computed, input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';

/** Display a 0–5 star rating with an optional numeric value. */
@Component({
  selector: 'app-rating',
  imports: [AppIcon],
  template: `
    <div class="flex items-center gap-2" [attr.aria-label]="ariaLabel()" [class.gap-1]="size() === 'md'">
      <div class="flex items-center gap-0.5 text-secondary" [class.text-lg]="size() === 'lg'" [class.text-base]="size() === 'md'" [class.h-5]="size() === 'lg'" [class.h-4]="size() === 'md'" [class.h-3]="size() === 'sm'">
        @for (star of stars(); track $index) {
          <span class="transition-transform duration-300 hover:scale-125">
            @if (star === 1) {
              <app-icon name="star" class="fill-current" />
            } @else if (star === 0.5) {
              <span class="relative inline-flex">
                <app-icon name="star" class="text-muted/30" />
                <span class="absolute inset-0 overflow-hidden" [style.width]="'50%'">
                  <app-icon name="star" class="fill-current" />
                </span>
              </span>
            } @else {
              <app-icon name="star" class="text-muted/30" />
            }
          </span>
        }
      </div>
      @if (showValue()) {
        <span class="text-xs font-semibold text-muted">{{ value() }}</span>
      }
      @if (showCount() && count()) {
        <span class="text-xs text-muted">({{ count() }})</span>
      }
    </div>
  `,
})
export class AppRating {
  readonly value = input(0);
  readonly count = input<number>();
  readonly showValue = input(true);
  readonly showCount = input(false);
  readonly size = input<'sm' | 'md' | 'lg'>('sm');

  readonly stars = computed(() => {
    const v = this.value();
    const out: number[] = [];
    for (let i = 1; i <= 5; i++) {
      if (v >= i) out.push(1);
      else if (v >= i - 0.5) out.push(0.5);
      else out.push(0);
    }
    return out;
  });

  readonly ariaLabel = computed(() => `Rated ${this.value()} out of 5 stars`);
}
