import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema, faqSchema } from '../../core/seo/schema';
import { FAQS } from '../../core/data/testimonials.data';
import { AppButton } from '../../shared/components/app-button/app-button';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { FaqItem as FaqComponent } from '../../shared/components/faq-item/faq-item';
import { SectionHeader } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-faqs-page',
  imports: [AppButton, AppIcon, FaqComponent, NgClass, PageHero, SectionHeader],
  template: `
    <app-page-hero
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about ordering, delivery, warranty and care."
      [showBreadcrumb]="true"
      breadcrumbLabel="FAQs"
    />

    <section class="section-shell py-16 lg:py-24">
      <app-section-header
        tagline="Help Center"
        title="We've Got You Covered"
        description="Search our knowledge base or browse by topic below."
      />

      <div class="mt-6 max-w-2xl">
        <div class="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            (input)="searchQuery.set($any($event).target.value)"
            class="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white"
          />
          <app-icon name="search" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div class="mt-2 text-sm text-muted">
        {{ filteredFaqs().length }} question{{ filteredFaqs().length === 1 ? 's' : '' }} found
      </div>

      <div class="mt-6 divide-y divide-primary/10">
        @for (faq of filteredFaqs(); track faq.id) {
          <div class="py-3">
            <app-faq-item [question]="faq.question" [answer]="faq.answer" [id]="faq.id" />
          </div>
        }
      </div>

      <div class="mt-12 border-t border-primary/10 pt-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-muted">Still have questions? We're here to help.</p>
          <app-button label="Contact Us" variant="gold" icon="phone" />
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="section-shell py-16 lg:py-24 bg-surface dark:bg-dark-card">
      <app-section-header
        tagline="Categories"
        title="Browse by Topic"
        description="Jump to the most common questions in each area."
      />

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of faqGroups(); track group) {
          <a
            [ngClass]="{'bg-secondary text-white': activeGroup() === group}"
            class="block rounded-xl p-5 text-center transition-all duration-300 hover:bg-secondary hover:text-white"
            (click)="setActiveGroup(group)"
          >
            <h4 class="font-semibold">{{ group }}</h4>
            <p class="mt-1 text-sm">{{ groupsCount(group) }} question{{ groupsCount(group) === 1 ? '' : 's' }}</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class FaqsPage implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly searchQuery = signal('');
  protected readonly activeGroup = signal<string | null>(null);

  protected readonly filteredFaqs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const group = this.activeGroup();
    return FAQS.filter((f) => {
      if (query && !(f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query))) {
        return false;
      }
      if (group && f.group !== group) {
        return false;
      }
      return true;
    });
  });

  protected readonly faqGroups = computed(() => Array.from(new Set(FAQS.map((f) => f.group))));

  groupsCount(group: string): number {
    return FAQS.filter((f) => f.group === group).length;
  }

  setActiveGroup(group: string): void {
    const current = this.activeGroup();
    this.activeGroup.set(current === group ? null : group);
  }

  ngOnInit(): void {
    this.#seo.set({
      title: 'FAQs — Delivery, Warranty & Returns | Galaxy Sofas',
      description: 'Find answers to all your questions about ordering, delivery, warranty, returns, payment and assembly. 15-day returns, 5-year structural warranty.',
      canonical: '/faqs',
      ogType: 'website',
      jsonLd: [
        faqSchema(FAQS),
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'FAQs', path: '/faqs' },
        ]),
      ],
    });
  }
}



