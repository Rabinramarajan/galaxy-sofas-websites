import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppImage } from '../../../../shared/components/app-image/app-image';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface LookbookItem {
  id: string;
  title: string;
  room: string;
  style: string;
  image: string;
  alt: string;
  featured: boolean;
}

@Component({
  selector: 'app-home-lookbook',
  imports: [RouterLink, AppImage, AppButton, AppIcon, SectionHeader, RevealDirective],
  template: `
    <section class="section-shell py-16 lg:py-24 bg-gradient-to-b from-surface to-white dark:from-dark-card dark:to-dark">
      <app-section-header
        tagline="Shop the Look"
        title="Complete Room Designs"
        description="Curated looks you can shop instantly. Each room is styled with our furniture — tap to see the pieces."
      />

      <div class="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        @for (item of items(); track item.id; let i = $index) {
          <article
            appReveal
            effect="fade-up"
            [delay]="i * 100"
            class="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-lift hover:-translate-y-1"
          >
            <a [routerLink]="['/lookbook', item.id]" class="block">
              <div class="relative aspect-[4/5] overflow-hidden">
                <app-img
                  [src]="item.image"
                  [alt]="item.alt"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    @if (item.featured) {
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-3">Featured</span>
                    }
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md text-white">
                      <app-icon name="home" class="h-3 w-3" />
                      {{ item.room }}
                    </span>
                  </div>
                  <div class="text-white">
                    <h3 class="font-display text-lg font-semibold sm:text-xl">{{ item.title }}</h3>
                    <p class="mt-1 text-sm text-white/80">{{ item.style }}</p>
                  </div>
                </div>
              </div>
            </a>
            <!-- Quick Shop -->
            <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <app-button
                variant="white"
                size="sm"
                label="Shop This Look"
                icon="cart"
                class="w-full"
                [routerLink]="'/lookbook/' + item.id"
              />
            </div>
          </article>
        }
      </div>

      <div class="mt-10 text-center">
        <app-button variant="outline" label="View All Looks" icon="arrowRight" size="lg" routerLink="/lookbook" />
      </div>
    </section>
  `,
})
export class HomeLookbook {
  readonly items = signal<LookbookItem[]>([
    {
      id: 'l1',
      title: 'Warm Nordic Living',
      room: 'Living Room',
      style: 'Urban Nordic · Minimal',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      alt: 'Warm Nordic living room with light oak furniture',
      featured: true,
    },
    {
      id: 'l2',
      title: 'Velvet Opulence',
      room: 'Living Room',
      style: 'Royal Velvet · Luxury',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      alt: 'Luxury velvet sofa in emerald green living room',
      featured: true,
    },
    {
      id: 'l4',
      title: 'Sanctuary Bedroom',
      room: 'Bedroom',
      style: 'Serene Minimal',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      alt: 'Serene bedroom with king bed and minimal decor',
      featured: true,
    },
    {
      id: 'l3',
      title: 'Heritage Dining',
      room: 'Dining Room',
      style: 'Heritage · Classic',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      alt: 'Heritage dining room with carved wooden table',
      featured: false,
    },
  ]);
}