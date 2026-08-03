import { Directive, ElementRef, Input, inject, afterNextRender } from '@angular/core';

export interface MousePosition {
  x: number;
  y: number;
  relativeX: number;
  relativeY: number;
  velocityX: number;
  velocityY: number;
}

@Directive({
  selector: '[appMouseTracking]',
  standalone: true,
})
export class MouseTrackingDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() zone: 'self' | 'parent' | 'window' = 'self';
  @Input() sensitivity = 1;
  @Input() smoothing = 0.15;
  @Input() resetOnLeave = true;
  @Input() callback?: (position: MousePosition) => void;

  private animationFrame: number | null = null;
  private lastTime = 0;
  private lastX = 0;
  private lastY = 0;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private velocityX = 0;
  private velocityY = 0;

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser || this.prefersReduced) return;
      this.bindEvents();
      this.animate();
    });
  }

  private bindEvents(): void {
    const target = this.getTargetElement();
    target.addEventListener('mousemove', this.onMouseMove, { passive: true });
    if (this.resetOnLeave) {
      target.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    }
    target.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
  }

  private getTargetElement(): HTMLElement {
    switch (this.zone) {
      case 'parent': return this.element.parentElement || this.element;
      case 'window': return window.document.documentElement;
      default: return this.element;
    }
  }

  private onMouseMove = (event: MouseEvent): void => {
    const rect = this.element.getBoundingClientRect();
    this.targetX = event.clientX - rect.left;
    this.targetY = event.clientY - rect.top;
  };

  private onMouseLeave = (): void => {
    this.targetX = this.element.offsetWidth / 2;
    this.targetY = this.element.offsetHeight / 2;
  };

  private onMouseEnter = (): void => {
    this.lastX = this.currentX;
    this.lastY = this.currentY;
  };

  private animate = (): void => {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 1 / 30);
    this.lastTime = now;

    const dx = this.targetX - this.currentX;
    const dy = this.targetY - this.currentY;

    this.currentX += dx * this.smoothing * 60 * dt;
    this.currentY += dy * this.smoothing * 60 * dt;

    this.velocityX = (this.currentX - this.lastX) / dt;
    this.velocityY = (this.currentY - this.lastY) / dt;
    this.lastX = this.currentX;
    this.lastY = this.currentY;

    const rect = this.element.getBoundingClientRect();
    const position: MousePosition = {
      x: this.currentX,
      y: this.currentY,
      relativeX: (this.currentX / rect.width) * 2 - 1,
      relativeY: (this.currentY / rect.height) * 2 - 1,
      velocityX: this.velocityX * this.sensitivity,
      velocityY: this.velocityY * this.sensitivity,
    };

    if (this.callback) {
      this.callback(position);
    }

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    const target = this.getTargetElement();
    target.removeEventListener('mousemove', this.onMouseMove);
    target.removeEventListener('mouseleave', this.onMouseLeave);
    target.removeEventListener('mouseenter', this.onMouseEnter);
  }
}

@Directive({
  selector: '[appMagneticHover]',
  standalone: true,
})
export class MagneticHoverDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() strength = 0.3;
  @Input() maxDistance = 100;

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser || this.prefersReduced) return;
      this.element.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      this.element.addEventListener('mousemove', this.onMove);
      this.element.addEventListener('mouseleave', this.onLeave);
    });
  }

  private onMove = (event: MouseEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) * this.strength;
    const deltaY = (event.clientY - centerY) * this.strength;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const clampedDistance = Math.min(distance, this.maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    const finalX = Math.cos(angle) * clampedDistance;
    const finalY = Math.sin(angle) * clampedDistance;
    this.element.style.transform = `translate(${finalX}px, ${finalY}px) scale(1.02)`;
  };

  private onLeave = (): void => {
    this.element.style.transform = 'translate(0, 0) scale(1)';
  };

  ngOnDestroy(): void {
    this.element.removeEventListener('mousemove', this.onMove);
    this.element.removeEventListener('mouseleave', this.onLeave);
  }
}

@Directive({
  selector: '[appParallaxMouse]',
  standalone: true,
})
export class ParallaxMouseDirective {
  private readonly isBrowser = typeof window !== 'undefined';
  private readonly prefersReduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @Input() speed = 0.05;
  @Input() layers: HTMLElement[] = [];

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser || this.prefersReduced) return;
      document.addEventListener('mousemove', this.onMouseMove);
    });
  }

  private onMouseMove = (event: MouseEvent): void => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;

    this.layers.forEach((layer, i) => {
      const factor = this.speed * (i + 1);
      layer.style.transform = `translate3d(${x * factor * 50}px, ${y * factor * 50}px, 0)`;
    });
  };

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') document.removeEventListener('mousemove', this.onMouseMove);
  }
}