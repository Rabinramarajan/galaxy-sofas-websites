import { Component, computed, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { WishlistService } from '../../core/services/store.services';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { AppButton } from '../../shared/components/app-button/app-button';
import { RevealDirective } from '../../shared/directives/reveal.directive';



@Component({
  selector: 'app-wishlist-page',
  imports: [AppButton, PageHero, ProductCard, RevealDirective],
  template: `
    <app-page-hero
      title="My Wishlist"
      subtitle="Products you've saved for later."
      [showBreadcrumb]="true"
      breadcrumbLabel="Wishlist"
    />

    <section class="section-shell py-16 lg:py-24">
      @if (items().length > 0) {
        <div class="mt-4 flex justify-end">
          <app-button label="Clear Wishlist" variant="ghost" size="sm" icon="heart" (click)="clearAll()" />
        </div>
        <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          @for (product of items(); track product.id) {
            <app-product-card [product]="product" appReveal effect="fade-up" />
          }
        </div>
      } @else {
        <div class="py-24 text-center">
          <div class="mb-6 flex justify-center">
            <span class="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </span>
          </div>
          <h3 class="font-display text-2xl font-semibold text-primary dark:text-white">Your wishlist is empty</h3>
          <p class="mt-3 text-muted">Save items you love and compare them side by side.</p>
          <app-button label="Browse Furniture" href="/products" variant="gold" class="mt-6" />
        </div>
      }
    </section>
  `,
})
export class WishlistPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #wishlist = inject(WishlistService);

  protected readonly items = computed(() => this.#wishlist.items());

  clearAll(): void {
    this.#wishlist.ids().forEach((id) => this.#wishlist.remove(id));
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'My Wishlist | Galaxy Sofas',
      description: 'View and manage your saved wishlist items. Compare products side by side and pick the perfect furniture for your home.',
      canonical: '/wishlist',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Wishlist', path: '/wishlist' },
        ]),
      ],
    });
  }
}



