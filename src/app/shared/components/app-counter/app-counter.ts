import { Component, input } from '@angular/core';
import { CounterDirective } from '../../directives/counter.directive';

/** Animated statistic counter with label — used in about/stats rows. */
@Component({
  selector: 'app-counter',
  imports: [CounterDirective],
  template: `
    <div class="flex flex-col items-center gap-2 text-center">
      <span class="font-display text-4xl font-bold text-primary sm:text-5xl dark:text-white">
        <span appCounter [target]="target()" [duration]="duration()" [prefix]="prefix()" [suffix]="suffix()" [decimals]="decimals()"></span>
      </span>
      <span class="text-sm font-medium text-muted">{{ label() }}</span>
    </div>
  `,
})
export class AppCounter {
  readonly target = input(0);
  readonly duration = input(1800);
  readonly prefix = input('');
  readonly suffix = input('');
  readonly decimals = input(0);
  readonly label = input('');
}
