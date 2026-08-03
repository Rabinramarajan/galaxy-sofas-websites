import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { AppImage } from '../../shared/components/app-image/app-image';
import { breadcrumbSchema } from '../../core/seo/schema';
import { BLOG_POSTS } from '../../core/data/content.data';
import { BlogPost } from '../../core/models/furniture.model';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { BlogCard } from '../../shared/components/blog-card/blog-card';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-blog-page',
  imports: [AppButton, AppIcon, AppImage, BlogCard, PageHero, RevealDirective, RouterLink, SectionHeader],
  template: `
    <app-page-hero
      title="Design Notes"
      subtitle="Insights, stories and lessons from our design studio and workshop floors."
      [showBreadcrumb]="true"
      breadcrumbLabel="Blog"
    />

    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="From the Studio"
        title="Latest from the Blog"
        description="Tips, deep-dives and behind-the-scenes stories from our artisans and designers."
      />

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        @for (post of posts(); track post.id) {
          <app-blog-card [post]="post" appReveal effect="fade-up" />
        }
      </div>

      <div class="mt-16 text-center">
        <app-button label="Load More Posts" variant="outline" icon="arrowRight" />
      </div>
    </section>

    <!-- Featured -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="Featured"
        title="Editor's Picks"
        description="Our most-read stories, hand-picked by the editorial team."
      />

      <div class="mt-12 grid gap-12 lg:grid-cols-2">
        @for (post of featuredPosts(); track post.id) {
          <article appReveal effect="fade-up" class="group grid gap-8 md:grid-cols-2">
            <a [routerLink]="['/blog', post.slug]" class="relative overflow-hidden rounded-2xl">
              <app-img [src]="post.cover" [alt]="post.title" class="aspect-[16/12] w-full object-cover transition-transform group-hover:scale-105" />
              <span class="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{{ post.category }}</span>
            </a>
            <div class="flex flex-col justify-center">
              <h3 class="font-display text-2xl font-semibold text-primary dark:text-white">{{ post.title }}</h3>
              <p class="mt-3 text-muted">{{ post.excerpt }}</p>
              <a [routerLink]="['/blog', post.slug]" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Read story
                <app-icon name="arrowRight" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class BlogPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly posts = signal<BlogPost[]>(BLOG_POSTS);
  protected readonly featuredPosts = computed(() => BLOG_POSTS.filter((p) => p.featured).slice(0, 2));

  ngOnInit(): void {
    this.#seo.set({
      title: 'Blog — Design Notes from the Galaxy Studio',
      description: 'Insights, buying guides and behind-the-scenes stories from our design studio and master craftsmen.',
      canonical: '/blog',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
        ]),
      ],
    });
  }
}



