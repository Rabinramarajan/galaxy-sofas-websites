import { Component, input, signal, computed, afterNextRender, ElementRef, ViewChild } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { AppButton } from '../app-button/app-button';

export interface Viewer360Frame {
  src: string;
  angle: number;
}

@Component({
  selector: 'app-viewer-360',
  imports: [AppIcon, AppButton],
  template: `
    <div class="relative overflow-hidden rounded-2xl bg-surface dark:bg-dark-soft" [class]="containerClass()">
      <!-- Canvas/Image area -->
      <div class="relative aspect-[4/3] w-full overflow-hidden touch-pan-y" (pointerdown)="onPointerDown($event)" (pointermove)="onPointerMove($event)" (pointerup)="onPointerUp()" (pointerleave)="onPointerUp()">
        @if (!loaded()) {
          <div class="absolute inset-0 flex items-center justify-center skeleton">
            <div class="flex flex-col items-center gap-3 text-muted">
              <app-icon name="loader" class="h-8 w-8 animate-spin text-secondary" />
              <span class="text-sm">Loading 360° view...</span>
            </div>
          </div>
        }

        <img
          #viewerImg
          [src]="currentFrameSrc()"
          [alt]="alt() + ' - 360 degree view'"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-100"
          [class.opacity-100]="loaded()"
          [class.opacity-0]="!loaded()"
          (load)="loaded.set(true)"
        />

        <!-- Rotation indicator -->
        @if (dragging()) {
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-white text-sm font-medium backdrop-blur">
            <app-icon name="rotate-cw" class="h-4 w-4 animate-spin" />
            Rotating: {{ currentAngle() }}°
          </div>
        }

        <!-- Controls overlay -->
        <div class="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <app-button
            variant="glass"
            size="sm"
            icon="chevronLeft"
            class="pointer-events-auto"
            (click)="rotate(-1)"
            aria-label="Rotate left"
          />
          <app-button
            variant="glass"
            size="sm"
            icon="chevronRight"
            class="pointer-events-auto"
            (click)="rotate(1)"
            aria-label="Rotate right"
          />
        </div>

        <!-- Auto-rotate toggle -->
        <div class="absolute bottom-4 right-4 pointer-events-none">
          <app-button
            variant="glass"
            size="sm"
            [icon]="autoRotate() ? 'pause' : 'play'"
            class="pointer-events-auto"
            (click)="toggleAutoRotate()"
            [attr.aria-label]="autoRotate() ? 'Pause auto-rotate' : 'Start auto-rotate'"
          />
        </div>
      </div>

      <!-- Frame scrubber -->
      <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center px-4 pb-3">
        <input
          type="range"
          min="0"
          [max]="frames().length - 1"
          [value]="currentIndex()"
          (input)="scrub($event)"
          class="w-full max-w-md accent-secondary"
          aria-label="Scrub 360° view"
        />
      </div>

      <!-- Fullscreen trigger -->
      <div class="absolute top-3 right-3">
        <app-button
          variant="glass"
          size="sm"
          icon="maximize"
          (click)="requestFullscreen()"
          aria-label="View fullscreen"
        />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .touch-pan-y { touch-action: pan-y; }
  `]
})
export class Viewer360 {
  readonly frames = input.required<Viewer360Frame[]>();
  readonly alt = input('360° product view');
  readonly autoRotateSpeed = input(2000);
  readonly showControls = input(true);

  readonly currentIndex = signal(0);
  readonly loaded = signal(false);
  readonly dragging = signal(false);
  readonly dragStartX = signal(0);
  readonly startIndex = signal(0);
  readonly autoRotate = signal(false);
  private autoRotateTimer: ReturnType<typeof setInterval> | null = null;

  readonly currentFrame = computed<Viewer360Frame>(() => {
    const frame = this.frames()[this.currentIndex()] ?? this.frames()[0];
    return frame ?? { src: '', angle: 0 };
  });
  readonly currentFrameSrc = computed(() => this.currentFrame().src);
  readonly currentAngle = computed(() => Math.round(this.currentFrame().angle));
  readonly containerClass = computed(() => '');

  @ViewChild('viewerImg') viewerImg!: ElementRef<HTMLImageElement>;

  constructor() {
    afterNextRender(() => {
      this.preloadFrames();
    });
  }

  private preloadFrames(): void {
    this.frames().forEach(f => {
      const img = new Image();
      img.src = f.src;
    });
  }

  onPointerDown(event: PointerEvent): void {
    this.dragging.set(true);
    this.dragStartX.set(event.clientX);
    this.startIndex.set(this.currentIndex());
    this.viewerImg.nativeElement.style.cursor = 'grabbing';
    this.stopAutoRotate();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;
    const delta = event.clientX - this.dragStartX();
    const frameStep = Math.round(delta / 8);
    const newIndex = (this.startIndex() - frameStep + this.frames().length) % this.frames().length;
    this.currentIndex.set(newIndex);
  }

  onPointerUp(): void {
    if (this.dragging()) {
      this.dragging.set(false);
      this.viewerImg.nativeElement.style.cursor = 'grab';
    }
  }

  rotate(direction: number): void {
    this.currentIndex.update(i => (i + direction + this.frames().length) % this.frames().length);
  }

  scrub(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentIndex.set(parseInt(target.value, 10));
  }

  toggleAutoRotate(): void {
    this.autoRotate.update(v => !v);
    if (this.autoRotate()) {
      this.startAutoRotate();
    } else {
      this.stopAutoRotate();
    }
  }

  private startAutoRotate(): void {
    this.autoRotateTimer = setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.frames().length);
    }, this.autoRotateSpeed());
  }

  private stopAutoRotate(): void {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
  }

  requestFullscreen(): void {
    const container = this.viewerImg.nativeElement.closest('.relative');
    if (container?.requestFullscreen) {
      container.requestFullscreen();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }
}

@Component({
  selector: 'app-viewer-360-placeholder',
  imports: [AppIcon, AppButton],
  template: `
    <div class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 dark:border-white/10 flex items-center justify-center">
      <div class="text-center p-8">
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient/20">
          <app-icon name="rotate-3d" class="h-10 w-10 text-secondary" />
        </div>
        <h3 class="font-display text-xl font-semibold text-primary dark:text-white">360° Viewer</h3>
        <p class="mt-2 text-sm text-muted">Interactive 360° product view coming soon</p>
        <app-button variant="outline" size="sm" label="Notify Me" icon="bell" class="mt-6" />
      </div>
      <div class="absolute bottom-4 right-4 flex gap-2">
        <span class="badge badge-gold">Beta</span>
      </div>
    </div>
  `
})
export class Viewer360Placeholder {
  readonly productName = input('');
}