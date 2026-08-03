import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Material-style ripple effect on click.
 *
 * Usage: <button appRipple> ... </button>
 */
@Directive({
  selector: '[appRipple]',
  standalone: true,
})
export class RippleDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';

  @Input() rippleColor: 'light' | 'dark' = 'light';

  constructor() {
    if (!this.isBrowser) return;
    this.element.classList.add('btn-ripple');
    this.element.addEventListener('pointerdown', this.#onDown);
  }

  #onDown = (event: PointerEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height) * 1.2;
    const radius = diameter / 2;
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;

    const ripple = document.createElement('span');
    ripple.className = `ripple-ink ${this.rippleColor === 'dark' ? 'ripple-ink-dark' : ''}`;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    this.element.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
  };

  ngOnDestroy(): void {
    this.element.removeEventListener('pointerdown', this.#onDown);
  }
}
