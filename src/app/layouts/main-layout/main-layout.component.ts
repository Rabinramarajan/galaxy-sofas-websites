import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'gs-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <gs-navbar />
    <main class="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <router-outlet />
    </main>
    <a href="https://wa.me/919000012345" class="fixed bottom-24 right-6 z-40 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg">WhatsApp</a>
    <a href="mailto:design@galaxysofas.com" class="fixed bottom-8 right-6 z-40 rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">Email Us</a>
    <gs-footer />
  `
})
export class MainLayoutComponent {}
