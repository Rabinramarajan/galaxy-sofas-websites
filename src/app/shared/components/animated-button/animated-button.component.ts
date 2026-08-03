import { Component, computed, input, output } from '@angular/core';
import { MagneticDirective } from '../../../directives/magnetic.directive';

@Component({
  selector: 'gs-animated-button',
  standalone: true,
  imports: [MagneticDirective],
  template: `
    <button
      type="button"
      gsMagnetic
      class="relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform duration-300 hover:-translate-y-1 glow-animate"
      [class]="classes()"
      (click)="clicked.emit()">
      <span>{{ label() }}</span>
      <span aria-hidden="true">→</span>
    </button>
  `
})
export class AnimatedButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly clicked = output<void>();

  readonly classes = computed(() =>
    this.variant() === 'primary'
      ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
      : 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900'
  );
}
