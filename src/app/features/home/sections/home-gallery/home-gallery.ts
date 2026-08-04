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

/** Project gallery — an organic masonry of real installed homes. */
@Component({
  selector: 'app-home-gallery',
  imports: [RouterLink, AppIcon, RevealDirective],
  template: `
    <section class="relative bg-paper py-24 sm:py-32 dark:bg-espresso">
      <div class="section-shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Project Gallery
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Real homes,<br />real Galaxy
            </h2>
          </div>
          <a appReveal effect="fade-up" [delay]="200" routerLink="/gallery" class="group inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
            Visit the gallery
            <app-icon name="arrowRight" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div class="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          @for (project of projects(); track project.title; let i = $index) {
            <a
              appReveal
              effect="scale"
              [delay]="i * 60"
              routerLink="/gallery"
              class="group relative block overflow-hidden rounded-3xl"
              [class]="tileClass(i)"
            >
              <img
                [src]="project.image"
                [alt]="project.title"
                width="900"
                height="900"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/45"></div>
              <div class="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">{{ project.place }}</span>
                <p class="mt-1 font-display text-base font-semibold text-bone">{{ project.title }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeGallery {
  readonly projects = signal(PROJECTS);

  tileClass(index: number): string {
    const classes = [
      'aspect-[3/4]',
      'aspect-[4/5]',
      'aspect-[4/5]',
      'aspect-[3/4]',
      'aspect-[4/5]',
      'aspect-[3/4]',
      'aspect-[4/5]',
      'aspect-[4/5]',
    ];
    return classes[index] ?? 'aspect-[4/5]';
  }
}
