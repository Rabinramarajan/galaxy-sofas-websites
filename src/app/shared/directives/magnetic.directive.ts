import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Magnetic hover effect — the element is attracted toward the cursor,
 * creating a premium "magnetic button" interaction.
 *
 * Usage: <button appMagnetic strength="0.4"> ... </button>
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() strength = 0.35;

  constructor() {
    if (!this.isBrowser || this.prefersReduced) return;
    this.element.addEventListener('mousemove', this.#onMove);
    this.element.addEventListener('mouseleave', this.#onLeave);
  }

  #onMove = (event: MouseEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    this.element.style.transform = `translate3d(${relX * this.strength}px, ${relY * this.strength}px, 0)`;
    this.element.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
  };

  #onLeave = (): void => {
    this.element.style.transform = 'translate3d(0, 0, 0)';
    this.element.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  };
}
