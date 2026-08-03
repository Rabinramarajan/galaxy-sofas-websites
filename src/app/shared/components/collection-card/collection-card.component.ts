import { Component, input } from '@angular/core';
import { Collection } from '../../../core/models/site.models';

@Component({
  selector: 'gs-collection-card',
  standalone: true,
  template: `
    <article class="glass-card overflow-hidden p-4">
      <img class="h-52 w-full rounded-2xl object-cover" [src]="collection().image" [alt]="collection().name" loading="lazy" decoding="async" />
      <h3 class="section-title mt-4 text-xl">{{ collection().name }}</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ collection().description }}</p>
    </article>
  `
})
export class CollectionCardComponent {
  readonly collection = input.required<Collection>();
}
