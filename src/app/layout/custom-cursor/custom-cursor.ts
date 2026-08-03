import { Component, ElementRef, afterNextRender, viewChild } from '@angular/core';

/**
 * Custom luxury cursor — a gold dot that tracks the pointer instantly and a
 * ring that chases it with elastic easing, growing over interactive targets.
 * Desktop + fine-pointer only, respects reduced motion.
 */
@Component({
  selector: 'app-custom-cursor',
  imports: [],
  template: `
    <div class="pointer-events-none fixed inset-0 z-[120] hidden lg:block" aria-hidden="true">
      <div #dot class="fixed left-0 top-0 -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-secondary"></div>
      <div #ring class="fixed left-0 top-0 -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-secondary/70"></div>
    </div>
  `,
})
export class CustomCursor {
  protected readonly dot = viewChild<ElementRef<HTMLDivElement>>('dot');
  protected readonly ring = viewChild<ElementRef<HTMLDivElement>>('ring');

  private dotX = 0;
  private dotY = 0;
  private ringX = 0;
  private ringY = 0;
  private visible = false;
  private active = false;

  constructor() {
    afterNextRender(() => {
      const dotEl = this.dot()?.nativeElement;
      const ringEl = this.ring()?.nativeElement;
      if (!dotEl || !ringEl) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      document.body.classList.add('has-cursor');
      dotEl.style.opacity = '0';
      ringEl.style.opacity = '0';

      window.addEventListener('mousemove', this.onMove, { passive: true });
      window.addEventListener('mouseover', this.onOver, { passive: true });
      window.addEventListener('mouseout', this.onOut, { passive: true });
      window.addEventListener('mousedown', () => this.onPress(true));
      window.addEventListener('mouseup', () => this.onPress(false));

      const tick = (): void => {
        this.ringX += (this.dotX - this.ringX) * 0.16;
        this.ringY += (this.dotY - this.ringY) * 0.16;
        const scale = this.active ? 1.6 : 1;
        ringEl.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) scale(${scale})`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  onMove = (event: MouseEvent): void => {
    this.dotX = event.clientX;
    this.dotY = event.clientY;
    const dotEl = this.dot()?.nativeElement;
    if (!this.visible && dotEl) {
      this.visible = true;
      dotEl.style.opacity = '1';
      const ringEl = this.ring()?.nativeElement;
      if (ringEl) ringEl.style.opacity = '1';
    }
    if (dotEl) dotEl.style.transform = `translate3d(${this.dotX}px, ${this.dotY}px, 0)`;
  };

  onOver = (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    this.active = !!target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
  };

  onOut = (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')) {
      this.active = false;
    }
  };

  onPress = (isDown: boolean): void => {
    this.active = isDown;
  };
}
