import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { AppImage } from '../../shared/components/app-image/app-image';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

interface LookbookItem {
  id: string;
  title: string;
  room: string;
  style: string;
  description: string;
  image: string;
  alt: string;
  products: string[];
  featured: boolean;
}

@Component({
  selector: 'app-lookbook-page',
  imports: [RouterLink, PageHero, AppImage, AppButton, AppIcon, SectionHeader, RevealDirective, TiltDirective],
  template: `
    <app-page-hero
      title="Lookbook"
      subtitle="Curated room designs — complete looks you can shop instantly."
      [showBreadcrumb]="true"
      breadcrumbLabel="Lookbook"
    />

    <!-- Filter Tabs -->
    <section class="section-shell py-6 lg:py-8">
      <div class="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Filter lookbook by room">
        @for (filter of filters(); track filter.value; let i = $index) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="activeFilter() === filter.value"
            [class]="activeFilter() === filter.value ? 'bg-secondary text-white' : 'bg-white/80 dark:bg-dark-card/80 text-primary dark:text-white'"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-soft backdrop-blur-sm border border-primary/10 dark:border-white/10"
            (click)="activeFilter.set(filter.value)"
          >
            {{ filter.label }}
          </button>
        }
      </div>
    </section>

    <!-- Lookbook Grid -->
    <section class="section-shell pb-12 lg:pb-16">
      <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        @for (item of filteredItems(); track item.id; let i = $index) {
          <article
            appReveal
            effect="fade-up"
            [delay]="(i % 9) * 80"
            appTilt
            class="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-lift hover:-translate-y-1"
          >
            <a [routerLink]="['/lookbook', item.id]" class="block">
              <div class="relative aspect-[4/5] overflow-hidden">
                <app-img
                  [src]="item.image"
                  [alt]="item.alt"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    @if (item.featured) {
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-3">Featured</span>
                    }
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md text-white">
                      <app-icon name="home" class="h-3 w-3" />
                      {{ item.room }}
                    </span>
                  </div>
                  <div class="text-white">
                    <h3 class="font-display text-xl font-semibold sm:text-2xl">{{ item.title }}</h3>
                    <p class="mt-1 text-sm text-white/80">{{ item.style }}</p>
                    <p class="mt-2 text-sm text-white/70 line-clamp-2">{{ item.description }}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      @for (product of item.products.slice(0, 3); track product) {
                        <span class="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm text-white">{{ product }}</span>
                      }
                      @if (item.products.length > 3) {
                        <span class="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm text-white">+{{ item.products.length - 3 }} more</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <!-- Quick Shop Button -->
            <div class="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <app-button
                variant="white"
                size="sm"
                label="Shop This Look"
                icon="cart"
                class="w-full"
                [routerLink]="'/lookbook/' + item.id"
              />
            </div>
          </article>
        }
      </div>

      <!-- Load More -->
      <div class="mt-10 text-center">
        @if (hasMore()) {
          <app-button variant="outline" label="View More Looks" icon="loader" size="lg" (click)="loadMore()" />
        }
      </div>
    </section>

    <!-- Featured Collection Spotlight -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="Collection Spotlight"
        title="The Heritage Collection"
        description="Timeless pieces that tell a story — hand-carved sheesham, rich walnut finishes, and silhouettes that age beautifully."
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <div class="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <app-img
              src="https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80"
              alt="Heritage collection living room"
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
            <div class="absolute bottom-6 left-6 right-6 text-center text-white">
              <span class="inline-flex items-center gap-2 rounded-full bg-secondary/90 px-4 py-1.5 text-sm font-semibold">Classic · Solid Wood</span>
              <h4 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">The Heritage Collection</h4>
              <p class="mt-1 text-white/80">36 pieces — from statement sofas to carved dining sets</p>
              <app-button variant="white" size="sm" label="Explore Collection" icon="arrowRight" class="mt-4" routerLink="/collections/heritage" />
            </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="space-y-6 h-full">
            @for (highlight of collectionHighlights(); track highlight.title) {
              <div class="flex gap-4 p-4 rounded-xl bg-white/50 dark:bg-dark/50 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors">
                <div class="flex-shrink-0 mt-0.5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <app-icon [name]="highlight.icon" class="h-6 w-6" />
                </div>
                <div>
                  <h4 class="font-display font-semibold text-primary dark:text-white">{{ highlight.title }}</h4>
                  <p class="mt-1 text-sm text-muted">{{ highlight.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Style Guide -->
    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Design Guides"
        title="Find Your Style"
        description="Not sure where to start? Browse our curated style guides for every room and aesthetic."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (guide of styleGuides(); track guide.id) {
          <a
            [routerLink]="['/interior-inspiration', guide.slug]"
            class="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-lift hover:-translate-y-1"
          >
            <div class="relative aspect-square overflow-hidden">
              <app-img
                [src]="guide.image"
                [alt]="guide.title"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div class="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h4 class="font-display text-lg font-semibold">{{ guide.title }}</h4>
                <p class="mt-1 text-sm text-white/70">{{ guide.roomCount }} room guides</p>
                <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <app-icon name="arrowRight" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
})
export class LookbookPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly activeFilter = signal('all');
  protected readonly displayedCount = signal(12);

  protected readonly allItems = signal<LookbookItem[]>([
    {
      id: 'l1',
      title: 'Warm Nordic Living',
      room: 'Living Room',
      style: 'Urban Nordic · Minimal',
      description: 'Light oak, soft bouclé, and warm neutrals create a living room that feels like a calm exhale.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      alt: 'Warm Nordic living room with light oak furniture',
      products: ['Solstice 2-Seater', 'Lunar Coffee Table', 'Oakwood Dining Set'],
      featured: true,
    },
    {
      id: 'l2',
      title: 'Velvet Opulence',
      room: 'Living Room',
      style: 'Royal Velvet · Luxury',
      description: 'Deep emerald velvet, brass accents, and layered textures for a room that commands attention.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      alt: 'Luxury velvet sofa in emerald green living room',
      products: ['Aurora 3-Seater', 'Eclipse Accent Chair', 'Lunar Coffee Table'],
      featured: true,
    },
    {
      id: 'l3',
      title: 'Heritage Dining',
      room: 'Dining Room',
      style: 'Heritage · Classic',
      description: 'Hand-carved sheesham dining table with matching chairs — a setting for generations of gatherings.',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      alt: 'Heritage dining room with carved wooden table',
      products: ['Emperor 8-Seater', 'Regalia Wooden Sofa'],
      featured: false,
    },
    {
      id: 'l4',
      title: 'Sanctuary Bedroom',
      room: 'Bedroom',
      style: 'Serene Minimal',
      description: 'A calm retreat with the Serenity bed, soft linens, and warm wood tones for restful nights.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      alt: 'Serene bedroom with king bed and minimal decor',
      products: ['Serenity King Bed', 'Opal Queen Bed', 'Atlas Wardrobe'],
      featured: true,
    },
    {
      id: 'l5',
      title: 'Modern Home Office',
      room: 'Office',
      style: 'Executive Suite · Professional',
      description: 'Command your workspace with the Apex desk, Vega ergonomic chair, and smart storage solutions.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      alt: 'Modern home office with executive desk and chair',
      products: ['Apex Executive Desk', 'Vega Ergonomic Chair'],
      featured: false,
    },
    {
      id: 'l6',
      title: 'Cloud Nine Lounge',
      room: 'Living Room',
      style: 'Cloud Nine · Modular',
      description: 'Deep-seated modular comfort in performance bouclé — configured for movie marathons and lazy Sundays.',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      alt: 'Modular L-shape sofa in cosy living room',
      products: ['Celestial L-Shape', 'Nebula Power Recliner'],
      featured: false,
    },
    {
      id: 'l7',
      title: 'Studio Raw Loft',
      room: 'Living Room',
      style: 'Studio Raw · Artisan',
      description: 'Organic forms, raw textures, and honest materials — furniture that celebrates imperfection.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      alt: 'Organic natural furniture in designer loft',
      products: ['Lunar Coffee Table', 'Custom Pieces'],
      featured: false,
    },
    {
      id: 'l8',
      title: 'Corner Conversation',
      room: 'Living Room',
      style: 'Wraparound Comfort',
      description: 'The Horizon corner sofa in warm bouclé creates an intimate conversation pit for family gatherings.',
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80',
      alt: 'Corner sofa in beige bouclé fabric',
      products: ['Horizon Corner Sofa', 'Lunar Coffee Table'],
      featured: false,
    },
    {
      id: 'l9',
      title: 'Recliner Cinema',
      room: 'Living Room',
      style: 'Cloud Nine · Cinema',
      description: 'Nebula power recliners with massage, cup holders, and USB charging — your personal IMAX.',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
      alt: 'Power recliner sofa in home cinema setup',
      products: ['Nebula Power Recliner', 'Vista TV Unit'],
      featured: false,
    },
    {
      id: 'l10',
      title: 'Minimal Entryway',
      room: 'Entryway',
      style: 'Urban Nordic · Functional',
      description: 'First impressions matter — a console, mirror, and bench set the tone for a calm home.',
      image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
      alt: 'Minimal entryway with console and mirror',
      products: ['Custom Console', 'Wall Mirror', 'Storage Bench'],
      featured: false,
    },
    {
      id: 'l11',
      title: 'Cozy Reading Nook',
      room: 'Living Room',
      style: 'Royal Velvet · Intimate',
      description: 'An Eclipse accent chair, floor lamp, and side table — the perfect corner for getting lost in a book.',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
      alt: 'Velvet accent chair in reading nook',
      products: ['Eclipse Accent Chair', 'Floor Lamp', 'Side Table'],
      featured: false,
    },
    {
      id: 'l12',
      title: 'Family Dining',
      room: 'Dining Room',
      style: 'Heritage · Gathered',
      description: 'Oakwood extendable table seats 6-8 — perfect for Sunday roasts and holiday feasts.',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
      alt: 'Oak dining table set for family meal',
      products: ['Oakwood 6-Seater', 'Emperor 8-Seater'],
      featured: false,
    },
    {
      id: 'l13',
      title: 'Master Suite',
      room: 'Bedroom',
      style: 'Heritage Modern',
      description: 'Custom king bed with integrated nightstands, hidden safe, and reading lights — designed for two.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      alt: 'Custom master bedroom with king bed',
      products: ['Custom King Bed', 'Atlas Wardrobe', 'Custom Nightstands'],
      featured: true,
    },
    {
      id: 'l14',
      title: 'Executive Boardroom',
      room: 'Office',
      style: 'Executive Suite · Prestige',
      description: 'Apex conference table, ergonomic chairs, and credenza — where decisions are made in style.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      alt: 'Executive boardroom with conference table',
      products: ['Apex Conference Table', 'Executive Chairs', 'Credenza'],
      featured: false,
    },
    {
      id: 'l15',
      title: 'Outdoor Living',
      room: 'Outdoor',
      style: 'Studio Raw · Al Fresco',
      description: 'Teak outdoor sofa, coffee table, and planters — indoor comfort, outdoor durability.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      alt: 'Teak outdoor furniture on terrace',
      products: ['Custom Outdoor Sofa', 'Teak Coffee Table', 'Planters'],
      featured: false,
    },
  ]);

  protected readonly filters = signal([
    { value: 'all', label: 'All Looks' },
    { value: 'living', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'outdoor', label: 'Outdoor' },
  ]);

  protected readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    let items = this.allItems();

    if (filter !== 'all') {
      const roomMap: Record<string, string> = {
        living: 'Living Room',
        bedroom: 'Bedroom',
        dining: 'Dining Room',
        office: 'Office',
        outdoor: 'Outdoor',
      };
      items = items.filter(item => item.room === roomMap[filter]);
    }

    return items.slice(0, this.displayedCount());
  });

  protected readonly hasMore = computed(() => this.filteredItems().length < this.allItems().filter(item => {
    const filter = this.activeFilter();
    if (filter === 'all') return true;
    const roomMap: Record<string, string> = {
      living: 'Living Room', bedroom: 'Bedroom', dining: 'Dining Room', office: 'Office', outdoor: 'Outdoor',
    };
    return item.room === roomMap[filter];
  }).length);

  protected readonly collectionHighlights = signal([
    { icon: 'tree', title: 'FSC-Certified Sheesham', description: 'Sustainably harvested, kiln-dried to 8–10% moisture.' },
    { icon: 'hammer', title: 'Hand-Carved Details', description: 'Master artisans carve each motif by hand.' },
    { icon: 'sparkles', title: 'Natural Oil Finish', description: 'Hand-rubbed oils that deepen with age.' },
    { icon: 'award', title: 'Heirloom Construction', description: 'Mortise-tenon joinery, zero staples or nails.' },
    { icon: 'shield', title: '7-Year Warranty', description: 'Frame and joinery guaranteed for generations.' },
  ]);

  protected readonly styleGuides = signal([
    { id: 'g1', slug: 'living-room', title: 'Living Room', roomCount: 8, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
    { id: 'g2', slug: 'bedroom', title: 'Bedroom', roomCount: 6, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' },
    { id: 'g3', slug: 'dining', title: 'Dining Room', roomCount: 5, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' },
    { id: 'g4', slug: 'office', title: 'Home Office', roomCount: 4, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  ]);

  loadMore(): void {
    this.displayedCount.update(c => c + 9);
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'Lookbook — Curated Room Designs | Galaxy Sofas',
      description: 'Browse complete room designs styled with Galaxy furniture. Shop the look instantly. Living rooms, bedrooms, dining rooms, offices & more.',
      canonical: '/lookbook',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Lookbook', path: '/lookbook' },
        ]),
      ],
    });
  }
}

import { OnInit } from '@angular/core';