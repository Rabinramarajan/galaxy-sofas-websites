import { Component } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';

/** Final contact CTA — cinematic close to the home page. */
@Component({
  selector: 'app-home-contact-cta',
  imports: [AppIcon, AppButton, RevealDirective, ParallaxDirective],
  template: `
    <section class="relative overflow-hidden">
      <div class="relative py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury bedroom styled with Galaxy furniture at dusk"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-dark/80"></div>
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute left-1/2 top-1/2 h-96 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-3xl"></div>
        </div>

        <div appParallax [speed]="0.06" class="relative section-shell flex flex-col items-center text-center">
          <div appReveal effect="scale">
            <span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-white shadow-glow animate-float">
              <app-icon name="sofa" class="h-8 w-8" />
            </span>
          </div>

          <h2 appReveal effect="fade-up" [delay]="120" class="mt-8 max-w-3xl font-display text-4xl font-semibold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Your dream room is one <span class="text-gradient-gold">conversation</span> away
          </h2>

          <p appReveal effect="fade-up" [delay]="240" class="mt-5 max-w-xl text-base leading-relaxed text-white/75">
            Tell us about your space and our design team will help you curate it — free, no obligation,
            whether you buy one piece or one hundred.
          </p>

          <div appReveal effect="fade-up" [delay]="360" class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <app-button href="/contact" label="Book a Free Consultation" variant="gold" size="lg" icon="phone" />
            <app-button href="tel:{{ phone }}" label="Call {{ phone }}" variant="white" size="lg" [arrow]="true" />
          </div>

          <div appReveal effect="fade-up" [delay]="480" class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span class="flex items-center gap-2"><app-icon name="shield" class="h-4 w-4 text-secondary" /> 15-day returns</span>
            <span class="flex items-center gap-2"><app-icon name="truck" class="h-4 w-4 text-secondary" /> Free delivery ₹25k+</span>
            <span class="flex items-center gap-2"><app-icon name="clock" class="h-4 w-4 text-secondary" /> 30-day delivery</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeContactCta {
  readonly phone = '+91 98765 43210';
}
