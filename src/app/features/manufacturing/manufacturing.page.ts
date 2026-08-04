import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppImage } from '../../shared/components/app-image/app-image';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { VideoBanner } from '../../shared/components/video-banner/video-banner';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

interface ManufacturingStep {
  index: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  image: string;
  details: { label: string; icon: string }[];
}

@Component({
  selector: 'app-manufacturing-page',
  imports: [AppIcon, AppImage, PageHero, RevealDirective, SectionHeader, TiltDirective, VideoBanner],
  template: `
    <app-page-hero
      title="Manufacturing Process"
      subtitle="From sustainable forest to your living room — 8 meticulous steps, 14 days of pure craftsmanship, zero compromises."
      [showBreadcrumb]="true"
      breadcrumbLabel="Manufacturing Process"
    />

    <!-- Timeline Steps -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="The 8-Step Journey"
        title="Every Piece Has a Story"
        description="Hover each step to explore the details. This is furniture making at its most transparent."
      />

      <div class="mt-12 relative">
        <!-- Vertical connector line -->
        <div class="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary to-transparent"></div>
        <div class="space-y-16">
          @for (step of steps(); track step.index; let i = $index) {
            <div class="relative lg:pl-24">
              <!-- Step marker -->
              <div class="absolute left-8 top-0 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gold-gradient text-white font-bold text-xl z-10">
                {{ step.index }}
              </div>

              <div
                appReveal
                effect="fade-right"
                [delay]="i * 100"
                appTilt
                class="relative p-6 md:p-8 bg-white rounded-2xl shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:shadow-lift dark:bg-dark-card dark:ring-white/5"
              >
                <div class="grid gap-6 lg:grid-cols-12">
                  <!-- Image -->
                  <div class="lg:col-span-5">
                    <div class="relative aspect-[4/3] overflow-hidden rounded-xl">
            <app-img
              [src]="step.image"
              [alt]="'Step ' + step.index + ': ' + step.title"
              class="h-full w-full object-cover"
            />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="lg:col-span-7 flex flex-col justify-center">
                    <div class="flex items-center gap-3">
                      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <app-icon [name]="step.icon" class="h-5 w-5" />
                      </span>
                      <div>
                        <h3 class="font-display text-xl font-semibold text-primary dark:text-white">{{ step.title }}</h3>
                        <p class="text-sm text-muted">{{ step.duration }}</p>
                      </div>
                    </div>

                    <p class="mt-4 text-base leading-relaxed text-muted">{{ step.description }}</p>

                    <div class="mt-4 flex flex-wrap gap-2">
                      @for (detail of step.details; track detail) {
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                          <app-icon [name]="detail.icon" class="h-3 w-3" />
                          {{ detail.label }}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Quality Gate -->
    <section class="section-shell py-12 lg:py-16 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="The Galaxy Seal"
        title="27-Point Final Inspection"
        description="Before any piece leaves our workshop, it passes through our most rigorous gate. Only then does it earn the Galaxy brass badge."
      />

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        @for (check of qualityChecks(); track check.label) {
          <div class="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-dark/50">
            <div class="flex-shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <app-icon [name]="check.icon" class="h-5 w-5" />
            </div>
            <div>
              <h4 class="font-semibold text-primary dark:text-white">{{ check.label }}</h4>
              <p class="text-sm text-muted">{{ check.description }}</p>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Workshop Video/CTA -->
    <section class="section-shell py-12 lg:py-16">
      <div class="flex flex-col items-center text-center mb-8">
        <span class="eyebrow text-secondary">Virtual Tour</span>
        <h3 class="mt-2 font-display text-3xl font-semibold sm:text-4xl">Step Inside Our Workshop</h3>
        <p class="mt-2 max-w-2xl text-muted">Experience the smell of sandalwood, the rhythm of hand-tools, and the precision of 340 master artisans.</p>
      </div>
      <app-video-banner
        [videoSrc]="'/galaxysofas/video/_Furniture_Craftsmanshi.mp4'"
        [poster]="'/galaxysofas/image/Luxury-Sofa/Flagship-studio-hero.png'"
        [alt]="'Workshop craftsmanship tour'"
        [aspectRatio]="'16/9'"
      />
    </section>

    <!-- Sustainability -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="Responsible Making"
        title="Sustainability at Every Step"
      />

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        @for (pillar of pillars(); track pillar.title) {
          <div class="text-center p-6">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <app-icon [name]="pillar.icon" class="h-8 w-8" />
            </div>
            <h4 class="mt-5 font-display text-lg font-semibold text-primary dark:text-white">{{ pillar.title }}</h4>
            <p class="mt-2 text-sm text-muted">{{ pillar.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class ManufacturingPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly steps = signal<ManufacturingStep[]>([
    {
      index: '1',
      title: 'Timber Selection',
      description: 'Our buyers travel to FSC-certified forests across India and Myanmar, hand-selecting each log for grain consistency, density, and structural integrity. Only 15% of inspected timber makes the cut.',
      duration: '2 days',
      icon: 'tree',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: 'FSC Certified', icon: 'leaf' },
        { label: 'Moisture 8-10%', icon: 'droplet' },
        { label: 'Grade A Only', icon: 'award' },
      ],
    },
    {
      index: '2',
      title: 'Kiln Drying',
      description: 'Logs enter our computer-controlled kilns for a 21-day cycle. Temperature and humidity are ramped precisely to bring moisture to 8–10% — the sweet spot where wood stabilises forever without warping.',
      duration: '21 days',
      icon: 'sun',
      image: 'https://images.unsplash.com/photo-1504198458767-4d2aa15a8ff5?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: '21-Day Cycle', icon: 'calendar' },
        { label: 'Computer Controlled', icon: 'cpu' },
        { label: 'Zero Warp Guarantee', icon: 'shield' },
      ],
    },
    {
      index: '3',
      title: 'Precision Joinery',
      description: 'Master joiners cut mortise-tenon, dovetail, and finger joints by hand — techniques unchanged for centuries. Zero nails, zero staples, zero brackets. The joint IS the structure.',
      duration: '3 days',
      icon: 'hammer',
      image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: 'Mortise-Tenon', icon: 'box' },
        { label: 'Dovetail', icon: 'scissors' },
        { label: 'Hand-Cut', icon: 'hand' },
      ],
    },
    {
      index: '4',
      title: 'Frame Assembly',
      description: 'Frames are glued with marine-grade adhesive and cured under 2-tonne hydraulic pressure. Every angle is squared to 0.5mm tolerance — verified by digital calipers at 12 checkpoints.',
      duration: '2 days',
      icon: 'square',
      image: 'https://images.unsplash.com/photo-1504198458767-4d2aa15a8ff5?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: 'Hydraulic Press', icon: 'gauge' },
        { label: '0.5mm Tolerance', icon: 'ruler' },
        { label: '12 Checkpoints', icon: 'check-circle' },
      ],
    },
    {
      index: '5',
      title: 'Suspension System',
      description: 'Eight-way hand-tied coil springs or premium sinuous no-sag — chosen per design. Each spring is knotted by hand and tested to 100,000 compression cycles before upholstery begins.',
      duration: '2 days',
      icon: 'grid',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: '8-Way Hand-Tied', icon: 'link' },
        { label: '100K Cycle Test', icon: 'repeat' },
        { label: 'No-Sag Option', icon: 'minus' },
      ],
    },
    {
      index: '6',
      title: 'Cushion Engineering',
      description: 'Multi-density HR foam cores (35D seat, 28D back) wrapped in feather-blend envelopes with down-proof ticking. Each cushion is weighed to ±50g consistency across the set.',
      duration: '2 days',
      icon: 'box',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: 'Multi-Density HR', icon: 'layers' },
        { label: 'Feather-Blend Wrap', icon: 'feather' },
        { label: '±50g Consistency', icon: 'scale' },
      ],
    },
    {
      index: '7',
      title: 'Upholstery',
      description: 'Fabric is pattern-matched at seams, hand-stitched with polyester-core thread, and tension-tested to 200N. Removable covers feature YKK concealed zippers and double-stitched stress points.',
      duration: '2 days',
      icon: 'scissors',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: 'Pattern Matched', icon: 'align-center' },
        { label: 'YKK Zippers', icon: 'unlock' },
        { label: '200N Tension', icon: 'gauge' },
      ],
    },
    {
      index: '8',
      title: 'Final Inspection',
      description: 'Our 27-point quality gate: frame squareness, joint integrity, spring tension, cushion recovery, fabric alignment, zipper function, leg stability, finish uniformity, and the Galaxy brass badge application.',
      duration: '1 day',
      icon: 'check-circle',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      details: [
        { label: '27-Point Gate', icon: 'clipboard' },
        { label: 'Brass Badge', icon: 'award' },
        { label: 'Signed by Artisan', icon: 'pen' },
      ],
    },
  ]);

  protected readonly qualityChecks = signal([
    { icon: 'square', label: 'Frame Squareness', description: 'All corners 90° ±0.5°' },
    { icon: 'link', label: 'Joint Integrity', description: 'Zero glue-line gaps' },
    { icon: 'repeat', label: 'Spring Tension', description: 'Uniform ±5% across seat' },
    { icon: 'box', label: 'Cushion Recovery', description: '95% rebound in 3 seconds' },
    { icon: 'align-center', label: 'Fabric Alignment', description: 'Pattern matched at all seams' },
    { icon: 'unlock', label: 'Zipper Function', description: 'Smooth, concealed, locking' },
    { icon: 'ruler', label: 'Leg Stability', description: 'No wobble on uneven floor' },
    { icon: 'brush', label: 'Finish Uniformity', description: 'Consistent sheen & colour' },
    { icon: 'award', label: 'Brass Badge', description: 'Applied by lead artisan' },
    { icon: 'pen', label: 'Artisan Signature', description: 'Hand-signed certificate' },
    { icon: 'shield', label: 'Warranty Card', description: '7-year registration' },
    { icon: 'truck2', label: 'Packaging', description: 'Zero-plastic, reusable' },
  ]);

  protected readonly pillars = signal([
    { icon: 'tree', title: 'FSC-Certified Timber', description: 'Every log traceable to responsibly managed forests. Zero illegal logging.' },
    { icon: 'droplet', title: 'Water-Based Finishes', description: 'Zero VOC emissions. Safe for your family and our artisans.' },
    { icon: 'recycle', title: 'Zero-Waste Workshop', description: 'Offcuts become toys, sawdust fuels kilns, packaging is reusable.' },
  ]);

  ngOnInit(): void {
    this.#seo.set({
      title: 'Manufacturing Process — 8 Steps of Craft | Galaxy Sofas',
      description: 'Watch our 14-day, 8-step manufacturing journey. FSC timber, 21-day kiln drying, hand-cut joinery, 8-way springs, 27-point inspection. Total transparency.',
      canonical: '/manufacturing-process',
      ogType: 'website',
      jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Manufacturing Process', path: '/manufacturing-process' }])],
    });
  }
}


