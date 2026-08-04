import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureItem } from '../../../core/models/showcase.model';
import { CARD_ANIMATIONS } from '../../../core/animations/luxury.animations';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  animations: CARD_ANIMATIONS,
  template: `
    <article
      [@cardHover]="isHovered() ? 'hovered' : 'default'"
      (mouseenter)="isHovered.set(true)"
      (mouseleave)="isHovered.set(false)"
      class="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent p-6 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40"
    >
      <!-- Background Ambient Glow -->
      <div class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40"></div>

      <!-- Image Container -->
      <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-900">
        <img
          [src]="item().imageUrl"
          [alt]="item().imageAlt"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30"></div>
        
        @if (item().badge) {
          <span class="absolute left-4 top-4 rounded-full border border-amber-400/30 bg-stone-950/80 px-3 py-1 text-[10px] font-semibold tracking-widest text-amber-300 uppercase backdrop-blur-md">
            {{ item().badge }}
          </span>
        }
      </div>

      <!-- Content -->
      <div class="mt-6 flex flex-1 flex-col justify-between">
        <div>
          <span class="text-[11px] font-medium tracking-widest text-amber-400/80 uppercase">
            {{ item().category }}
          </span>
          <h3 class="mt-1 font-serif text-xl font-light tracking-wide text-white transition-colors duration-300 group-hover:text-amber-200">
            {{ item().title }}
          </h3>
          <p class="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {{ item().subtitle }}
          </p>
        </div>

        <!-- Footer / Price / Action -->
        <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span class="text-[10px] text-stone-400 uppercase tracking-wider block">Price</span>
            <span class="font-serif text-lg text-amber-300 font-normal">
              {{ item().price | currency:item().currency:'symbol':'1.0-0' }}
            </span>
          </div>

          <button
            type="button"
            (click)="cardClick.emit(item())"
            [attr.aria-label]="'Explore details for ' + item().title"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-white/5 text-amber-300 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-400 hover:text-stone-950"
          >
            <svg class="h-4 w-4 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  `
})
export class GlassCardComponent {
  readonly item = input.required<FurnitureItem>();
  readonly cardClick = output<FurnitureItem>();
  readonly isHovered = signal<boolean>(false);
}
