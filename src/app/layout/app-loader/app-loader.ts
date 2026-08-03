import { Component, signal } from '@angular/core';

/** Branded loading screen shown until the app is ready to paint. */
@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    @if (visible()) {
      <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-dark" role="status" aria-label="Loading Galaxy Sofas">
        <div class="relative flex h-20 w-20 items-center justify-center">
          <span class="absolute inset-0 rounded-2xl bg-gold-gradient opacity-20 animate-ping"></span>
          <span class="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-gradient shadow-gold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-9 w-9 text-white">
              <path d="M22 18v-3a2 2 0 0 0-2-2h-1.5v-2.5a4.5 4.5 0 0 0-4.5-4.5h-8A4.5 4.5 0 0 0 1.5 10.5V13H0v5h2v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h14v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h2Z"/>
              <path d="M4 10.5V13h16v-2.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 10.5Z"/>
            </svg>
          </span>
        </div>
        <div class="mt-8 flex items-center gap-1">
          @for (_ of [1, 2, 3, 4, 5]; track $index) {
            <span class="h-1.5 w-1.5 rounded-full bg-gold-gradient animate-bounce" [style.animation-delay]="$index * 0.12 + 's'"></span>
          }
        </div>
        <p class="mt-4 font-display text-lg font-semibold text-primary dark:text-white">Galaxy <span class="text-gradient-gold">Sofas</span></p>
        <p class="mt-1 text-xs uppercase tracking-[0.3em] text-muted">Furniture Beyond Imagination</p>
      </div>
    }
  `,
})
export class AppLoader {
  readonly visible = signal(true);

  constructor() {
    if (typeof window === 'undefined') return;
    window.setTimeout(() => this.visible.set(false), 900);
  }
}
