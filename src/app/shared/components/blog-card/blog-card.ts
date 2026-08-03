import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../app-image/app-image';
import { AppIcon } from '../app-icon/app-icon';
import { RevealDirective } from '../../directives/reveal.directive';
import { formatDate } from '../../../core/utils/utils';
import type { BlogPost } from '../../../core/models/furniture.model';

/** Blog card — editorial grid item with hover lift. */
@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, AppImage, AppIcon, RevealDirective],
  template: `
    <article appReveal effect="fade-up" class="group h-full">
      <a [routerLink]="['/blog', post().slug]" class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift dark:bg-dark-card dark:ring-white/5">
        <div class="relative aspect-[16/10] overflow-hidden">
          <app-img [src]="post().cover" [alt]="post().title" class="block h-full w-full" />
          <span class="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-gold">
            {{ post().category }}
          </span>
        </div>
        <div class="flex flex-1 flex-col gap-3 p-6">
          <div class="flex items-center gap-3 text-xs text-muted">
            <span class="flex items-center gap-1.5"><app-icon name="calendar" class="h-3.5 w-3.5" /> {{ dateLabel() }}</span>
            <span class="flex items-center gap-1.5"><app-icon name="clock" class="h-3.5 w-3.5" /> {{ post().readTime }}</span>
          </div>
          <h3 class="font-display text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-secondary dark:text-white">
            {{ post().title }}
          </h3>
          <p class="line-clamp-2 text-sm text-muted">{{ post().excerpt }}</p>
          <span class="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-secondary">
            Read story
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </article>
  `,
})
export class BlogCard {
  readonly post = input.required<BlogPost>();
  readonly dateLabel = computed(() => formatDate(this.post().date));
}
