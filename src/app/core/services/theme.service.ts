import { Injectable, PLATFORM_ID, TransferState, computed, effect, inject, makeStateKey, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { ThemeMode } from '../models/ui.model';

const THEME_KEY = 'galaxy-theme';
const THEME_STATE = makeStateKey<ThemeMode>('galaxy-theme-state');

/**
 * Reactive theme controller. Persists to localStorage, applies the
 * `dark` class on <html> and hydrates the initial value from TransferState.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #transferState = inject(TransferState);

  readonly #mode = signal<ThemeMode>(this.#initialMode());

  /** Current resolved theme mode. */
  readonly mode = this.#mode.asReadonly();

  /** True when dark mode is active. */
  readonly isDark = computed(() => this.#mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this.#mode();
      if (isPlatformBrowser(this.#platformId)) {
        document.documentElement.classList.toggle('dark', mode === 'dark');
        document.documentElement.style.colorScheme = mode;
        localStorage.setItem(THEME_KEY, mode);
      }
    });
  }

  toggle(): void {
    this.#mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  set(mode: ThemeMode): void {
    this.#mode.set(mode);
  }

  #initialMode(): ThemeMode {
    if (isPlatformBrowser(this.#platformId)) {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.#transferState.get(THEME_STATE, 'light');
  }
}
