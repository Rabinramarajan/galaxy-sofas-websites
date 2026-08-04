import { Component } from '@angular/core';
import { VideoBanner } from '../../../../shared/components/video-banner/video-banner';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Craft film — a cinematic video callout that still works when offline. */
@Component({
  selector: 'app-home-video',
  imports: [VideoBanner, RevealDirective],
  template: `
    <section class="relative bg-espresso py-24 sm:py-32">
      <div class="section-shell">
        <div class="flex flex-col items-center text-center">
          <span appReveal effect="fade-up" class="eyebrow text-gold-light">Inside the Craft</span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-bone sm:text-5xl">
            Watch a sofa<br />come to life
          </h2>
        </div>

        <div appReveal effect="scale" [delay]="240" class="mt-14">
          <app-video-banner
            [videoSrc]="'/galaxysofas/video/_Hero_Video_-_Where_Li.mp4'"
            [poster]="'/galaxysofas/image/Luxury-Living-Room/Grand-sunlit-salon.png'"
            [alt]="'The Galaxy atelier in motion'"
            [aspectRatio]="'16/9'"
          />
        </div>
      </div>
    </section>
  `,
})
export class HomeVideo {}
