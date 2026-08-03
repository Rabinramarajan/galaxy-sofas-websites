import { Component, input } from '@angular/core';

@Component({
  selector: 'gs-timeline',
  standalone: true,
  template: `
    <section class="grid gap-4 md:grid-cols-4">
      @for (step of steps(); track step.title) {
        <article class="glass-card p-5">
          <p class="text-xs uppercase tracking-widest text-amber-600">Step {{ step.step }}</p>
          <h3 class="mt-2 section-title text-xl">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ step.description }}</p>
        </article>
      }
    </section>
  `
})
export class TimelineComponent {
  readonly steps = input.required<Array<{ step: number; title: string; description: string }>>();
}
