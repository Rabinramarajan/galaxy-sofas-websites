import { Component } from '@angular/core';
import { VideoBannerPlaceholder } from '../../../../shared/components/video-banner/video-banner';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Craft film — a cinematic video callout that still works when offline. */
@Component({
  selector: 'app-home-video',
  imports: [VideoBannerPlaceholder, RevealDirective],
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
          <app-video-banner-placeholder
            [poster]="'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=85'"
            [alt]="'The Galaxy atelier in motion'"
            [title]="'The Atelier, in motion'"
            [description]="'Six minutes inside our workshop — carving, upholstery and the hands behind every piece.'"
            [duration]="'6:12'"
          />
        </div>
      </div>
    </section>
  `,
})
export class HomeVideo {}
