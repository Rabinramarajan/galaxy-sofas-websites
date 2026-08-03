import { Component, input } from '@angular/core';
import { Category } from '../../../core/models/site.models';

@Component({
  selector: 'gs-category-card',
  standalone: true,
  template: `
    <article class="group relative overflow-hidden rounded-3xl">
      <img class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" [src]="category().image" [alt]="category().name" loading="lazy" decoding="async" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/25 to-transparent"></div>
      <div class="absolute bottom-0 p-5 text-white">
        <h3 class="section-title text-2xl">{{ category().name }}</h3>
        <p class="text-sm text-slate-100">{{ category().description }}</p>
      </div>
    </article>
  `
})
export class CategoryCardComponent {
  readonly category = input.required<Category>();
}
