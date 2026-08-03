import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteDataService } from '../../../core/services/site-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { AnimatedBadgeComponent } from '../../../shared/components/animated-badge/animated-badge.component';

@Component({
  selector: 'gs-product-detail-page',
  standalone: true,
  imports: [BreadcrumbComponent, AnimatedBadgeComponent],
  template: `
    <gs-breadcrumb />
    @if (product(); as product) {
      <article class="grid gap-8 md:grid-cols-2 md:items-start">
        <img class="w-full rounded-3xl object-cover" [src]="product.image" [alt]="product.name" loading="eager" />
        <div class="space-y-4">
          <gs-animated-badge [label]="product.category" />
          <h1 class="section-title text-4xl">{{ product.name }}</h1>
          <p class="text-2xl font-semibold text-amber-600">{{ product.price }}</p>
          <p class="text-slate-600 dark:text-slate-300">{{ product.description }}</p>
          <div class="flex flex-wrap gap-2">
            @for (tag of product.tags; track tag) {
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">{{ tag }}</span>
            }
          </div>
        </div>
      </article>
    }
  `
})
export class ProductDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(SiteDataService);
  private readonly seo = inject(SeoService);

  readonly product = computed(() => this.data.products().find((item) => item.slug === this.route.snapshot.params['slug']) ?? this.data.products()[0]);

  constructor() {
    effect(() => {
      const product = this.product();
      this.seo.updateSeo(`${product.name} | Galaxy Sofas`, product.description);
      this.seo.setSchema({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        category: product.category
      });
    });
  }
}
