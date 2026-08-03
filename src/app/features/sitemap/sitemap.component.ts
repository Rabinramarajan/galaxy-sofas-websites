import { Component, inject } from '@angular/core';
import { SitemapService } from '../../core/services/sitemap.service';

@Component({
  selector: 'app-sitemap',
  imports: [],
  template: ``,
})
export class SitemapComponent {
  readonly #sitemap = inject(SitemapService);

  constructor() {
if (typeof document !== 'undefined') {
      const xml = this.#sitemap.generate();
      document.body.textContent = xml;
    }
  }
}