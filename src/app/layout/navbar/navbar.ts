import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NAV_ITEMS, SITE } from '../../core/config/site.config';
import { ThemeService } from '../../core/services/theme.service';
import { AppSearch } from '../../shared/components/app-search/app-search';
import { AppIcon } from '../../shared/components/app-icon/app-icon';
import { CompareService, WishlistService } from '../../core/services/store.services';
import { cx } from '../../core/utils/utils';

/**
 * Editorial sticky navbar — announcement bar, mega-menu panels and
 * glass-on-scroll treatment. Warm ivory by day, espresso by night.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AppIcon, AppSearch],
  template: `
    <!-- Top Info Announcement Bar -->
    <div class="relative z-[60] hidden bg-espresso text-bone/80 lg:block border-b border-gold/20 text-xs tracking-wide">
      <div class="section-shell flex items-center justify-between py-2.5 font-medium">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-0.5 text-[10px] font-extrabold text-gold-light ring-1 ring-gold/30 uppercase tracking-widest">
            <app-icon name="truck" class="h-3 w-3" />
            White-Glove Delivery
          </span>
          <span>Complimentary assembly & insured shipping across India on orders over ₹25,000</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="tel:{{ SITE.phoneRaw }}" class="flex items-center gap-2 transition-colors hover:text-gold-light">
            <app-icon name="phone" class="h-3.5 w-3.5 text-gold-light" />
            <span>{{ SITE.phone }}</span>
          </a>
          <span class="flex items-center gap-2">
            <app-icon name="map" class="h-3.5 w-3.5 text-gold-light" />
            {{ SITE.showroomCount }} Showrooms
          </span>
          <span class="flex items-center gap-2">
            <app-icon name="clock" class="h-3.5 w-3.5 text-gold-light" />
            10 AM – 9 PM
          </span>
          <div class="flex items-center gap-3 border-l border-white/15 pl-5">
            <a href="{{ SITE.social.instagram }}" target="_blank" rel="noopener" class="text-bone/50 transition-colors hover:text-gold-light" aria-label="Instagram">
              <app-icon name="instagram" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.facebook }}" target="_blank" rel="noopener" class="text-bone/50 transition-colors hover:text-gold-light" aria-label="Facebook">
              <app-icon name="facebook" class="h-3.5 w-3.5" />
            </a>
            <a href="{{ SITE.social.youtube }}" target="_blank" rel="noopener" class="text-bone/50 transition-colors hover:text-gold-light" aria-label="YouTube">
              <app-icon name="youtube" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header Navbar -->
    <header
      class="sticky top-0 z-50 border-b transition-all duration-300 bg-paper/85 text-ink border-line backdrop-blur-2xl dark:bg-espresso/85 dark:text-bone dark:border-line-dark"
      [class]="headerClasses()"
      (mouseleave)="activeMenu.set(null)"
    >
      <nav class="section-shell flex items-center justify-between gap-4" aria-label="Main navigation">
        <!-- Brand Logo -->
        <a routerLink="/" class="group flex items-center gap-3.5 shrink-0" aria-label="Galaxy Sofas home">
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient shadow-gold ring-1 ring-gold/40 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
            <app-icon name="sofa" class="h-5 w-5 text-white" />
          </span>
          <span class="flex flex-col">
            <span class="font-display text-[1.45rem] font-semibold tracking-tight leading-none">
              GALAXY <span class="text-gradient-gold">SOFAS</span>
            </span>
            <span class="text-[8.5px] font-bold uppercase tracking-[0.34em] text-taupe mt-1.5 font-sans dark:text-fawn">
              Furniture Beyond Imagination
            </span>
          </span>
        </a>

        <!-- Main Desktop Navigation Menu -->
        <ul class="hidden items-center gap-0.5 lg:flex" (mouseleave)="activeMenu.set(null)">
          @for (item of navItems(); track item.path + item.label) {
            <li class="relative" (mouseenter)="item.children?.length ? activeMenu.set(item.label) : activeMenu.set(null)">
              <a
                routerLink="{{ item.path }}"
                class="relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors duration-300"
                [class]="linkClass(item.path)"
              >
                {{ item.label }}
                @if (item.children?.length) {
                  <app-icon name="chevronDown" class="h-3 w-3 transition-transform duration-300" [class.rotate-180]="activeMenu() === item.label" />
                }
              </a>
            </li>
          }
        </ul>

        <!-- Mega menu panel -->
        @if (activeMenu(); as menu) {
          @for (item of navItems(); track item.label) {
            @if (item.label === menu && item.children?.length) {
              <div
                class="absolute inset-x-0 top-full hidden border-t border-line bg-paper/95 backdrop-blur-2xl shadow-lift lg:block dark:bg-espresso/95 dark:border-line-dark"
                (mouseenter)="activeMenu.set(item.label)"
              >
                <div class="section-shell grid grid-cols-12 gap-8 py-10">
                  <div class="col-span-3">
                    <span class="eyebrow text-gold">Galaxy ateliers</span>
                    <h3 class="mt-3 font-display text-2xl font-semibold text-balance">{{ item.label }}</h3>
                    <p class="mt-2 text-sm text-taupe dark:text-fawn">Every room, one uncompromising standard. Explore the full Galaxy range.</p>
                    <a routerLink="{{ item.path }}" class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-gold-light">
                      View all <app-icon name="arrowRight" class="h-4 w-4" />
                    </a>
                  </div>
                  <div class="col-span-9 grid grid-cols-3 gap-x-8 gap-y-4">
                    @for (child of item.children; track child.path + child.label) {
                      <a routerLink="{{ child.path }}" (click)="activeMenu.set(null)" class="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-linen dark:hover:bg-mocha">
                        <span class="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                          <app-icon name="arrowRight" class="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <span class="block text-sm font-semibold transition-colors group-hover:text-gold">{{ child.label }}</span>
                          @if (child.description) {
                            <span class="mt-0.5 block text-xs leading-relaxed text-taupe dark:text-fawn">{{ child.description }}</span>
                          }
                        </span>
                      </a>
                    }
                  </div>
                </div>
              </div>
            }
          }
        }

        <!-- Action Tools & CTA -->
        <div class="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            (click)="search.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-all duration-300 hover:bg-ink/5 hover:text-ink dark:text-fawn dark:hover:bg-bone/10 dark:hover:text-bone"
            aria-label="Search"
          >
            <app-icon name="search" class="h-4 w-4" />
          </button>

          <button
            type="button"
            (click)="theme.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-all duration-300 hover:bg-ink/5 hover:text-ink dark:text-fawn dark:hover:bg-bone/10 dark:hover:text-bone"
            [attr.aria-label]="isDark() ? 'Light mode' : 'Dark mode'"
          >
            @if (isDark()) {
              <app-icon name="sun" class="h-4 w-4 text-gold-light" />
            } @else {
              <app-icon name="moon" class="h-4 w-4" />
            }
          </button>

          <a
            routerLink="/wishlist"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-taupe transition-all duration-300 hover:bg-ink/5 hover:text-ink dark:text-fawn dark:hover:bg-bone/10 dark:hover:text-bone sm:flex"
            aria-label="Wishlist"
          >
            <app-icon name="heart" class="h-4 w-4" />
            @if (wishlistCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-gradient px-1 text-[9px] font-extrabold text-white shadow-gold">{{ wishlistCount() }}</span>
            }
          </a>

          <a
            routerLink="/compare"
            class="relative hidden h-10 w-10 items-center justify-center rounded-full text-taupe transition-all duration-300 hover:bg-ink/5 hover:text-ink dark:text-fawn dark:hover:bg-bone/10 dark:hover:text-bone md:flex"
            aria-label="Compare"
          >
            <app-icon name="compare" class="h-4 w-4" />
            @if (compareCount() > 0) {
              <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-extrabold text-white shadow-gold">{{ compareCount() }}</span>
            }
          </a>

          <a
            routerLink="/contact"
            class="hidden rounded-full bg-gold-gradient px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-gold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow lg:inline-flex"
          >
            Book Consultation
          </a>

          <button
            type="button"
            (click)="mobileOpen.set(!mobileOpen())"
            class="flex h-10 w-10 items-center justify-center rounded-full text-taupe transition-colors hover:bg-ink/5 dark:text-fawn dark:hover:bg-bone/10 lg:hidden"
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
        <div class="border-t border-line bg-paper/95 backdrop-blur-2xl lg:hidden dark:bg-espresso/95 dark:border-line-dark">
          <div class="section-shell max-h-[75vh] overflow-y-auto py-6 space-y-1">
            @for (item of navItems(); track item.path + item.label) {
              <a routerLink="{{ item.path }}" (click)="mobileOpen.set(false)" class="block rounded-xl px-4 py-3 font-display text-sm font-semibold tracking-wide text-ink hover:bg-linen hover:text-gold transition-colors dark:text-bone dark:hover:bg-mocha">
                {{ item.label }}
              </a>
              @if (item.children?.length) {
                <div class="mb-2 ml-4 space-y-0.5 border-l border-line pl-4 dark:border-line-dark">
                  @for (child of item.children; track child.path) {
                    <a routerLink="{{ child.path }}" (click)="mobileOpen.set(false)" class="block rounded-lg px-3 py-2 text-[13px] font-medium text-taupe hover:bg-linen hover:text-gold dark:text-fawn dark:hover:bg-mocha">
                      {{ child.label }}
                    </a>
                  }
                </div>
              }
            }
            <div class="mt-4 grid grid-cols-2 gap-3">
              <a routerLink="/wishlist" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-linen px-4 py-3 font-semibold text-gold dark:bg-mocha">
                <app-icon name="heart" class="h-4 w-4" /> Wishlist
                @if (wishlistCount() > 0) {
                  <span class="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-white">{{ wishlistCount() }}</span>
                }
              </a>
              <a routerLink="/compare" (click)="mobileOpen.set(false)" class="flex items-center justify-center gap-2 rounded-xl bg-linen px-4 py-3 font-semibold text-ink dark:bg-mocha dark:text-bone">
                <app-icon name="compare" class="h-4 w-4" /> Compare
                @if (compareCount() > 0) {
                  <span class="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-white">{{ compareCount() }}</span>
                }
              </a>
            </div>
            <a routerLink="/contact" (click)="mobileOpen.set(false)" class="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3.5 font-bold uppercase tracking-wider text-white shadow-gold">
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
  readonly activeMenu = signal<string | null>(null);

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
      'border-line dark:border-line-dark',
      this.scrolled() ? 'py-3 shadow-soft' : 'py-4'
    )
  );

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.#onScroll, { passive: true });
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.#navigationEnd.set(event.urlAfterRedirects.split('?')[0] ?? '');
          this.mobileOpen.set(false);
          this.activeMenu.set(null);
        }
      });
    }
  }

  linkClass(path: string): string {
    const active = this.url() === path;
    return cx(
      'text-ink hover:text-gold dark:text-bone dark:hover:text-gold-light',
      active && 'text-gold dark:text-gold-light'
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
