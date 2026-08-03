import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pageContent } from '../../data/page-content';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { AnimatedSectionComponent } from '../../../shared/components/animated-section/animated-section.component';

@Component({
  selector: 'gs-content-page',
  standalone: true,
  imports: [BreadcrumbComponent, AnimatedSectionComponent],
  template: `
    <gs-breadcrumb />
    <gs-animated-section [title]="content().title">
      <p class="max-w-3xl text-slate-600 dark:text-slate-300">{{ content().description }}</p>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        @for (section of content().sections; track section.heading) {
          <article class="glass-card p-5">
            <h3 class="section-title text-2xl">{{ section.heading }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ section.body }}</p>
          </article>
        }
      </div>
    </gs-animated-section>
  `
})
export class ContentPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly content = computed(() => {
    const key = this.route.snapshot.data['contentKey'] as string;
    return pageContent[key] ?? pageContent['about'];
  });

  constructor() {
    effect(() => {
      const content = this.content();
      this.seo.updateSeo(`${content.title} | Galaxy Sofas`, content.description);
    });
  }
}
