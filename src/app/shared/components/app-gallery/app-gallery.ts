import { Component, computed, input, signal } from '@angular/core';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';
import { RevealDirective } from '../../directives/reveal.directive';
import type { MediaAsset } from '../../../core/models/furniture.model';

/** Masonry-style gallery with a lightbox. */
@Component({
  selector: 'app-gallery',
  imports: [AppImage, AppIcon, RevealDirective],
  template: `
    <div class="columns-2 gap-4 space-y-4 sm:columns-3 lg:columns-4">
      @for (item of images(); track item.src; let i = $index) {
        <button
          appReveal
          effect="fade-up"
          [delay]="(i % 4) * 80"
          type="button"
          (click)="open(i)"
          class="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-soft focus-gold"
          [attr.aria-label]="'View image: ' + item.alt"
        >
          <div class="relative w-full overflow-hidden" [class]="tall(i)">
            <app-img [src]="item.src" [alt]="item.alt" class="block h-full w-full" />
            <div class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/40 group-hover:opacity-100">
              <app-icon name="plus" class="h-7 w-7 text-white" />
            </div>
          </div>
        </button>
      }
    </div>

    @if (lightboxIndex() !== null) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" role="dialog" aria-modal="true" (click)="close()">
        <button type="button" class="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20" aria-label="Close">
          <app-icon name="close" class="h-5 w-5" />
        </button>
        <button type="button" class="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8" aria-label="Previous" (click)="prev(); $event.stopPropagation()">
          <app-icon name="chevronRight" class="h-5 w-5 rotate-180" />
        </button>
        <figure class="max-h-full max-w-5xl" (click)="$event.stopPropagation()">
          <div class="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
            <app-img [src]="currentImage()" [alt]="currentAlt()" class="block h-full w-full" priority="high" />
          </div>
          <figcaption class="mt-4 text-center text-sm text-white/80">{{ currentAlt() }}</figcaption>
        </figure>
        <button type="button" class="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8" aria-label="Next" (click)="next(); $event.stopPropagation()">
          <app-icon name="chevronRight" class="h-5 w-5" />
        </button>
      </div>
    }
  `,
})
export class AppGallery {
  readonly images = input<MediaAsset[]>([]);

  readonly lightboxIndex = signal<number | null>(null);

  readonly currentImage = computed(() => this.images()[this.lightboxIndex() ?? 0]?.src ?? '');
  readonly currentAlt = computed(() => this.images()[this.lightboxIndex() ?? 0]?.alt ?? '');

  tall(index: number): string {
    return index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square';
  }

  open(index: number): void {
    this.lightboxIndex.set(index);
  }

  close(): void {
    this.lightboxIndex.set(null);
  }

  prev(): void {
    const current = this.lightboxIndex() ?? 0;
    this.lightboxIndex.set((current - 1 + this.images().length) % this.images().length);
  }

  next(): void {
    const current = this.lightboxIndex() ?? 0;
    this.lightboxIndex.set((current + 1) % this.images().length);
  }
}
