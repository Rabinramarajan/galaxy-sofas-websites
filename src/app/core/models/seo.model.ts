/** SEO metadata set on a page by the SeoService. */
export interface SeoData {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  robots?: string;
  keywords?: string;
  jsonLd?: object[];
}

/** Result of comparing two or more products. */
export interface ComparisonRow {
  label: string;
  values: string[];
}

/** Wishlist state. */
export interface WishlistState {
  productIds: string[];
}

/** Recently viewed product record. */
export interface RecentlyViewed {
  productId: string;
  viewedAt: number;
}
