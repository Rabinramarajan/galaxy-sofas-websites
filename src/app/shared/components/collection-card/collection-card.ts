import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';
import { RevealDirective } from '../../directives/reveal.directive';
import type { Collection } from '../../../core/models/furniture.model';

/** Large editorial collection card — bold imagery, index chip and hover CTA. */
@Component({
  selector: 'app-collection-card',
  imports: [RouterLink, AppImage, AppIcon, RevealDirective],
  template: `
    <a
      appReveal
      effect="fade-up"
      routerLink="/collections"
      (click)="select.emit(collection())"
      class="group relative block overflow-hidden rounded-[1.75rem] shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift hover:ring-secondary/30 dark:ring-white/5"
    >
      <div class="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5] lg:aspect-[3/4]">
        <app-img
          [src]="collection().image"
          [alt]="collection().alt"
          class="block h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />

        <!-- gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        <div class="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-white/25"></div>

        <!-- top row: tag pill + index number -->
        <div class="absolute inset-x-5 top-5 flex items-start justify-between sm:inset-x-6 sm:top-6">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/20">
            <app-icon name="gem" class="h-3 w-3 text-secondary-light" />
            {{ collection().tag }}
          </span>
          @if (index() > 0) {
            <span class="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 font-display text-sm font-bold text-white backdrop-blur-md">
              {{ indexLabel() }}
            </span>
          }
        </div>

        <!-- content -->
        <div class="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <span class="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary-light">
            <span class="h-px w-6 bg-gold-gradient"></span>
            {{ collection().productCount }} products
          </span>
          <h3 class="font-display text-2xl font-semibold leading-tight text-white sm:text-[1.7rem]">{{ collection().name }}</h3>
          <p class="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/75">{{ collection().description }}</p>

          <!-- CTA -->
          <div class="mt-6 flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all duration-500 group-hover:gap-2 group-hover:bg-gold-gradient group-hover:text-white">
              <app-icon name="arrowRight" class="h-4 w-4" />
            </span>
            <span class="text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
              Discover the collection
            </span>
          </div>
        </div>

        <!-- hover shine -->
        <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 sheen" aria-hidden="true"></div>
      </div>
    </a>
  `,
})
export class CollectionCard {
  readonly collection = input.required<Collection>();
  readonly index = input(0);
  readonly select = output<Collection>();

  readonly indexLabel = () => String(this.index()).padStart(2, '0');
}