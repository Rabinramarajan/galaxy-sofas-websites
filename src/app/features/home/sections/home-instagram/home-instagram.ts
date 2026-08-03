import { Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppImage } from '../../../../shared/components/app-image/app-image';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { INSTAGRAM_HANDLE, SOCIAL_POSTS } from '../../../../core/data/content.data';

/** Instagram-style social feed grid with hover overlay. */
@Component({
  selector: 'app-home-instagram',
  imports: [SectionHeader, AppImage, AppIcon, RevealDirective],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <div class="flex flex-col items-center text-center">
        <app-section-header
          eyebrow="@galaxysofas"
          title="Follow the gallery on Instagram"
          description="Daily drop of real homes, works in progress and atelier moments."
        />
        <a href="{{ instagramUrl }}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform duration-300 hover:scale-105">
          <app-icon name="instagram" class="h-4 w-4" /> Follow @galaxysofas
        </a>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        @for (post of posts(); track post.id) {
          <a href="{{ instagramUrl }}" target="_blank" rel="noopener" appReveal effect="fade-up" [delay]="$index * 70" class="group relative block overflow-hidden rounded-2xl shadow-soft">
            <div class="relative aspect-square overflow-hidden">
              <app-img [src]="post.image" [alt]="post.alt" class="block h-full w-full" />
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/50 group-hover:opacity-100">
                <span class="flex items-center gap-1.5 text-sm font-bold text-white">
                  <app-icon name="heart" class="h-4 w-4 fill-current" /> {{ post.likes }}
                </span>
                <span class="px-4 text-center text-xs text-white/85">{{ post.caption }}</span>
              </div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
})
export class HomeInstagram {
  readonly posts = signal(SOCIAL_POSTS);
  readonly handle = INSTAGRAM_HANDLE;
  readonly instagramUrl = 'https://instagram.com/galaxysofas';
}
