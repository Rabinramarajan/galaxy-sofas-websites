import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { getPrimaryCategory } from "@/data/categories";

const category = getPrimaryCategory("furniture")!;

export const metadata = createMetadata({
  title: category.seoTitle,
  description: category.seoDescription,
  path: "/furniture",
});

export default function FurniturePage() {
  return (
    <CategoryListing
      category="furniture"
      title={category.headline}
      intro="Complete your home with practical and stylish furniture for living, dining and everyday spaces — pieces chosen to sit beside our sofas and beds."
    />
  );
}
