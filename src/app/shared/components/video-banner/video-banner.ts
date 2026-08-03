import { Component, input, signal, computed, ViewChild, ElementRef, afterNextRender, HostListener } from '@angular/core';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';
import { AppButton } from '../app-button/app-button';

@Component({
  selector: 'app-video-banner',
  imports: [AppImage, AppIcon, AppButton],
  template: `
    <div class="relative overflow-hidden rounded-2xl bg-black" [class]="containerClass()">
      <!-- Poster image -->
      @if (!playing() || !videoLoaded()) {
        <div class="absolute inset-0 z-10" [class.opacity-0]="playing() && videoLoaded()">
          <app-img
            [src]="poster()"
            [alt]="alt()"
            [priority]="'high'"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      }

      <!-- Video element -->
      <video
        #videoEl
        [src]="videoSrc()"
        [poster]="poster()"
        [muted]="true"
        [playsInline]="true"
        [preload]="'metadata'"
        class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
        [class.opacity-100]="playing() && videoLoaded()"
        (loadeddata)="onLoadedData()"
        (timeupdate)="onTimeUpdate()"
        (ended)="onEnded()"
        (error)="onError()"
      ></video>

      <!-- Play overlay -->
      @if (!playing()) {
        <button
          type="button"
          (click)="play()"
          class="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent"
          aria-label="Play video"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-110">
            <app-icon name="play" class="h-8 w-8 text-white ml-1" />
          </div>
        </button>
      }

      <!-- Controls overlay -->
      @if (showControls() && (playing() || videoLoaded())) {
        <div class="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="flex items-center gap-4">
            <app-button
              variant="glass"
              size="sm"
              [icon]="playing() ? 'pause' : 'play'"
              (click)="togglePlay()"
              [attr.aria-label]="playing() ? 'Pause' : 'Play'"
            />
            <div class="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-secondary transition-all duration-100" [style.width.%]="progress()"></div>
            </div>
            <span class="text-xs text-white/80 font-mono">{{ formatTime(currentTime()) }} / {{ formatTime(duration()) }}</span>
            <app-button
              variant="glass"
              size="sm"
              [icon]="muted() ? 'volumeX' : 'volume2'"
              (click)="toggleMute()"
              [attr.aria-label]="muted() ? 'Unmute' : 'Mute'"
            />
            <app-button
              variant="glass"
              size="sm"
              icon="maximize"
              (click)="requestFullscreen()"
              aria-label="Fullscreen"
            />
          </div>
        </div>
      }

      <!-- Content overlay -->
      <ng-content select="[slot=content]" />

      <!-- Loading indicator -->
      @if (loading()) {
        <div class="absolute inset-0 z-40 flex items-center justify-center bg-black/40">
          <app-icon name="loader" class="h-8 w-8 animate-spin text-secondary" />
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    video { touch-action: none; }
  `]
})
export class VideoBanner {
  readonly videoSrc = input.required<string>();
  readonly poster = input.required<string>();
  readonly alt = input('Video banner');
  readonly autoPlay = input(false);
  readonly loop = input(true);
  readonly muted = input(true);
  readonly showControls = input(true);
  readonly aspectRatio = input<'16/9' | '4/3' | '21/9'>('16/9');

  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  readonly playing = signal(false);
  readonly videoLoaded = signal(false);
  readonly loading = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly progress = signal(0);
  readonly mutedState = signal(true);

  readonly containerClass = computed(() => {
    const ratios: Record<string, string> = { '16/9': 'aspect-video', '4/3': 'aspect-[4/3]', '21/9': 'aspect-[21/9]' };
    return ratios[this.aspectRatio()] || 'aspect-video';
  });

  constructor() {
    afterNextRender(() => {
      this.mutedState.set(this.muted());
      if (this.autoPlay()) {
        this.play();
      }
    });
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden && this.playing()) {
      this.pause();
    }
  }

  play(): void {
    this.loading.set(true);
    const video = this.videoEl?.nativeElement;
    if (video) {
      video.muted = this.mutedState();
      video.loop = this.loop();
      video.play().then(() => {
        this.playing.set(true);
        this.loading.set(false);
      }).catch(() => {
        this.loading.set(false);
      });
    }
  }

  pause(): void {
    const video = this.videoEl?.nativeElement;
    if (video) {
      video.pause();
      this.playing.set(false);
    }
  }

  togglePlay(): void {
    if (this.playing()) this.pause(); else this.play();
  }

  toggleMute(): void {
    const video = this.videoEl?.nativeElement;
    if (video) {
      this.mutedState.update(v => !v);
      video.muted = this.mutedState();
    }
  }

  requestFullscreen(): void {
    const video = this.videoEl?.nativeElement;
    if (video?.requestFullscreen) {
      video.requestFullscreen();
    }
  }

  onLoadedData(): void {
    this.videoLoaded.set(true);
    this.duration.set(this.videoEl.nativeElement.duration);
  }

  onTimeUpdate(): void {
    const video = this.videoEl?.nativeElement;
    if (video) {
      this.currentTime.set(video.currentTime);
      this.progress.set((video.currentTime / video.duration) * 100);
    }
  }

  onEnded(): void {
    if (!this.loop()) {
      this.playing.set(false);
    }
  }

  onError(): void {
    this.loading.set(false);
    this.playing.set(false);
    console.error('Video load error');
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
}

@Component({
  selector: 'app-video-banner-placeholder',
  imports: [AppIcon, AppButton, AppImage],
  template: `
    <div class="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 dark:border-white/10">
      <app-img
        [src]="poster()"
        [alt]="alt()"
        class="h-full w-full object-cover opacity-60"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 text-center text-white">
        <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
          <app-icon name="play" class="h-8 w-8 ml-1" />
        </div>
        <h3 class="font-display text-2xl font-semibold mb-2">{{ title() }}</h3>
        <p class="text-white/70 max-w-md mx-auto mb-6">{{ description() }}</p>
        <app-button variant="gold" label="Watch Video" icon="play" size="lg" />
        <div class="mt-8 flex items-center gap-4 text-sm text-white/60">
          <span class="flex items-center gap-1.5"><app-icon name="clock" class="h-4 w-4" /> {{ duration() }}</span>
          <span class="flex items-center gap-1.5"><app-icon name="eye" class="h-4 w-4" /> 4K Available</span>
        </div>
      </div>
    </div>
  `
})
export class VideoBannerPlaceholder {
  readonly poster = input.required<string>();
  readonly alt = input('Video placeholder');
  readonly title = input('Video Title');
  readonly description = input('Video description');
  readonly duration = input('2:30');
}