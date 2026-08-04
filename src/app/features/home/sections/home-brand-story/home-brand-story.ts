import { Component } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Brand story — editorial split with an image collage, founder note and values. */
@Component({
  selector: 'app-home-brand-story',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell grid items-center gap-16 lg:grid-cols-12">
        <!-- Image collage -->
        <div class="relative order-2 lg:order-1 lg:col-span-6">
          <div appReveal effect="fade-up" class="relative">
            <div class="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src="/galaxysofas/image/Luxury-Sofa/Cognac-leather-corner.png"
                alt="Craftsman shaping solid wood in the Galaxy atelier"
                width="1200"
                height="1400"
                loading="lazy"
                decoding="async"
                class="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div class="absolute -right-4 bottom-10 hidden w-52 overflow-hidden rounded-2xl border-4 border-paper shadow-lift sm:block dark:border-espresso">
              <img
                src="/galaxysofas/image/Luxury-Living-Room/Scandinavian-luxe-calm.png"
                alt="Hand-carving a sofa frame detail"
                width="600"
                height="750"
                loading="lazy"
                decoding="async"
                class="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div class="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl glass p-4 shadow-lift dark:glass-dark">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
                <app-icon name="tree" class="h-5 w-5" />
              </span>
              <span>
                <span class="block font-display text-lg font-semibold text-ink dark:text-bone">Since 2012</span>
                <span class="block text-xs text-taupe dark:text-fawn">One obsession: honest wood</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Copy -->
        <div class="order-1 lg:order-2 lg:col-span-6 lg:pl-8">
          <span appReveal effect="fade-up" class="eyebrow text-gold">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            The Galaxy Story
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Built slowly,<br />built to be <em class="italic text-gradient-gold font-semibold">kept.</em>
          </h2>
          <div appReveal effect="fade-up" [delay]="240" class="mt-6 space-y-5 text-base leading-relaxed text-umber dark:text-fawn">
            <p>
              Galaxy Sofas began in 2012 with three craftsmen and a single rule — never compromise on
              the wood. Today we are 450 artisans across a 1,50,000 sq ft atelier, yet every frame is
              still cut, carved and signed by hand.
            </p>
            <p>
              We pair kiln-dried sheesham and teak with a decade of finish research, so a piece bought
              this year still looks newer than most furniture bought last week.
            </p>
          </div>

          <div appReveal effect="fade-up" [delay]="360" class="mt-8 flex flex-wrap items-center gap-5">
            <app-button href="/about" label="Read Our Story" variant="outline" size="lg" [arrow]="true" />
            <span class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 font-display text-sm font-semibold text-gold">SS</span>
              <span class="text-sm">
                <span class="block font-semibold text-ink dark:text-bone">S. Srinivasan</span>
                <span class="block text-xs text-taupe dark:text-fawn">Founder, Galaxy Sofas</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeBrandStory {}
