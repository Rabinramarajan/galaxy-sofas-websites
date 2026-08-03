import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  updateSeo(title: string, description: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  setSchema(schema: Record<string, unknown>): void {
    const existing = this.document.querySelector('script[data-schema="galaxy-sofas"]');
    existing?.remove();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset['schema'] = 'galaxy-sofas';
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
