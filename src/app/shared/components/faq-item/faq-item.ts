import { Component, input, signal } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { expand } from '../../animations/animations';

/** Animated FAQ accordion item. */
@Component({
  selector: 'app-faq-item',
  imports: [AppIcon],
  animations: [expand],
  template: `
    <div class="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-all duration-500 dark:bg-dark-card dark:ring-white/5" [class.ring-secondary/40]="open()">
      <button
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="'faq-' + id()"
        class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-gold"
      >
        <span class="font-display text-base font-semibold text-primary sm:text-lg dark:text-white">{{ question() }}</span>
        <span
          class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500"
          [class.bg-gold-gradient.text-white.rotate-180]="open()"
          [class.bg-surface]="!open()"
          [class.dark:bg-dark-soft]="!open()"
          [class.text-secondary]="!open()"
        >
          <app-icon name="chevronDown" class="h-4 w-4" />
        </span>
      </button>
      @if (open()) {
        <div [@expand] class="px-6 pb-6">
          <p class="leading-relaxed text-muted">{{ answer() }}</p>
        </div>
      }
    </div>
  `,
})
export class FaqItem {
  readonly question = input.required<string>();
  readonly answer = input.required<string>();
  readonly id = input('0');
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}
