import { Component } from '@angular/core';
import { VideoBanner } from '../../../../shared/components/video-banner/video-banner';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Craft film — a cinematic full-bleed screening with an editorial caption. */
@Component({
  selector: 'app-home-video',
  imports: [VideoBanner, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-espresso py-24 sm:py-32">
      <div class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[140px]" aria-hidden="true"></div>

      <div class="section-shell">
        <div class="flex flex-col items-center text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold-light">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            Inside the Craft
            <span class="h-px w-10 bg-gradient-to-l from-gold to-transparent"></span>
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-bone sm:text-5xl">
            Watch a sofa<br />come to life
          </h2>
        </div>

        <!-- Full-bleed cinematic screening -->
        <div appReveal effect="scale" [delay]="240" class="relative mt-14 -mx-4 sm:-mx-6 lg:-mx-10 xl:-mx-14">
          <div class="pointer-events-none absolute -inset-px z-0 rounded-[2rem] border border-gold/25" aria-hidden="true"></div>
          <app-video-banner
            [videoSrc]="'/galaxysofas/video/_Hero_Video_-_Where_Li.mp4'"
            [poster]="'/galaxysofas/image/Luxury-Living-Room/Grand-sunlit-salon.png'"
            [alt]="'The Galaxy atelier in motion'"
            [aspectRatio]="'16/9'"
          >
            <div slot="content" class="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
              <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-bone/70">
                Galaxy Atelier Film · 01
              </span>
              <div class="flex flex-wrap items-end justify-between gap-4">
                <p class="max-w-md font-display text-2xl font-medium leading-snug text-bone sm:text-3xl">
                  From plank to parlour —<br />six weeks, ninety seconds.
                </p>
                <span class="rounded-full glass-dark px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur-md">
                  4K · Original Film
                </span>
              </div>
            </div>
          </app-video-banner>
        </div>

        <p appReveal effect="fade-up" [delay]="300" class="mt-8 text-center text-xs uppercase tracking-[0.24em] text-bone/40">
          Sound on — listen to the workshop
        </p>
      </div>
    </section>
  `,
})
export class HomeVideo {}
