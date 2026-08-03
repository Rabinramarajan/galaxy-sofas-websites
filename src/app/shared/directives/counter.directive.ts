import { Directive, ElementRef, Input, effect, inject } from '@angular/core';

/**
 * Animated number counter. Counts from 0 to `appCount` when the element
 * enters the viewport, with a luxe ease-out curve and optional format.
 *
 * Usage: <span appCounter [target]="1200000" [duration]="2200"></span>
 */
@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';

  @Input({ required: true }) target = 0;
  @Input() duration = 1800;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;

  private started = false;

  constructor() {
    effect(() => {
      // Touch the target signal so the count runs after render.
      void this.target;
      this.#observe();
    });
  }

  #observe(): void {
    if (!this.isBrowser || this.started) return;
    if (typeof IntersectionObserver === 'undefined') {
      this.#run();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        this.started = true;
        observer.disconnect();
        this.#run();
      }
    });
    observer.observe(this.element);
  }

  #run(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this.#write(this.target);
      return;
    }
    const start = performance.now();
    const tick = (now: number): void => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      this.#write(this.target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  #write(value: number): void {
    const formatted = value.toLocaleString('en-IN', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
    this.element.textContent = `${this.prefix}${formatted}${this.suffix}`;
  }
}
