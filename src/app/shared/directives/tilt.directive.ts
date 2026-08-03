import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * 3D tilt-on-hover effect for cards. Adds a subtle perspective rotation
 * following the cursor, plus an optional glare sheen.
 *
 * Usage: <div appTilt maxTilt="10"> ... </div>
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() maxTilt = 8;
  @Input() glare = true;

  private glareEl: HTMLElement | null = null;

  constructor() {
    if (!this.isBrowser || this.prefersReduced) return;
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.willChange = 'transform';
    if (this.glare) {
      this.glareEl = document.createElement('div');
      this.glareEl.style.cssText = `position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.25) 50%,transparent 70%);opacity:0;transition:opacity .4s ease;`;
      this.element.appendChild(this.glareEl);
    }
    this.element.addEventListener('mousemove', this.#onMove);
    this.element.addEventListener('mouseleave', this.#onLeave);
  }

  #onMove = (event: MouseEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * this.maxTilt * 2;
    const ry = (px - 0.5) * this.maxTilt * 2;
    this.element.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (this.glareEl) {
      this.glareEl.style.opacity = '1';
      this.glareEl.style.background = `linear-gradient(120deg, transparent ${px * 100}%, rgba(255,255,255,0.22) ${px * 100 + 10}%, transparent ${px * 100 + 30}%)`;
    }
  };

  #onLeave = (): void => {
    this.element.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    if (this.glareEl) this.glareEl.style.opacity = '0';
  };
}
