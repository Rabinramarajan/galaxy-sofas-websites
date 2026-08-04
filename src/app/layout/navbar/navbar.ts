import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NAV_ITEMS, SITE } from '../../core/config/site.config';
import { ThemeService } from '../../core/services/theme.service';
import { AppSearch } from '../../shared/components/app-search/app-search';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { CompareService, WishlistService } from '../../core/services/store.services';
import { cx } from '../../core/utils/utils';

/**
 * Sticky glass navbar — clean top-level links in the header only.
 * Scroll-aware: shrinks + gains shadow when scrolled.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AppIcon, AppSearch],
  template: `
    <!-- Top Info Announcement Bar -->
    <div class="relative z-[60] hidden bg-[#0a0e17] text-white/80 lg:block border-b border-white/10 text-xs">
      <div class="section-shell flex items-center justify-between py-2 font-medium">
        <!-- Left: Delivery badge -->
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-bold text-secondary ring-1 ring-secondary/30">
            <app-icon name="truck" class="h-3 w-3" />
            FREE DELIVERY
          </span>
          <span class="text-white/90">White-glove assembly & free shipping across India on orders over ₹25,000</span>
        </div>

        <!-- Right: Contact info & Socials -->
        <div class="flex items-center gap-6">
          <a href="tel:{{ SITE.phoneRaw }}" class="flex items-center gap-1.5 text-white/80 transition-colors hover:text-secondary">
            <app-icon name="phone" class="h-3.5 w-3.5 text-secondary" />
            <span>{{ SITE.phone }}</span>
          </a>
          <span class="flex items-center gap-1.5 text-white/80">
            <app-icon name="map" class="h-3.5 w-3.5 text-secondary" />
            <span>{{ SITE.showroomCount }} Showrooms</span>
          </span>
          <span class="flex items-center gap-1.5 text-white/80">
            <app-icon name="clock" class="h-3.5 w-3.5 text-secondary" />
            <span>10 AM – 9 PM</span>
          </span>
          <div class="flex items-center gap-2.5 border-l border-white/15 pl-5">
            <a href="{{ SITE.social.instagram }}" target="_blank" rel="noopener" class="text-white/60 transition-colors hover:text-secondary" aria-label="Instagram">
              <app-icon name="instagram" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.facebook }}" target="_blank" rel="noopener" class="text-white/60 transition-colors hover:text-secondary" aria-label="Facebook">
              <app-icon name="facebook" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.youtube }}" target="_blank" rel="noopener" class="text-white/60 transition-colors hover:text-secondary" aria-label="YouTube">
              <app-icon name="youtube" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header Navbar -->
    <header
      class="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-2xl transition-all duration-300 dark:bg-[#0b0f19]/95 border-primary/10 dark:border-white/10"
      [class]="headerClasses()"
    >
      <nav class="section-shell flex items-center justify-between" aria-label="Main navigation">
        <!-- Brand Logo -->
        <a routerLink="/" class="group flex items-center gap-3 shrink-0" aria-label="Galaxy Sofas home">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient shadow-gold transition-all duration-300 group-hover:scale-105">
            <app-icon name="sofa" class="h-5 w-5 text-white" />
          </span>
          <div class="flex flex-col">
            <span class="font-display text-xl font-bold tracking-tight leading-none text-primary dark:text-white">
              Galaxy <span class="text-gradient-gold">Sofas</span>
            </span>
            <span class="text-[9px] font-bold uppercase tracking-[0.25em] text-muted mt-1">{{ SITE.tagline }}</span>
          </div>
        </a>

        <!-- Main Desktop Navigation Menu -->
        <ul class="hidden items-center gap-1 xl:gap-2 lg:flex">
          @for (item of navItems(); track item.path + item.label) {
            <li>
              <a
                routerLink="{{ item.path }}"
                class="relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-primary/5 dark:hover:bg-white/10"
                [class]="linkClass(item.path)"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Action Tools & CTA -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            (click)="search.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-all duration-200 hover:bg-primary/5 hover:text-primary dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Search"
          >
            <app-icon name="search" class="h-4 w-4" />
          </button>

          <button
            type="button"
            (click)="theme.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-all duration-200 hover:bg-primary/5 hover:text-primary dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            [attr.aria-label]="isDark() ? 'Light mode' : 'Dark mode'"
          >
            @if (isDark()) {
              <app-icon name="sun" class="h-4 w-4" />
            } @else {
              <app-icon name="moon" class="h-4 w-4" />
            }
          </button>

          <a
            routerLink="/wishlist"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-all duration-200 hover:bg-primary/5 hover:text-primary sm:flex dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Wishlist"
          >
            <app-icon name="heart" class="h-4 w-4" />
            @if (wishlistCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-gradient px-1 text-[9px] font-bold text-white shadow-gold">{{ wishlistCount() }}</span>
            }
          </a>

          <a
            routerLink="/compare"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-all duration-200 hover:bg-primary/5 hover:text-primary md:flex dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Compare"
          >
            <app-icon name="compare" class="h-4 w-4" />
            @if (compareCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white dark:bg-secondary">{{ compareCount() }}</span>
            }
          </a>

          <a
            routerLink="/contact"
            class="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-gold transition-all duration-300 hover:shadow-glow hover:brightness-105 xl:inline-flex"
          >
            Book Consultation
          </a>

          <button
            type="button"
            (click)="mobileOpen.set(!mobileOpen())"
            class="flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-colors hover:bg-primary/5 lg:hidden dark:text-white/80 dark:hover:bg-white/10"
            [attr.aria-label]="mobileOpen() ? 'Close menu' : 'Open menu'"
          >
            @if (mobileOpen()) {
              <app-icon name="close" class="h-4.5 w-4.5" />
            } @else {
              <app-icon name="menu" class="h-4.5 w-4.5" />
            }
          </button>
        </div>
      </nav>

      <!-- Mobile drawer -->
      @if (mobileOpen()) {
        <div class="border-t border-primary/10 bg-white/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-dark-soft/95">
          <div class="section-shell max-h-[75vh] overflow-y-auto py-4">
            @for (item of navItems(); track item.path + item.label) {
              <a routerLink="{{ item.path }}" (click)="mobileOpen.set(false)" class="block rounded-xl px-3 py-3 font-semibold text-primary hover:bg-primary/5 hover:text-secondary dark:text-white">
                {{ item.label }}
              </a>
            }
            <div class="mt-2 grid grid-cols-2 gap-2">
              <a routerLink="/wishlist" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-secondary/10 px-3 py-3 font-semibold text-secondary">
                <app-icon name="heart" class="h-4 w-4" /> Wishlist
                @if (wishlistCount() > 0) {
                  <span class="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-white">{{ wishlistCount() }}</span>
                }
              </a>
              <a routerLink="/compare" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-primary/5 px-3 py-3 font-semibold text-primary dark:bg-white/10 dark:text-white">
                <app-icon name="compare" class="h-4 w-4" /> Compare
                @if (compareCount() > 0) {
                  <span class="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white dark:bg-secondary">{{ compareCount() }}</span>
                }
              </a>
            </div>
            <a routerLink="/contact" (click)="mobileOpen.set(false)" class="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-3 py-3 font-semibold text-white shadow-gold">
              <app-icon name="phone" class="h-4 w-4" /> Book a Consultation
            </a>
            <div class="mt-4 border-t border-primary/10 pt-3 text-xs text-muted dark:border-white/10">
              <p class="flex items-center gap-2 py-1"><app-icon name="phone" class="h-3.5 w-3.5 text-secondary" /> {{ SITE.phone }}</p>
              <p class="flex items-center gap-2 py-1"><app-icon name="clock" class="h-3.5 w-3.5 text-secondary" /> {{ SITE.hours }}</p>
            </div>
          </div>
        </div>
      }
    </header>

    <app-search #search />
  `,
})
export class Navbar {
  readonly SITE = SITE;
  readonly navItems = signal(NAV_ITEMS);
  readonly mobileOpen = signal(false);
  readonly scrolled = signal(false);

  readonly theme = inject(ThemeService);
  readonly #wishlist = inject(WishlistService);
  readonly #compare = inject(CompareService);
  readonly #router = inject(Router);
  readonly #navigationEnd = signal<string>(typeof window !== 'undefined' ? window.location.pathname : '/');

  readonly isDark = computed(() => this.theme.isDark());
  readonly wishlistCount = computed(() => this.#wishlist.count());
  readonly compareCount = computed(() => this.#compare.count());

  readonly url = this.#navigationEnd;

  readonly headerClasses = computed(() =>
    cx(
      'border-primary/5 dark:border-white/5',
      this.scrolled() ? 'py-3 shadow-soft' : 'py-5'
    )
  );

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.#onScroll, { passive: true });
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.#navigationEnd.set(event.urlAfterRedirects.split('?')[0] ?? '');
          this.mobileOpen.set(false);
        }
      });
    }
  }

  linkClass(path: string): string {
    const active = this.url() === path;
    return cx(
      'text-primary hover:text-secondary dark:text-white dark:hover:text-secondary',
      active && 'text-secondary dark:text-secondary'
    );
  }

  isActive(path: string): boolean {
    return this.url() === path;
  }

  #onScroll = (): void => {
    this.scrolled.set(window.scrollY > 12);
  };

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.#onScroll);
    }
  }
}
