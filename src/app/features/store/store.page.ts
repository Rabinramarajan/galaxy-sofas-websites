import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { STORE_LOCATIONS } from '../../core/data/content.data';
import { StoreLocation } from '../../core/models/furniture.model';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-store-page',
  imports: [AppButton, AppIcon, PageHero, RevealDirective, SectionHeader],
  template: `
    <app-page-hero
      title="Visit a Showroom"
      subtitle="Experience the difference of real craftsmanship. Book a private consultation at any of our 28 locations."
      [showBreadcrumb]="true"
      breadcrumbLabel="Store Location"
    >
      <span slot="cta">
        <app-button label="Book Consultation" variant="gold" size="lg" icon="calendar" />
      </span>
    </app-page-hero>

    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Our Network"
        title="28 Experience Centres"
        description="From Bengaluru to Bhopal, find Galaxy near you. Every showroom showcases our full collections with design consultants on hand."
      />

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        @for (store of stores(); track store.id) {
          <article appReveal effect="fade-up" class="group rounded-2xl border border-primary/10 bg-white p-6 shadow-soft transition-all hover:shadow-lift dark:border-white/10 dark:bg-dark-card">
            <div class="mb-4 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <app-icon name="map" class="h-5 w-5" />
              </span>
              <div>
                <h3 class="font-display text-lg font-semibold text-primary dark:text-white">{{ store.city }}</h3>
                <p class="text-sm text-secondary">{{ store.name }}</p>
              </div>
            </div>
            <p class="text-sm text-muted">{{ store.address }}</p>
            <div class="mt-3 flex items-center gap-3 text-sm">
              <span class="flex items-center gap-1.5">
                <app-icon name="phone" class="h-4 w-4 text-muted" />
                {{ store.phone }}
              </span>
            </div>
            <p class="mt-2 text-xs text-muted">{{ store.hours }}</p>
            <div class="mt-5 flex gap-3">
              <app-button label="Directions" variant="outline" size="sm" icon="map" href="https://maps.google.com/?q={{ store.lat }},{{ store.lng }}" [external]="true" />
              <app-button label="Call" variant="ghost" size="sm" icon="phone" href="tel:{{ store.phone }}" />
            </div>
          </article>
        }
      </div>
    </section>

    <!-- Map Overview -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="font-display text-3xl font-semibold text-primary dark:text-white">Find Your Nearest Galaxy</h2>
        <p class="mt-4 text-muted">All 28 locations are open daily. No appointment needed — walk-ins welcome.</p>
        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div class="rounded-xl bg-white p-4 shadow dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">15</div>
            <p class="text-xs text-muted">Cities</p>
          </div>
          <div class="rounded-xl bg-white p-4 shadow dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">28</div>
            <p class="text-xs text-muted">Stores</p>
          </div>
          <div class="rounded-xl bg-white p-4 shadow dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">5K+</div>
            <p class="text-xs text-muted">Daily Visitors</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StorePage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly stores = signal<StoreLocation[]>(STORE_LOCATIONS);

  ngOnInit(): void {
    this.#seo.set({
      title: 'Store Locations — Visit a Galaxy Showroom',
      description: 'Find a Galaxy Sofas showroom near you. 28 experience centres across 15 Indian cities. Book a private consultation or walk in.',
      canonical: '/store-location',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Store Location', path: '/store-location' },
        ]),
      ],
    });
  }
}



