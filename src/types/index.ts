export type ProductCategoryId =
  | "l-shape"
  | "recliner"
  | "sofa-cum-bed"
  | "3-seater"
  | "2-seater"
  | "custom";

export interface ProductCategory {
  id: ProductCategoryId;
  slug: string;
  name: string;
  shortName: string;
  /** One-line summary used on listing cards and in meta descriptions. */
  description: string;
  image: string;
  /** Descriptive alt text for the category image, based on what is visible. */
  imageAlt: string;
  /** H1 for the dedicated category page. */
  heading: string;
  /** Unique title tag (brand suffix is appended by the metadata template). */
  metaTitle: string;
  /** Unique meta description for the category page. */
  metaDescription: string;
  /** Opening paragraph on the category page. */
  intro: string;
  /** Supporting paragraphs — unique per category, no shared boilerplate. */
  body: string[];
  /** Practical buying notes shown as a list. */
  considerations: string[];
  /** Related categories linked from this page. */
  related: ProductCategoryId[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategoryId;
  shortDescription: string;
  description: string;
  image: string;
  /** Descriptive alt text for the main product photo. */
  imageAlt: string;
  gallery: string[];
  features: string[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: "factory" | "wrench" | "refresh" | "layers" | "armchair" | "truck";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: 5;
}

export interface NavLink {
  label: string;
  href: string;
}
