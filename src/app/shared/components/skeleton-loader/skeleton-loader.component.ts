import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse rounded-3xl border border-white/5 bg-stone-900/40 p-6 backdrop-blur-md">
      <div class="aspect-[4/3] w-full rounded-2xl bg-stone-800/60"></div>
      <div class="mt-6 space-y-3">
        <div class="h-3 w-1/4 rounded bg-stone-800/60"></div>
        <div class="h-6 w-3/4 rounded bg-stone-800"></div>
        <div class="h-4 w-full rounded bg-stone-800/40"></div>
      </div>
      <div class="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <div class="h-6 w-20 rounded bg-stone-800"></div>
        <div class="h-10 w-10 rounded-full bg-stone-800"></div>
      </div>
    </div>
  `
})
export class SkeletonLoaderComponent {}
