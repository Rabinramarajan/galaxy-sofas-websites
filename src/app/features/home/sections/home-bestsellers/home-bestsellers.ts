import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { formatINR } from '../../../../core/utils/utils';

interface SignaturePiece {
  slug: string;
  index: string;
  name: string;
  spec: string;
  price: number;
  image: string;
  alt: string;
}

const PIECES: SignaturePiece[] = [
  {
    slug: 'aurora-3-seater-sofa',
    index: '01',
    name: 'The Aurora',
    spec: 'Velvet · 3-Seater',
    price: 64999,
    image: '/galaxysofas/image/Luxury-Sofa/Flagship-studio-hero.png',
    alt: 'The Aurora velvet three-seater sofa in warm golden light',
  },
  {
    slug: 'nebula-power-recliner',
    index: '02',
    name: 'The Nebula',
    spec: 'Power Recline · Zero Gravity',
    price: 79999,
    image: '/galaxysofas/image/Recliner/Cinema-recliner-hero.png',
    alt: 'The Nebula power recliner in a cinematic lounge',
  },
  {
    slug: 'regalia-wooden-sofa-set',
    index: '03',
    name: 'The Regalia',
    spec: 'Solid Sheesham · Carved',
    price: 58999,
    image: '/galaxysofas/image/Luxury-Sofa/Midnight-chesterfield.png',
    alt: 'The Regalia solid sheesham carved sofa set',
  },
  {
    slug: 'celestial-l-shape-sofa',
    index: '04',
    name: 'The Celestial',
    spec: 'Modular · L-Shape',
    price: 92999,
    image: '/galaxysofas/image/Luxury-Sofa/Oatmeal-modular.png',
    alt: 'The Celestial modular L-shape sofa in an open-plan lounge',
  },
];

/** Signature Pieces — a quiet 2x2 catalogue of plates, not a shop grid. */
@Component({
  selector: 'app-home-bestsellers',
  imports: [RouterLink, AppButton, AppIcon, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" aria-hidden="true"></div>

      <div class="section-shell grid gap-16 lg:grid-cols-12">
        <!-- Sticky editorial intro -->
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Signature Pieces
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              The four that<br />define the <em class="italic text-gradient-gold font-semibold">house.</em>
            </h2>
            <p appReveal effect="fade-up" [delay]="240" class="mt-6 text-base leading-relaxed text-umber dark:text-fawn">
              Aurora, Nebula, Regalia, Celestial — the pieces our master artisans sign first and ship
              proudest. Each is the quiet answer to a very particular way of living.
            </p>

            <div appReveal effect="fade-up" [delay]="360" class="mt-8 flex items-end justify-between gap-6">
              <app-button href="/products" label="Shop the Entire Line" variant="primary" size="lg" icon="arrowRight" />
            </div>

            <div appReveal effect="fade-up" [delay]="440" class="mt-12 flex items-center gap-5 border-t border-line pt-6 dark:border-line-dark">
              <span class="font-display text-6xl font-light leading-none text-gold/60">04</span>
              <span class="text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-taupe dark:text-fawn">
                pieces, curated<br />for 2026
              </span>
            </div>
          </div>
        </div>

        <!-- 2x2 plates -->
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          @for (piece of pieces(); track piece.slug; let i = $index) {
            <article appReveal effect="fade-up" [delay]="i * 120" class="group">
              <a
                routerLink="/products/{{ piece.slug }}"
                class="group relative block overflow-hidden rounded-3xl shadow-soft ring-1 ring-line transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift hover:ring-gold/40 dark:ring-line-dark"
              >
                <div class="relative aspect-[4/5] overflow-hidden">
                  <img
                    [src]="piece.image"
                    [alt]="piece.alt"
                    width="900"
                    height="1125"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/5 to-transparent"></div>

                  <span class="absolute left-5 top-4 font-display text-3xl font-light text-bone/60 transition-colors duration-500 group-hover:text-gold-light">
                    {{ piece.index }}
                  </span>

                  <figcaption class="absolute inset-x-4 bottom-4 rounded-2xl glass-dark p-4 backdrop-blur-xl">
                    <div class="flex items-end justify-between gap-3">
                      <div class="min-w-0">
                        <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">{{ piece.spec }}</span>
                        <h3 class="mt-1 truncate font-display text-xl font-semibold text-bone">{{ piece.name }}</h3>
                        <span class="mt-0.5 block font-display text-base font-medium text-bone/80">{{ price(piece.price) }}</span>
                      </div>
                      <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold transition-transform duration-500 group-hover:translate-x-0.5">
                        <app-icon name="arrowRight" class="h-4 w-4" />
                      </span>
                    </div>
                  </figcaption>
                </div>
              </a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeBestsellers {
  readonly pieces = signal(PIECES);

  price(value: number): string {
    return formatINR(value);
  }
}
