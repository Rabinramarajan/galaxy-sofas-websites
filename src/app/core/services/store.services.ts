import { Injectable, computed, signal } from '@angular/core';
import { CatalogService } from './catalog.service';
import type { Product } from '../models/furniture.model';

const STORAGE_KEYS = {
  wishlist: 'galaxy-wishlist',
  compare: 'galaxy-compare',
  recent: 'galaxy-recent',
} as const;

function readIds(key: string): string[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(ids));
}

/** Wishlist store — persisted, signal-backed, SSR-safe. */
@Injectable({ providedIn: 'root' })
export class WishlistService {
  readonly #catalog = new CatalogService();
  readonly ids = signal<string[]>(readIds(STORAGE_KEYS.wishlist));

  readonly count = computed(() => this.ids().length);
  readonly items = computed<Product[]>(() =>
    this.ids()
      .map((id) => this.#catalog.getProductById(id))
      .filter((p): p is Product => !!p)
  );

  toggle(id: string): void {
    this.ids.update((ids) => {
      const next = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
      writeIds(STORAGE_KEYS.wishlist, next);
      return next;
    });
  }

  has(id: string): boolean {
    return this.ids().includes(id);
  }

  remove(id: string): void {
    this.ids.update((ids) => {
      const next = ids.filter((i) => i !== id);
      writeIds(STORAGE_KEYS.wishlist, next);
      return next;
    });
  }
}

/** Comparison store. */
@Injectable({ providedIn: 'root' })
export class CompareService {
  readonly #catalog = new CatalogService();
  readonly ids = signal<string[]>(readIds(STORAGE_KEYS.compare));

  readonly count = computed(() => this.ids().length);
  readonly canAdd = computed(() => this.ids().length < 4);
  readonly items = computed<Product[]>(() =>
    this.ids()
      .map((id) => this.#catalog.getProductById(id))
      .filter((p): p is Product => !!p)
  );

  toggle(id: string): void {
    this.ids.update((ids) => {
      let next: string[];
      if (ids.includes(id)) {
        next = ids.filter((i) => i !== id);
      } else if (ids.length < 4) {
        next = [...ids, id];
      } else {
        next = ids;
      }
      writeIds(STORAGE_KEYS.compare, next);
      return next;
    });
  }

  has(id: string): boolean {
    return this.ids().includes(id);
  }

  clear(): void {
    this.ids.set([]);
    writeIds(STORAGE_KEYS.compare, []);
  }
}

/** Recently-viewed store — most recent first, capped at 8. */
@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  readonly #catalog = new CatalogService();
  readonly ids = signal<string[]>(readIds(STORAGE_KEYS.recent));

  readonly items = computed<Product[]>(() =>
    this.ids()
      .map((id) => this.#catalog.getProductById(id))
      .filter((p): p is Product => !!p)
      .slice(0, 8)
  );

  add(id: string): void {
    this.ids.update((ids) => {
      const next = [id, ...ids.filter((i) => i !== id)].slice(0, 8);
      writeIds(STORAGE_KEYS.recent, next);
      return next;
    });
  }
}
