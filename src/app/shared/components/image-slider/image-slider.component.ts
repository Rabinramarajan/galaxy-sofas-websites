import { Component, computed, input, linkedSignal } from '@angular/core';
import { AnimatedButtonComponent } from '../animated-button/animated-button.component';

@Component({
  selector: 'gs-image-slider',
  standalone: true,
  imports: [AnimatedButtonComponent],
  template: `
    <section class="glass-card p-6">
      <img class="h-80 w-full rounded-2xl object-cover" [src]="currentImage()" [alt]="title()" loading="lazy" decoding="async" />
      <div class="mt-4 flex items-center justify-between">
        <h3 class="section-title text-xl">{{ title() }}</h3>
        <div class="flex gap-2">
          <gs-animated-button label="Prev" variant="secondary" (clicked)="previous()"/>
          <gs-animated-button label="Next" (clicked)="next()"/>
        </div>
      </div>
    </section>
  `
})
export class ImageSliderComponent {
  readonly title = input.required<string>();
  readonly images = input.required<string[]>();
  readonly index = linkedSignal(() => 0);

  readonly currentImage = computed(() => {
    const imgs = this.images();
    if (!imgs.length) return '';
    return imgs[this.index() % imgs.length] ?? imgs[0];
  });

  next(): void {
    this.index.update((value) => value + 1);
  }

  previous(): void {
    const len = this.images().length;
    this.index.update((value) => (value - 1 + len) % len);
  }
}
