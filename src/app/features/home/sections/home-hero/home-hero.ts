import { Component, computed, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { AppMarquee } from '../../../../shared/components/app-marquee/app-marquee';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  badge: string;
  rating: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'aurora',
    title: 'The Royal Velvet Chesterfield',
    subtitle: 'Hand-tufted Italian velvet crafted on a 100% teakwood chassis.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
    tag: 'Flagship Edition',
    badge: '7-Year Warranty',
    rating: '4.95 / 5',
  },
  {
    id: 'celestial',
    title: 'Minimalist Nordic L-Sectional',
    subtitle: 'High-density feather cushion core with stain-resistant linen.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
    tag: 'Modern Living',
    badge: 'Feather-Down Core',
    rating: '4.92 / 5',
  },
  {
    id: 'imperial',
    title: 'Motorized Recliner Suite',
    subtitle: 'Dual-motor German recliner engine with ambient LED mood lighting.',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1600&q=80',
    tag: 'Smart Recliner',
    badge: 'German Motors',
    rating: '4.98 / 5',
  },
];

/**
 * Re-designed Home Hero — ultra luxury presentation with interactive showcase tabs,
 * glowing gold accents, glassmorphic trust badges, and rich animations.
 */
@Component({
  selector: 'app-home-hero',
  imports: [AppIcon, AppButton, AppMarquee, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative overflow-hidden bg-cream pt-6 pb-12 lg:py-16 dark:bg-[#080c14]">
      <!-- Luxury Ambient Background Glows -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -left-32 -top-32 h-[45rem] w-[45rem] rounded-full bg-secondary/15 blur-[120px] animate-aurora"></div>
        <div class="absolute right-0 top-1/3 h-[38rem] w-[38rem] rounded-full bg-amber-500/10 blur-[140px] animate-aurora" style="animation-delay:-4s"></div>
        <div class="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-orange-600/10 blur-[100px] animate-aurora" style="animation-delay:-8s"></div>
      </div>

      <div class="section-shell relative grid min-h-[85vh] items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Left Content -->
        <div class="lg:col-span-6 xl:col-span-5">
          <!-- Top Tag Pill -->
          <div appReveal effect="fade-up" class="inline-flex items-center gap-2.5 rounded-full bg-secondary/10 px-4 py-1.5 ring-1 ring-secondary/30 backdrop-blur-md">
            <span class="flex h-2 w-2 rounded-full bg-secondary animate-ping"></span>
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
              Luxury Furniture · Est. 2012
            </span>
          </div>

          <!-- Main Hero Headline -->
          <h1 appReveal effect="blur" [delay]="120" class="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-6xl xl:text-6xl dark:text-white">
            Furniture Beyond
            <span class="relative mt-2 inline-block">
              <span class="text-gradient-gold drop-shadow-sm">Imagination</span>
              <svg class="absolute -bottom-3 left-0 w-full" viewBox="0 0 240 14" fill="none" aria-hidden="true">
                <path d="M4 10C80 4 160 4 236 9" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
              </svg>
            </span>
          </h1>

          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg dark:text-white/70">
            Handcrafted luxury sofas, recliners & bespoke interiors — carved from 100% solid teakwood by 450 master artisans. Delivered white-glove in 30 days.
          </p>

          <!-- Primary CTA Buttons -->
          <div appReveal effect="fade-up" [delay]="360" class="mt-8 flex flex-wrap items-center gap-4">
            <app-button href="/products" label="Explore Collection" variant="gold" size="lg" icon="sofa" />
            <app-button href="/custom-furniture" label="Custom Order" variant="outline" size="lg" [arrow]="true" />
          </div>

          <!-- Trust Badges Bar -->
          <div appReveal effect="fade-up" [delay]="480" class="mt-10 grid grid-cols-3 gap-4 border-t border-primary/10 pt-8 dark:border-white/10">
            @for (stat of stats(); track stat.label) {
              <div>
                <div class="font-display text-2xl font-extrabold text-primary sm:text-3xl dark:text-white">
                  {{ stat.value }}<span class="text-secondary">{{ stat.suffix }}</span>
                </div>
                <div class="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>

        <!-- Right Visual Showcase Carousel -->
        <div class="relative lg:col-span-6 xl:col-span-7">
          <div class="relative mx-auto max-w-2xl lg:max-w-none" appParallax [speed]="0.03">
            <!-- Main Hero Frame -->
            <div appReveal effect="scale" [delay]="200" class="relative overflow-hidden rounded-[2.25rem] bg-white shadow-lift ring-1 ring-primary/10 dark:bg-dark-card dark:ring-white/10">
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-dark-soft">
                <img
                  [src]="activeSlide().image"
                  [alt]="activeSlide().title"
                  width="1600"
                  height="1200"
                  fetchpriority="high"
                  decoding="async"
                  class="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <!-- Slide Tag -->
                <div class="absolute left-6 top-6 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/20">
                    <app-icon name="sparkles" class="h-3.5 w-3.5 text-secondary" />
                    {{ activeSlide().tag }}
                  </span>
                </div>

                <!-- Slide Info Footer Overlay -->
                <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span class="text-xs font-bold uppercase tracking-widest text-secondary-light">Featured Piece</span>
                  <h3 class="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{{ activeSlide().title }}</h3>
                  <p class="mt-1 line-clamp-1 text-sm text-white/80">{{ activeSlide().subtitle }}</p>
                </div>
              </div>
            </div>

            <!-- Floating Glass Card: Rating -->
            <div appReveal effect="fade-up" [delay]="500" class="absolute -left-6 bottom-12 hidden rounded-2xl glass p-4 shadow-lift sm:flex items-center gap-3.5 lg:-left-8 dark:glass-dark">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
                <app-icon name="star" class="h-5 w-5 fill-current" />
              </span>
              <div>
                <div class="font-display text-base font-extrabold text-primary dark:text-white">{{ activeSlide().rating }}</div>
                <div class="text-xs font-medium text-muted">1.2M+ Verified Reviews</div>
              </div>
            </div>

            <!-- Floating Glass Card: Guarantee -->
            <div appReveal effect="fade-up" [delay]="650" class="absolute -right-6 top-8 hidden rounded-2xl glass p-4 shadow-lift sm:flex items-center gap-3.5 lg:-right-8 dark:glass-dark">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-md dark:bg-white dark:text-primary">
                <app-icon name="shield" class="h-5 w-5" />
              </span>
              <div>
                <div class="font-display text-base font-extrabold text-primary dark:text-white">{{ activeSlide().badge }}</div>
                <div class="text-xs font-medium text-muted">100% Solid Teakwood</div>
              </div>
            </div>

            <!-- Interactive Slide Switcher Tabs -->
            <div class="mt-4 flex items-center justify-center gap-2 sm:justify-end">
              @for (slide of slides; track slide.id; let i = $index) {
                <button
                  type="button"
                  (click)="activeSlideIndex.set(i)"
                  class="group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300"
                  [class]="i === activeSlideIndex() ? 'bg-gold-gradient text-white shadow-gold' : 'bg-white/80 text-primary hover:bg-white dark:bg-dark-card dark:text-white/80 dark:hover:bg-dark-soft'"
                  [attr.aria-label]="'Switch to slide ' + (i + 1)"
                >
                  <span class="h-2 w-2 rounded-full" [class]="i === activeSlideIndex() ? 'bg-white' : 'bg-primary/30 dark:bg-white/30'"></span>
                  <span>0{{ i + 1 }}</span>
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Marquee Banner Strip -->
      <div class="mt-10 relative border-y border-primary/10 bg-white/70 py-4 backdrop-blur-md dark:border-white/10 dark:bg-dark-soft/70">
        <app-marquee [items]="marqueeItems()" class="text-primary dark:text-white" item-class="text-primary dark:text-white" />
      </div>
    </section>
  `,
})
export class HomeHero {
  readonly slides = HERO_SLIDES;
  readonly activeSlideIndex = signal(0);
  readonly activeSlide = computed(() => {
    const idx = this.activeSlideIndex();
    const slides = HERO_SLIDES;
    return slides[idx % slides.length]!;
  });

  readonly stats = signal([
    { value: '28', suffix: '+', label: 'Showrooms' },
    { value: '450', suffix: '+', label: 'Craftsmen' },
    { value: '1.2M', suffix: '+', label: 'Delivered' },
  ]);

  readonly marqueeItems = signal([
    '100% Solid Teakwood',
    '7-Year Frame Warranty',
    'White-Glove Delivery & Free Assembly',
    '450 Master Artisans',
    '15-Day Return Guarantee',
    'Handcrafted in India',
  ]);

  scrollDown(): void {
    if (typeof window !== 'undefined') {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  }
}
