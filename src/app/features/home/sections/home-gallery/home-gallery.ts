import { Component, computed } from '@angular/core';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { AppGallery } from '../../../../shared/components/app-gallery/app-gallery';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { BLOG_POSTS } from '../../../../core/data/content.data';
import type { MediaAsset } from '../../../../core/models/furniture.model';

/** Interior gallery strip — curated home imagery with lightbox. */
@Component({
  selector: 'app-home-gallery',
  imports: [SectionHeader, AppGallery, AppButton],
  template: `
    <section class="section-shell py-20 sm:py-28">
      <div class="flex flex-col items-end justify-between gap-6 lg:flex-row">
        <app-section-header
          align="left"
          eyebrow="The Galaxy Look"
          title="Interiors that stopped us mid-step"
          description="Real rooms, styled by our clients and interior partners — proof that great furniture is the whole room."
        />
        <div class="shrink-0 pb-2">
          <app-button href="/gallery" label="Full Gallery" variant="outline" />
        </div>
      </div>

      <div class="mt-12">
        <app-gallery [images]="images()" />
      </div>
    </section>
  `,
})
export class HomeGallery {
  readonly images = computed<MediaAsset[]>(() => {
    const covers = BLOG_POSTS.map((post) => ({
      src: post.cover,
      alt: post.title,
    }));
    const extra: MediaAsset[] = [
      { src: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80', alt: 'Beige corner sofa with scatter cushions' },
      { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', alt: 'Designer interior with warm wooden accents' },
      { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', alt: 'Serene bedroom with premium king bed' },
    ];
    return [...covers.slice(0, 4), ...extra, ...covers.slice(4, 6)];
  });
}
