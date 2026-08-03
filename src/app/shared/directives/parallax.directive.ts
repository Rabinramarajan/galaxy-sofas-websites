import { Directive, ElementRef, HostBinding, Input, inject } from '@angular/core';

/**
 * Parallax directive — translates the element vertically based on scroll
 * position, giving depth to hero imagery and decorative layers.
 *
 * Usage: <div appParallax speed="0.2"> ... </div>
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() speed = 0.15;
  @Input() axis: 'y' | 'x' = 'y';
  @Input() enabled = true;

  @HostBinding('style.will-change') willChange = 'transform';

  constructor() {
    if (this.isBrowser && !this.prefersReduced && typeof IntersectionObserver !== 'undefined') {
      new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) this.#bind();
          else this.#unbind();
        },
        { rootMargin: '20% 0px 20% 0px' }
      ).observe(this.element);
    }
  }

  #onScroll = (): void => {
    const rect = this.element.getBoundingClientRect();
    const viewport = window.innerHeight;
    const offset = rect.top + rect.height / 2 - viewport / 2;
    const value = offset * -this.speed;
    this.element.style.transform = this.axis === 'y' ? `translate3d(0, ${value}px, 0)` : `translate3d(${value}px, 0, 0)`;
  };

  #bind(): void {
    window.addEventListener('scroll', this.#onScroll, { passive: true });
    this.#onScroll();
  }

  #unbind(): void {
    window.removeEventListener('scroll', this.#onScroll);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') this.#unbind();
  }
}
