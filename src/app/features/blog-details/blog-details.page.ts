import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { articleSchema, breadcrumbSchema } from '../../core/seo/schema';
import { BLOG_POSTS } from '../../core/data/content.data';
import { BlogPost } from '../../core/models/furniture.model';
import { formatDate } from '../../core/utils/utils';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppImage } from '../../shared/components/app-image/app-image';
import { BlogCard } from '../../shared/components/blog-card/blog-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-blog-details-page',
  imports: [AppButton, AppIcon, AppImage, BlogCard, PageHero, RevealDirective, SectionHeader],
  template: `
    @if (post(); as p) {
      <app-page-hero
        [title]="p.title"
        [subtitle]="p.excerpt"
        [showBreadcrumb]="true"
        breadcrumbLabel="Blog"
        breadcrumbPath="/blog"
      />

      <!-- Article Header -->
      <article class="section-shell py-12 lg:py-24">
        <div class="mx-auto max-w-4xl">
          <div appReveal effect="fade-up" class="flex items-center gap-4 text-xs text-muted">
            <span class="flex items-center gap-1.5">
              <app-icon name="user" class="h-3.5 w-3.5" />
              {{ p.author }}
            </span>
            <span>·</span>
            <span class="flex items-center gap-1.5">
              <app-icon name="calendar" class="h-3.5 w-3.5" />
              {{ formatDate(p.date) }}
            </span>
            <span>·</span>
            <span class="flex items-center gap-1.5">
              <app-icon name="clock" class="h-3.5 w-3.5" />
              {{ p.readTime }}
            </span>
          </div>

          <h1 appReveal effect="fade-up" [delay]="100" class="mt-6 font-display text-4xl font-semibold leading-tight text-primary dark:text-white sm:text-5xl">
            {{ p.title }}
          </h1>

          <div class="mt-8 overflow-hidden rounded-2xl">
            <app-img [src]="p.cover" [alt]="p.title" class="aspect-[21/9] w-full object-cover" />
          </div>

          <!-- Content Blocks -->
          <div class="mt-12 max-w-none text-muted">
            @for (block of p.content; track $index) {
              <div class="mt-8 first:mt-0">
                @switch (block.type) {
                  @case ('paragraph') {
                    <p class="text-lg leading-relaxed">{{ block.text }}</p>
                  }
                  @case ('heading') {
                    <h2 class="font-display text-2xl font-semibold text-primary dark:text-white">{{ block.text }}</h2>
                  }
                  @case ('list') {
                    <ul class="list-disc pl-6">
                      @for (item of block.items; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  }
                  @case ('quote') {
                    <blockquote class="border-l-4 border-secondary pl-6 italic">
                      <p>"{{ block.text }}"</p>
                      @if (block.author) {
                        <cite>— {{ block.author }}</cite>
                      }
                    </blockquote>
                  }
                  @case ('image') {
                    <img [src]="block.src" [alt]="block.alt" class="rounded-xl" />
                  }
                }
              </div>
            }
          </div>
        </div>
      </article>

      <!-- Related Posts -->
      <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
        <app-section-header
          tagline="More Stories"
          title="Continue Reading"
          description="Related articles you might enjoy."
        />

        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          @for (related of relatedPosts(); track related.id) {
            <app-blog-card [post]="related" appReveal effect="fade-up" />
          }
        </div>
      </section>
    }

    @if (!post()) {
      <div class="section-shell py-24 text-center">
        <h2 class="font-display text-3xl font-semibold text-primary dark:text-white">Story not found</h2>
        <p class="mt-4 text-muted">This article doesn't exist or has been moved.</p>
        <app-button label="Back to Blog" href="/blog" variant="gold" class="mt-6" />
      </div>
    }
  `,
})
export class BlogDetailsPage implements OnInit {
  readonly #seo = inject(SeoService);
  readonly #route = inject(ActivatedRoute);

  protected readonly post = signal<BlogPost | null>(null);
  protected readonly formatDate = formatDate;

  protected readonly relatedPosts = computed(() => {
    const current = this.post();
    if (!current) return [];
    return BLOG_POSTS.filter((p) => p.id !== current.id).slice(0, 3);
  });

  ngOnInit(): void {
    const slug = this.#route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = BLOG_POSTS.find((p) => p.slug === slug);
      if (found) {
        this.post.set(found);
      }
    }

    const current = this.post();
    if (current) {
      this.#seo.set({
        title: current.title,
        description: current.excerpt,
        canonical: `/blog/${current.slug}`,
        ogType: 'article',
        jsonLd: [
          articleSchema(current),
          breadcrumbSchema([
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: current.title, path: `/blog/${current.slug}` },
          ]),
        ],
      });
    }
  }
}



