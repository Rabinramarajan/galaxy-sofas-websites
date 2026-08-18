import { CategoryListing } from "@/components/products/category-listing";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Modern & Premium Beds in ${site.city}`,
  description: `King, queen, storage and upholstered beds from ${site.name} in ${site.city}. Compare sizes, storage and fabrics, then enquire or visit the bed showroom.`,
  path: "/beds",
});

export default function BedsPage() {
  return (
    <CategoryListing
      category="beds"
      title="Beds"
      intro="King, queen, storage and timber beds specified to Indian mattress sizes. Bring your room measurements if you are choosing between a queen and a king."
    />
  );
}
