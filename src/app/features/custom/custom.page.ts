import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { AppButton } from '../../shared/components/app-button/app-button';
import { BeforeAfter } from '../../shared/components/before-after/before-after';



interface CustomOption {
  category: string;
  options: { label: string; value: string; image?: string }[];
}

interface CustomProject {
  room: string;
  style: string;
  description: string;
  before: string;
  after: string;
  image: string;
}

@Component({
  selector: 'app-custom-page',
  imports: [AppButton, AppIcon, BeforeAfter, PageHero, SectionHeader],
  template: `
    <app-page-hero
      title="Custom Furniture"
      subtitle="Your space, your dimensions, your story. Our atelier transforms your vision into heirloom pieces — from sketch to installation."
      [showBreadcrumb]="true"
      breadcrumbLabel="Custom Furniture"
    />

    <!-- Process Steps -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="The Atelier Process"
        title="From Concept to Completion in 6 Weeks"
        description="A dedicated design consultant guides you through every decision. You approve, we build."
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        @for (phase of phases(); track phase.index; let i = $index) {
          <div class="relative">
            <div class="absolute left-1/2 top-0 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-white font-bold text-xl lg:left-1/2 lg:top-0 lg:-translate-x-1/2" [style.z-index]="3 - i">
              {{ phase.index }}
            </div>
            <div class="relative pt-16 text-center lg:text-left">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary lg:mx-0">
                <app-icon [name]="phase.icon" class="h-8 w-8" />
              </div>
              <h3 class="mt-5 font-display text-lg font-semibold text-primary dark:text-white">{{ phase.title }}</h3>
              <p class="mt-2 text-sm text-muted">{{ phase.description }}</p>
              <ul class="mt-4 space-y-2 text-sm text-muted">
                @for (detail of phase.details; track detail) {
                  <li class="flex items-center gap-2">
                    <app-icon name="check" class="h-4 w-4 text-secondary" />
                    {{ detail }}
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </div>

      <!-- Connector line -->
      <div class="hidden lg:block absolute left-1/2 top-[82px] bottom-[82px] w-0.5 -translate-x-1/2 bg-gradient-to-b from-secondary to-transparent" style="z-index: 0;"></div>
    </section>

    <!-- Customization Options -->
    <section class="section-shell py-12 lg:py-16 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="Infinite Possibilities"
        title="Every Detail, Your Choice"
        description="Mix and match from thousands of combinations. If you don't see it, ask — we've probably done it before."
      />

      <div class="mt-10 space-y-12">
        @for (option of customOptions(); track option.category) {
          <div>
            <h4 class="font-display text-lg font-semibold text-primary dark:text-white mb-6">{{ option.category }}</h4>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              @for (opt of option.options; track opt.value) {
                <button
                  type="button"
                  class="group relative p-4 rounded-xl bg-white border border-primary/10 transition-all duration-300 hover:border-secondary hover:shadow-soft dark:bg-dark-card dark:border-white/10"
                  (click)="selectOption(option.category, opt.value)"
                >
                  @if (opt.image) {
                    <div class="relative aspect-square overflow-hidden rounded-lg mb-3">
                      <img [src]="opt.image" [alt]="opt.label" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  }
                  <span class="font-medium text-primary dark:text-white">{{ opt.label }}</span>
                  @if (isSelected(option.category, opt.value)) {
                    <span class="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white">
                      <app-icon name="check" class="h-3 w-3" />
                    </span>
                  }
                </button>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Before/After Showcase -->
    <section class="section-shell py-12 lg:py-16">
      <app-section-header
        tagline="Real Transformations"
        title="Custom Projects Delivered"
        description="Drag to reveal the before/after. Each project started as a conversation."
      />

      <div class="mt-10 grid gap-8 lg:grid-cols-2">
        @for (project of projects(); track project.room) {
          <div>
            <h4 class="font-display text-lg font-semibold text-primary dark:text-white">{{ project.room }}</h4>
            <p class="mt-1 text-sm text-muted">{{ project.style }} • {{ project.description }}</p>
            <app-before-after
              [beforeSrc]="project.before"
              [afterSrc]="project.after"
              [beforeAlt]="project.room + ' before custom'"
              [afterAlt]="project.room + ' after custom'"
              class="mt-6"
            />
          </div>
        }
      </div>
    </section>

    <!-- What We've Made -->
    <section class="section-shell py-12 lg:py-16 bg-gradient-to-b from-surface to-white dark:from-dark-card dark:to-dark">
      <app-section-header
        tagline="Beyond the Catalog"
        title="If You Can Dream It..."
        description="From curved banquettes to rotating TV walls, hidden bars to pet-friendly fabrics — we've built it all."
      />

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (idea of ideas(); track idea.title) {
          <div class="text-center p-6 rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 dark:bg-dark-card dark:ring-white/5">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <app-icon [name]="idea.icon" class="h-7 w-7" />
            </div>
            <h4 class="mt-4 font-semibold text-primary dark:text-white">{{ idea.title }}</h4>
            <p class="mt-2 text-sm text-muted">{{ idea.description }}</p>
          </div>
        }
      </div>
    </section>

    <!-- CTA -->
    <section class="section-shell py-12 lg:py-16 bg-primary dark:bg-dark text-white">
      <div class="mx-auto max-w-3xl text-center">
        <span class="eyebrow text-secondary">Start Your Custom Journey</span>
        <h3 class="mt-4 font-display text-3xl font-semibold sm:text-4xl">Book a Free Design Consultation</h3>
        <p class="mt-4 text-lg text-white/70">Our design consultants visit your space, measure, listen, and present concepts — all at no obligation.</p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <app-button variant="gold" label="Book Consultation" icon="calendar" size="xl" href="/contact" />
          <app-button variant="outline" label="Call Us" icon="phone" size="xl" href="tel:+9118001234567" />
        </div>
      </div>
    </section>
  `,
})
export class CustomPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly selectedOptions = signal<Record<string, string>>({});

  protected readonly phases = signal([
    {
      index: '1',
      title: 'Discover',
      icon: 'message-square',
      description: 'Free home consultation or virtual meet. We measure, photograph, and understand your life.',
      details: ['Space measurement & photos', 'Lifestyle questionnaire', 'Style moodboard creation', 'Budget alignment'],
    },
    {
      index: '2',
      title: 'Design',
      icon: 'pen-tool',
      description: 'Our studio presents 3D renders, material boards, and a detailed specification for your approval.',
      details: ['Photorealistic 3D renders', 'Material & finish samples', 'Technical drawings', 'Revisions until perfect'],
    },
    {
      index: '3',
      title: 'Craft',
      icon: 'hammer',
      description: 'Master artisans hand-build your piece in our workshop. You receive weekly progress photos.',
      details: ['Weekly photo updates', 'Timber selection approval', 'Upholstery fitting check', 'Quality gate sign-off'],
    },
    {
      index: '4',
      title: 'Install',
      icon: 'truck2',
      description: 'White-glove delivery, in-room assembly, placement, and packaging removal. We leave only beauty.',
      details: ['In-room assembly', 'Exact placement', 'Packaging removed', 'Care guide & warranty'],
    },
  ]);

  protected readonly customOptions = signal<CustomOption[]>([
    {
      category: 'Wood & Finish',
      options: [
        { label: 'Sheesham Natural', value: 'sheesham-natural', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80' },
        { label: 'Sheesham Walnut', value: 'sheesham-walnut', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
        { label: 'Teak Golden', value: 'teak-golden', image: 'https://images.unsplash.com/photo-1504198458767-4d2aa15a8ff5?auto=format&fit=crop&w=400&q=80' },
        { label: 'Oak Light', value: 'oak-light', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80' },
        { label: 'Mango Distressed', value: 'mango-distressed', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
        { label: 'Custom Stain Match', value: 'custom-stain', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
      ],
    },
    {
      category: 'Upholstery',
      options: [
        { label: 'Premium Velvet', value: 'velvet', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
        { label: 'Performance Bouclé', value: 'boucle', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=400&q=80' },
        { label: 'Leather Touch', value: 'leather-touch', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80' },
        { label: 'Linen Blend', value: 'linen', image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80' },
        { label: 'Pet-Friendly Crypto', value: 'crypto', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
        { label: 'Your Own Fabric (COM)', value: 'com', image: 'https://images.unsplash.com/photo-1504198458767-4d2aa15a8ff5?auto=format&fit=crop&w=400&q=80' },
      ],
    },
    {
      category: 'Dimensions',
      options: [
        { label: 'Exact mm Precision', value: 'exact-mm' },
        { label: 'Non-Standard Heights', value: 'custom-height' },
        { label: 'Corner/Curved Shapes', value: 'curved' },
        { label: 'Split for Access', value: 'split' },
        { label: 'Modular Expansion', value: 'modular' },
        { label: 'Built-in Storage', value: 'storage' },
      ],
    },
    {
      category: 'Details',
      options: [
        { label: 'Brass/Bronze Legs', value: 'metal-legs' },
        { label: 'Hand-Carved Motifs', value: 'carved' },
        { label: 'Contrast Piping', value: 'piping' },
        { label: 'Tufting Patterns', value: 'tufting' },
        { label: 'USB/Wireless Charging', value: 'charging' },
        { label: 'Hidden Compartments', value: 'hidden' },
      ],
    },
  ]);

  protected readonly projects = signal<CustomProject[]>([
    {
      room: 'Master Bedroom',
      style: 'Heritage Modern',
      description: 'King bed with integrated nightstands, hidden safe, and reading lights',
      before: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      image: '',
    },
    {
      room: 'Living Room',
      style: 'Urban Nordic',
      description: 'Curved 4m sectional wrapping a column, with motorised chaise',
      before: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      image: '',
    },
  ]);

  protected readonly ideas = signal([
    { icon: 'tv', title: 'Rotating TV Wall', description: 'Swivels 360° between living & dining' },
    { icon: 'wine', title: 'Hidden Bar Cabinet', description: 'Push-to-open, climate-controlled' },
    { icon: 'paw-print', title: 'Pet-Friendly Suite', description: 'Scratch-proof fabrics, hidden beds' },
    { icon: 'music', title: 'Acoustic Panel Wall', description: 'Beautiful sound absorption built-in' },
    { icon: 'laptop', title: 'Fold-Down Desk', description: 'Disappears into panelling when done' },
    { icon: 'baby', title: 'Grow-With-Me Nursery', description: 'Converts crib → toddler → teen' },
    { icon: 'dumbbell', title: 'Gym Equipment Storage', description: 'Weights rack disguised as sideboard' },
    { icon: 'star', title: 'Anything You Imagine', description: 'Our atelier loves a challenge' },
  ]);

  isSelected(category: string, value: string): boolean {
    return this.selectedOptions()[category] === value;
  }

  selectOption(category: string, value: string): void {
    this.selectedOptions.update(o => ({ ...o, [category]: value }));
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'Custom Furniture — Designed Around Your Life | Galaxy Sofas',
      description: 'Design bespoke furniture with Galaxy Atelier. Custom dimensions, fabrics, finishes & details. Free home consultation. 6-week delivery. 7-year warranty.',
      canonical: '/custom-furniture',
      ogType: 'website',
      jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Custom Furniture', path: '/custom-furniture' }])],
    });
  }
}


