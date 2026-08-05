import { Component, signal } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface CustomStep {
  icon: string;
  step: string;
  title: string;
}

const CUSTOM_STEPS: CustomStep[] = [
  { icon: 'ruler', step: '01 · Measure', title: 'We map your space precisely, in-home.' },
  { icon: 'pen', step: '02 · Design', title: 'Sketch, 3D preview and a transparent quote.' },
  { icon: 'hammer', step: '03 · Craft', title: 'Your piece is built by hand in 30–45 days.' },
];

/** Bespoke Atelier — a cinematic full-bleed scene with a framed glass service panel. */
@Component({
  selector: 'app-home-custom',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative isolate overflow-hidden">
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/galaxysofas/image/Luxury-Living-Room/Double-height-villa-salon.png"
          alt=""
          width="2000"
          height="1200"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-espresso/85"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/70 to-espresso/30"></div>
        <div class="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-[140px]"></div>
      </div>

      <!-- Oversized watermark -->
      <div class="pointer-events-none absolute -bottom-10 right-0 hidden select-none font-display text-[12rem] font-semibold leading-none text-bone/[0.03] xl:block" aria-hidden="true">
        Bespoke
      </div>

      <div class="section-shell grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <span appReveal effect="fade-up" class="eyebrow text-gold-light">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            The Bespoke Atelier
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-bone sm:text-5xl xl:text-6xl">
            Furniture that<br />listens to <em class="italic text-gradient-gold font-semibold">your room.</em>
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-lg text-base leading-relaxed text-bone/70">
            Odd dimensions, ambitious ideas, one-of-a-kind homes — our design team measures, sketches
            and crafts pieces made only for you. Free consultation, no pressure.
          </p>
          <div appReveal effect="fade-up" [delay]="360" class="mt-9 flex flex-wrap items-center gap-4">
            <app-button href="/custom-furniture" label="Start a Custom Order" variant="gold" size="lg" icon="pen" />
            <app-button href="/contact" label="Book a Consultation" variant="glass" size="lg" [arrow]="true" />
          </div>
        </div>

        <!-- Framed glass panel -->
        <div appReveal effect="scale" [delay]="300" class="relative lg:col-span-6">
          <div class="pointer-events-none absolute -inset-4 rounded-[2.25rem] border border-gold/25" aria-hidden="true"></div>

          <div class="relative rounded-[1.75rem] glass-dark p-8 shadow-lift backdrop-blur-2xl sm:p-10">
            <span class="absolute -top-px right-10 flex items-center gap-2 rounded-b-xl bg-gold-gradient px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-gold">
              <app-icon name="sparkles" class="h-3 w-3" /> Atelier Only
            </span>

            <div class="flex items-center justify-between border-b border-bone/10 pb-6">
              <h3 class="font-display text-2xl font-semibold text-bone">How it works</h3>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold">
                <app-icon name="gem" class="h-4 w-4" />
              </span>
            </div>

            <ol class="relative mt-7">
              <span class="absolute bottom-6 left-[1.4rem] top-4 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" aria-hidden="true"></span>
              @for (step of steps(); track step.step; let i = $index) {
                <li class="relative flex gap-5 pb-7 last:pb-0">
                  <span class="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold ring-4 ring-espresso/60">
                    <app-icon [name]="step.icon" class="h-5 w-5" />
                  </span>
                  <span class="pt-1">
                    <span class="block text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light">{{ step.step }}</span>
                    <span class="mt-1 block text-sm leading-relaxed text-bone/85">{{ step.title }}</span>
                  </span>
                </li>
              }
            </ol>

            <p class="mt-8 flex items-start gap-2.5 rounded-xl bg-bone/5 px-5 py-4 text-xs leading-relaxed text-bone/60 ring-1 ring-bone/10">
              <app-icon name="shield" class="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold-light" />
              Every bespoke piece is signed by the artisan who built it and covered by our full warranty.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeCustom {
  readonly steps = signal(CUSTOM_STEPS);
}
