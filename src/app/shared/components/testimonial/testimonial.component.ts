import { Component, input } from '@angular/core';
import { Testimonial } from '../../../core/models/site.models';

@Component({
  selector: 'gs-testimonial',
  standalone: true,
  template: `
    <article class="glass-card p-6">
      <p class="text-amber-500">{{ '★'.repeat(item().rating) }}</p>
      <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">“{{ item().quote }}”</p>
      <p class="mt-4 font-semibold">{{ item().name }}</p>
      <p class="text-xs uppercase tracking-widest text-slate-500">{{ item().role }}</p>
    </article>
  `
})
export class TestimonialComponent {
  readonly item = input.required<Testimonial>();
}
