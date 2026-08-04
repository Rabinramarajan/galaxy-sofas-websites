import { Component, signal } from '@angular/core';
import { SITE } from '../../core/config/site.config';
import { AppIcon } from '../../shared/components/app-icon/app-icon';

/** Sleek Floating WhatsApp / Contact Widget */
@Component({
  selector: 'app-floating-cta',
  imports: [AppIcon],
  template: `
    <div class="fixed bottom-6 right-6 z-[60]">
      <!-- Floating Action Buttons -->
      <div class="flex flex-col items-end gap-3">
        @if (expanded()) {
          <div class="flex flex-col items-end gap-3 transition-all duration-300" role="group" aria-label="Quick contact options">
            <a
              href="mailto:{{ SITE.email }}"
              class="group flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-dark-card dark:text-white"
              aria-label="Send us an email"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <app-icon name="mail" class="h-3.5 w-3.5" />
              </span>
              <span>Email Us</span>
            </a>

            <a
              href="tel:{{ SITE.phoneRaw }}"
              class="group flex items-center gap-2.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-primary"
              aria-label="Call Galaxy Sofas"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                <app-icon name="phone" class="h-3.5 w-3.5" />
              </span>
              <span>Call Us</span>
            </a>

            <a
              href="https://wa.me/{{ SITE.whatsapp }}?text={{ whatsappText() }}"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              aria-label="Chat on WhatsApp"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                <app-icon name="whatsapp" class="h-3.5 w-3.5" />
              </span>
              <span>WhatsApp Chat</span>
            </a>
          </div>
        }

        <!-- Main Toggle Button -->
        <button
          type="button"
          (click)="toggle()"
          class="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-gold transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-glow"
          [attr.aria-label]="expanded() ? 'Close quick contact' : 'Open quick contact'"
          [attr.aria-expanded]="expanded()"
        >
          @if (expanded()) {
            <app-icon name="close" class="h-5 w-5" />
          } @else {
            <app-icon name="whatsapp" class="h-6 w-6" />
          }
        </button>
      </div>
    </div>
  `,
})
export class FloatingCta {
  readonly SITE = SITE;
  readonly expanded = signal(false);

  toggle(): void {
    this.expanded.update((v) => !v);
  }

  whatsappText(): string {
    return encodeURIComponent('Hi Galaxy Sofas! I would like to inquire about your luxury furniture collection.');
  }
}