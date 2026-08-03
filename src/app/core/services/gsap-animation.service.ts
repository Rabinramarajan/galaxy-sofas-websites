import { Injectable, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

export interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  pin?: boolean;
  markers?: boolean;
}

@Injectable({ providedIn: 'root' })
export class GsapAnimationService {
  readonly #platformId = inject(PLATFORM_ID);
  private ctx: gsap.Context | null = null;
  private initialized = false;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.#platformId)) {
        this.init();
      }
    });
  }

  private init(): void {
    if (this.initialized) return;
    this.initialized = true;

    gsap.config({
      nullTargetWarn: false,
    });

    gsap.defaults({
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  createContext(scope?: Element): gsap.Context {
    this.ctx = gsap.context(() => {}, scope);
    return this.ctx;
  }

  killContext(): void {
    this.ctx?.revert();
    this.ctx = null;
  }

  // Entrance animations
  fadeIn(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30, ...config.from },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', ...config }
    );
  }

  fadeInUp(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, y: 50, ...config.from },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', ...config }
    );
  }

  scaleIn(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, scale: 0.9, ...config.from },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)', ...config }
    );
  }

  slideInLeft(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, x: -50, ...config.from },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', ...config }
    );
  }

  slideInRight(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, x: 50, ...config.from },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', ...config }
    );
  }

  staggerFadeIn(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: config.stagger ?? 0.1, ...config }
    );
  }

  staggerScaleIn(elements: gsap.TweenTarget, config: AnimationConfig = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: config.stagger ?? 0.08, ...config }
    );
  }

  // Text animations
  splitText(element: Element, config: AnimationConfig = {}): gsap.core.Tween {
    const chars = element.querySelectorAll('span.char') || this.splitChars(element);
    return gsap.fromTo(chars,
      { opacity: 0, y: '100%', rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.03, ...config }
    );
  }

  private splitChars(element: Element): Element[] {
    const text = element.textContent || '';
    element.innerHTML = '';
    return text.split('').map(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
      return span;
    });
  }

  typewriter(element: Element, config: AnimationConfig = {}): gsap.core.Tween {
    const text = element.textContent || '';
    element.textContent = '';
    return gsap.to(element, {
      duration: config.duration ?? text.length * 0.05,
      text: { value: text, delimiter: '' },
      ease: 'none',
      ...config,
    });
  }

  // Scroll-triggered animations
  onScroll(elements: gsap.TweenTarget, config: ScrollAnimationConfig = {}): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: (config.trigger ?? elements) as gsap.DOMTarget,
      start: config.start ?? 'top 85%',
      end: config.end ?? 'bottom 20%',
      scrub: config.scrub ?? false,
      pin: config.pin ?? false,
      markers: config.markers ?? false,
      animation: gsap.fromTo(elements,
        { opacity: 0, y: 50, ...config.from },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', ...config }
      ),
    });
  }

  parallax(elements: gsap.TweenTarget, config: ScrollAnimationConfig = {}): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: (config.trigger ?? elements) as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: config.scrub ?? 1,
      animation: gsap.to(elements, {
        yPercent: (config.to?.['yPercent'] as number | undefined) ?? -50,
        ease: 'none',
      }),
    });
  }

  pinElement(element: Element, config: ScrollAnimationConfig = {}): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: element,
      start: config.start ?? 'top top',
      end: config.end ?? '+=500',
      pin: true,
      pinSpacing: true,
      markers: config.markers ?? false,
    });
  }

  // Counter animation
  countUp(element: Element, endValue: number, config: AnimationConfig = {}): gsap.core.Tween {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: endValue,
      duration: config.duration ?? 2,
      ease: config.ease ?? 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString('en-IN');
      },
      ...config,
    });
  }

  // Hover animations
  magneticHover(element: Element, config: { strength?: number; maxDistance?: number } = {}): () => void {
    const strength = config.strength ?? 0.3;
    const maxDistance = config.maxDistance ?? 100;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const clamped = Math.min(distance, maxDistance);
      const angle = Math.atan2(deltaY, deltaX);
      gsap.to(element, {
        x: Math.cos(angle) * clamped,
        y: Math.sin(angle) * clamped,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };

    element.addEventListener('mousemove', onMouseMove as EventListener);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove as EventListener);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }

  // Ripple effect
  ripple(element: Element, event: MouseEvent, color = 'rgba(255,255,255,0.3)'): void {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${event.clientX - rect.left - size / 2}px;
      top: ${event.clientY - rect.top - size / 2}px;
      background: ${color};
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
    `;
    element.appendChild(ripple);
    gsap.to(ripple, {
      scale: 1,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  }

  // Floating animation
  float(elements: gsap.TweenTarget, config: { y?: number; duration?: number } = {}): gsap.core.Tween {
    return gsap.to(elements, {
      y: config.y ?? -20,
      duration: config.duration ?? 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  // Gradient shift
  gradientShift(element: Element, config: { duration?: number } = {}): gsap.core.Tween {
    return gsap.to(element, {
      backgroundPosition: '200% 50%',
      duration: config.duration ?? 8,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }

  // Aurora background
  aurora(elements: gsap.TweenTarget, config: { duration?: number } = {}): gsap.core.Tween {
    return gsap.to(elements, {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      scale: 'random(0.9, 1.1)',
      rotation: 'random(-10, 10)',
      duration: config.duration ?? 12,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });
  }

  // Smooth scroll to
  scrollTo(target: string | Element, config: { offset?: number; duration?: number } = {}): void {
    gsap.to(window, {
      duration: config.duration ?? 1,
      scrollTo: { y: target, offsetY: config.offset ?? 0 },
      ease: 'power3.inOut',
    });
  }

  // MatchMedia for responsive animations
  matchMedia(queries: Record<string, (ctx: gsap.Context) => void>): gsap.MatchMedia {
    return gsap.matchMedia(queries);
  }

  // Reduced motion respect
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Batch animations for performance
  batch(elements: gsap.TweenTarget, config: AnimationConfig & { interval?: number } = {}): ScrollTrigger[] {
    return ScrollTrigger.batch(elements as gsap.DOMTarget, {
      interval: config.interval ?? 0.1,
      batchMax: 100,
      onEnter: (batch) => gsap.fromTo(batch,
        { opacity: 0, y: 30, ...config.from },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, ...config }
      ),
      onLeave: (batch) => gsap.to(batch, { opacity: 0, y: -30, duration: 0.3 }),
      onEnterBack: (batch) => gsap.fromTo(batch,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }
      ),
      onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 30, duration: 0.3 }),
    });
  }
}