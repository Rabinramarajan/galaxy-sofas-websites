import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-luxury-button',
  standalone: true,
  imports: [CommonModule, RippleDirective],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-label]="ariaLabel() || label()"
      appRipple
      (click)="btnClick.emit($event)"
      class="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      [ngClass]="{
        'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-stone-950 shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] hover:scale-[1.02]': variant() === 'primary',
        'border border-amber-400/30 bg-stone-900/60 backdrop-blur-md text-amber-200 hover:border-amber-400 hover:bg-amber-400/10 hover:text-white': variant() === 'secondary',
        'text-amber-300 hover:text-white underline-offset-8 hover:underline': variant() === 'ghost'
      }"
    >
      @if (loading()) {
        <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent"></span>
      } @else {
        <ng-content select="[slot=icon-left]"></ng-content>
      }
      <span class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
        {{ label() }}
      </span>
      <ng-content select="[slot=icon-right]"></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class LuxuryButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly btnClick = output<MouseEvent>();
}
