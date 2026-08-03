import { Component, signal } from '@angular/core';

/** Thin gold scroll-progress bar pinned to the top of the viewport. */
@Component({
  selector: 'app-scroll-progress',
  imports: [],
  template: `
    <div class="fixed left-0 top-0 z-[70] h-0.5 w-full bg-transparent" aria-hidden="true">
      <div class="h-full bg-gold-gradient shadow-glow" [style.transform]="'scaleX(' + progress() + ')'" [style.transform-origin]="'0 50%'"></div>
    </div>
  `,
})
export class ScrollProgress {
  readonly progress = signal(0);

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.#onScroll, { passive: true });
    window.addEventListener('resize', this.#onScroll, { passive: true });
    this.#onScroll();
  }

  #onScroll = (): void => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    this.progress.set(max > 0 ? window.scrollY / max : 0);
  };
}
