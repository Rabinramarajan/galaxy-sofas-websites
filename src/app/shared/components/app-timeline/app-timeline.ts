import { Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import type { TimelineItem } from '../../../core/models/furniture.model';

/** Vertical animated timeline for the About / company story. */
@Component({
  selector: 'app-timeline',
  imports: [RevealDirective],
  template: `
    <ol class="relative border-l-2 border-dashed border-secondary/30">
      @for (item of items(); track item.year; let i = $index) {
        <li appReveal effect="fade-up" [delay]="i * 60" class="relative ml-8 pb-12 last:pb-0">
          <span class="absolute -left-[41px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient shadow-gold ring-4 ring-white dark:ring-dark">
            <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
          </span>
          <span class="inline-block rounded-full bg-secondary/10 px-4 py-1 font-display text-lg font-bold text-secondary dark:bg-secondary/15">{{ item.year }}</span>
          <h3 class="mt-3 font-display text-xl font-semibold text-primary dark:text-white">{{ item.title }}</h3>
          <p class="mt-2 max-w-xl leading-relaxed text-muted">{{ item.description }}</p>
        </li>
      }
    </ol>
  `,
})
export class AppTimeline {
  readonly items = input<TimelineItem[]>([]);
}
