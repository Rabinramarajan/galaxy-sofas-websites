import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Mouse-tracking glow — a radial gradient follows the cursor across the
 * element's surface, creating an interactive "spotlight" effect.
 *
 * Usage: <div appMouseGlow [intensity]="0.35"> ... </div>
 */
@Directive({
  selector: '[appMouseGlow]',
  standalone: true,
})
export class MouseGlowDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() intensity = 0.3;
  @Input() color = '245, 158, 11';

  constructor() {
    if (!this.isBrowser || this.prefersReduced) return;
    this.element.style.position = 'relative';
    this.element.addEventListener('mousemove', this.#onMove);
    this.element.addEventListener('mouseleave', this.#onLeave);
  }

  #onMove = (event: MouseEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.element.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(${this.color}, ${this.intensity}), transparent 65%)`;
  };

  #onLeave = (): void => {
    this.element.style.background = 'transparent';
  };
}
