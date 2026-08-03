import { Component, computed, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { cx } from '../../../core/utils/utils';

export type HeaderAlign = 'center' | 'left';

/**
 * Section header — eyebrow tag, display title and optional description,
 * used to open every section across the site with a consistent rhythm.
 */
@Component({
  selector: 'app-section-header',
  imports: [RevealDirective],
  template: `
    <div
      appReveal
      effect="fade-up"
      class="flex flex-col gap-4"
      [class.items-center.text-center]="align() === 'center'"
      [class.items-start]="align() === 'left'"
    >
      @if (displayEyebrow()) {
        <span class="eyebrow text-secondary">
          <span class="h-px w-8 bg-gradient-to-r from-secondary to-transparent"></span>
          {{ displayEyebrow() }}
        </span>
      }
      <h2 class="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl" [class]="titleClass()">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="max-w-2xl text-base leading-relaxed text-muted sm:text-lg" [class.mx-auto]="align() === 'center'">
          {{ description() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeader {
  readonly eyebrow = input('');
  readonly tagline = input('');
  readonly title = input('');
  readonly description = input('');
  readonly align = input<HeaderAlign>('center');
  readonly light = input(false);
  readonly showButton = input(true);

  readonly displayEyebrow = computed(() => this.tagline() || this.eyebrow());
  readonly titleClass = computed(() => cx(this.light() ? 'text-white' : 'text-primary dark:text-white'));
}
