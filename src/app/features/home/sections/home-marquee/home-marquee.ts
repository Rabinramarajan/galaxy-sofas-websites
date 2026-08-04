import { Component, signal } from '@angular/core';
import { AppMarquee } from '../../../../shared/components/app-marquee/app-marquee';

/** Thin editorial marquee band — brand promises scrolled as a quiet ticker. */
@Component({
  selector: 'app-home-marquee',
  imports: [AppMarquee],
  template: `
    <section class="relative border-y border-line bg-linen py-5 dark:border-line-dark dark:bg-espresso-soft" aria-label="Brand promises">
      <app-marquee
        [items]="items()"
        wrapper-class="mask-fade-x"
        item-class="text-umber dark:text-bone/80"
      />
    </section>
  `,
})
export class HomeMarquee {
  readonly items = signal([
    '100% Solid Sheesham',
    '7-Year Frame Warranty',
    'White-Glove Delivery',
    '450 Master Artisans',
    '15-Day Returns',
    'Handcrafted in India',
  ]);
}
