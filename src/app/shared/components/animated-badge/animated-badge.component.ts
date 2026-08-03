import { Component, input } from '@angular/core';

@Component({
  selector: 'gs-animated-badge',
  standalone: true,
  template: `<span class="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">{{ label() }}</span>`
})
export class AnimatedBadgeComponent {
  readonly label = input.required<string>();
}
