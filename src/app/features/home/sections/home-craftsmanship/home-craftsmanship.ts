import { Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppImage } from '../../../../shared/components/app-image/app-image';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

/** Craftsmanship showcase — split feature with layered visuals. */
@Component({
  selector: 'app-home-craftsmanship',
  imports: [SectionHeader, AppImage, AppIcon, AppButton, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative overflow-hidden bg-surface py-20 sm:py-28 dark:bg-dark-soft">
      <div class="section-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Copy -->
        <div class="order-2 lg:order-1">
          <app-section-header
            align="left"
            eyebrow="Craftsmanship"
            title="Where the wood gets a soul"
            description="Seven stages of sanding. Hand-carved motifs. Mortise-and-tenon joinery. This is the difference between furniture and heirloom."
          />

          <div class="mt-8 space-y-5">
            @for (step of steps; track step.label) {
              <div appReveal effect="fade-up" [delay]="$index * 90" class="flex items-start gap-4">
                <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/15 font-display text-sm font-bold text-secondary">
                  {{ step.num }}
                </span>
                <div>
                  <div class="font-semibold text-primary dark:text-white">{{ step.label }}</div>
                  <div class="text-sm text-muted">{{ step.text }}</div>
                </div>
              </div>
            }
          </div>

          <div appReveal effect="fade-up" [delay]="360" class="mt-9">
            <app-button href="/manufacturing-process" label="See the 8-Step Process" variant="outline" [arrow]="true" />
          </div>
        </div>

        <!-- Visual -->
        <div class="relative order-1 lg:order-2" appParallax [speed]="0.05">
          <div class="relative overflow-hidden rounded-[2rem] shadow-lift">
            <app-img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80" alt="Craftsman carving details into solid wood furniture" class="block h-[26rem] w-full sm:h-[32rem]" />
          </div>
          <div appReveal effect="scale" [delay]="300" class="absolute -bottom-8 left-6 flex items-center gap-3 rounded-2xl glass p-4 shadow-lift">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold">
              <app-icon name="hammer" class="h-6 w-6" />
            </span>
            <div>
              <div class="font-display text-lg font-bold text-primary dark:text-white">40+ QC points</div>
              <div class="text-xs text-muted">on every single piece</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeCraftsmanship {
  readonly steps = [
    { num: '01', label: 'Timber selected by hand', text: 'Only kiln-dried sheesham under 10% moisture makes the cut.' },
    { num: '02', label: 'Joinery, not glue', text: 'Mortise-and-tenon joints reinforced with steel at stress points.' },
    { num: '03', label: 'Seven-stage sanding', text: 'Each surface is graded, hand-sanded and sealed for a silken finish.' },
    { num: '04', label: 'Signed by the maker', text: 'The artisan carves their mark into every piece they finish.' },
  ];
}
