import { Component } from '@angular/core';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/**
 * Full-width luxury banner — cinematic image with animated headline,
 * used as a "chapter divider" on the home page.
 */
@Component({
  selector: 'app-home-luxury-banner',
  imports: [AppIcon, RevealDirective],
  template: `
    <section class="relative overflow-hidden">
      <div class="relative min-h-[24rem] sm:min-h-[30rem]">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury interior with premium furniture bathed in golden light"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 h-full w-full object-cover animate-kenburns"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>

        <div class="relative section-shell flex min-h-[24rem] items-center sm:min-h-[30rem]">
          <div class="max-w-2xl">
            <div appReveal effect="fade-up">
              <span class="eyebrow text-secondary-light">
                <span class="h-px w-8 bg-gradient-to-r from-secondary-light to-transparent"></span>
                The Galaxy Standard
              </span>
            </div>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-semibold leading-tight text-balance text-white sm:text-5xl">
              Every piece is a promise. <span class="text-gradient-gold">Every finish, an obsession.</span>
            </h2>
            <p appReveal effect="fade-up" [delay]="240" class="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              From a single chair to a complete home, we build furniture the way it deserves to be built —
              slowly, honestly, and to be passed down for generations.
            </p>
            <div appReveal effect="fade-up" [delay]="360" class="mt-8 flex items-center gap-3 text-sm text-white/85">
              <app-icon name="medal" class="h-5 w-5 text-secondary-light" />
              <span>Voted India's Most Trusted Furniture Brand 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeLuxuryBanner {}
