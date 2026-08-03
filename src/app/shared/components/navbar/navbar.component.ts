import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteDataService } from '../../../core/services/site-data.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MegaMenuComponent } from '../mega-menu/mega-menu.component';

@Component({
  selector: 'gs-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MegaMenuComponent],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a routerLink="/" class="section-title text-2xl font-semibold">Galaxy Sofas</a>
        <ul class="hidden items-center gap-6 md:flex">
          @for (item of navItems(); track item.path) {
            <li><a [routerLink]="item.path" routerLinkActive="text-amber-600" class="text-sm font-medium">{{ item.label }}</a></li>
          }
          <li class="relative">
            <button class="text-sm font-medium" (mouseenter)="openMegaMenu.set(true)" (mouseleave)="openMegaMenu.set(false)">Categories</button>
            @if (openMegaMenu()) {
              <div class="absolute right-0 top-8 w-[28rem]" (mouseenter)="openMegaMenu.set(true)" (mouseleave)="openMegaMenu.set(false)">
                <gs-mega-menu [categories]="categories()"/>
              </div>
            }
          </li>
        </ul>
        <button class="rounded-full border px-3 py-2 text-xs" (click)="theme.toggleTheme()">{{ themeLabel() }}</button>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  private readonly siteData = inject(SiteDataService);
  readonly theme = inject(ThemeService);
  readonly navItems = this.siteData.navItems;
  readonly categories = computed(() => this.siteData.categories().slice(0, 4));
  readonly openMegaMenu = signal(false);
  readonly themeLabel = computed(() => (this.theme.isDark() ? 'Light' : 'Dark'));
}
