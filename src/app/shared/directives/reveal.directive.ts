import { Directive, ElementRef, HostBinding, Input, inject } from '@angular/core';

export type RevealEffect = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'slide-up';

/**
 * Scroll-reveal directive. Adds a hidden start state and animates the
 * element into view the first time it enters the viewport.
 *
 * Usage: <div appReveal effect="fade-up" delay="120" threshold="0.15">
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() effect: RevealEffect = 'fade-up';
  @Input() delay = 0;
  @Input() threshold = 0.15;
  @Input() duration = 900;

  @HostBinding('class') get className(): string {
    return `reveal-init reveal-${this.effect}`;
  }

  ngAfterViewInit(): void {
    if (this.prefersReduced || typeof IntersectionObserver === 'undefined') {
      this.#show();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            window.setTimeout(() => this.#show(), this.delay);
          }
        }
      },
      { threshold: this.threshold, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(this.element);
  }

  #show(): void {
    this.element.style.transitionDuration = `${this.duration}ms`;
    this.element.style.transitionDelay = `${this.delay}ms`;
    this.element.classList.add('reveal-visible');
  }
}
