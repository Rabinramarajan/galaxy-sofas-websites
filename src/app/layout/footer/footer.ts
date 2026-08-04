import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOOTER_NAV, SITE } from '../../core/config/site.config';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** Editorial footer — oversized wordmark, newsletter, links and trust. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <footer class="relative overflow-hidden bg-espresso text-bone">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -top-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px] animate-aurora"></div>
      </div>

      <!-- Oversized brand wordmark -->
      <div class="relative border-b border-bone/10">
        <div class="section-shell overflow-hidden py-14 sm:py-16">
          <p appReveal effect="fade-up" class="font-display text-[clamp(3rem,12vw,10rem)] font-semibold leading-none tracking-tight text-bone/95">
            Galaxy <span class="text-gradient-gold">Sofas</span>
          </p>
          <p class="mt-4 max-w-lg text-sm text-bone/50">Furniture composed with light, timber and patience — since {{ SITE.founded }}.</p>
        </div>
      </div>

      <!-- Newsletter band -->
      <div class="relative border-b border-bone/10">
        <div class="section-shell flex flex-col items-center gap-6 py-12 text-center sm:py-14">
          <div appReveal effect="fade-up">
            <span class="eyebrow text-gold-light">Join the Galaxy circle</span>
            <h2 class="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl">Get 10% off your first piece</h2>
            <p class="mt-3 max-w-xl text-sm text-bone/60">Interior inspiration, private previews and members-only offers. One email a week, zero spam.</p>
          </div>
          <form appReveal effect="fade-up" [delay]="120" (submit)="subscribe($event)" class="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label class="sr-only" for="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full flex-1 rounded-full border border-bone/15 bg-bone/5 px-6 py-3.5 text-sm text-bone outline-none backdrop-blur-sm transition-colors placeholder:text-bone/40 focus:border-gold"
            />
            <button type="submit" class="shrink-0 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-bold text-white shadow-gold transition-all duration-300 hover:shadow-glow hover:brightness-105">
              Subscribe
            </button>
          </form>
          @if (subscribed()) {
            <p class="text-sm text-success" role="status">Welcome to the circle — check your inbox for 10% off!</p>
          }
        </div>
      </div>

      <!-- Main footer -->
      <div class="relative section-shell grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <!-- Brand -->
        <div class="lg:col-span-4">
          <a routerLink="/" class="flex items-center gap-2.5" aria-label="Galaxy Sofas home">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-gold">
              <app-icon name="sofa" class="h-5 w-5 text-white" />
            </span>
            <span class="leading-none">
              <span class="block font-display text-lg font-semibold">Galaxy <span class="text-gradient-gold">Sofas</span></span>
              <span class="block text-[9px] font-semibold uppercase tracking-[0.3em] text-bone/50">{{ SITE.tagline }}</span>
            </span>
          </a>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-bone/60">
            Since {{ SITE.founded }}, we've hand-crafted luxury furniture for over {{ SITE.productsDelivered }} homes.
            100% solid wood, 450 artisans, and a warranty we actually honour.
          </p>
          <div class="mt-6 flex items-center gap-3">
            @for (social of socials(); track social.label) {
              <a [href]="social.url" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-gold hover:text-gold-light hover:-translate-y-1" [attr.aria-label]="social.label">
                <app-icon [name]="social.icon" class="h-4 w-4" />
              </a>
            }
          </div>
        </div>

        <!-- Explore -->
        <nav class="lg:col-span-2" aria-label="Explore">
          <h3 class="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Explore</h3>
          <ul class="mt-5 space-y-3">
            @for (link of FOOTER_NAV; track link.path) {
              <li>
                <a routerLink="{{ link.path }}" class="group inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-bone">
                  <span class="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-3"></span>
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Popular -->
        <nav class="lg:col-span-3" aria-label="Popular products">
          <h3 class="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Popular</h3>
          <ul class="mt-5 space-y-3">
            @for (link of popularLinks(); track link) {
              <li>
                <a routerLink="{{ link.path }}" class="group inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-bone">
                  <span class="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-3"></span>
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Contact -->
        <div class="lg:col-span-3">
          <h3 class="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Visit / Contact</h3>
          <ul class="mt-5 space-y-4 text-sm text-bone/60">
            <li class="flex items-start gap-3">
              <app-icon name="map" class="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light" />
              <span>{{ SITE.address.full }}</span>
            </li>
            <li class="flex items-start gap-3">
              <app-icon name="phone" class="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light" />
              <a href="tel:{{ SITE.phoneRaw }}" class="transition-colors hover:text-bone">{{ SITE.phone }}</a>
            </li>
            <li class="flex items-start gap-3">
              <app-icon name="mail" class="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light" />
              <a href="mailto:{{ SITE.email }}" class="transition-colors hover:text-bone">{{ SITE.email }}</a>
            </li>
            <li class="flex items-start gap-3">
              <app-icon name="clock" class="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light" />
              <span>{{ SITE.hours }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="relative border-t border-bone/10">
        <div class="section-shell flex flex-col items-center justify-between gap-4 py-6 text-xs text-bone/40 sm:flex-row">
          <p>© {{ year }} {{ SITE.name }}. All rights reserved. Crafted with <app-icon name="heart" class="h-3 w-3 inline text-gold-light" /> in India.</p>
          <div class="flex items-center gap-6">
            <a routerLink="/privacy-policy" class="transition-colors hover:text-bone">Privacy Policy</a>
            <a routerLink="/terms" class="transition-colors hover:text-bone">Terms of Service</a>
            <a routerLink="/faqs" class="transition-colors hover:text-bone">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly SITE = SITE;
  readonly FOOTER_NAV = FOOTER_NAV;
  readonly year = new Date().getFullYear();
  readonly subscribed = signal(false);

  readonly socials = signal([
    { label: 'Instagram', icon: 'instagram', url: SITE.social.instagram },
    { label: 'Facebook', icon: 'facebook', url: SITE.social.facebook },
    { label: 'YouTube', icon: 'youtube', url: SITE.social.youtube },
    { label: 'Pinterest', icon: 'pinterest', url: SITE.social.pinterest },
  ]);

  readonly popularLinks = signal([
    { label: 'Luxury Sofas', path: '/categories/sofas' },
    { label: 'Recliner Sofas', path: '/categories/recliner-sofas' },
    { label: 'Beds', path: '/categories/beds' },
    { label: 'Dining Tables', path: '/categories/dining-tables' },
    { label: 'Custom Furniture', path: '/custom-furniture' },
  ]);

  subscribe(event: Event): void {
    event.preventDefault();
    this.subscribed.set(true);
  }
}
