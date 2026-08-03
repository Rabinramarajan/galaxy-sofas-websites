import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/site.models';

@Component({
  selector: 'gs-product-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="glass-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <img class="h-56 w-full object-cover" [src]="product().image" [alt]="product().name" loading="lazy" decoding="async" />
      <div class="space-y-2 p-5">
        <p class="text-xs uppercase tracking-widest text-amber-600">{{ product().category }}</p>
        <h3 class="section-title text-xl">{{ product().name }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ product().description }}</p>
        <p class="text-lg font-semibold">{{ product().price }}</p>
        <a [routerLink]="['/products', product().slug]" class="inline-flex text-sm font-semibold text-amber-600">View details →</a>
      </div>
    </article>
  `
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
}
