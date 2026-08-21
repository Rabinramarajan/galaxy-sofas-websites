import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { getPrimaryCategory } from "@/data/categories";

const category = getPrimaryCategory("sofas")!;

export const metadata = createMetadata({
  title: category.seoTitle,
  description: category.seoDescription,
  path: "/sofas",
});

export default function SofasPage() {
  return (
    <CategoryListing
      category="sofas"
      title={category.headline}
      intro="Find a sofa that fits the way you live. Explore contemporary designs, comfortable seating options and versatile styles for living rooms of different sizes and layouts."
    />
  );
}
