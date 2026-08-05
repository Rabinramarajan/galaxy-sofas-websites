import { Component, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

const INDEX_ITEMS = [
  { index: '01', label: 'The Collection' },
  { index: '02', label: 'The Craft' },
  { index: '03', label: 'The Showroom' },
];

/**
 * Cinematic single-scene hero — one warm living room, drenched in golden light.
 * Editorial type on the left, a framed catalogue "plate" on the right, and a
 * quiet vertical index rail for magazine character.
 */
@Component({
  selector: 'app-home-hero',
  imports: [AppIcon, AppButton, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative isolate overflow-hidden bg-espresso">
      <!-- Cinematic backdrop -->
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/galaxysofas/image/Luxury-Living-Room/Grand-sunlit-salon.png"
          alt=""
          width="2400"
          height="1600"
          fetchpriority="high"
          decoding="async"
          class="h-full w-full object-cover animate-kenburns"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/55 to-espresso/10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/45"></div>
        <div class="absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-gold/20 blur-[140px] animate-aurora"></div>
        <div class="absolute inset-0 noise opacity-40"></div>
      </div>

      <div class="section-shell grid min-h-[94vh] items-center gap-16 pt-16 pb-28 lg:grid-cols-12 lg:pt-24">
        <!-- Editorial content -->
        <div class="lg:col-span-7 xl:col-span-6">
          <div appReveal effect="fade-up" class="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
            <span class="flex h-2 w-2 rounded-full bg-gold-light animate-pulse"></span>
            <span class="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              Est. 2012 · Handcrafted in India
            </span>
          </div>

          <h1 appReveal effect="blur" [delay]="120" class="mt-8 font-display text-5xl font-medium leading-[1.02] tracking-tight text-bone sm:text-6xl xl:text-[5.25rem]">
            Where light
            <br />
            meets <em class="italic text-gradient-gold font-semibold">craft.</em>
          </h1>

          <p appReveal effect="fade-up" [delay]="240" class="mt-7 max-w-xl text-base leading-relaxed text-bone/70 sm:text-lg">
            Galaxy Sofas composes heirloom furniture for the modern home — carved from solid
            sheesham and teak by 450 master artisans, delivered white-glove to your door.
          </p>

          <div appReveal effect="fade-up" [delay]="360" class="mt-10 flex flex-wrap items-center gap-4">
            <app-button href="/products" label="Explore the Collection" variant="gold" size="lg" icon="sofa" />
            <app-button href="/custom-furniture" label="Design Your Own" variant="glass" size="lg" [arrow]="true" />
          </div>

          <div appReveal effect="fade-up" [delay]="480" class="mt-12 flex items-center gap-7 border-t border-bone/15 pt-7">
            @for (stat of stats(); track stat.label) {
              <div class="flex items-center gap-4">
                <div class="font-display text-3xl font-semibold text-bone sm:text-4xl">
                  {{ stat.value }}<span class="text-gold-light">{{ stat.suffix }}</span>
                </div>
                <div class="text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em] text-bone/50">{{ stat.label }}</div>
              </div>
              @if (!$last) { <span class="h-10 w-px bg-bone/15" aria-hidden="true"></span> }
            }
          </div>
        </div>

        <!-- Framed catalogue plate -->
        <div class="relative lg:col-span-5 xl:col-span-6">
          <div appReveal effect="scale" [delay]="300" class="relative mx-auto max-w-md lg:max-w-none" appParallax [speed]="0.05">
            <!-- Offset gold frame -->
            <div class="pointer-events-none absolute -inset-4 rounded-[2.25rem] border border-gold/30" aria-hidden="true"></div>

            <figure class="relative overflow-hidden rounded-[1.75rem] shadow-lift">
              <div class="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/galaxysofas/image/Luxury-Sofa/Flagship-studio-hero.png"
                  alt="Galaxy Aurora luxury sofa bathed in warm light"
                  width="1200"
                  height="1500"
                  fetchpriority="high"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent"></div>

                <!-- Glass caption plate -->
                <figcaption class="absolute inset-x-5 bottom-5 rounded-2xl glass-dark p-5 backdrop-blur-xl">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light">Flagship · 2026</span>
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold">
                      <app-icon name="gem" class="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <h3 class="mt-2 font-display text-2xl font-semibold text-bone">The Aurora Suite</h3>
                  <p class="mt-1 text-sm text-bone/65">Velvet, sheesham & eight rows of pocket springs.</p>
                </figcaption>
              </div>
            </figure>

            <!-- Floating warranty chip -->
            <div appReveal effect="fade-up" [delay]="640" class="absolute -right-3 top-10 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-lift animate-float sm:flex lg:-right-8">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
                <app-icon name="shield" class="h-4 w-4" />
              </span>
              <span>
                <span class="block font-display text-sm font-semibold text-ink">7-Year Warranty</span>
                <span class="block text-[11px] text-taupe">Every frame, in writing</span>
              </span>
            </div>

          </div>
        </div>

        <!-- Vertical editorial index rail -->
        <div class="absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col gap-8 2xl:flex" aria-hidden="true">
          @for (item of index(); track item.index) {
            <div class="group flex items-center gap-3 text-right">
              <span class="text-[10px] font-bold uppercase tracking-[0.28em] text-bone/40 transition-colors duration-300 group-hover:text-gold-light">
                {{ item.label }}
              </span>
              <span class="font-display text-lg font-light text-bone/60 transition-colors duration-300 group-hover:text-gold">
                {{ item.index }}
              </span>
            </div>
          }
          <span class="mx-auto h-14 w-px bg-gradient-to-b from-gold/60 to-transparent"></span>
        </div>
      </div>

      <!-- Scroll indicator -->
      <button
        type="button"
        (click)="scrollDown()"
        class="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone/60 transition-colors hover:text-bone lg:flex"
        aria-label="Scroll down"
      >
        <span class="text-[10px] font-bold uppercase tracking-[0.3em]">Discover</span>
        <span class="flex h-10 w-6 items-start justify-center rounded-full border border-bone/30 pt-1.5">
          <span class="h-2 w-1 rounded-full bg-gold-light animate-scroll-dot"></span>
        </span>
      </button>
    </section>
  `,
})
export class HomeHero {
  readonly index = signal(INDEX_ITEMS);

  readonly stats = signal([
    { value: '28', suffix: '+', label: 'Showrooms' },
    { value: '450', suffix: '+', label: 'Craftsmen' },
    { value: '1.2M', suffix: '+', label: 'Homes Delivered' },
  ]);

  scrollDown(): void {
    if (typeof window !== 'undefined') {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  }
}
