import { Component, computed, effect, inject } from '@angular/core';
import { SiteDataService } from '../../../core/services/site-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { AnimatedBadgeComponent } from '../../../shared/components/animated-badge/animated-badge.component';
import { AnimatedSectionComponent } from '../../../shared/components/animated-section/animated-section.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { BeforeAfterComponent } from '../../../shared/components/before-after/before-after.component';
import { CategoryCardComponent } from '../../../shared/components/category-card/category-card.component';
import { CollectionCardComponent } from '../../../shared/components/collection-card/collection-card.component';
import { CounterComponent } from '../../../shared/components/counter/counter.component';
import { FaqComponent } from '../../../shared/components/faq/faq.component';
import { GalleryComponent } from '../../../shared/components/gallery/gallery.component';
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { TestimonialComponent } from '../../../shared/components/testimonial/testimonial.component';
import { TimelineComponent } from '../../../shared/components/timeline/timeline.component';

@Component({
  selector: 'gs-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    BannerComponent,
    AnimatedSectionComponent,
    AnimatedBadgeComponent,
    CategoryCardComponent,
    ProductCardComponent,
    CollectionCardComponent,
    BeforeAfterComponent,
    CounterComponent,
    ImageSliderComponent,
    TimelineComponent,
    GalleryComponent,
    TestimonialComponent,
    FaqComponent,
    SearchComponent
  ],
  template: `
    <div class="space-y-10">
      <gs-hero title="Furniture Crafted for Extraordinary Living" subtitle="Discover premium sofas, beds, dining systems, and bespoke furniture designed for luxury homes and offices." />
      <gs-banner eyebrow="Luxury Banner" title="World-Class Comfort. Timeless Design." description="A premium static showcase engineered for speed, SEO, and elegant storytelling." />

      <gs-animated-section title="Featured Collections">
        <div class="grid gap-5 md:grid-cols-3">
          @for (collection of data.collections(); track collection.slug) {
            <gs-collection-card [collection]="collection" />
          }
        </div>
      </gs-animated-section>

      <gs-animated-section title="Premium Categories">
        <div class="grid gap-5 md:grid-cols-2">
          @for (category of data.trendingCategories(); track category.slug) {
            <gs-category-card [category]="category" />
          }
        </div>
      </gs-animated-section>

      <gs-animated-section title="Trending Products">
        <div class="mb-4 flex items-center justify-between">
          <gs-animated-badge label="Curated Weekly" />
        </div>
        <div class="grid gap-5 lg:grid-cols-3">
          @for (product of data.featuredProducts(); track product.slug) {
            <gs-product-card [product]="product" />
          }
        </div>
      </gs-animated-section>

      <gs-animated-section title="Why Choose Us">
        <div class="grid gap-4 md:grid-cols-4">
          <gs-counter label="Projects Delivered" [target]="2400" />
          <gs-counter label="Custom Designs" [target]="980" />
          <gs-counter label="Premium Materials" [target]="120" />
          <gs-counter label="Happy Clients" [target]="4200" />
        </div>
      </gs-animated-section>

      <gs-animated-section title="Furniture Process">
        <gs-timeline [steps]="processSteps" />
      </gs-animated-section>

      <gs-animated-section title="Craftsmanship Before & After">
        <gs-before-after
          beforeImage="https://images.pexels.com/photos/6969868/pexels-photo-6969868.jpeg?auto=compress&cs=tinysrgb&w=1200"
          afterImage="https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=1200" />
      </gs-animated-section>

      <gs-animated-section title="Latest Collections">
        <gs-image-slider title="Lookbook Highlights" [images]="sliderImages()" />
      </gs-animated-section>

      <gs-animated-section title="Interior Gallery">
        <gs-gallery [images]="galleryImages()" />
      </gs-animated-section>

      <gs-animated-section title="Customer Reviews">
        <div class="grid gap-5 md:grid-cols-3">
          @for (item of data.testimonials(); track item.name) {
            <gs-testimonial [item]="item" />
          }
        </div>
      </gs-animated-section>

      <gs-animated-section title="FAQs">
        <gs-faq [items]="data.faqs()" />
      </gs-animated-section>

      <gs-animated-section title="Instagram Feed & Product Search">
        <gs-search [products]="data.products()" />
      </gs-animated-section>

      <section id="contact-cta" class="glass-card space-y-3 p-8 text-center">
        <h2 class="section-title text-3xl">Design Your Dream Interior</h2>
        <p class="text-slate-600 dark:text-slate-300">Visit our Chennai studio or schedule a virtual consultation today.</p>
        <a href="tel:+919000012345" class="inline-flex rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-900">Call +91 90000 12345</a>
      </section>
    </div>
  `
})
export class HomePageComponent {
  readonly data = inject(SiteDataService);
  private readonly seo = inject(SeoService);

  readonly processSteps = [
    { step: 1, title: 'Design Brief', description: 'Requirement mapping, moodboard curation, and space planning.' },
    { step: 2, title: 'Material Selection', description: 'Fabric, foam density, hardware, and finish approvals.' },
    { step: 3, title: 'Precision Manufacturing', description: 'Craftsmanship-driven assembly with multi-stage QC.' },
    { step: 4, title: 'White-Glove Delivery', description: 'Installation, alignment, and post-delivery care guidance.' }
  ];

  readonly sliderImages = computed(() => this.data.collections().map((item) => item.image));
  readonly galleryImages = computed(() => [
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5997995/pexels-photo-5997995.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5824519/pexels-photo-5824519.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6585627/pexels-photo-6585627.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ]);

  constructor() {
    effect(() => {
      this.seo.updateSeo(
        'Galaxy Sofas | Luxury Furniture & Custom Interiors',
        'Explore premium sofas, beds, dining tables, wardrobes, and custom furniture crafted for modern luxury interiors.'
      );
      this.seo.setSchema({
        '@context': 'https://schema.org',
        '@type': 'FurnitureStore',
        name: 'Galaxy Sofas',
        image: this.galleryImages()[0],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressCountry: 'IN'
        },
        telephone: '+91-9000012345'
      });
    });
  }
}
