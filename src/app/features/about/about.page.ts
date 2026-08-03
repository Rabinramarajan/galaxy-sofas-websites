import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { aboutSchema, breadcrumbSchema } from '../../core/seo/schema';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppTimeline } from '../../shared/components/app-timeline/app-timeline';
import { Feature } from '../../core/models/furniture.model';

const FEATURES: Feature[] = [
  { icon: 'shield', title: '7-Year Frame Warranty', description: 'Every piece carries a 7-year structural warranty on frames and joinery.' },
  { icon: 'gem', title: '100% Solid Wood', description: 'No particle board, no MDF — only sustainably sourced solid hardwood.' },
  { icon: 'award', title: '450 Master Artisans', description: 'Each sofa is handcrafted by artisans with 15+ years of experience.' },
  { icon: 'truck2', title: 'White-Glove Delivery', description: 'We deliver, assemble, and place — you just enjoy.' },
  { icon: 'leaf', title: 'Eco-Conscious', description: 'FSC-certified wood, water-based finishes, zero-waste packaging.' },
  { icon: 'heart', title: 'Loved by 1.2M+ Homes', description: 'Trusted across 28 showrooms and 15,000+ pincodes in India.' },
];

const TIMELINE = [
  { year: '2012', title: 'Founded', description: 'Started with a 2,000 sq.ft workshop and 5 artisans in Bengaluru.' },
  { year: '2015', title: 'First Showroom', description: 'Opened flagship store on MG Road — 12,000 sq.ft of inspiration.' },
  { year: '2018', title: '100K Homes', description: 'Crossed 100,000 delighted customers; launched recliner line.' },
  { year: '2020', title: 'Digital Leap', description: 'Launched D2C platform; introduced 3D configurator & AR preview.' },
  { year: '2022', title: '1M Milestone', description: 'Served 1 million homes; expanded to 22 showrooms nationwide.' },
  { year: '2024', title: 'Today', description: '28 showrooms, 450 craftsmen, 15 collections — and counting.' },
];

@Component({
  selector: 'app-about-page',
  imports: [AppButton, AppIcon, AppTimeline, PageHero, SectionHeader],
  template: `
    <app-page-hero
      title="Our Story"
      subtitle="Since 2012, we've been crafting furniture that becomes part of your family's story."
      [showBreadcrumb]="true"
      breadcrumbLabel="About"
    />

    <section class="section-shell py-16 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <app-section-header
            tagline="Our Journey"
            title="Crafting Legacy Since 2012"
            description="What began as a small workshop in Bengaluru has grown into India's most trusted luxury furniture brand. Every piece still carries the same obsession with detail that defined our first sofa."
          />
          <div class="mt-8 space-y-6 text-muted leading-relaxed">
            <p>We believe furniture isn't just functional — it's the silent witness to your life's best moments. The sofa where your child takes their first steps. The dining table where generations gather. The bed where dreams are born.</p>
            <p>That's why we control every step — from sustainably harvesting teak and sheesham in our own managed forests, to the final hand-rubbed finish applied by artisans who sign their work.</p>
            <p>No middlemen. No mass production. No compromise.</p>
          </div>
          <app-button href="/contact" label="Visit a Showroom" variant="gold" size="lg" icon="map" class="mt-8" />
        </div>

        <div class="lg:col-span-6">
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80"
              alt="Galaxy Sofas workshop with master artisans crafting furniture"
              loading="eager"
              fetchpriority="high"
              class="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-center">
              <div class="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur px-6 py-3">
                <app-icon name="users" class="h-6 w-6 text-secondary" />
                <span class="text-white font-semibold">450+ Master Artisans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="Our Pillars"
        title="What We Stand For"
        description="Six principles that guide every decision, every design, every delivery."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (feature of features(); track feature.title) {
          <article class="group relative overflow-hidden rounded-2xl p-8 bg-white dark:bg-dark transition-all duration-500 hover:shadow-lift hover:-translate-y-1">
            <div class="absolute inset-0 bg-gold-gradient opacity-0 transition-opacity group-hover:opacity-[0.03]">
            </div>
            <span class="relative flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white">
              <app-icon [name]="feature.icon" class="h-7 w-7" />
            </span>
            <h3 class="relative mt-6 font-display text-xl font-semibold text-primary dark:text-white">{{ feature.title }}</h3>
            <p class="relative mt-3 text-muted">{{ feature.description }}</p>
          </article>
        }
      </div>
    </section>

    <!-- Timeline -->
    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Milestones"
        title="Our Timeline"
        description="From a modest workshop to a nationwide legacy — the moments that shaped us."
      />

      <app-timeline [items]="timeline()" class="mt-12" />
    </section>

    <!-- Team / Craftsmanship -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="The Hands Behind"
        title="Meet Our Master Craftsmen"
        description="Every Galaxy piece bears the signature of the artisan who built it."
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        @for (artisan of artisans(); track artisan.name) {
          <article class="group text-center">
            <div class="relative aspect-square overflow-hidden rounded-2xl">
              <img
                [src]="artisan.image"
                [alt]="artisan.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            </div>
            </div>
            <h4 class="mt-5 font-display text-lg font-semibold text-primary dark:text-white">{{ artisan.name }}</h4>
            <p class="text-sm text-muted">{{ artisan.role }}</p>
            <p class="mt-1 text-xs text-secondary font-medium">{{ artisan.experience }}</p>
          </article>
        }
      </div>
    </section>

    <!-- CTA -->
    <section class="section-shell py-16 lg:py-24 text-center">
      <div class="mx-auto max-w-3xl">
        <h2 class="font-display text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
          Experience the Difference
        </h2>
        <p class="mt-4 text-lg text-muted">Visit any of our 28 showrooms or book a virtual consultation.</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <app-button href="/store-location" label="Find a Showroom" variant="gold" size="lg" icon="map" />
          <app-button href="/contact" label="Book Consultation" variant="outline" size="lg" [arrow]="true" />
        </div>
      </div>
    </section>
  `,
})
export class AboutPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly features = signal(FEATURES);
  protected readonly timeline = signal(TIMELINE);

  protected readonly artisans = signal([
    {
      name: 'Rajesh Kumar',
      role: 'Master Upholsterer',
      experience: '22 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Meera Patel',
      role: 'Wood Joinery Specialist',
      experience: '18 years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Arjun Singh',
      role: 'Finish & Polish Master',
      experience: '25 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  ngOnInit(): void {
    this.#seo.set({
      title: 'About Us — The Galaxy Sofas Story',
      description: 'Since 2012, Galaxy Sofas has been crafting luxury furniture from 100% solid wood. 450 master artisans, 28 showrooms, 1.2M+ happy homes. Discover our journey.',
      canonical: '/about',
      ogType: 'website',
      jsonLd: [aboutSchema(), breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }])],
    });
  }
}


