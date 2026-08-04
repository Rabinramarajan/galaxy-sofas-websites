import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS } from '../../../../core/data/testimonials.data';
import { FaqItem } from '../../../../shared/components/faq-item/faq-item';
import { AppIcon } from '../../../../shared/components/app-icon/app-icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** FAQs — answers beside a standing invitation to talk. */
@Component({
  selector: 'app-home-faqs',
  imports: [RouterLink, FaqItem, AppIcon, RevealDirective],
  template: `
    <section class="relative bg-linen py-24 sm:py-32 dark:bg-espresso-soft">
      <div class="section-shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <span appReveal effect="fade-up" class="eyebrow text-gold">
              <span class="h-px w-10 bg-gradient-to-r from-gold to-transparent"></span>
              Good to Know
            </span>
            <h2 appReveal effect="fade-up" [delay]="120" class="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-tight text-balance text-ink sm:text-5xl dark:text-bone">
              Questions,<br />answered
            </h2>
            <div appReveal effect="fade-up" [delay]="240" class="mt-7 rounded-3xl bg-snow p-7 ring-1 ring-line dark:bg-espresso dark:ring-line-dark">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <app-icon name="message-square" class="h-5 w-5" />
                </span>
                <span class="font-display text-lg font-semibold text-ink dark:text-bone">Still curious?</span>
              </div>
              <p class="mt-3 text-sm leading-relaxed text-taupe dark:text-fawn">
                Our design consultants reply within hours — by phone, WhatsApp or at a showroom near you.
              </p>
              <a routerLink="/faqs" class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
                Browse all FAQs <app-icon name="arrowRight" class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-4 lg:col-span-8">
          @for (faq of faqs(); track faq.id; let i = $index) {
            <div appReveal effect="fade-up" [delay]="i * 60">
              <app-faq-item [question]="faq.question" [answer]="faq.answer" [id]="faq.id" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeFaqs {
  readonly faqs = signal(FAQS.slice(0, 6));
}
