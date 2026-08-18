export type ProductCategory = "sofas" | "beds" | "furniture";

export type Availability = "in-stock" | "made-to-order" | "limited";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  subcategorySlug: string;
  description: string;
  shortDescription: string;
  price: number | null;
  currency: "INR";
  images: ProductImage[];
  colors: ProductColor[];
  material: string;
  finish: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    unit: "cm";
  };
  seatingCapacity?: number;
  features: string[];
  careInstructions: string;
  deliveryInformation: string;
  tags: string[];
  featured: boolean;
  availability: Availability;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export type CategoryDefinition = {
  slug: ProductCategory;
  name: string;
  href: string;
  headline: string;
  description: string;
  image: ProductImage;
};

export type SubcategoryDefinition = {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: ProductImage;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  image: ProductImage;
  productIds: string[];
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  relatedCategory: ProductCategory;
  relatedProductSlugs: string[];
  content: { heading: string; paragraphs: string[] }[];
};
