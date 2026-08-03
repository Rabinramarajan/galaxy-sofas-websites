import { Component, input } from '@angular/core';
import { AnimatedButtonComponent } from '../animated-button/animated-button.component';

@Component({
  selector: 'gs-hero',
  standalone: true,
  imports: [AnimatedButtonComponent],
  template: `
    <section class="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-20 text-white md:px-14">
      <div class="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl"></div>
      <div class="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div class="relative grid gap-10 md:grid-cols-2 md:items-center">
        <div class="space-y-6">
          <p class="text-sm uppercase tracking-[0.2em] text-amber-300">Luxury Furniture Studio</p>
          <h1 class="section-title text-4xl font-semibold leading-tight md:text-6xl">{{ title() }}</h1>
          <p class="max-w-xl text-slate-200">{{ subtitle() }}</p>
          <gs-animated-button label="Book Design Consultation" (clicked)="scrollToContact()"/>
        </div>
        <div class="float-animate">
          <img class="h-full w-full rounded-3xl object-cover" src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Luxury living room with premium sofa" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();

  scrollToContact(): void {
    document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' });
  }
}
