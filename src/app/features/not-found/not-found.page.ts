import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema } from '../../core/seo/schema';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-not-found-page',
  imports: [AppButton, AppIcon, RevealDirective],
  template: `
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream dark:bg-dark">
      <div class="absolute inset-0" aria-hidden="true">
        <div class="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-gradient opacity-[0.07] blur-3xl animate-aurora"></div>
        <div class="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-secondary opacity-[0.05] blur-3xl animate-aurora" [style.animation-delay]="'-4s'"></div>
      </div>

      <div class="section-shell relative z-10 text-center">
        <div appReveal effect="fade-up">
          <h1 class="font-display text-8xl font-extrabold text-primary dark:text-white sm:text-9xl">404</h1>
          <div class="mt-4 text-secondary">
            <app-icon name="search" class="mx-auto h-16 w-16" />
          </div>
        </div>

        <h2 appReveal effect="fade-up" [delay]="100" class="mt-6 font-display text-3xl font-semibold text-primary dark:text-white sm:text-4xl">
          Page Not Found
        </h2>

        <p appReveal effect="fade-up" [delay]="160" class="mt-4 max-w-md text-lg text-muted">
          The page you're looking for doesn't exist or has been moved. Let's get you back to exploring our furniture.
        </p>

        <div appReveal effect="fade-up" [delay]="240" class="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <app-button label="Back Home" href="/" variant="gold" size="lg" icon="home" />
          <app-button label="Browse Furniture" href="/products" variant="outline" size="lg" icon="cart" [arrow]="false" />
          <app-button label="Contact Us" href="/contact" variant="ghost" size="lg" icon="phone" [arrow]="false" />
        </div>

        <div appReveal effect="fade-up" [delay]="320" class="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div class="rounded-xl bg-surface p-4 dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">15+</div>
            <p class="text-xs text-muted">Categories</p>
          </div>
          <div class="rounded-xl bg-surface p-4 dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">28</div>
            <p class="text-xs text-muted">Showrooms</p>
          </div>
          <div class="rounded-xl bg-surface p-4 dark:bg-dark-card">
            <div class="font-display text-2xl font-semibold text-secondary">1.2M+</div>
            <p class="text-xs text-muted">Happy Homes</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPage implements OnInit {
  readonly #seo = inject(SeoService);

  ngOnInit(): void {
    this.#seo.set({
      title: 'Page Not Found | Galaxy Sofas',
      description: 'The page you are looking for does not exist. Return to the Galaxy Sofas homepage to browse our luxury furniture collection.',
      canonical: '/404',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Page Not Found', path: '/404' },
        ]),
      ],
    });
  }
}


