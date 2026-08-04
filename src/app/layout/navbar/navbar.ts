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
  template: `    <!-- Top Info Announcement Bar -->
    <div class="relative z-[60] hidden bg-[#0b0c0e] text-white/80 lg:block border-b border-amber-500/15 text-xs tracking-wide">
      <div class="section-shell flex items-center justify-between py-2.5 font-medium">
        <!-- Left: Delivery badge -->
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-0.5 text-[10px] font-extrabold text-secondary ring-1 ring-secondary/30 uppercase tracking-widest">
            <app-icon name="truck" class="h-3 w-3 text-secondary" />
            White-Glove Delivery
          </span>
          <span class="text-stone-300 font-sans">Complimentary assembly & insured shipping across India on orders over ₹25,000</span>
        </div>

        <!-- Right: Contact info & Socials -->
        <div class="flex items-center gap-6 text-stone-300">
          <a href="tel:{{ SITE.phoneRaw }}" class="flex items-center gap-2 transition-colors hover:text-secondary">
            <app-icon name="phone" class="h-3.5 w-3.5 text-secondary" />
            <span class="font-sans">{{ SITE.phone }}</span>
          </a>
          <span class="flex items-center gap-2">
            <app-icon name="map" class="h-3.5 w-3.5 text-secondary" />
            <span class="font-sans">{{ SITE.showroomCount }} Showrooms</span>
          </span>
          <span class="flex items-center gap-2">
            <app-icon name="clock" class="h-3.5 w-3.5 text-secondary" />
            <span class="font-sans">10 AM – 9 PM</span>
          </span>
          <div class="flex items-center gap-3 border-l border-white/15 pl-5">
            <a href="{{ SITE.social.instagram }}" target="_blank" rel="noopener" class="text-stone-400 transition-colors hover:text-secondary" aria-label="Instagram">
              <app-icon name="instagram" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.facebook }}" target="_blank" rel="noopener" class="text-stone-400 transition-colors hover:text-secondary" aria-label="Facebook">
              <app-icon name="facebook" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.youtube }}" target="_blank" rel="noopener" class="text-stone-400 transition-colors hover:text-secondary" aria-label="YouTube">
              <app-icon name="youtube" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header Navbar -->
    <header
      class="sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 bg-[#0b0c0e]/90 text-white border-amber-500/15 shadow-lift"
      [class]="headerClasses()"
    >
      <nav class="section-shell flex items-center justify-between gap-4" aria-label="Main navigation">
        <!-- Brand Logo -->
        <a routerLink="/" class="group flex items-center gap-3.5 shrink-0" aria-label="Galaxy Sofas home">
          <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-gradient shadow-gold ring-1 ring-amber-400/40 transition-all duration-400 group-hover:scale-105">
            <app-icon name="sofa" class="h-6 w-6 text-white" />
          </span>
          <div class="flex flex-col">
            <span class="font-display text-2xl font-bold tracking-wider leading-none text-white">
              GALAXY <span class="text-gradient-gold">SOFAS</span>
            </span>
            <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-bronze-400 mt-1.5 font-sans">
              Furniture Beyond Imagination
            </span>
          </div>
        </a>

        <!-- Main Desktop Navigation Menu -->
        <ul class="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          @for (item of navItems(); track item.path + item.label) {
            <li>
              <a
                routerLink="{{ item.path }}"
                class="relative inline-flex items-center rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-secondary hover:bg-white/5"
                [class]="linkClass(item.path)"
              >
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <!-- Action Tools & CTA -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            (click)="search.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <app-icon name="search" class="h-4 w-4" />
          </button>

          <button
            type="button"
            (click)="theme.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            [attr.aria-label]="isDark() ? 'Light mode' : 'Dark mode'"
          >
            @if (isDark()) {
              <app-icon name="sun" class="h-4 w-4 text-amber-400" />
            } @else {
              <app-icon name="moon" class="h-4 w-4" />
            }
          </button>

          <a
            routerLink="/wishlist"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-all duration-300 hover:bg-white/10 hover:text-white sm:flex"
            aria-label="Wishlist"
          >
            <app-icon name="heart" class="h-4 w-4" />
            @if (wishlistCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-gradient px-1 text-[9px] font-extrabold text-white shadow-gold">{{ wishlistCount() }}</span>
            }
          </a>

          <a
            routerLink="/compare"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-all duration-300 hover:bg-white/10 hover:text-white md:flex"
            aria-label="Compare"
          >
            <app-icon name="compare" class="h-4 w-4" />
            @if (compareCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze-500 px-1 text-[9px] font-extrabold text-white shadow-gold">{{ compareCount() }}</span>
            }
          </a>

          <a
            routerLink="/contact"
            class="hidden rounded-full bg-gold-gradient px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-gold transition-all duration-300 hover:scale-105 hover:shadow-glow lg:inline-flex border border-amber-300/40"
          >
            Book Consultation
          </a>

          <button
            type="button"
            (click)="mobileOpen.set(!mobileOpen())"
            class="flex h-10 w-10 items-center justify-center rounded-full text-stone-300 transition-colors hover:bg-white/10 lg:hidden"
            [attr.aria-label]="mobileOpen() ? 'Close menu' : 'Open menu'"
          >
            @if (mobileOpen()) {
              <app-icon name="close" class="h-5 w-5" />
            } @else {
              <app-icon name="menu" class="h-5 w-5" />
            }
          </button>
        </div>
      </nav>

      <!-- Mobile drawer -->
      @if (mobileOpen()) {
        <div class="border-t border-amber-500/20 bg-[#0b0c0e]/95 backdrop-blur-2xl lg:hidden text-white">
          <div class="section-shell max-h-[75vh] overflow-y-auto py-6 space-y-2">
            @for (item of navItems(); track item.path + item.label) {
              <a routerLink="{{ item.path }}" (click)="mobileOpen.set(false)" class="block rounded-xl px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-stone-200 hover:bg-white/10 hover:text-secondary transition-colors">
                {{ item.label }}
              </a>
            }
            <div class="mt-4 grid grid-cols-2 gap-3">
              <a routerLink="/wishlist" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-semibold text-secondary">
                <app-icon name="heart" class="h-4 w-4" /> Wishlist
                @if (wishlistCount() > 0) {
                  <span class="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">{{ wishlistCount() }}</span>
                }
              </a>
              <a routerLink="/compare" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-semibold text-stone-200">
                <app-icon name="compare" class="h-4 w-4" /> Compare
                @if (compareCount() > 0) {
                  <span class="rounded-full bg-bronze-500 px-2 py-0.5 text-[10px] font-bold text-white">{{ compareCount() }}</span>
                }
              </a>
            </div>
            <a routerLink="/contact" (click)="mobileOpen.set(false)" class="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3.5 font-bold uppercase tracking-wider text-white shadow-gold border border-amber-300/40">
              <app-icon name="phone" class="h-4 w-4" /> Book Consultation
            </a>
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
