import { Component, inject } from '@angular/core';
import { SitemapService } from '../../core/services/sitemap.service';

@Component({
  selector: 'app-robots',
  imports: [],
  template: ``,
})
export class RobotsComponent {
  readonly #sitemap = inject(SitemapService);

  constructor() {
    if (typeof document !== 'undefined') {
      const txt = this.#sitemap.generateRobots();
      document.body.textContent = txt;
    }
  }
}