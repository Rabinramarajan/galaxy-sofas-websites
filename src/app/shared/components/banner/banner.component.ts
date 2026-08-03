import { Component, input } from '@angular/core';

@Component({
  selector: 'gs-banner',
  standalone: true,
  template: `
    <section class="glass-card px-6 py-5">
      <p class="text-sm font-medium uppercase tracking-wide text-amber-600">{{ eyebrow() }}</p>
      <h2 class="section-title mt-2 text-2xl font-semibold">{{ title() }}</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-300">{{ description() }}</p>
    </section>
  `
})
export class BannerComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
