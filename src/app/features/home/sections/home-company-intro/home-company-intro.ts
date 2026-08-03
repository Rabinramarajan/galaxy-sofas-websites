import { Component, signal } from '@angular/core';
import { AppImage } from '../../../../shared/components/app-image/app-image';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { CounterDirective } from '../../../../shared/directives/counter.directive';

/** Company intro — the Galaxy story with animated stats. */
@Component({
  selector: 'app-home-company-intro',
  imports: [AppImage, AppIcon, SectionHeader, AppButton, RevealDirective, CounterDirective],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Visual -->
        <div class="relative">
          <div class="relative overflow-hidden rounded-[2rem] shadow-lift">
            <app-img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80" alt="Craftsman hand-finishing a piece of luxury wooden furniture" class="block h-[30rem] w-full" />
          </div>
          <div appReveal effect="fade-up" [delay]="300" class="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:block dark:border-dark">
            <app-img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" alt="Interior detail with premium furniture" class="block h-40 w-full" />
          </div>
          <div appReveal effect="scale" [delay]="450" class="absolute -top-6 -left-4 flex items-center gap-3 rounded-2xl glass p-4 shadow-lift sm:-left-6">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
              <app-icon name="tree" class="h-6 w-6" />
            </span>
            <div>
              <div class="font-display text-xl font-bold text-primary dark:text-white">100% Solid</div>
              <div class="text-xs text-muted">kiln-dried timber</div>
            </div>
          </div>
        </div>

        <!-- Copy -->
        <div>
          <app-section-header
            align="left"
            eyebrow="Our Story"
            title="One workshop, one obsession — wood done right"
            description="Galaxy Sofas began in 2012 with three craftsmen and a stubborn belief: that India deserves furniture made to outlive trends. Today, 450 artisans shape 1.5 lakh square feet of workshops into pieces loved by 1.2 million homes."
          />

          <div appReveal effect="fade-up" [delay]="150" class="mt-8 grid gap-4 sm:grid-cols-2">
            @for (point of points(); track point.title) {
              <div class="flex items-start gap-3">
                <span class="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <app-icon name="check" class="h-4 w-4" />
                </span>
                <div>
                  <div class="font-semibold text-primary dark:text-white">{{ point.title }}</div>
                  <div class="text-sm text-muted">{{ point.text }}</div>
                </div>
              </div>
            }
          </div>

          <!-- stats -->
          <div appReveal effect="fade-up" [delay]="250" class="mt-10 grid grid-cols-3 gap-6 border-t border-primary/10 pt-8 dark:border-white/10">
            @for (stat of stats(); track stat.label) {
              <div>
                <div class="font-display text-3xl font-bold text-primary sm:text-4xl dark:text-white">
                  <span appCounter [target]="stat.value" [suffix]="stat.suffix" [prefix]="stat.prefix" [duration]="2000"></span>
                </div>
                <div class="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{{ stat.label }}</div>
              </div>
            }
          </div>

          <div appReveal effect="fade-up" [delay]="350" class="mt-10">
            <app-button href="/about" label="Read Our Story" variant="primary" />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeCompanyIntro {
  readonly points = signal([
    { title: 'Artisan-signed', text: 'Every piece carries its maker\u2019s signature.' },
    { title: 'In-house atelier', text: 'Carving, upholstery, QC — all under one roof.' },
    { title: 'Sustainably sourced', text: 'Certified timber, VOC-free finishes.' },
    { title: 'Built to outlast', text: 'Heirloom-grade joinery, honest hardware.' },
  ]);

  readonly stats = signal([
    { label: 'Years of craft', value: 14, suffix: '+', prefix: '' },
    { label: 'Master artisans', value: 450, suffix: '+', prefix: '' },
    { label: 'Sq ft workshop', value: 150, suffix: 'k', prefix: '' },
  ]);
}
