import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/models/site.models';

@Component({
  selector: 'gs-mega-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="grid gap-3 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900 md:grid-cols-2">
      @for (category of categories(); track category.slug) {
        <a [routerLink]="['/categories']" class="rounded-xl border border-slate-100 p-3 transition hover:border-amber-300 dark:border-slate-800">
          <p class="font-semibold">{{ category.name }}</p>
          <p class="text-sm text-slate-500">{{ category.description }}</p>
        </a>
      }
    </div>
  `
})
export class MegaMenuComponent {
  readonly categories = input.required<Category[]>();
}
