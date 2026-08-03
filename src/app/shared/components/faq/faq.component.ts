import { Component, input, signal } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FaqItem } from '../../../core/models/site.models';

@Component({
  selector: 'gs-faq',
  standalone: true,
  imports: [CdkAccordionModule],
  template: `
    <section class="space-y-3" cdkAccordion>
      @for (item of items(); track item.question; let i = $index) {
        <article class="glass-card p-5" cdkAccordionItem>
          <button class="flex w-full items-center justify-between text-left" (click)="toggle(i)">
            <span class="font-semibold">{{ item.question }}</span>
            <span>{{ openIndex() === i ? '−' : '+' }}</span>
          </button>
          @if (openIndex() === i) {
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ item.answer }}</p>
          }
        </article>
      }
    </section>
  `
})
export class FaqComponent {
  readonly items = input.required<FaqItem[]>();
  readonly openIndex = signal(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? -1 : index));
  }
}
