import { Component, computed, input, signal } from '@angular/core';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';

/**
 * Before/after comparison slider. Drag the handle (or use arrow keys)
 * to reveal the "after" image beneath the "before".
 */
@Component({
  selector: 'app-before-after',
  imports: [AppImage, AppIcon],
  template: `
    <div
      #container
      class="relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl shadow-soft"
      role="slider"
      [attr.aria-valuenow]="pos()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="'Before and after comparison'"
      tabindex="0"
      (pointerdown)="dragStart($event, container)"
      (pointermove)="onMove($event, container)"
      (pointerup)="onUp()"
      (pointercancel)="onUp()"
      (keydown)="onKey($event)"
    >
      <!-- after (base) -->
      <app-img [src]="afterSrc()" [alt]="afterAlt()" class="absolute inset-0 block" priority="high" />
      <!-- before (clipped) -->
      <div class="absolute inset-0" [style.clip-path]="clipPath()">
        <app-img [src]="beforeSrc()" [alt]="beforeAlt()" class="block h-full w-full" priority="high" />
      </div>

      <!-- divider -->
      <div class="absolute inset-y-0" [style.left.%]="pos()" style="z-index: 10;">
        <div class="absolute inset-y-0 -translate-x-1/2 border-r-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"></div>
        <button
          type="button"
          class="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-gold-gradient text-white shadow-lift ring-4 ring-white/40 active:cursor-grabbing"
          aria-label="Drag to compare"
        >
          <app-icon name="compare" class="h-5 w-5" />
        </button>
      </div>

      <!-- labels -->
      <span class="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">Before</span>
      <span class="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">After</span>
    </div>
  `,
})
export class BeforeAfter {
  readonly beforeSrc = input.required<string>();
  readonly afterSrc = input.required<string>();
  readonly beforeAlt = input('Before');
  readonly afterAlt = input('After');

  readonly pos = signal(50);

  readonly clipPath = computed(() => `inset(0 ${100 - this.pos()}% 0 0)`);

  #dragging = false;

  dragStart(event: PointerEvent, el: HTMLElement): void {
    this.#dragging = true;
    el.setPointerCapture(event.pointerId);
    this.#update(event, el);
  }

  onMove(event: PointerEvent, el: HTMLElement): void {
    if (!this.#dragging) return;
    this.#update(event, el);
  }

  onUp(): void {
    this.#dragging = false;
  }

  onKey(event: KeyboardEvent): void {
    const step = event.key === 'ArrowLeft' ? -5 : event.key === 'ArrowRight' ? 5 : 0;
    if (step) {
      event.preventDefault();
      this.pos.update((p) => Math.max(0, Math.min(100, p + step)));
    }
  }

  #update(event: PointerEvent, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    this.pos.set(Math.max(0, Math.min(100, percent)));
  }
}
