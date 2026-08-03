import { Component, input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';

/** Infinite scrolling marquee strip — trust badges / brand values. */
@Component({
  selector: 'app-marquee',
  imports: [AppIcon],
  template: `
    <div class="relative overflow-hidden mask-fade-x" [class]="wrapperClass()">
      <div class="flex w-max animate-marquee gap-x-8" [class.hover:[animation-play-state:paused]]="pausable()">
        @for (item of items(); track item) {
          <span class="flex items-center gap-8 whitespace-nowrap font-display text-xl font-semibold" [class]="itemClass()">
            {{ item }} <app-icon name="sparkles" class="h-5 w-5 text-secondary" />
          </span>
        }
        @for (item of items(); track $index + 'b') {
          <span aria-hidden="true" class="flex items-center gap-8 whitespace-nowrap font-display text-xl font-semibold" [class]="itemClass()">
            {{ item }} <app-icon name="sparkles" class="h-5 w-5 text-secondary" />
          </span>
        }
      </div>
    </div>
  `,
})
export class AppMarquee {
  readonly items = input<string[]>([]);
  readonly pausable = input(true);
  readonly wrapperClass = input('');
  readonly itemClass = input('');
}
