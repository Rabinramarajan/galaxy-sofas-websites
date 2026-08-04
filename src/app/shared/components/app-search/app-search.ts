import { Component, ElementRef, HostListener, ViewChild, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppIcon } from '../app-icon/app-icon';
import { fadeIn } from '../../animations/animations';
import { CatalogService } from '../../../core/services/catalog.service';

/**
 * Global search overlay — live-results search across the catalog.
 * Opened from the navbar; closes on escape, backdrop or selection.
 */
@Component({
  selector: 'app-search',
  imports: [AppIcon],
  animations: [fadeIn],
  template: `
    @if (open()) {
      <div @fadeIn class="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 p-4 pt-24 backdrop-blur-sm sm:pt-32" (click)="close()">
        <div class="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lift dark:bg-dark-card" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-label="Search products">
          <div class="flex items-center gap-3 border-b border-primary/10 px-5 py-4 dark:border-white/10">
            <app-icon name="search" class="h-5 w-5 text-muted" />
            <input
              #searchInput
              type="search"
              placeholder="Search sofas, beds, dining sets…"
              aria-label="Search products"
              class="w-full bg-transparent text-base text-primary outline-none placeholder:text-muted/70 dark:text-white"
              [value]="query()"
              (input)="query.set(searchInput.value)"
            />
            <kbd class="hidden rounded-md border border-primary/10 px-2 py-1 text-[10px] font-semibold text-muted sm:block">ESC</kbd>
          </div>

          <div class="max-h-[55vh] overflow-y-auto p-4">
            @if (query() && results().length === 0) {
              <p class="px-3 py-8 text-center text-sm text-muted">No pieces found for “{{ query() }}”. Try “sofa” or “bed”.</p>
            }
            @if (!query()) {
              <div class="px-3 py-2">
                <p class="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted">Trending</p>
                <div class="flex flex-wrap gap-2">
                  @for (tag of trendingTags(); track tag) {
                    <button type="button" (click)="query.set(tag)" class="rounded-full border border-primary/10 px-4 py-1.5 text-sm text-primary transition-colors hover:border-secondary hover:text-secondary dark:border-white/15 dark:text-white">
                      {{ tag }}
                    </button>
                  }
                </div>
              </div>
            }
            @for (result of results(); track result.id) {
              <button
                type="button"
                (click)="go(result.slug)"
                class="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-surface dark:hover:bg-dark-soft"
              >
                <span class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-surface dark:bg-dark-soft">
                  <img [src]="result.images[0]" [alt]="result.alt" class="h-full w-full object-cover" loading="lazy" decoding="async" />
                </span>
                <span class="flex-1">
                  <span class="block font-semibold text-primary dark:text-white">{{ result.name }}</span>
                  <span class="block text-sm text-muted">{{ result.short }}</span>
                </span>
                <span class="text-sm font-bold text-secondary">₹{{ result.price.toLocaleString('en-IN') }}</span>
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class AppSearch {
  readonly #catalog = inject(CatalogService);
  readonly #router = inject(Router);

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  readonly open = signal(false);
  readonly query = signal('');

  readonly trendingTags = computed(() => ['Sofa', 'Bed', 'Recliner', 'Dining', 'Wardrobe', 'Office']);
  readonly results = computed(() => {
    const q = this.query().trim();
    return q ? this.#catalog.search(q).slice(0, 8) : [];
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }

  toggle(): void {
    this.open.update((v) => !v);
    if (this.open()) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 50);
    } else {
      this.query.set('');
    }
  }

  close(): void {
    this.open.set(false);
    this.query.set('');
  }

  go(slug: string): void {
    this.close();
    void this.#router.navigate(['/products', slug]);
  }
}
