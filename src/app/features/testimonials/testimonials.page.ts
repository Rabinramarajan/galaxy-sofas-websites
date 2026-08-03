import { Component, inject, signal, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { TESTIMONIALS } from '../../core/data/testimonials.data';
import { Testimonial } from '../../core/models/furniture.model';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppRating } from '../../shared/components/app-rating/app-rating';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { AppImage } from '../../shared/components/app-image/app-image';


@Component({
  selector: 'app-testimonials-page',
  imports: [AppButton, AppImage, AppRating, PageHero, RevealDirective, SectionHeader, TestimonialCard],
  template: `
    <app-page-hero
      title="What Our Customers Say"
      subtitle="1.2M+ homes trust Galaxy. These are their stories in their own words."
      [showBreadcrumb]="true"
      breadcrumbLabel="Testimonials"
    >
      <span slot="cta">
        <app-button label="Leave a Review" icon="heart" variant="gold" size="lg"></app-button>
      </span>
    </app-page-hero>

    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Customer Stories"
        title="Love from Real Homes"
        description="We read every review. Here are our favourites, hand-picked."
      />

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        @for (testimonial of testimonials(); track testimonial.id) {
          <app-testimonial-card [t]="testimonial" appReveal effect="fade-up"></app-testimonial-card>
        }
      </div>

      <div class="mt-16 text-center">
        <p class="text-muted">Rated {{ averageRating }}/5 stars from {{ totalReviews }} verified reviews across 15 platforms</p>
        <div class="mt-4 flex justify-center">
          <app-rating [value]="averageRating" [showValue]="false" size="lg"></app-rating>
        </div>
      </div>
    </section>

    <!-- Featured Story -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <app-img
            src="https://images.unsplash.com/photo-1581382598710-2a6f7a6d6f4d?auto=format&fit=crop&w=800&q=80"
            alt="Customer Ananya Sharma in her Bengaluru living room with the Celestial sofa"
            class="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <div class="lg:col-span-7">
          <span class="eyebrow text-secondary">Featured Story</span>
          <h3 class="mt-2 font-display text-2xl font-semibold text-primary dark:text-white sm:text-3xl">Ananya's Bengaluru Family Home</h3>
          <div class="mt-6 space-y-4 text-muted leading-relaxed">
            <p>We ordered the Celestial L-shape sofa after a 3D consultation. The design team walked us through fabric options via video call, and delivery was spot-on. Three years later, it still looks and feels brand new.</p>
            <p class="italic">"The best purchase we've made for our home. The fabric feels like a luxury hotel."</p>
          </div>
          <div class="mt-6">
            <app-rating [value]="5" [showValue]="true"></app-rating>
          </div>
          <app-button label="Read Full Story" variant="outline" size="sm" icon="arrowRight" class="mt-6"></app-button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section-shell py-16 lg:py-24 text-center">
      <div class="mx-auto max-w-3xl">
        <h2 class="font-display text-3xl font-semibold text-primary dark:text-white sm:text-4xl">Trusted Across India</h2>
        <p class="mt-4 text-lg text-muted">28 showrooms, 15,000+ pincodes, 1.2M+ homes transformed.</p>
        <div class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <div class="font-display text-3xl font-semibold text-secondary">4.9/5</div>
            <p class="mt-1 text-sm text-muted">Avg. Rating</p>
          </div>
          <div>
            <div class="font-display text-3xl font-semibold text-secondary">1.2M+</div>
            <p class="mt-1 text-sm text-muted">Happy Homes</p>
          </div>
          <div>
            <div class="font-display text-3xl font-semibold text-secondary">98%</div>
            <p class="mt-1 text-sm text-muted">Recommend Us</p>
          </div>
          <div>
            <div class="font-display text-3xl font-semibold text-secondary">28</div>
            <p class="mt-1 text-sm text-muted">Showrooms</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly testimonials = signal<Testimonial[]>(TESTIMONIALS);
  protected readonly averageRating = 4.9;
  protected readonly totalReviews = 2847;

  ngOnInit(): void {
    this.#seo.set({
      title: 'Customer Testimonials — Love from 1.2M+ Homes | Galaxy Sofas',
      description: 'Read real customer reviews and see how Galaxy furniture has transformed homes across India. Rated 4.9/5 by 2847 verified buyers.',
      canonical: '/testimonials',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Testimonials', path: '/testimonials' },
        ]),
      ],
    });
  }
}



