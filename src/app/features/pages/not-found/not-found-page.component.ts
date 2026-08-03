import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gs-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="glass-card mx-auto max-w-2xl space-y-4 p-10 text-center">
      <p class="text-7xl font-bold text-amber-500">404</p>
      <h1 class="section-title text-4xl">Page Not Found</h1>
      <p class="text-slate-600 dark:text-slate-300">The page you are looking for does not exist or has moved.</p>
      <a routerLink="/" class="inline-flex rounded-full bg-slate-900 px-6 py-3 text-white dark:bg-white dark:text-slate-900">Back to Home</a>
    </section>
  `
})
export class NotFoundPageComponent {}
