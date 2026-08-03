import { animate, query, stagger, style, transition, trigger, type AnimationMetadata } from '@angular/animations';

/** Shared Angular animation primitives for the Galaxy design system. */

const LUX_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Fade + rise used for staggered lists. */
export const listStagger = trigger('listStagger', [
  transition(':enter', [
    query(':self', [style({ opacity: 0, transform: 'translateY(28px)' })], { optional: true }),
    stagger(80, [
      style({ opacity: 0, transform: 'translateY(28px)' }),
      animate(`0.7s ${LUX_EASE}`, style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
  ]),
]);

/** Route transition: fade + slide. */
export const routeFade = trigger('routeFade', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%', top: 0, left: 0 }),
    ], { optional: true }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(16px)' })], { optional: true }),
    query(':leave', [animate('0.25s ease-out', style({ opacity: 0 }))], { optional: true }),
    query(':enter', [animate('0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))], { optional: true }),
  ]),
]);

/** Soft fade used in overlays and modals. */
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [style({ opacity: 0 }), animate('0.4s ease-out', style({ opacity: 1 }))]),
  transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
]);

/** Scale-in for cards/avatars. */
export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.92)' }),
    animate('0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

/** Height expand/collapse for accordions. */
export const expand = trigger('expand', [
  transition(':enter', [
    style({ height: '0', opacity: 0, overflow: 'hidden' }),
    animate('0.45s cubic-bezier(0.22, 1, 0.36, 1)', style({ height: '*', opacity: 1, overflow: 'hidden' })),
  ]),
  transition(':leave', [
    style({ overflow: 'hidden' }),
    animate('0.3s cubic-bezier(0.22, 1, 0.36, 1)', style({ height: '0', opacity: 0, overflow: 'hidden' })),
  ]),
]);

/** Export a typed helper for inline element animations. */
export const EASE_LUX: AnimationMetadata[] = [];
