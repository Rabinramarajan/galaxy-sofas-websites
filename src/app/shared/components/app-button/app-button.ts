import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { RippleDirective } from '../../directives/ripple.directive';
import { cx } from '../../../core/utils/utils';
import { ICON_PATHS } from '../app-icon/app-icon';

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'white' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * The Galaxy signature button — magnetic, ripple, animated arrow.
 * Every interactive CTA on the site uses this component.
 */
@Component({
  selector: 'app-button',
  imports: [RouterLink, MagneticDirective, RippleDirective],
  template: `
    @if (href()) {
      <a
        [routerLink]="usesRouterLink() ? href() : null"
        [href]="usesRouterLink() ? null : href()"
        [attr.target]="external() ? '_blank' : null"
        [attr.rel]="external() ? 'noopener noreferrer' : null"
        appMagnetic
        appRipple
        [rippleColor]="darkRipple() ? 'dark' : 'light'"
        class="group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        [class]="classes()"
      >
        @if (icon()) {
          <span class="flex items-center [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path [attr.d]="iconPath()"/></svg>
          </span>
        }
        <span>{{ label() }}</span>
        @if (arrow()) {
          <span class="transition-transform duration-500 group-hover:translate-x-1 [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        }
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        (click)="onClick.emit()"
        appMagnetic
        appRipple
        [rippleColor]="darkRipple() ? 'dark' : 'light'"
        class="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-50"
        [class]="classes()"
      >
        <ng-content />
        @if (icon()) {
          <span class="flex items-center [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path [attr.d]="iconPath()"/></svg>
          </span>
        }
        @if (arrow()) {
          <span class="transition-transform duration-500 group-hover:translate-x-1 [&>svg]:h-[1.1em] [&>svg]:w-[1.1em]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        }
      </button>
    }
  `,
})
export class AppButton {
  readonly label = input('');
  readonly href = input<string>();
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<string>();
  readonly arrow = input(true);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly external = input(false);
  readonly block = input(false);

  readonly onClick = output<void>();

  readonly darkRipple = computed(
    () => this.variant() === 'outline' || this.variant() === 'ghost' || this.variant() === 'white'
  );

  readonly usesRouterLink = computed(() => {
    const h = this.href();
    return !!h && !/^[a-z][a-z\d+\-.]*:/i.test(h) && !h.startsWith('#');
  });

  readonly iconPath = computed(() => {
    const i = this.icon();
    return i ? (ICON_PATHS[i] ?? i) : '';
  });

  readonly classes = computed(() => {
    const base =
      this.size() === 'sm'
        ? 'px-5 py-2.5 text-sm'
        : this.size() === 'lg'
          ? 'px-8 py-4 text-base'
          : this.size() === 'xl'
            ? 'px-10 py-5 text-lg'
            : 'px-7 py-3.5 text-sm sm:text-base';

    const variant = {
      primary:
        'bg-primary text-white hover:bg-primary-soft hover:shadow-lift dark:bg-white dark:text-primary dark:hover:bg-gray-200',
      gold: 'bg-gold-gradient text-white shadow-gold hover:shadow-glow hover:brightness-105',
      outline:
        'border-2 border-primary/20 text-primary hover:border-secondary hover:text-secondary dark:border-white/25 dark:text-white dark:hover:border-secondary dark:hover:text-secondary',
      ghost: 'text-primary hover:bg-primary/5 dark:text-white dark:hover:bg-white/10',
      white: 'bg-white text-primary shadow-soft hover:shadow-lift',
      glass: 'glass text-primary hover:shadow-soft dark:glass-dark dark:text-white',
    }[this.variant()];

    return cx(base, variant, this.block() ? 'w-full' : '', 'focus-gold');
  });
}
