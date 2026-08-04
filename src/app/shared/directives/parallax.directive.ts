import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, NgZone } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly ngZone = inject(NgZone);

  @Input() parallaxSpeed = 0.15;
  @Input() set speed(val: number) {
    if (val !== undefined && val !== null) {
      this.parallaxSpeed = val;
    }
  }
  @Input() enableMouseTilt = true;

  private rafId: number | null = null;
  private currentY = 0;
  private targetY = 0;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      if (this.enableMouseTilt) {
        window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      }
      this.animate();
    });
  }

  private onScroll = (): void => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
      this.targetY = (rect.top - windowHeight / 2) * this.parallaxSpeed;
    }
  };

  private onMouseMove = (e: MouseEvent): void => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX - innerWidth / 2) * 0.015;
    const offsetY = (e.clientY - innerHeight / 2) * 0.015;
    this.el.nativeElement.style.setProperty('--mouse-offset-x', `${offsetX}px`);
    this.el.nativeElement.style.setProperty('--mouse-offset-y', `${offsetY}px`);
  };

  private animate = (): void => {
    this.currentY += (this.targetY - this.currentY) * 0.1;
    this.el.nativeElement.style.transform = `translate3d(var(--mouse-offset-x, 0px), calc(${this.currentY}px + var(--mouse-offset-y, 0px)), 0)`;
    this.rafId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
    if (this.enableMouseTilt) {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
