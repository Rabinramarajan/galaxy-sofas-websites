import { Component, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

interface HeroFeature {
  icon: string;
  label: string;
  value: string;
}

const HERO_FEATURES: HeroFeature[] = [
  { icon: 'gem', label: 'Signature Piece', value: 'The Aurora', },
  { icon: 'shield', label: 'Guarantee', value: '7-Year Warranty' },
  { icon: 'star', label: 'Rated by 1.2M+ homes', value: '4.9 / 5' },
];

/**
 * Cinematic full-bleed hero — a warm living room drenched in sunlight,
 * editorial glass panel, floating trust cards and a scroll indicator.
 */
@Component({
  selector: 'app-home-hero',
  imports: [AppIcon, AppButton, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative isolate overflow-hidden bg-espresso">
      <!-- Background image + cinematic scrim -->
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2400&q=85"
          alt=""
          width="2400"
          height="1600"
          fetchpriority="high"
          decoding="async"
          class="h-full w-full object-cover animate-kenburns"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/15"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/40"></div>
        <div class="absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-gold/20 blur-[140px] animate-aurora"></div>
      </div>

      <div class="section-shell grid min-h-[92vh] items-center gap-12 pt-16 pb-24 lg:grid-cols-12 lg:pt-24">
        <!-- Editorial content -->
        <div class="lg:col-span-7 xl:col-span-6">
          <div appReveal effect="fade-up" class="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
            <span class="flex h-2 w-2 rounded-full bg-gold-light animate-pulse"></span>
            <span class="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              Est. 2012 · Handcrafted in India
            </span>
          </div>

          <h1 appReveal effect="blur" [delay]="120" class="mt-8 font-display text-5xl font-medium leading-[1.04] tracking-tight text-bone sm:text-6xl xl:text-7xl">
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

          <div appReveal effect="fade-up" [delay]="480" class="mt-12 flex items-center gap-6 border-t border-bone/15 pt-7">
            @for (stat of stats(); track stat.label) {
              <div>
                <div class="font-display text-3xl font-semibold text-bone">
                  {{ stat.value }}<span class="text-gold-light">{{ stat.suffix }}</span>
                </div>
                <div class="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-bone/50">{{ stat.label }}</div>
              </div>
              @if (!$last) { <span class="h-10 w-px bg-bone/15" aria-hidden="true"></span> }
            }
          </div>
        </div>

        <!-- Floating showcase -->
        <div class="relative lg:col-span-5 xl:col-span-6">
          <div appReveal effect="scale" [delay]="300" class="relative mx-auto max-w-md lg:max-w-none" appParallax [speed]="0.04">
            <!-- Framed image -->
            <div class="relative overflow-hidden rounded-[2rem] border border-bone/15 shadow-lift">
              <div class="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85"
                  alt="Galaxy Aurora luxury sofa bathed in warm light"
                  width="1200"
                  height="1500"
                  fetchpriority="high"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6">
                  <span class="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light">Flagship · 2026</span>
                  <h3 class="mt-1 font-display text-2xl font-semibold text-bone">The Aurora Suite</h3>
                  <p class="mt-1 text-sm text-bone/70">Velvet, sheesham & eight rows of pocket springs.</p>
                </div>
              </div>
            </div>

            <!-- Floating glass badges -->
            @for (feature of features(); track feature.label; let i = $index) {
              <div
                appReveal
                effect="fade-up"
                [delay]="500 + i * 140"
                class="absolute hidden sm:flex items-center gap-3 rounded-2xl glass p-4 shadow-lift animate-float"
                [class]="badgePosition(i)"
                [style.animation-delay]="(-i * 2) + 's'"
              >
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
                  <app-icon [name]="feature.icon" class="h-4 w-4" />
                </span>
                <span>
                  <span class="block font-display text-sm font-semibold text-ink">{{ feature.value }}</span>
                  <span class="block text-[11px] text-taupe">{{ feature.label }}</span>
                </span>
              </div>
            }
          </div>
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
  readonly features = signal(HERO_FEATURES);

  readonly stats = signal([
    { value: '28', suffix: '+', label: 'Showrooms' },
    { value: '450', suffix: '+', label: 'Craftsmen' },
    { value: '1.2M', suffix: '+', label: 'Homes Delivered' },
  ]);

  badgePosition(index: number): string {
    const positions = [
      '-left-6 top-10 lg:-left-12',
      '-right-6 top-1/2 lg:-right-12',
      'left-6 -bottom-6 lg:left-10',
    ];
    return positions[index] ?? positions[0]!;
  }

  scrollDown(): void {
    if (typeof window !== 'undefined') {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  }
}
