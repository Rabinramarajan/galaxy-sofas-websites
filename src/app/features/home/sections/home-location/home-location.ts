import { Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { SITE } from '../../../../core/config/site.config';

/** Store location + showroom highlights band. */
@Component({
  selector: 'app-home-location',
  imports: [SectionHeader, AppIcon, RevealDirective, AppButton],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Map-style visual -->
        <div appReveal effect="scale" class="relative overflow-hidden rounded-[2rem] shadow-lift">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
            alt="City skyline where Galaxy Sofas showrooms are located"
            loading="lazy"
            decoding="async"
            class="h-[24rem] w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 text-secondary-light">
                <app-icon name="map" class="h-5 w-5" />
                <span class="text-xs font-bold uppercase tracking-widest">Experience Centres</span>
              </div>
              <div class="mt-1 font-display text-3xl font-bold text-white">{{ SITE.showroomCount }} showrooms · 15 cities</div>
            </div>
            <a href="/store-location" class="hidden shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-transform hover:scale-105 sm:block">
              Find a store
            </a>
          </div>
        </div>

        <!-- Copy -->
        <div>
          <app-section-header
            align="left"
            eyebrow="Visit Us"
            title="Come feel the difference"
            description="Furniture is a tactile decision. Visit any Galaxy showroom to sit in the actual pieces, test the mechanisms and talk materials with people who build them."
          />

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            @for (item of highlights; track item.label) {
              <div appReveal effect="fade-up" [delay]="$index * 80" class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-primary/5 dark:bg-dark-card dark:ring-white/5">
                <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <app-icon [name]="item.icon" class="h-5 w-5" />
                </span>
                <div>
                  <div class="text-sm font-semibold text-primary dark:text-white">{{ item.label }}</div>
                  <div class="text-xs text-muted">{{ item.text }}</div>
                </div>
              </div>
            }
          </div>

          <div appReveal effect="fade-up" [delay]="300" class="mt-9">
            <app-button href="/store-location" label="View All Store Locations" variant="gold" icon="map" />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeLocation {
  readonly SITE = SITE;

  readonly highlights = [
    { icon: 'sofa', label: 'Sit in the real thing', text: 'Every floor model, hands-on' },
    { icon: 'wrench', label: 'Mechanism testing', text: 'Recliners, lifts, soft-close — try it all' },
    { icon: 'users', label: 'Design consultations', text: 'Free 1:1 with our studio team' },
    { icon: 'gift', label: 'Showroom-only offers', text: 'Deals you won\u2019t find online' },
  ];
}
