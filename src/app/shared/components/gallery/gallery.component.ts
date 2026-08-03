import { Component, input } from '@angular/core';

@Component({
  selector: 'gs-gallery',
  standalone: true,
  template: `
    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      @for (image of images(); track image) {
        <img class="h-52 w-full rounded-2xl object-cover transition duration-500 hover:scale-[1.02]" [src]="image" alt="Galaxy Sofas interior gallery" loading="lazy" decoding="async" />
      }
    </section>
  `
})
export class GalleryComponent {
  readonly images = input.required<string[]>();
}
