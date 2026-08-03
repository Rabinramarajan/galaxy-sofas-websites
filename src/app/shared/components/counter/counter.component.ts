import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'gs-counter',
  standalone: true,
  template: `
    <article class="glass-card p-5 text-center">
      <p class="section-title text-4xl font-semibold text-amber-600">{{ formatted() }}</p>
      <p class="mt-2 text-sm uppercase tracking-widest">{{ label() }}</p>
    </article>
  `
})
export class CounterComponent {
  readonly label = input.required<string>();
  readonly target = input.required<number>();
  private readonly value = signal(0);

  constructor() {
    queueMicrotask(() => {
      const target = this.target();
      const step = Math.max(1, Math.floor(target / 20));
      const id = setInterval(() => {
        this.value.update((v) => {
          const next = Math.min(target, v + step);
          if (next >= target) clearInterval(id);
          return next;
        });
      }, 30);
    });
  }

  readonly formatted = computed(() => `${this.value().toLocaleString()}+`);
}
