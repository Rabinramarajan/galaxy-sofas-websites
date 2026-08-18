import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Premium Home Furniture in ${site.city}`,
  description: `Dining tables, chairs, storage and living furniture from ${site.name} in ${site.city}. Browse the catalogue or visit the furniture showroom to see finishes in person.`,
  path: "/furniture",
});

export default function FurniturePage() {
  return (
    <CategoryListing
      category="furniture"
      title="Furniture"
      intro="Dining, storage and living pieces chosen to sit beside our sofas and beds rather than compete with them."
    />
  );
}
