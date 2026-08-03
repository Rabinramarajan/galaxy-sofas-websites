import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { Feature, ProcessStep } from '../../core/models/furniture.model';
import { AppCounter } from '../../shared/components/app-counter/app-counter';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppImage } from '../../shared/components/app-image/app-image';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppButton } from '../../shared/components/app-button/app-button';



@Component({
  selector: 'app-why-galaxy-page',
  imports: [AppButton, AppCounter, AppIcon, AppImage, PageHero, SectionHeader],
  template: `
    <app-page-hero
      title="Why Galaxy Sofas"
      subtitle="Every piece carries a promise: 100% solid wood, master craftsmanship, and a warranty that lasts generations."
      [showBreadcrumb]="true"
      breadcrumbLabel="Why Galaxy Sofas"
    />

    <!-- Stats Strip -->
    <section class="border-y border-primary/10 dark:border-white/10 bg-surface/50 dark:bg-dark-card/50">
      <div class="section-shell py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (stat of stats(); track stat.label) {
          <div class="text-center">
            <app-counter [target]="stat.value" [suffix]="stat.suffix" [duration]="2000" class="font-display text-4xl font-bold text-primary dark:text-white lg:text-5xl" />
            <p class="mt-2 text-sm text-muted">{{ stat.label }}</p>
          </div>
        }
      </div>
    </section>

    <!-- Core Features -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="The Galaxy Difference"
        title="Seven Pillars of Uncompromising Quality"
        description="These aren't features — they're non-negotiable standards that define every piece leaving our workshop."
      />

      <div class="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        @for (feature of features(); track feature.title) {
          <article class="group relative p-6 bg-white rounded-2xl shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:shadow-lift hover:-translate-y-1 dark:bg-dark-card dark:ring-white/5">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:bg-secondary group-hover:text-white">
              <app-icon [name]="feature.icon" class="h-7 w-7" />
            </div>
            <h4 class="font-display text-lg font-semibold text-primary dark:text-white">{{ feature.title }}</h4>
            <p class="mt-2 text-sm text-muted">{{ feature.description }}</p>
          </article>
        }
      </div>
    </section>

    <!-- Manufacturing Preview -->
    <section class="section-shell py-12 lg:py-16 bg-gradient-to-b from-surface to-white dark:from-dark-card dark:to-dark">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <app-section-header
            align="left"
            tagline="See It to Believe It"
            title="Manufacturing Transparency"
            description="We invite you to witness our 8-step process — from timber selection to final polish. Book a factory visit or explore virtually."
          />

          <div class="mt-8 space-y-6">
            @for (step of processSteps(); track step.index) {
              <div class="flex gap-4">
                <span class="flex-shrink-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-white font-bold text-lg">{{ step.index }}</span>
                <div>
                  <h4 class="font-display font-semibold text-primary dark:text-white">{{ step.title }}</h4>
                  <p class="mt-1 text-sm text-muted">{{ step.description }}</p>
                  <span class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-secondary">{{ step.duration }} • <app-icon name="clock" class="h-3 w-3" /></span>
                </div>
              </div>
            }
          </div>

          <div class="mt-8">
            <app-button variant="gold" label="Visit Our Workshop" icon="mapPin" size="lg" href="/manufacturing-process" />
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
            <app-img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
              alt="Galaxy Sofas manufacturing workshop with craftsmen at work"
              class="h-full w-full object-cover"
              priority="high"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div class="absolute bottom-6 left-6 right-6 text-center text-white">
                <p class="text-sm font-medium uppercase tracking-wider">8 Steps • 14 Days • 1 Masterpiece</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="Compare & Decide"
        title="Galaxy vs The Rest"
        description="We don't cut corners. Here's how we stack up against typical mass-market furniture."
      />

      <div class="mt-10 overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-primary/10 dark:border-white/10">
              <th class="pb-3 font-display font-semibold text-primary dark:text-white">Standard</th>
              <th class="pb-3 font-display font-semibold text-primary dark:text-white">Typical Brand</th>
              <th class="pb-3 font-display font-semibold text-secondary">Galaxy Sofas</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-primary/5 dark:divide-white/5">
            @for (comp of comparisons(); track comp.label) {
              <tr class="py-4">
                <td class="font-medium text-primary dark:text-white">{{ comp.label }}</td>
                <td class="text-muted">{{ comp.typical }}</td>
                <td class="font-semibold text-secondary">{{ comp.galaxy }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-shell py-12 lg:py-16 bg-primary dark:bg-dark text-white">
      <div class="mx-auto max-w-3xl text-center">
        <span class="eyebrow text-secondary">Ready to Experience the Difference?</span>
        <h3 class="mt-4 font-display text-3xl font-semibold sm:text-4xl">Visit a Showroom Near You</h3>
        <p class="mt-4 text-lg text-white/70">Feel the fabrics, test the comfort, and see the craftsmanship up close. Book a personal consultation with our design experts.</p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <app-button variant="gold" label="Book Consultation" icon="calendar" size="lg" href="/contact" />
          <app-button variant="outline" label="Find a Store" icon="mapPin" size="lg" href="/store-location" />
        </div>
      </div>
    </section>
  `,
})
export class WhyGalaxyPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly stats = signal([
    { label: 'Years of Legacy', value: 28, suffix: '+' },
    { label: 'Happy Homes', value: 1200000, suffix: '+' },
    { label: 'Showrooms', value: 18, suffix: '' },
    { label: 'Master Artisans', value: 340, suffix: '+' },
  ]);

  protected readonly features = signal<Feature[]>([
    { icon: 'tree', title: '100% Solid Wood', description: 'Zero particle board, zero MDF cores. Only kiln-dried sheesham, teak and oak.' },
    { icon: 'award', title: '7-Year Warranty', description: 'Frame and joinery guaranteed for 7 years — we stand by our craft.' },
    { icon: 'user-check', title: 'Master Artisans', description: '340+ craftsmen with 15+ years average experience hand-shape every piece.' },
    { icon: 'leaf', title: 'Eco-Conscious', description: 'FSC-certified timber, water-based finishes, zero-waste workshop policy.' },
    { icon: 'truck2', title: 'White-Glove Delivery', description: 'Delivered, assembled and placed in your room of choice — packaging removed.' },
    { icon: 'shield', title: '15-Day Returns', description: 'Not perfect? We\'ll pick it up. No questions, no restocking fees.' },
    { icon: 'wrench', title: 'Lifetime Support', description: 'Re-upholstery, cushion refills, polish touch-ups — we\'re here for decades.' },
    { icon: 'sparkles', title: 'Custom Atelier', description: 'Any dimension, any fabric, any finish. If you can dream it, we can build it.' },
  ]);

  protected readonly processSteps = signal<ProcessStep[]>([
    { index: '1', title: 'Timber Selection', description: 'Hand-picked FSC-certified logs, moisture-tested to 8–10%.', duration: '2 days', icon: 'tree' },
    { index: '2', title: 'Kiln Drying', description: 'Controlled 21-day kiln cycle prevents warping for a lifetime.', duration: '21 days', icon: 'sun' },
    { index: '3', title: 'Precision Joinery', description: 'Mortise-tenon, dovetail & finger joints — zero nails, zero staples.', duration: '3 days', icon: 'hammer' },
    { index: '4', title: 'Frame Assembly', description: 'Glue-cured under pressure, squared to 0.5mm tolerance.', duration: '2 days', icon: 'square' },
    { index: '5', title: 'Suspension System', description: '8-way hand-tied springs or sinuous no-sag — tested to 100k cycles.', duration: '2 days', icon: 'grid' },
    { index: '6', title: 'Cushion Engineering', description: 'Multi-density HR foam cores wrapped in feather-blend envelopes.', duration: '2 days', icon: 'box' },
    { index: '7', title: 'Upholstery', description: 'Pattern-matched, hand-stitched, tension-tested covers.', duration: '2 days', icon: 'scissors' },
    { index: '8', title: 'Final Inspection', description: '27-point quality gate before the Galaxy seal is applied.', duration: '1 day', icon: 'check-circle' },
  ]);

  protected readonly comparisons = signal([
    { label: 'Frame Material', typical: 'Particle board / MDF / Pine', galaxy: '100% Kiln-dried Sheesham / Teak / Oak' },
    { label: 'Joinery', typical: 'Staples, nails, glue only', galaxy: 'Mortise-tenon, dovetail, finger joints' },
    { label: 'Warranty', typical: '1 year limited', galaxy: '7 years frame + joinery' },
    { label: 'Delivery', typical: 'Curbside drop-off', galaxy: 'In-room assembly & placement' },
    { label: 'Returns', typical: 'Restocking fees, 7 days', galaxy: 'Free pickup, 15 days, no fees' },
    { label: 'Sustainability', typical: 'Virgin materials, high VOC', galaxy: 'FSC wood, water-based finishes' },
    { label: 'Customisation', typical: 'Fixed catalog only', galaxy: 'Full bespoke atelier' },
    { label: 'After-Sales', typical: 'None', galaxy: 'Lifetime re-upholstery & care' },
  ]);

  ngOnInit(): void {
    this.#seo.set({
      title: 'Why Galaxy Sofas — Quality, Warranty & Craftsmanship',
      description: 'Discover why 1.2M+ homes choose Galaxy: 100% solid wood, 7-year warranty, master artisans, white-glove delivery, and lifetime support.',
      canonical: '/why-galaxy-sofas',
      ogType: 'website',
      jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Why Galaxy Sofas', path: '/why-galaxy-sofas' }])],
    });
  }
}


