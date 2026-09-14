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
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategoryId;
  shortDescription: string;
  description: string;
  image: string;
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
