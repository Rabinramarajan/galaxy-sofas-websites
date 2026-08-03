import { Injectable, computed, signal } from '@angular/core';
import { PRODUCTS } from '../data/products.data';
import { CATEGORIES } from '../data/categories.data';
import { COLLECTIONS } from '../data/collections.data';
import type { Category, Collection, Product } from '../models/furniture.model';

export interface ProductFilter {
  categoryId?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

/**
 * Read-only catalog store. Exposes reactive computed signals over the
 * static catalog data — pure, synchronous and SSR-friendly.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly products = signal<Product[]>(PRODUCTS);
  readonly categories = signal<Category[]>(CATEGORIES);
  readonly collections = signal<Collection[]>(COLLECTIONS);

  readonly bestsellers = computed(() => this.products().filter((p) => p.badge === 'bestseller').slice(0, 4));
  readonly newArrivals = computed(() => this.products().filter((p) => p.badge === 'new').slice(0, 4));
  readonly premiumPicks = computed(() => this.products().filter((p) => p.badge === 'premium').slice(0, 4));
  readonly trending = computed(() => [...this.products()].sort((a, b) => b.reviews - a.reviews).slice(0, 8));
  readonly minPrice = computed(() => Math.min(...this.products().map((p) => p.price)));
  readonly maxPrice = computed(() => Math.max(...this.products().map((p) => p.price)));

   getProduct(slug: string): Product | undefined {
    return this.products().find((p) => p.slug === slug);
   }

   getProductBySlug(slug: string): Product | undefined {
    return this.products().find((p) => p.slug === slug);
  }

   getProductById(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

   getProductsByCategory(categorySlug: string): Product[] {
    const category = this.categories().find((c) => c.slug === categorySlug);
    if (!category) return [];
    return this.byCategory(category.id);
  }

  getCategory(slug: string): Category | undefined {
    return this.categories().find((c) => c.slug === slug);
  }

  getCollection(id: string): Collection | undefined {
    return this.collections().find((c) => c.id === id);
  }

  byCategory(categoryId: string): Product[] {
    return this.products().filter((p) => p.categoryId === categoryId);
  }

  byCollection(collectionId: string): Product[] {
    return this.products().filter((p) => p.collectionId === collectionId);
  }

  related(product: Product, limit = 4): Product[] {
    const sameCategory = this.byCategory(product.categoryId).filter((p) => p.id !== product.id);
    return [...sameCategory, ...this.products().filter((p) => p.categoryId !== product.categoryId && p.id !== product.id)].slice(0, limit);
  }

  filter(filter: ProductFilter): Product[] {
    let result = this.products();
    if (filter.categoryId) result = result.filter((p) => p.categoryId === filter.categoryId);
    if (filter.query) {
      const q = filter.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.categoryId.includes(q)
      );
    }
    if (filter.minPrice != null) result = result.filter((p) => p.price >= filter.minPrice!);
    if (filter.maxPrice != null) result = result.filter((p) => p.price <= filter.maxPrice!);

    switch (filter.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result = [...result].sort((a, b) => b.discount - a.discount);
        break;
      default:
        result = [...result].sort((a, b) => Number(b.badge === 'bestseller') - Number(a.badge === 'bestseller'));
    }
    return result;
  }

  search(query: string): Product[] {
    return this.filter({ query, sort: 'featured' });
  }
}
