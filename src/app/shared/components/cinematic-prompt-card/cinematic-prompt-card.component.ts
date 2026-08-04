import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinematicBanner } from '../../../core/models/showcase.model';
import { UI_ANIMATIONS } from '../../../core/animations/luxury.animations';

@Component({
  selector: 'app-cinematic-prompt-card',
  standalone: true,
  imports: [CommonModule],
  animations: UI_ANIMATIONS,
  template: `
    <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-stone-900/80 to-stone-950/90 p-6 md:p-8 backdrop-blur-xl">
      <!-- Top Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300 tracking-wider uppercase">
            <span class="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            {{ banner().sceneType }} Prompt Studio
          </span>
          <h3 class="mt-2 font-serif text-2xl text-white font-light">
            {{ banner().title }}
          </h3>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="activeTab.set('static')"
            [class.bg-amber-400]="activeTab() === 'static'"
            [class.text-stone-950]="activeTab() === 'static'"
            [class.text-stone-400]="activeTab() !== 'static'"
            class="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300"
          >
            Static 8K
          </button>
          <button
            type="button"
            (click)="activeTab.set('gif')"
            [class.bg-amber-400]="activeTab() === 'gif'"
            [class.text-stone-950]="activeTab() === 'gif'"
            [class.text-stone-400]="activeTab() !== 'gif'"
            class="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300"
          >
            GIF Loop
          </button>
          <button
            type="button"
            (click)="activeTab.set('mp4')"
            [class.bg-amber-400]="activeTab() === 'mp4'"
            [class.text-stone-950]="activeTab() === 'mp4'"
            [class.text-stone-400]="activeTab() !== 'mp4'"
            class="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300"
          >
            MP4 Video
          </button>
        </div>
      </div>

      <!-- Prompt Text Content -->
      <div class="mt-6">
        <div class="relative rounded-2xl border border-white/5 bg-stone-950 p-5 font-mono text-xs text-amber-100/90 leading-relaxed">
          @if (activeTab() === 'static') {
            <p>{{ banner().promptStatic }}</p>
          } @else if (activeTab() === 'gif') {
            <p>{{ banner().promptGif }}</p>
          } @else {
            <p>{{ banner().promptMp4 }}</p>
          }

          <button
            type="button"
            (click)="copyPrompt()"
            class="absolute right-3 top-3 rounded-lg border border-amber-400/30 bg-stone-900/80 px-3 py-1.5 text-[11px] font-sans font-medium text-amber-300 hover:bg-amber-400 hover:text-stone-950 transition-all duration-300"
          >
            {{ copied() ? 'Copied!' : 'Copy Prompt' }}
          </button>
        </div>
      </div>

      <!-- Camera & Lighting Specs Grid -->
      <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-6">
        <div class="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <span class="text-[10px] uppercase tracking-wider text-amber-400/70 block">Camera Movement</span>
          <span class="mt-1 text-xs text-stone-300 block font-light">{{ banner().cameraSpecs.movement }}</span>
        </div>
        <div class="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <span class="text-[10px] uppercase tracking-wider text-amber-400/70 block">Lens & Aperture</span>
          <span class="mt-1 text-xs text-stone-300 block font-light">{{ banner().cameraSpecs.lens }}</span>
        </div>
        <div class="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <span class="text-[10px] uppercase tracking-wider text-amber-400/70 block">Lighting Setup</span>
          <span class="mt-1 text-xs text-stone-300 block font-light">{{ banner().cameraSpecs.lighting }}</span>
        </div>
        <div class="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <span class="text-[10px] uppercase tracking-wider text-amber-400/70 block">Color Grading</span>
          <span class="mt-1 text-xs text-stone-300 block font-light">{{ banner().cameraSpecs.colorGrading }}</span>
        </div>
      </div>
    </div>
  `
})
export class CinematicPromptCardComponent {
  readonly banner = input.required<CinematicBanner>();
  readonly activeTab = signal<'static' | 'gif' | 'mp4'>('static');
  readonly copied = signal<boolean>(false);

  copyPrompt(): void {
    const currentTab = this.activeTab();
    const prompt = currentTab === 'static'
      ? this.banner().promptStatic
      : currentTab === 'gif'
        ? this.banner().promptGif
        : this.banner().promptMp4;

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(prompt);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
