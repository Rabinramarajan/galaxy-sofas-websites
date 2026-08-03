import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { INTERIOR_GUIDES } from '../../core/data/content.data';
import { InteriorGuide } from '../../core/models/furniture.model';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppImage } from '../../shared/components/app-image/app-image';
import { AppBadge } from '../../shared/components/app-badge/app-badge';
import { SectionHeader } from '../../shared/components/section-header/section-header';


@Component({
  selector: 'app-interior-page',
  imports: [AppBadge, AppButton, AppIcon, AppImage, PageHero, RouterLink, SectionHeader],
  template: `
    <app-page-hero
      title="Interior Inspiration"
      subtitle="Room-by-room style guides handpicked by our design team."
      [showBreadcrumb]="true"
      breadcrumbLabel="Interior Inspiration"
    />

    <section class="section-shell py-12 lg:py-24">
      <app-section-header
        tagline="Style Guides"
        title="Design Each Room with Confidence"
        description="From living rooms that host beautifully to bedrooms that truly reset you — we have guides for every space."
      />

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        @for (guide of guides(); track guide.id) {
          <a
            [routerLink]="['/interior-inspiration', guide.slug]"
            class="group relative block overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
          >
            <app-img [src]="guide.image" [alt]="guide.room" class="block aspect-[4/3] w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
            <div class="absolute inset-x-0 bottom-0 p-6 text-white">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                <app-icon name="home" class="h-3 w-3" />
                {{ guide.room }}
              </span>
              <h3 class="mt-3 font-display text-xl font-semibold text-white transition-transform group-hover:-translate-y-1">{{ guide.title }}</h3>
              <p class="mt-2 text-sm text-white/75">{{ guide.description }}</p>
              <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light opacity-0 transition-opacity group-hover:opacity-100">
                Explore Guide
                <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        }
      </div>
    </section>

    @if (selectedGuide(); as guide) {
      <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
        <div class="mx-auto max-w-4xl">
          <app-badge variant="outline" class="mb-4">
            {{ guide.style }}
          </app-badge>
          <h2 class="font-display text-3xl font-semibold text-primary dark:text-white sm:text-4xl">{{ guide.title }}</h2>
          <p class="mt-4 text-lg text-muted">{{ guide.description }}</p>
          <div class="mt-8 flex flex-wrap items-center gap-2">
            @for (tag of guide.tags; track tag) {
              <span class="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-muted dark:bg-dark-soft">
                <app-icon name="scissors" class="h-3 w-3" />
                {{ tag }}
              </span>
            }
          </div>
          <div class="mt-10">
            <app-button label="Shop This Style" variant="gold" icon="cart" />
          </div>
        </div>
      </section>
    }
  `,
})
export class InteriorPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #route = inject(ActivatedRoute);

  protected readonly guides = signal<InteriorGuide[]>(INTERIOR_GUIDES);
  protected readonly selectedGuide = signal<InteriorGuide | null>(null);

  readonly guideBySlug = computed(() => {
    const slug = this.#route.snapshot.paramMap.get('slug');
    if (!slug) return null;
    return this.guides().find((g) => g.slug === slug) ?? null;
  });

  ngOnInit(): void {
    const guide = this.guideBySlug();
    if (guide) {
      this.selectedGuide.set(guide);
    }

    this.#seo.set({
      title: 'Interior Inspiration — Room-by-Room Style Guides | Galaxy Sofas',
      description: 'Steal these room-by-room design strategies from our interior studio. Living rooms, bedrooms, dining rooms & home offices.',
      canonical: '/interior-inspiration',
      ogType: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Galaxy Sofas Interior Inspiration',
          hasPart: INTERIOR_GUIDES.map((g) => ({
            '@type': 'CreativeWork',
            name: g.title,
            description: g.description,
            url: `${'https://www.galaxysofas.com'}/interior-inspiration/${g.slug}`,
          })),
        },
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Interior Inspiration', path: '/interior-inspiration' },
        ]),
      ],
    });
  }
}



