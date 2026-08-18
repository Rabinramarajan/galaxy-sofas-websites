import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Premium Sofas in ${site.city}`,
  description: `Explore L-shaped, three-seater, recliner and custom sofas at ${site.name}, a sofa showroom in ${site.city}. Sit in the pieces, compare fabrics and enquire for made-to-order sizes.`,
  path: "/sofas",
});

export default function SofasPage() {
  return (
    <CategoryListing
      category="sofas"
      title="Sofas"
      intro="Corner sofas, straight seating and custom frames for living rooms in Chennai apartments and houses. Filter by type, fabric and availability, or visit the showroom to sit in them."
    />
  );
}
