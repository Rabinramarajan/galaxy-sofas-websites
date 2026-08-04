import { Component, signal } from '@angular/core';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Material {
  name: string;
  note: string;
  detail: string;
  image: string;
  tag: string;
}

const MATERIALS: Material[] = [
  {
    name: 'Solid Sheesham',
    note: 'The backbone',
    detail: 'Kiln-dried Indian rosewood, bold grain, naturally water-resistant. Deepens in colour for decades.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    tag: 'Timber',
  },
  {
    name: 'Breathable Velvet',
    note: 'The touch',
    detail: '1,00,000 rub-tested, stain-shielded premium velvet that stays cool and soft for a decade of Sundays.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    tag: 'Upholstery',
  },
  {
    name: 'High-Resilience Foam',
    note: 'The support',
    detail: '35D high-resilience cores and feather blends that recover instantly — no sagging, no splaying, no sorry.',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
    tag: 'Comfort',
  },
  {
    name: 'Solid Brass',
    note: 'The detail',
    detail: 'Antiqued brass feet and fittings, finished by hand — the small luxuries you feel without noticing.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tag: 'Hardware',
  },
];

/** Premium materials atelier — four tactile editorial tiles. */
@Component({
  selector: 'app-home-materials',
  imports: [AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-espresso py-24 text-bone sm:py-32">
      <div class="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" aria-hidden="true"></div>

      <div class="section-shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold-light">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              The Material Atelier
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
              Four honest materials.<br /><em class="italic text-gradient-gold font-semibold">No imitations.</em>
            </h2>
          </div>
          <div appReveal effect="fade-up" [delay]="200">
            <app-button href="/why-galaxy-sofas" label="Why Galaxy" variant="glass" size="lg" [arrow]="true" />
          </div>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2">
          @for (material of materials(); track material.name; let i = $index) {
            <article
              appReveal
              effect="fade-up"
              [delay]="i * 100"
              class="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-bone/10"
            >
              <img
                [src]="material.image"
                [alt]="material.name"
                width="800"
                height="640"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/10"></div>

              <div class="relative p-7 sm:p-8">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-bone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-light ring-1 ring-gold/30 backdrop-blur-md">
                  {{ material.tag }}
                </span>
                <h3 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ material.name }}</h3>
                <p class="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-light">{{ material.note }}</p>
                <p class="mt-3 max-w-md text-sm leading-relaxed text-bone/70">{{ material.detail }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeMaterials {
  readonly materials = signal(MATERIALS);
}
