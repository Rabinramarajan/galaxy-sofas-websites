import { Component, signal } from '@angular/core';
import { AppIcon } from '../../shared/components/app-icon/app-icon';

/** Smooth-scrolling "back to top" button that appears after scrolling. */
@Component({
  selector: 'app-back-to-top',
  imports: [AppIcon],
  template: `
    <button
      type="button"
      (click)="scrollTop()"
      [attr.aria-label]="'Back to top'"
      class="fixed bottom-6 left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold transition-all duration-500 hover:shadow-glow hover:brightness-105"
      [class.opacity-0.pointer-events-none.-translate-y-3]="!visible()"
      [class.opacity-100.translate-y-0]="visible()"
    >
      <app-icon name="arrowUp" class="h-5 w-5" />
    </button>
  `,
})
export class BackToTop {
  readonly visible = signal(false);

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.#onScroll, { passive: true });
  }

  #onScroll = (): void => {
    this.visible.set(window.scrollY > 600);
  };

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
