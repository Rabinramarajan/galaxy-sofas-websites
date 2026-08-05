import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface ProjectShot {
  image: string;
  title: string;
  place: string;
}

const PROJECTS: ProjectShot[] = [
  { image: '/galaxysofas/image/Luxury-Living-Room/Grand-sunlit-salon.png', title: 'The Aurora in a Chennai villa', place: 'Chennai' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Compact-amber-apartment.png', title: 'Celestial cinema corner', place: 'Mumbai' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Double-height-villa-salon.png', title: 'Serenity master suite', place: 'Bengaluru' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Dusk-fireplace-den.png', title: 'Oakwood dinner for eight', place: 'Hyderabad' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Open-plan-oak-lounge.png', title: 'Nebula lounge upgrade', place: 'Pune' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Evening-velvet-sanctuary.png', title: 'Regalia heritage living', place: 'Delhi' },
  { image: '/galaxysofas/image/Luxury-Sofa/Cognac-leather-corner.png', title: 'Studio Raw reading corner', place: 'Kochi' },
  { image: '/galaxysofas/image/Luxury-Living-Room/Scandinavian-luxe-calm.png', title: 'Urban Nordic light home', place: 'Goa' },
];

/** Project Gallery — an editorial masonry; captions are always on (touch-safe). */
@Component({
  selector: 'app-home-gallery',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <div class="max-w-2xl">
          <span appReveal effect="fade-up" class="eyebrow text-gold">
            <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
            Project Gallery
          </span>
          <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
            Real homes,<br />real Galaxy
          </h2>
          <p appReveal effect="fade-up" [delay]="240" class="mt-5 text-base leading-relaxed text-umber dark:text-fawn">
            A wander through installed homes — villas, apartments and quiet corners across eight cities.
          </p>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          @for (project of projects(); track project.title; let i = $index) {
            <a
              appReveal
              effect="scale"
              [delay]="i * 70"
              routerLink="/gallery"
              class="group relative block overflow-hidden rounded-3xl"
              [class]="tileClass(i)"
            >
              <div class="relative h-full w-full overflow-hidden">
                <img
                  [src]="project.image"
                  [alt]="project.title"
                  width="1200"
                  height="1400"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent"></div>

                <!-- Persistent caption -->
                <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div class="min-w-0">
                    <span class="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light">{{ project.place }}</span>
                    <p class="mt-1 font-display text-base font-semibold leading-snug text-bone sm:text-lg">{{ project.title }}</p>
                  </div>
                  <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bone/10 text-bone ring-1 ring-bone/25 backdrop-blur-md transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-white group-hover:shadow-gold">
                    <app-icon name="arrowRight" class="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          }

          <!-- Editorial CTA banner -->
          <a
            appReveal
            effect="fade-up"
            [delay]="200"
            routerLink="/gallery"
            class="group relative col-span-1 flex items-center justify-between gap-6 overflow-hidden rounded-3xl border border-dashed border-line bg-linen px-7 py-8 transition-colors duration-500 hover:border-gold/60 sm:col-span-2 lg:col-span-12 lg:px-10 dark:border-line-dark dark:bg-espresso-soft"
          >
            <div>
              <span class="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">The full archive</span>
              <h3 class="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl dark:text-bone">Visit the gallery — 2,400 installed homes</h3>
            </div>
            <span class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold transition-transform duration-500 group-hover:translate-x-1">
              <app-icon name="arrowRight" class="h-5 w-5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeGallery {
  readonly projects = signal(PROJECTS);

  tileClass(index: number): string {
    const classes = [
      'lg:col-span-7 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[3/4]',
      'lg:col-span-5 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[3/4]',
      'lg:col-span-4 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]',
      'lg:col-span-4 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]',
      'lg:col-span-4 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]',
      'lg:col-span-5 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[3/4]',
      'lg:col-span-7 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[3/4]',
      'lg:col-span-6 lg:col-start-4 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[3/4]',
    ];
    return classes[index] ?? 'aspect-[4/5]';
  }
}
