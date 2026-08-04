import { Component, signal, computed } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

export interface MaterialSwatch {
  id: string;
  name: string;
  category: 'Leather' | 'Velvet' | 'Bouclé' | 'Linen' | 'Suede';
  origin: string;
  durability: string;
  textureImage: string;
  description: string;
  colorHex: string;
  accentNote: string;
}

const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'aniline-leather',
    name: 'Full-Grain Royal Aniline',
    category: 'Leather',
    origin: 'Tuscany, Italy',
    durability: '150,000+ Martindale',
    textureImage: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1200&q=80',
    description: 'Sourced exclusively from Northern Italian tanneries. Rich natural grain patina that deepens gracefully with age.',
    colorHex: '#3E2723',
    accentNote: 'Natural Patina Finish'
  },
  {
    id: 'como-velvet',
    name: 'Como Architectural Velvet',
    category: 'Velvet',
    origin: 'Lombardy, Italy',
    durability: '100,000+ Martindale',
    textureImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    description: 'Triple-dyed cotton velvet with liquid-repellent silk finish. Imparts an ethereal sheen under ambient light.',
    colorHex: '#1B263B',
    accentNote: 'Stain Resistant Silk Tech'
  },
  {
    id: 'alpine-boucle',
    name: 'Alpine Organic Wool Bouclé',
    category: 'Bouclé',
    origin: 'St. Gallen, Switzerland',
    durability: '90,000+ Martindale',
    textureImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-spun virgin merino wool loops providing tactile warmth, thermal balance, and architectural texture.',
    colorHex: '#E0D6C8',
    accentNote: 'Merino Wool Loop'
  },
  {
    id: 'belgian-linen',
    name: 'Flax Harvest Belgian Linen',
    category: 'Linen',
    origin: 'Flanders, Belgium',
    durability: '85,000+ Martindale',
    textureImage: 'https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=1200&q=80',
    description: 'Pre-washed organic flax fibers offering breathable summer coolness and relaxed refined draping.',
    colorHex: '#D7CCC8',
    accentNote: '100% Organic Flax'
  }
];

@Component({
  selector: 'app-home-material-atelier',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-[#0b0c0e] py-24 lg:py-32 text-white">
      <!-- Ambient Lighting Backglow -->
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-bronze-500/10 blur-[150px]"></div>
      </div>

      <div class="section-shell relative">
        <!-- Section Header -->
        <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div class="max-w-2xl">
            <div appReveal effect="fade-up" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-bronze-400">
              <app-icon name="sparkles" class="h-4 w-4" />
              Tactile Material Atelier
            </div>
            <h2 appReveal effect="blur" [delay]="100" class="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Crafted from <span class="text-gradient-gold">World-Class</span> Textiles
            </h2>
            <p appReveal effect="fade-up" [delay]="200" class="mt-4 text-base text-stone-400 leading-relaxed">
              Touch, feel, and explore our master-curated library of sustainable leathers, heavy velvets, and hand-loomed organic bouclé.
            </p>
          </div>

          <div appReveal effect="fade-up" [delay]="300" class="flex items-center gap-3">
            <app-button href="/custom-furniture" label="Order Free Swatch Kit" variant="gold" size="lg" icon="sparkles" />
          </div>
        </div>

        <!-- Material Studio Grid -->
        <div class="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
          <!-- Left Interactive Swatch List -->
          <div class="lg:col-span-5 space-y-4">
            @for (swatch of swatches; track swatch.id; let i = $index) {
              <div
                appReveal effect="fade-up" [delay]="150 * (i + 1)"
                (click)="activeSwatchIndex.set(i)"
                class="group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-400"
                [class]="i === activeSwatchIndex() ? 'border-bronze-400 bg-stone-900/90 shadow-gold' : 'border-white/10 bg-stone-950/50 hover:border-white/20 hover:bg-stone-900/40'"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <span class="h-6 w-6 rounded-full border border-white/20 shadow-inner" [style.background-color]="swatch.colorHex"></span>
                    <div>
                      <h4 class="font-display text-lg font-bold text-white transition-colors group-hover:text-bronze-400">
                        {{ swatch.name }}
                      </h4>
                      <span class="text-xs text-stone-400">{{ swatch.category }} • {{ swatch.origin }}</span>
                    </div>
                  </div>

                  <span class="text-xs font-bold uppercase tracking-wider text-bronze-400/80 rounded-full border border-bronze-400/20 px-3 py-1 bg-bronze-500/5">
                    {{ swatch.accentNote }}
                  </span>
                </div>
              </div>
            }
          </div>

          <!-- Right Showcase Active Material Viewport -->
          <div class="lg:col-span-7">
            <div appReveal effect="scale" [delay]="250" class="relative overflow-hidden rounded-3xl border border-white/15 bg-stone-900 shadow-lift">
              <div class="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  [src]="activeSwatch().textureImage"
                  [alt]="activeSwatch().name"
                  class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                <!-- Active Material Details Overlay -->
                <div class="absolute inset-x-0 bottom-0 p-8">
                  <div class="flex items-center gap-3">
                    <span class="rounded-full bg-bronze-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-bronze-400 border border-bronze-400/30">
                      {{ activeSwatch().durability }}
                    </span>
                    <span class="text-xs text-stone-300">Origin: {{ activeSwatch().origin }}</span>
                  </div>

                  <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                    {{ activeSwatch().name }}
                  </h3>
                  <p class="mt-2 text-sm text-stone-300 max-w-xl leading-relaxed">
                    {{ activeSwatch().description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeMaterialAtelier {
  readonly swatches = MATERIAL_SWATCHES;
  readonly activeSwatchIndex = signal(0);
  readonly activeSwatch = computed(() => this.swatches[this.activeSwatchIndex()]!);
}
