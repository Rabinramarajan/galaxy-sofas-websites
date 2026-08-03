import { Component, effect, inject, signal } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'gs-contact-page',
  standalone: true,
  template: `
    <section class="space-y-6">
      <h1 class="section-title text-4xl">Contact Galaxy Sofas</h1>
      <p class="max-w-2xl text-slate-600 dark:text-slate-300">Connect with our premium furniture consultants for home and office projects.</p>
      <div class="grid gap-6 md:grid-cols-2">
        <form class="glass-card space-y-4 p-6" (submit)="submitted.set(true); $event.preventDefault()">
          <label class="block text-sm">Name <input class="mt-2 w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-900" required /></label>
          <label class="block text-sm">Phone <input class="mt-2 w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-900" required /></label>
          <label class="block text-sm">Message <textarea class="mt-2 h-28 w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-900"></textarea></label>
          <button class="rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-900">Request Callback</button>
          @if (submitted()) { <p class="text-sm text-emerald-600">Thank you. Our design team will contact you shortly.</p> }
        </form>
        <article class="glass-card space-y-3 p-6">
          <h2 class="section-title text-2xl">Studio Location</h2>
          <p>Galaxy Sofas Experience Center, Chennai, Tamil Nadu</p>
          <p>Phone: +91 90000 12345</p>
          <p>Email: design@galaxysofas.com</p>
          <iframe title="Galaxy Sofas location" class="h-56 w-full rounded-2xl border-0" loading="lazy" src="https://www.google.com/maps?q=chennai&output=embed"></iframe>
        </article>
      </div>
    </section>
  `
})
export class ContactPageComponent {
  private readonly seo = inject(SeoService);
  readonly submitted = signal(false);

  constructor() {
    effect(() => this.seo.updateSeo('Contact | Galaxy Sofas', 'Reach Galaxy Sofas for luxury furniture consultations, custom projects, and showroom visits.'));
  }
}
