import { Component, computed, input, viewChild, afterNextRender, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AppImage } from '../app-image/app-image';
import { Product } from '../../../core/models/furniture.model';

register();

export type SliderVariant = 'product' | 'hero' | 'gallery' | 'testimonial';

interface SwiperElement extends HTMLElement {
  initialize(): void;
  swiper?: object;
}

@Component({
  selector: 'app-swiper',
  imports: [AppImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <swiper-container
      #swiper
      [init]="false"
      [slidesPerView]="slidesPerView()"
      [spaceBetween]="spaceBetween()"
      [loop]="loop()"
      [autoplay]="autoplay()"
      [pagination]="pagination()"
      [navigation]="navigation()"
      [breakpoints]="breakpoints()"
      [speed]="speed()"
      [grabCursor]="true"
      class="w-full"
      (swiper)="onSwiperInit($event)"
    >
      @for (slide of slides(); track slide.id ?? slide.image) {
        <swiper-slide class="flex justify-center">
          <ng-content select="[data-slide]" />
          @if (slide.image) {
            <app-img
              [src]="slide.image"
              [alt]="slide.alt ?? ''"
              [width]="slide.width"
              [height]="slide.height"
              class="w-full h-auto"
            />
          }
        </swiper-slide>
      }
    </swiper-container>
  `,
  styles: [`
    :host { display: block; }
    swiper-container { --swiper-theme-color: #f59e0b; }
  `]
})
export class AppSwiper {
  readonly slides = input<{ id?: string; image: string; alt?: string; width?: number; height?: number }[]>([]);
  readonly variant = input<SliderVariant>('product');
  readonly autoplayDelay = input(5000);
  readonly showPagination = input(true);
  readonly showNavigation = input(true);

  private readonly swiperEl = viewChild<ElementRef<SwiperElement>>('swiper');

  readonly slidesPerView = computed(() => {
    const v = this.variant();
    if (v === 'hero') return 1;
    if (v === 'testimonial') return 1;
    if (v === 'gallery') return 1.2;
    return 1.1;
  });

  readonly spaceBetween = computed(() => {
    const v = this.variant();
    if (v === 'gallery') return 16;
    if (v === 'testimonial') return 24;
    return 20;
  });

  readonly loop = computed(() => this.variant() !== 'product');
  readonly autoplay = computed(() => this.variant() === 'hero' ? { delay: this.autoplayDelay(), disableOnInteraction: false } : false);
  readonly pagination = computed(() => this.showPagination() ? { clickable: true, dynamicBullets: true } : false);
  readonly navigation = computed(() => this.showNavigation());
  readonly speed = computed(() => this.variant() === 'hero' ? 800 : 500);

  readonly breakpoints = computed(() => {
    if (this.variant() === 'gallery') {
      return { 320: { slidesPerView: 1.1, spaceBetween: 12 }, 640: { slidesPerView: 1.5, spaceBetween: 16 }, 1024: { slidesPerView: 2.2, spaceBetween: 20 }, 1280: { slidesPerView: 3, spaceBetween: 24 } };
    }
    if (this.variant() === 'testimonial') {
      return { 320: { slidesPerView: 1 }, 768: { slidesPerView: 1.2 }, 1024: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } };
    }
    return { 320: { slidesPerView: 1 }, 640: { slidesPerView: 1.2 }, 1024: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } };
  });

  constructor() {
    afterNextRender(() => {
      this.init();
    });
  }

  onSwiperInit(_event: Event): void {
    console.log('Swiper initialized');
  }

  private init(): void {
    const swiper = this.swiperEl()?.nativeElement;
    if (swiper && !swiper.swiper) {
      swiper.initialize();
    }
  }
}

@Component({
  selector: 'app-product-slider',
  imports: [AppSwiper, AppImage],
  template: `
    <app-swiper [slides]="slides()" variant="product" [showPagination]="false" [showNavigation]="true">
      <ng-template data-slide let-slide>
        <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <app-img [src]="slide.image" [alt]="slide.alt" class="h-full w-full object-cover" />
        </div>
      </ng-template>
    </app-swiper>
  `
})
export class ProductSlider {
  readonly product = input.required<Product>();

  readonly slides = computed(() => {
    const p = this.product();
    return p.images.map((src, i) => ({ id: `${p.id}-${i}`, image: src, alt: `${p.alt} view ${i + 1}`, width: 1200, height: 900 }));
  });
}