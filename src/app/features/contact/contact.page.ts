import { Component, inject, signal, type OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { SITE } from '../../core/config/site.config';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { AppImage } from '../../shared/components/app-image/app-image';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  imports: [PageHero, AppIcon, AppImage, RevealDirective, FormsModule],
  template: `
    <app-page-hero
      title="Let's Talk"
      subtitle="Have a question, a project in mind, or just want to say hello? We're here for you."
      [showBreadcrumb]="true"
      breadcrumbLabel="Contact"
    />

    <section class="section-shell py-16 lg:py-24">
      <div class="grid gap-16 lg:grid-cols-12">
        <!-- Contact Info -->
        <div class="lg:col-span-4" appReveal effect="fade-up">
          <h3 class="font-display text-xl font-semibold text-primary dark:text-white">Get in Touch</h3>
          <div class="mt-6 space-y-5">
            <div class="flex items-start gap-4">
              <span class="mt-1 rounded-xl bg-secondary/10 p-3 text-secondary">
                <app-icon name="phone" class="h-6 w-6" />
              </span>
              <div>
                <p class="font-semibold text-primary dark:text-white">Phone</p>
                <p class="mt-1 text-muted">{{ SITE.phone }}</p>
                <p class="text-xs text-muted">Mon–Sun, 10 AM – 9 PM</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="mt-1 rounded-xl bg-secondary/10 p-3 text-secondary">
                <app-icon name="mail" class="h-6 w-6" />
              </span>
              <div>
                <p class="font-semibold text-primary dark:text-white">Email</p>
                <p class="mt-1 text-muted">{{ SITE.email }}</p>
                <p class="text-xs text-muted">We reply within 4 hours</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="mt-1 rounded-xl bg-secondary/10 p-3 text-secondary">
                <app-icon name="map" class="h-6 w-6" />
              </span>
              <div>
                <p class="font-semibold text-primary dark:text-white">Showroom</p>
                <p class="mt-1 text-muted">{{ SITE.address.full }}</p>
                <p class="text-xs text-muted">28 locations across 15 cities</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="mt-1 rounded-xl bg-secondary/10 p-3 text-secondary">
                <app-icon name="whatsapp" class="h-6 w-6" />
              </span>
              <div>
                <p class="font-semibold text-primary dark:text-white">WhatsApp</p>
                <p class="mt-1 text-muted">Send quick questions, photos or links</p>
              </div>
            </div>
          </div>

          <div class="mt-8 flex gap-4">
            <a [href]="SITE.social.instagram" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary transition-all hover:bg-secondary hover:text-white">
              <app-icon name="instagram" class="h-5 w-5" />
            </a>
            <a [href]="SITE.social.facebook" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary transition-all hover:bg-secondary hover:text-white">
              <app-icon name="facebook" class="h-5 w-5" />
            </a>
            <a [href]="SITE.social.youtube" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary transition-all hover:bg-secondary hover:text-white">
              <app-icon name="youtube" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-8" appReveal effect="fade-up" [delay]="100">
          <form (submit.prevent)="submit()" #form="ngForm" class="grid gap-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-primary dark:text-white">Name</label>
              <input type="text" required name="name" placeholder="Your name"
                class="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-primary dark:text-white">Email</label>
              <input type="email" required name="email" placeholder="you@email.com"
                class="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-primary dark:text-white">Phone</label>
              <input type="tel" name="phone" placeholder="+91 98765 43210"
                class="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-primary dark:text-white">Subject</label>
              <input type="text" name="subject" placeholder="How can we help?"
                class="mt-2 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-primary dark:text-white">Message</label>
              <textarea required name="message" rows="6" placeholder="Tell us about your project..."
                class="mt-2 w-full resize-y rounded-xl border border-primary/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white"></textarea>
            </div>
            <div class="sm:col-span-2">
              <button type="submit" [disabled]="submitting()"
                class="w-full rounded-full bg-gold-gradient px-8 py-4 font-semibold text-white shadow-gold transition-all hover:brightness-105 disabled:opacity-50">
                @if (submitting()) {
                  <span class="flex items-center justify-center gap-2">Sending...</span>
                } @else {
                  <span>Send Message</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="relative h-96 w-full">
      <app-img
        src="https://images.unsplash.com/photo-1580676217291-f1b5b3e0c808?auto=format&fit=crop&w=1920&q=80"
        alt="Galaxy Sofas showroom interior map"
        class="h-full w-full object-cover"
      />
    </section>
  `,
})
export class ContactPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly SITE = SITE;
  protected readonly submitting = signal(false);

  submit(): void {
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
    }, 1500);
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'Contact Us — Book a Consultation | Galaxy Sofas',
      description: 'Get in touch with our design team. Free consultations at our 28 showrooms, or book a virtual appointment. We reply within 4 hours.',
      canonical: '/contact',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Contact', path: '/contact' },
        ]),
      ],
    });
  }
}



