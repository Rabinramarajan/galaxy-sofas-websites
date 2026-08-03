import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../../core/services/site-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'gs-blog-page',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink],
  template: `
    <gs-breadcrumb />
    <section class="space-y-6">
      <h1 class="section-title text-4xl">Blog & Interior Inspiration</h1>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        @for (post of data.blogPosts(); track post.slug) {
          <article class="glass-card overflow-hidden">
            <img class="h-52 w-full object-cover" [src]="post.image" [alt]="post.title" loading="lazy" />
            <div class="p-5">
              <p class="text-xs uppercase tracking-widest text-amber-600">{{ post.category }} · {{ post.readTime }}</p>
              <h2 class="section-title mt-2 text-2xl">{{ post.title }}</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ post.excerpt }}</p>
              <a [routerLink]="['/blog', post.slug]" class="mt-3 inline-flex text-sm font-semibold text-amber-600">Read article →</a>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class BlogPageComponent {
  readonly data = inject(SiteDataService);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => this.seo.updateSeo('Blog | Galaxy Sofas', 'Design stories, buying guides, and interior inspiration from Galaxy Sofas.'));
  }
}
