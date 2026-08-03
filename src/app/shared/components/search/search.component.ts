import { Component, input, model, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/site.models';

@Component({
  selector: 'gs-search',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="glass-card p-4">
      <label class="mb-2 block text-xs uppercase tracking-widest text-slate-500">Search products</label>
      <input class="w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900" [value]="query()" (input)="updateQuery($event)" placeholder="Try Aurora, Recliner, Dining..." aria-label="Search products" />
      @if (results.value()?.length) {
        <ul class="mt-3 space-y-2">
          @for (product of results.value(); track product.slug) {
            <li><a [routerLink]="['/products', product.slug]" class="text-sm hover:text-amber-600">{{ product.name }} · {{ product.category }}</a></li>
          }
        </ul>
      }
    </section>
  `
})
export class SearchComponent {
  readonly products = input.required<Product[]>();
  readonly query = model('');

  readonly results = resource({
    params: () => ({ query: this.query().trim().toLowerCase(), products: this.products() }),
    loader: async ({ params }) => {
      if (!params.query) {
        return params.products.slice(0, 3);
      }
      return params.products
        .filter((item) =>
          `${item.name} ${item.category} ${item.tags.join(' ')}`.toLowerCase().includes(params.query)
        )
        .slice(0, 5);
    }
  });

  updateQuery(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.query.set(value);
  }
}
