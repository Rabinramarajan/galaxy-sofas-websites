/** A single link inside navigation menus. */
export interface NavLink {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  icon?: string;
}

/** Top-level navigation item, optionally with a mega-menu group. */
export interface NavItem {
  label: string;
  path: string;
  children?: NavLink[];
}

/** Gallery / media asset. */
export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Product category. */
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  short: string;
  image: string;
  alt: string;
  productCount: number;
  accent?: string;
}

/** A curated product collection. */
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
  productCount: number;
  featured?: boolean;
}

/** Furniture product. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  collectionId?: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  alt: string;
  short: string;
  description: string;
  features: string[];
  materials: { label: string; value: string }[];
  dimensions: { label: string; value: string }[];
  warranty: string;
  deliveryTime: string;
  badge?: 'bestseller' | 'new' | 'limited' | 'premium';
  inStock: boolean;
  tags: string[];
}

/** Customer testimonial. */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  avatarColor: string;
  initials: string;
}

/** FAQ item. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: string;
}

/** Manufacturing / process step. */
export interface ProcessStep {
  id?: string;
  index: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  image?: string;
}

/** Timeline entry. */
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

/** Why-choose feature card. */
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

/** Blog post. */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: BlogBlock[];
}

export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'image'; src: string; alt: string };

/** Interior inspiration guide. */
export interface InteriorGuide {
  id: string;
  slug: string;
  room: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  style: string;
  tags: string[];
}

/** Instagram-style social post. */
export interface SocialPost {
  id: string;
  image: string;
  alt: string;
  likes: string;
  caption: string;
}

/** Store / showroom location. */
export interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}
