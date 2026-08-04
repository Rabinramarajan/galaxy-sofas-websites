import { trigger, style, animate, transition, query, stagger, state } from '@angular/animations';

export const HERO_ANIMATIONS = [
  trigger('heroStagger', [
    transition(':enter', [
      query('.hero-reveal-item', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.98)' }),
        stagger(120, [
          animate('1000ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
        ])
      ], { optional: true })
    ])
  ]),

  trigger('badgePulse', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
    ])
  ])
];

export const CARD_ANIMATIONS = [
  trigger('cardHover', [
    state('default', style({
      transform: 'translateY(0) scale(1)',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
    })),
    state('hovered', style({
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)'
    })),
    transition('default <=> hovered', [
      animate('400ms cubic-bezier(0.16, 1, 0.3, 1)')
    ])
  ]),

  trigger('imageRevealTrigger', [
    transition(':enter', [
      style({ clipPath: 'inset(100% 0 0 0)', transform: 'scale(1.1)' }),
      animate('1200ms cubic-bezier(0.77, 0, 0.175, 1)', style({ clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' }))
    ])
  ])
];

export const UI_ANIMATIONS = [
  trigger('fadeSlideIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('400ms cubic-bezier(0.7, 0, 0.84, 0)', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ])
  ]),

  trigger('counterAnimate', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('800ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
    ])
  ]),

  trigger('promptCopyToast', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
    ])
  ])
];
