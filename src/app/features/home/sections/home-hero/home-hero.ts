import { Component, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { AppMarquee } from '../../../../shared/components/app-marquee/app-marquee';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80';
const HERO_IMAGE_2 = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80';
const HERO_IMAGE_3 = 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=900&q=80';

/**
 * Home hero — cinematic entrance with staggered text reveal,
 * floating glass cards and parallax depth. Above the fold.
 */
@Component({
  selector: 'app-home-hero',
  imports: [AppIcon, AppButton, AppMarquee, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative overflow-hidden bg-cream dark:bg-dark">
      <!-- ambient aurora background -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-secondary/10 blur-3xl animate-aurora"></div>
        <div class="absolute -right-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-orange-500/10 blur-3xl animate-aurora" style="animation-delay:-4s"></div>
        <div class="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl animate-aurora" style="animation-delay:-8s"></div>
      </div>

      <div class="section-shell relative grid min-h-[92vh] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <!-- Copy -->
        <div class="lg:col-span-6 lg:pr-4">
          <div appReveal effect="fade-up">
            <span class="eyebrow text-secondary">
              <span class="h-px w-8 bg-gradient-to-r from-secondary to-transparent"></span>
              Luxury Furniture · Est. 2012
            </span>
          </div>

          <h1 appReveal effect="blur" [delay]="120" class="mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance text-primary sm:text-6xl xl:text-7xl dark:text-white">
            Furniture Beyond
            <span class="relative inline-block">
              <span class="text-gradient-gold">Imagination</span>
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M2 9C60 3 140 3 198 8" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </span>
          </h1>

          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Handcrafted sofas, recliners, beds and bespoke interiors — carved from 100% solid wood by
            450 master artisans. Delivered white-glove in 30 days, warranted for 7 years.
          </p>

          <div appReveal effect="fade-up" [delay]="360" class="mt-9 flex flex-wrap items-center gap-4">
            <app-button href="/products" label="Explore the Collection" variant="gold" size="lg" icon="sofa" />
            <app-button href="/custom-furniture" label="Design My Own" variant="outline" size="lg" [arrow]="true" />
          </div>

          <!-- trust stats -->
          <div appReveal effect="fade-up" [delay]="480" class="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-primary/10 pt-8 dark:border-white/10">
            @for (stat of stats(); track stat.label) {
              <div>
                <div class="font-display text-2xl font-bold text-primary sm:text-3xl dark:text-white">
                  {{ stat.value }}
                  <span class="text-secondary">{{ stat.suffix }}</span>
                </div>
                <div class="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>

        <!-- Visual -->
        <div class="relative lg:col-span-6">
          <div class="relative mx-auto max-w-xl lg:max-w-none" appParallax [speed]="0.04">
            <!-- main image -->
            <div appReveal effect="scale" [delay]="200" class="sheen relative overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src="{{ heroImage }}"
                alt="Luxury grey sofa in a premium living room"
                width="1600"
                height="1200"
                fetchpriority="high"
                decoding="async"
                class="h-[26rem] w-full object-cover animate-kenburns sm:h-[30rem] lg:h-[34rem]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            <!-- floating glass card: rating -->
            <div appReveal effect="fade-up" [delay]="500" class="absolute -left-4 bottom-16 hidden rounded-2xl glass p-5 shadow-lift sm:block lg:-left-10">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
                  <app-icon name="star" class="h-5 w-5 fill-current" />
                </span>
                <div>
                  <div class="font-display text-lg font-bold text-primary dark:text-white">4.9 / 5</div>
                  <div class="text-xs text-muted">1.2M+ happy homes</div>
                </div>
              </div>
            </div>

            <!-- floating glass card: guarantee -->
            <div appReveal effect="fade-up" [delay]="650" class="absolute -right-4 top-8 hidden rounded-2xl glass p-5 shadow-lift sm:block lg:-right-6">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white dark:bg-white dark:text-primary">
                  <app-icon name="shield" class="h-5 w-5" />
                </span>
                <div>
                  <div class="font-display text-lg font-bold text-primary dark:text-white">7-Year</div>
                  <div class="text-xs text-muted">frame warranty</div>
                </div>
              </div>
            </div>

            <!-- small floating image -->
            <div appReveal effect="fade-up" [delay]="800" class="absolute -bottom-8 right-6 hidden w-40 overflow-hidden rounded-2xl border-4 border-white shadow-lift animate-float-slow md:block dark:border-dark">
              <img src="{{ heroImage2 }}" alt="Brown leather recliner sofa detail" width="900" height="700" loading="lazy" decoding="async" class="h-28 w-full object-cover" />
            </div>
          </div>

          <!-- decorative ring -->
          <div class="pointer-events-none absolute -right-10 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-secondary/20 xl:block" aria-hidden="true"></div>
        </div>
      </div>

      <!-- marquee strip -->
      <div class="relative border-y border-primary/10 bg-white/60 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-dark-soft">
        <app-marquee [items]="marqueeItems()" class="text-primary dark:text-white" item-class="text-primary dark:text-white" />
      </div>

      <!-- scroll indicator -->
      <button
        type="button"
        (click)="scrollDown()"
        class="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-secondary lg:flex"
        aria-label="Scroll to explore"
      >
        <span class="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span class="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-secondary animate-scroll-dot"></span>
        </span>
      </button>
    </section>
  `,
})
export class HomeHero {
  readonly heroImage = HERO_IMAGE;
  readonly heroImage2 = HERO_IMAGE_2;
  readonly heroImage3 = HERO_IMAGE_3;

  readonly stats = signal([
    { value: '28', suffix: '+', label: 'Showrooms' },
    { value: '450', suffix: '+', label: 'Craftsmen' },
    { value: '1.2M', suffix: '+', label: 'Products Delivered' },
  ]);

  readonly marqueeItems = signal([
    '100% Solid Wood',
    '7-Year Warranty',
    'White-Glove Delivery',
    '450 Master Artisans',
    'Free Assembly',
    '15-Day Returns',
    'Made in India',
  ]);

  scrollDown(): void {
    if (typeof window !== 'undefined') {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  }
}
