import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { getPrimaryCategory } from "@/data/categories";

const category = getPrimaryCategory("beds")!;

export const metadata = createMetadata({
  title: category.seoTitle,
  description: category.seoDescription,
  path: "/beds",
});

export default function BedsPage() {
  return (
    <CategoryListing
      category="beds"
      title={category.headline}
      intro="Create a more comfortable bedroom with thoughtfully designed beds that balance functionality and timeless style. Compare king, queen, storage and timber frames against your mattress and walkways."
    />
  );
}
