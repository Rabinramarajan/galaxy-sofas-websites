import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';
import { RevealDirective } from '../../directives/reveal.directive';
import type { Category } from '../../../core/models/furniture.model';

/** Category card — image backdrop with glass overlay and product count. */
@Component({
  selector: 'app-category-card',
  imports: [RouterLink, AppImage, AppIcon, RevealDirective],
  template: `
    <a
      appReveal
      effect="fade-up"
      [routerLink]="['/products', category().slug]"
      (click)="select.emit(category())"
      class="group relative block overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-lift"
    >
      <div class="relative aspect-[4/5] overflow-hidden">
        <app-img [src]="category().image" [alt]="category().alt" class="block h-full w-full" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>

        <div class="absolute inset-x-0 bottom-0 p-6">
          <span class="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary-light backdrop-blur-md">
            <app-icon name="grid" class="h-3 w-3" />
            {{ category().productCount }} pieces
          </span>
          <h3 class="font-display text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-2xl">
            {{ category().name }}
          </h3>
          <p class="mt-1 line-clamp-2 text-sm text-white/70">{{ category().short }}</p>
          <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light opacity-0 transition-all duration-500 group-hover:opacity-100">
            Explore <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  `,
})
export class CategoryCard {
  readonly category = input.required<Category>();
  readonly accentClass = computed(() => this.category().accent ?? 'from-amber-400 to-orange-500');
  readonly select = output<Category>();
}
