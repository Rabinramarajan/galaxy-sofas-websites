import { Component, input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'gs-animated-section',
  standalone: true,
  template: `
    <section class="space-y-4" [class]="classes()" @sectionReveal>
      @if (title()) {
        <h2 class="section-title text-3xl font-semibold md:text-4xl">{{ title() }}</h2>
      }
      <ng-content />
    </section>
  `,
  animations: [
    trigger('sectionReveal', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(18px)' }), animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])
    ])
  ]
})
export class AnimatedSectionComponent {
  readonly title = input<string>('');
  readonly classes = input<string>('animate-[fade-in_600ms_ease]');
}
