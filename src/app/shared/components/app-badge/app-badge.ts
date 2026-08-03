import { Component, computed, input } from '@angular/core';
import { cx } from '../../../core/utils/utils';
import { AppIcon } from '../app-icon/app-icon';

export type BadgeVariant = 'gold' | 'primary' | 'success' | 'outline' | 'glass' | 'dark';

/** Small pill badge used for product labels, tags and offers. */
@Component({
  selector: 'app-badge',
  imports: [AppIcon],
  template: `
    <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider" [class]="classes()">
      @if (icon()) {
        <app-icon [name]="icon()!" class="h-3 w-3" />
      }
      <ng-content />
    </span>
  `,
})
export class AppBadge {
  readonly variant = input<BadgeVariant>('gold');
  readonly icon = input<string>();

  readonly classes = computed(() => {
    const map: Record<BadgeVariant, string> = {
      gold: 'bg-gold-gradient text-white shadow-gold',
      primary: 'bg-primary text-white dark:bg-white dark:text-primary',
      success: 'bg-success/15 text-emerald-600 dark:text-emerald-400',
      outline: 'border border-primary/15 text-primary dark:border-white/20 dark:text-white',
      glass: 'glass text-primary dark:glass-dark dark:text-white',
      dark: 'bg-dark text-white',
    };
    return cx(map[this.variant()]);
  });
}
