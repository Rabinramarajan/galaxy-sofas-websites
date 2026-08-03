export interface NavItem {
  label: string;
  path: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
}
