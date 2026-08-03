import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../../core/services/site-data.service';

@Component({
  selector: 'gs-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-20 bg-slate-900 px-4 py-14 text-slate-200 md:px-8">
      <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h3 class="section-title text-2xl text-white">Galaxy Sofas</h3>
          <p class="mt-3 text-sm text-slate-300">Luxury furniture crafted with precision, emotion, and timeless aesthetics.</p>
        </div>
        <div>
          <h4 class="font-semibold text-white">Explore</h4>
          <ul class="mt-3 space-y-2 text-sm">
            @for (item of siteData.navItems(); track item.path) {
              <li><a [routerLink]="item.path" class="hover:text-amber-300">{{ item.label }}</a></li>
            }
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white">Visit Studio</h4>
          <p class="mt-3 text-sm">Galaxy Sofas Experience Center, Chennai</p>
          <p class="text-sm">+91 90000 12345 · design@galaxysofas.com</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly siteData = inject(SiteDataService);
}
