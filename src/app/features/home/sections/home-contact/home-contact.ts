import { Component, signal } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const CITIES = ['Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kochi', 'Goa'];

/** Contact — a standing invitation in deep espresso, gold-threaded, warm. */
@Component({
  selector: 'app-home-contact',
  imports: [AppIcon, AppButton, RevealDirective],
  template: `
    <section class="relative isolate overflow-hidden bg-espresso py-24 text-bone sm:py-32">
      <!-- Atmosphere -->
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <div class="absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-[150px]"></div>
        <div class="absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[150px]"></div>
        <div class="absolute inset-0 noise opacity-40"></div>
      </div>

      <div class="section-shell relative grid items-center gap-16 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span appReveal effect="fade-up" class="eyebrow text-gold-light">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            Let's Talk
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl xl:text-6xl">
            Your next favourite<br />piece starts <em class="italic text-gradient-gold font-semibold">here.</em>
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-6 max-w-lg text-base leading-relaxed text-bone/70">
            Book a free design consultation, visit one of {{ SITE.showroomCount }} experience centres, or simply
            call — we love talking furniture almost as much as making it.
          </p>
          <div appReveal effect="fade-up" [delay]="360" class="mt-9 flex flex-wrap items-center gap-4">
            <app-button href="/contact" label="Book a Consultation" variant="gold" size="lg" icon="calendar" />
            <a href="tel:{{ SITE.phoneRaw }}" class="group inline-flex items-center gap-3 rounded-full px-2 py-2 text-bone transition-colors hover:text-gold-light">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-bone/10 ring-1 ring-bone/20 backdrop-blur-md transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold">
                <app-icon name="phone" class="h-5 w-5" />
              </span>
              <span class="text-left">
                <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-bone/50">Call us anytime</span>
                <span class="block font-display text-lg font-semibold">{{ SITE.phone }}</span>
              </span>
            </a>
          </div>
        </div>

        <!-- Showroom card -->
        <div appReveal effect="scale" [delay]="300" class="lg:col-span-5">
          <div class="relative">
            <div class="pointer-events-none absolute -inset-3 rounded-[2.25rem] border border-gold/25" aria-hidden="true"></div>
            <div class="relative rounded-[1.75rem] bg-mocha/70 p-8 shadow-lift ring-1 ring-gold/15 backdrop-blur-xl sm:p-10">
              <div class="flex items-center gap-4">
                <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold">
                  <app-icon name="map" class="h-5 w-5" />
                </span>
                <div>
                  <h3 class="font-display text-2xl font-semibold text-bone">The Chennai Flagship</h3>
                  <p class="text-sm text-bone/60">{{ SITE.address.full }}</p>
                </div>
              </div>

              <dl class="mt-7 space-y-3.5 border-t border-bone/10 pt-7 text-sm">
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

              <a href="/store-location" class="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-white shadow-gold transition-all duration-300 hover:shadow-glow hover:brightness-105">
                Find a showroom <app-icon name="arrowRight" class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- City strip -->
      <div appReveal effect="fade-up" [delay]="400" class="section-shell relative mt-20 border-t border-bone/10 pt-8">
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-[0.3em] text-bone/40 sm:justify-start">
          @for (city of cities(); track city; let i = $index) {
            <span class="flex items-center gap-6">
              {{ city }}
              @if (!$last) { <span class="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true"></span> }
            </span>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeContact {
  readonly SITE = SITE;
  readonly cities = signal(CITIES);
}
