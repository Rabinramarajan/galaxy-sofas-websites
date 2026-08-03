import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteDataService } from '../../../core/services/site-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'gs-blog-detail-page',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <gs-breadcrumb />
    @if (post(); as post) {
      <article class="mx-auto max-w-4xl space-y-6">
        <img class="h-96 w-full rounded-3xl object-cover" [src]="post.image" [alt]="post.title" loading="eager" />
        <p class="text-xs uppercase tracking-widest text-amber-600">{{ post.category }} · {{ post.readTime }}</p>
        <h1 class="section-title text-4xl">{{ post.title }}</h1>
        <p class="text-slate-600 dark:text-slate-300">{{ post.excerpt }}</p>
        <p class="text-slate-600 dark:text-slate-300">Luxury interiors thrive on proportion, material contrast, and layered lighting. Galaxy Sofas design consultants recommend balancing statement furniture with breathing space and curated décor to maintain premium visual harmony.</p>
      </article>
    }
  `
})
export class BlogDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(SiteDataService);
  private readonly seo = inject(SeoService);

  readonly post = computed(() => this.data.blogPosts().find((item) => item.slug === this.route.snapshot.params['slug']) ?? this.data.blogPosts()[0]);

  constructor() {
    effect(() => {
      const post = this.post();
      this.seo.updateSeo(`${post.title} | Galaxy Sofas Blog`, post.excerpt);
    });
  }
}
