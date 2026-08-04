import { Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Contact — a standing invitation, telephone first, showroom second. */
@Component({
  selector: 'app-home-contact',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative overflow-hidden bg-gold-gradient py-24 sm:py-28">
      <div class="pointer-events-none absolute inset-0 noise opacity-60" aria-hidden="true"></div>
      <div class="section-shell relative grid items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span appReveal effect="fade-up" class="eyebrow text-white/80">
            <span class="h-px w-10 bg-white/60"></span>
            Let's Talk
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
            Your next favourite<br />piece starts here
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-lg text-base leading-relaxed text-white/85">
            Book a free design consultation, visit one of {{ SITE.showroomCount }} experience centres, or simply
            call — we love talking furniture almost as much as making it.
          </p>
          <div appReveal effect="fade-up" [delay]="360" class="mt-9 flex flex-wrap items-center gap-4">
            <app-button href="/contact" label="Book a Consultation" variant="white" size="lg" icon="calendar" />
            <a href="tel:{{ SITE.phoneRaw }}" class="inline-flex items-center gap-3 rounded-full px-2 py-2 text-white transition-colors hover:text-espresso">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                <app-icon name="phone" class="h-5 w-5" />
              </span>
              <span class="text-left">
                <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Call us anytime</span>
                <span class="block font-display text-lg font-semibold">{{ SITE.phone }}</span>
              </span>
            </a>
          </div>
        </div>

        <div appReveal effect="scale" [delay]="300" class="lg:col-span-5">
          <div class="rounded-[2rem] bg-espresso p-8 text-bone shadow-lift sm:p-10">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gold-light ring-1 ring-white/15">
              <app-icon name="map" class="h-5 w-5" />
            </span>
            <h3 class="mt-5 font-display text-2xl font-semibold">The Chennai Flagship</h3>
            <p class="mt-2 text-sm leading-relaxed text-bone/70">{{ SITE.address.full }}</p>
            <dl class="mt-6 space-y-3 border-t border-bone/10 pt-6 text-sm">
              <div class="flex items-center justify-between">
                <dt class="text-bone/50">Hours</dt>
                <dd class="font-semibold text-bone">{{ SITE.hours }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-bone/50">Consultations</dt>
                <dd class="font-semibold text-bone">Free, by appointment</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-bone/50">Showrooms</dt>
                <dd class="font-semibold text-bone">{{ SITE.showroomCount }} across 15 cities</dd>
              </div>
            </dl>
            <a href="/store-location" class="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-white shadow-gold transition-all duration-300 hover:shadow-glow hover:brightness-105">
              Find a showroom <app-icon name="arrowRight" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeContact {
  readonly SITE = SITE;
}
