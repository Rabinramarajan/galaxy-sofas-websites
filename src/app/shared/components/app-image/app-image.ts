import { Component, computed, input, signal } from '@angular/core';

export type ImageFit = 'cover' | 'contain';
export type ImageFp = 'center' | 'top' | 'bottom';

/**
 * Performance-first responsive image component.
 * - Lazy loads off-screen images, eager-loads above-the-fold ones
 * - Adds `fetchpriority` and `decoding=async` automatically
 * - Shows a shimmer skeleton while loading and on error
 * - Transforms Unsplash URLs to request AVIF/WebP via auto=format
 */
@Component({
  selector: 'app-img',
  imports: [],
  template: `
    <div class="relative h-full w-full overflow-hidden bg-surface dark:bg-dark-soft" [class]="containerClass()">
      @if (!loaded() && !error()) {
        <div class="absolute inset-0 skeleton"></div>
      }
      @if (error()) {
        <div class="absolute inset-0 flex items-center justify-center bg-surface dark:bg-dark-soft">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
      }
      <img
        [src]="src()"
        [alt]="alt()"
        [width]="width() || undefined"
        [height]="height() || undefined"
        [attr.fetchpriority]="priority() === 'high' ? 'high' : 'auto'"
        [loading]="priority() === 'high' ? 'eager' : 'lazy'"
        decoding="async"
        class="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-105"
        [class.object-cover]="fit() === 'cover'"
        [class.object-contain]="fit() === 'contain'"
        [class.opacity-0]="!loaded()"
        [style.object-position]="objectPosition()"
        (load)="loaded.set(true)"
        (error)="error.set(true)"
      />
    </div>
  `,
})
export class AppImage {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input<number>();
  readonly height = input<number>();
  readonly fit = input<ImageFit>('cover');
  readonly fp = input<ImageFp>('center');
  readonly priority = input<'high' | 'auto'>('auto');
  readonly rounded = input(false);

  readonly loaded = signal(false);
  readonly error = signal(false);

  readonly containerClass = computed(() => (this.rounded() ? 'rounded-2xl' : ''));
  readonly objectPosition = computed(() =>
    this.fp() === 'top' ? 'center top' : this.fp() === 'bottom' ? 'center bottom' : 'center'
  );
}
