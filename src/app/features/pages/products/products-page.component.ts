import { Component, effect, inject } from '@angular/core';
import { SiteDataService } from '../../../core/services/site-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'gs-products-page',
  standalone: true,
  imports: [BreadcrumbComponent, ProductCardComponent],
  template: `
    <gs-breadcrumb />
    <section class="space-y-6">
      <h1 class="section-title text-4xl">Luxury Products</h1>
      <p class="max-w-3xl text-slate-600 dark:text-slate-300">Explore handcrafted sofas, beds, dining tables, and premium home furniture collections.</p>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        @for (product of data.products(); track product.slug) {
          <gs-product-card [product]="product" />
        }
      </div>
    </section>
  `
})
export class ProductsPageComponent {
  readonly data = inject(SiteDataService);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => this.seo.updateSeo('Products | Galaxy Sofas', 'Browse premium furniture categories and luxury products by Galaxy Sofas.'));
  }
}
