import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { AppImage } from '../../shared/components/app-image/app-image';
import { AppButton } from '../../shared/components/app-button/app-button';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/components/app-icon/app-icon';


interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  room: string;
  featured?: boolean;
}

@Component({
  selector: 'app-gallery-page',
  imports: [AppButton, AppIcon, AppImage, PageHero, RevealDirective, TiltDirective],
  template: `
    <app-page-hero
      title="Gallery"
      subtitle="Real homes. Real Galaxy. No staged showrooms — just our furniture living its best life in 1.2M+ Indian homes."
      [showBreadcrumb]="true"
      breadcrumbLabel="Gallery"
    />

    <!-- Filter Tabs -->
    <section class="section-shell py-6 lg:py-8">
      <div class="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Filter gallery by room">
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

    <!-- Masonry Grid -->
    <section class="section-shell pb-12 lg:pb-16">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" [class]="masonryClass()">
        @for (image of filteredImages(); track image.src; let i = $index) {
          <article
            appReveal
            effect="fade-up"
            [delay]="(i % 12) * 50"
            appTilt
            class="group relative overflow-hidden rounded-2xl cursor-pointer"
            (click)="openLightbox(image)"
          >
            <div class="relative aspect-[4/5] overflow-hidden">
            <app-img
              [src]="image.src"
              [alt]="image.alt"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div class="w-full text-white">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                    <app-icon name="home" class="h-3 w-3" />
                    {{ image.room }}
                  </span>
                  <h4 class="mt-2 font-display font-semibold text-white">{{ image.category }}</h4>
                  <p class="text-sm text-white/70">Tap to expand</p>
                </div>
              </div>
              @if (image.featured) {
                <span class="absolute top-3 left-3 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              }
            </div>
          </article>
        }
      </div>

      <!-- Load More -->
      <div class="mt-10 text-center">
        @if (hasMore()) {
          <app-button variant="outline" label="Load More" icon="loader" size="lg" (click)="loadMore()" />
        }
      </div>
    </section>

    <!-- Lightbox Modal -->
    @if (lightboxImage(); as img) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        (click)="closeLightbox()"
        role="dialog"
        aria-modal="true"
        aria-label="Image fullscreen view"
      >
        <button
          type="button"
          class="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          (click)="closeLightbox()"
          aria-label="Close lightbox"
        >
          <app-icon name="x" class="h-6 w-6" />
        </button>

        <button
          type="button"
          class="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          (click)="navigateLightbox(-1)"
          aria-label="Previous image"
        >
          <app-icon name="chevronLeft" class="h-6 w-6" />
        </button>

        <button
          type="button"
          class="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          (click)="navigateLightbox(1)"
          aria-label="Next image"
        >
          <app-icon name="chevronRight" class="h-6 w-6" />
        </button>

        <div class="relative max-h-[85vh] max-w-[90vw]">
          <img [src]="img.src" [alt]="img.alt" class="max-h-[85vh] max-w-[90vw] object-contain" />
          <div class="mt-4 text-center text-white/70">
            <p class="font-medium">{{ img.category }}</p>
            <p class="text-sm">{{ img.room }}</p>
          </div>
        </div>
      </div>
    }

    <!-- Instagram CTA -->
    <section class="section-shell py-12 lg:py-16 bg-primary dark:bg-dark text-white">
      <div class="mx-auto max-w-3xl text-center">
        <span class="eyebrow text-secondary">Follow Our Journey</span>
        <h3 class="mt-4 font-display text-3xl font-semibold sm:text-4xl">@galaxysofas on Instagram</h3>
        <p class="mt-4 text-lg text-white/70">Daily inspiration, behind-the-scenes, customer homes, and design tips. Join 180K+ design lovers.</p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <app-button variant="gold" label="Follow on Instagram" icon="instagram" size="lg" href="https://instagram.com/galaxysofas" />
          <app-button variant="outline" label="Tag Us #MyGalaxyHome" icon="tag" size="lg" />
        </div>
      </div>
    </section>
  `,
})
export class GalleryPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly activeFilter = signal('all');
  protected readonly displayedCount = signal(24);
  protected readonly lightboxImage = signal<GalleryImage | null>(null);
  protected readonly lightboxIndex = signal(0);

  protected readonly allImages = signal<GalleryImage[]>([
    { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', alt: 'Aurora velvet sofa in beige living room', category: 'Aurora 3-Seater', room: 'Living Room', featured: true },
    { src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80', alt: 'Celestial L-shape in modern open plan', category: 'Celestial L-Shape', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', alt: 'Serenity king bed in luxury bedroom', category: 'Serenity King Bed', room: 'Bedroom', featured: true },
    { src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', alt: 'Oakwood dining set in warm dining room', category: 'Oakwood 6-Seater', room: 'Dining Room' },
    { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', alt: 'Vista TV unit with ambient lighting', category: 'Vista TV Unit', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', alt: 'Eclipse accent chair in contemporary room', category: 'Eclipse Chair', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1532372320978-9d3e3e3e3e3e?auto=format&fit=crop&w=800&q=80', alt: 'Lunar coffee table in modern loft', category: 'Lunar Coffee Table', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80', alt: 'Atlas wardrobe in contemporary bedroom', category: 'Atlas Wardrobe', room: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', alt: 'Apex executive desk in modern office', category: 'Apex Desk', room: 'Office' },
    { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', alt: 'Regalia wooden sofa in heritage interior', category: 'Regalia Sofa', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80', alt: 'Horizon corner sofa in designer lounge', category: 'Horizon Corner', room: 'Living Room', featured: true },
    { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', alt: 'Opal queen bed in bright bedroom', category: 'Opal Queen Bed', room: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', alt: 'Emperor dining set in elegant room', category: 'Emperor 8-Seater', room: 'Dining Room', featured: true },
    { src: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80', alt: 'Vega ergonomic chair in workspace', category: 'Vega Chair', room: 'Office' },
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', alt: 'Serenity bed detail shot', category: 'Serenity Bed Detail', room: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', alt: 'Custom furniture in workshop', category: 'Custom Piece', room: 'Workshop' },
    { src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80', alt: 'Nebula recliner in cosy lounge', category: 'Nebula Recliner', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80', alt: 'Heritage collection in classic room', category: 'Heritage Collection', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', alt: 'Urban Nordic in minimalist apartment', category: 'Urban Nordic', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', alt: 'Studio Raw organic furniture', category: 'Studio Raw', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80', alt: 'Cloud Nine modular sofa', category: 'Cloud Nine', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', alt: 'Executive Suite office', category: 'Executive Suite', room: 'Office' },
    { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Marble coffee table in loft', category: 'Marble Coffee Table', room: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1504198458767-4d2aa15a8ff5?auto=format&fit=crop&w=800&q=80', alt: 'Wood texture detail', category: 'Wood Detail', room: 'Workshop' },
  ]);

  protected readonly filters = signal([
    { value: 'all', label: 'All' },
    { value: 'living', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'workshop', label: 'Workshop' },
  ]);

  protected readonly filteredImages = computed(() => {
    const filter = this.activeFilter();
    let images = this.allImages();

    if (filter !== 'all') {
      const roomMap: Record<string, string> = {
        living: 'Living Room',
        bedroom: 'Bedroom',
        dining: 'Dining Room',
        office: 'Office',
        workshop: 'Workshop',
      };
      images = images.filter(img => img.room === roomMap[filter]);
    }

    return images.slice(0, this.displayedCount());
  });

  protected readonly hasMore = computed(() => this.filteredImages().length < this.allImages().filter(img => {
    const filter = this.activeFilter();
    if (filter === 'all') return true;
    const roomMap: Record<string, string> = {
      living: 'Living Room', bedroom: 'Bedroom', dining: 'Dining Room', office: 'Office', workshop: 'Workshop',
    };
    return img.room === roomMap[filter];
  }).length);

  protected readonly masonryClass = computed(() => '');

  loadMore(): void {
    this.displayedCount.update(c => c + 12);
  }

  openLightbox(image: GalleryImage): void {
    const filter = this.activeFilter();
    let images = this.allImages();
    if (filter !== 'all') {
      const roomMap: Record<string, string> = {
        living: 'Living Room', bedroom: 'Bedroom', dining: 'Dining Room', office: 'Office', workshop: 'Workshop',
      };
      images = images.filter(img => img.room === roomMap[filter]);
    }
    const index = images.findIndex(i => i.src === image.src);
    this.lightboxIndex.set(index >= 0 ? index : 0);
    this.lightboxImage.set(image);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
    document.body.style.overflow = '';
  }

  navigateLightbox(direction: number): void {
    let images = this.allImages();
    const filter = this.activeFilter();
    if (filter !== 'all') {
      const roomMap: Record<string, string> = {
        living: 'Living Room', bedroom: 'Bedroom', dining: 'Dining Room', office: 'Office', workshop: 'Workshop',
      };
      images = images.filter(img => img.room === roomMap[filter]);
    }
    const newIndex = (this.lightboxIndex() + direction + images.length) % images.length;
    this.lightboxIndex.set(newIndex);
    this.lightboxImage.set(images[newIndex] ?? null);
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'Gallery — Real Homes, Real Galaxy | Galaxy Sofas',
      description: 'Browse 1.2M+ real customer homes featuring Galaxy furniture. Filter by room, style, collection. Get inspired by authentic Indian interiors.',
      canonical: '/gallery',
      ogType: 'website',
      jsonLd: [breadcrumbSchema([{ label: 'Home', path: '/' }, { label: 'Gallery', path: '/gallery' }])],
    });
  }
}


