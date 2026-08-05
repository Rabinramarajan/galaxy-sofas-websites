import { Component, computed, signal } from '@angular/core';
import { PROCESS_STEPS } from '../../../../core/data/content.data';
import type { ProcessStep } from '../../../../core/models/furniture.model';
import { AppCounter } from '../../../../shared/components/app-counter/app-counter';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Manufacturing — the eight-stage journey as a numbered ribbon + live stats band. */
@Component({
  selector: 'app-home-manufacturing',
  imports: [AppCounter, AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-espresso py-28 text-bone dark:bg-espresso-soft">
      <!-- Ambient Luxury Glow & Background Texture -->
      <div class="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[140px]"></div>
      <div class="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[140px]"></div>
      
      <!-- Subtle Grid Pattern -->
      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div class="section-shell relative z-10">
        <!-- Header -->
        <div class="flex flex-col items-center text-center">
          <div appReveal effect="fade-up" class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
            <span class="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
            <span class="eyebrow text-gold tracking-[0.25em]">Inside the Atelier</span>
          </div>
          
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-6 max-w-3xl font-display text-4xl font-normal leading-[1.12] tracking-tight text-balance text-bone sm:text-5xl lg:text-6xl">
            The eight-stage journey,<br /><span class="italic text-gold font-serif">from plank to parlour</span>
          </h2>
          
          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">
            Precision where it matters, patience everywhere else. Our atelier turns certified timber into hand-signed heirlooms in a disciplined six-week flow.
          </p>
        </div>

        <!-- Interactive Journey Showcase -->
        <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          
          <!-- Step Selector List (Left Column) -->
          <div appReveal effect="fade-up" [delay]="300" class="flex flex-col gap-2.5 lg:col-span-5">
            @for (step of steps(); track step.id; let i = $index) {
              <button 
                type="button"
                (click)="activeStepIndex.set(i)"
                [attr.aria-pressed]="activeStepIndex() === i"
                [attr.aria-label]="'Show stage ' + step.index + ': ' + step.title"
                [class.bg-mocha]="activeStepIndex() === i"
                [class.border-gold\/40]="activeStepIndex() === i"
                [class.shadow-2xl]="activeStepIndex() === i"
                class="group relative flex items-center justify-between rounded-2xl border border-bone/10 bg-mocha/40 p-5 text-left transition-all duration-300 hover:border-gold/30 hover:bg-mocha/80"
              >
                <!-- Active Indicator Line -->
                @if (activeStepIndex() === i) {
                  <div class="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-gold"></div>
                }

                <div class="flex items-center gap-4 pl-2">
                  <span 
                    [class.text-gold]="activeStepIndex() === i"
                    [class.text-bone\/40]="activeStepIndex() !== i"
                    class="font-display text-2xl font-light transition-colors duration-300 group-hover:text-gold"
                  >
                    {{ step.index }}
                  </span>
                  
                  <div>
                    <h3 
                      [class.text-gold]="activeStepIndex() === i"
                      class="font-display text-base font-medium text-bone transition-colors duration-300 group-hover:text-gold"
                    >
                      {{ step.title }}
                    </h3>
                    <span class="text-xs tracking-wider text-bone/50">{{ step.duration }}</span>
                  </div>
                </div>

                <div 
                  [class.bg-gold\/20]="activeStepIndex() === i"
                  [class.text-gold]="activeStepIndex() === i"
                  class="flex h-10 w-10 items-center justify-center rounded-xl border border-bone/10 bg-bone/5 text-bone/60 transition-colors duration-300 group-hover:border-gold/30 group-hover:text-gold"
                >
                  <app-icon [name]="step.icon" class="h-4 w-4" />
                </div>
              </button>
            }
          </div>

          <!-- Active Step Display Showcase (Right Column) -->
          <div appReveal effect="fade-up" [delay]="400" class="lg:col-span-7">
            @let current = activeStep();
            
            <div class="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gold/20 bg-mocha/60 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
              <!-- Top Header & Badging -->
              <div>
                <div class="flex items-center justify-between border-b border-bone/10 pb-6">
                  <div class="flex items-center gap-3">
                    <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/30">
                      <app-icon [name]="current.icon" class="h-6 w-6" />
                    </span>
                    <div>
                      <span class="text-xs font-bold uppercase tracking-[0.25em] text-gold">Stage {{ current.index }} of 08</span>
                      <h3 class="font-display text-2xl font-medium text-bone sm:text-3xl mt-0.5">{{ current.title }}</h3>
                    </div>
                  </div>
                  
                  <span class="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold uppercase">
                    {{ current.duration }}
                  </span>
                </div>

                <!-- Description -->
                <p class="mt-6 text-base leading-relaxed text-bone/80 sm:text-lg">
                  {{ current.description }}
                </p>
              </div>

              <!-- High-End Photography Card Preview -->
              <div class="mt-8 overflow-hidden rounded-2xl border border-bone/10 bg-espresso/90 relative group aspect-[16/9]">
                <img 
                  [src]="current.image" 
                  [alt]="current.title" 
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80"></div>
                
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-espresso/60 px-4 py-3 backdrop-blur-md">
                  <div class="flex items-center gap-2">
                    <app-icon name="sparkles" class="h-4 w-4 text-gold" />
                    <span class="text-xs font-medium text-bone/90">Atelier Quality Assurance Guaranteed</span>
                  </div>
                  <span class="text-[11px] font-bold uppercase tracking-widest text-gold">Stage {{ current.index }}</span>
                </div>
              </div>

              <!-- Bottom Navigation Controls -->
              <div class="mt-8 flex items-center justify-between border-t border-bone/10 pt-6">
                <button 
                  type="button" 
                  (click)="prevStep()"
                  class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bone/60 transition-colors hover:text-gold"
                >
                  <app-icon name="chevronLeft" class="h-4 w-4" /> Previous Stage
                </button>
                
                <div class="flex gap-1.5">
                  @for (step of steps(); track step.id; let i = $index) {
                    <button 
                      type="button" 
                      (click)="activeStepIndex.set(i)" 
                      [class.bg-gold]="activeStepIndex() === i"
                      [class.w-6]="activeStepIndex() === i"
                      class="h-1.5 w-1.5 rounded-full bg-bone/20 transition-all duration-300 hover:bg-gold/60"
                      [attr.aria-label]="'Go to step ' + (i + 1)"
                    ></button>
                  }
                </div>

                <button 
                  type="button" 
                  (click)="nextStep()"
                  class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bone/60 transition-colors hover:text-gold"
                >
                  Next Stage <app-icon name="chevronRight" class="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

        <div appReveal effect="fade-up" class="mt-14 flex justify-center">
          <app-button href="/manufacturing-process" label="Explore Complete Manufacturing Process" variant="outline" size="lg" [arrow]="true" />
        </div>
      </div>

      <!-- Stats band -->
      <div class="section-shell relative z-10 mt-24">
        <div class="grid grid-cols-2 gap-y-10 rounded-[2.5rem] border border-gold/20 bg-mocha/80 px-8 py-14 text-bone shadow-2xl backdrop-blur-xl sm:grid-cols-4">
          @for (stat of stats(); track stat.label) {
            <div class="flex flex-col items-center text-center border-r border-bone/10 last:border-none">
              <app-counter [target]="stat.value" [suffix]="stat.suffix" [prefix]="stat.prefix" [decimals]="stat.decimals ?? 0" />
              <span class="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-gold/90">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,

})
export class HomeManufacturing {
  readonly steps = signal<ProcessStep[]>(PROCESS_STEPS);
  readonly activeStepIndex = signal(0);

  readonly activeStep = computed<ProcessStep>(() => {
    const list = this.steps();
    const idx = this.activeStepIndex();
    const step = list[idx] ?? list[0];
    if (!step) {
      throw new Error('No process steps available');
    }
    return step;
  });

  readonly stats = signal([
    { label: 'Atelier size', value: 150000, prefix: '', suffix: ' sq ft' },
    { label: 'Master artisans', value: 450, prefix: '', suffix: '+' },
    { label: 'Experience centres', value: 28, prefix: '', suffix: '+' },
    { label: 'Pieces delivered', value: 1.2, prefix: '', suffix: 'M+', decimals: 1 },
  ]);

  nextStep(): void {
    this.activeStepIndex.update((current) => (current + 1) % this.steps().length);
  }

  prevStep(): void {
    this.activeStepIndex.update((current) => (current - 1 + this.steps().length) % this.steps().length);
  }
}
