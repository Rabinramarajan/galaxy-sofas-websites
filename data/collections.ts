import { collectionImage } from "@/data/media";
import { products } from "@/data/products";
import type { Collection } from "@/types/product";

export const collections: Collection[] = [
  {
    slug: "the-living-edit",
    name: "The Living Edit",
    description:
      "Sofas, tables and lighting composed as a sitting room rather than a set of isolated products.",
    image: collectionImage("the-living-edit"),
    productIds: ["sofa-01", "sofa-03", "fur-03", "fur-04", "fur-09"],
  },
  {
    slug: "rest",
    name: "Rest",
    description: "Beds and bedroom storage planned for quiet rooms and uncluttered floors.",
    image: collectionImage("rest"),
    productIds: ["bed-01", "bed-02", "bed-03", "fur-06", "fur-04"],
  },
  {
    slug: "dining-and-gather",
    name: "Dining & Gather",
    description: "Tables, chairs and sideboards for rooms that work as hard at breakfast as they do at dinner.",
    image: collectionImage("dining-and-gather"),
    productIds: ["fur-01", "fur-02", "fur-07"],
  },
  {
    slug: "custom-atelier",
    name: "Custom Atelier",
    description: "Made-to-measure sofas, beds and storage when a standard size will not serve the room.",
    image: collectionImage("custom-atelier"),
    productIds: ["sofa-08", "bed-07", "fur-05", "fur-06"],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionProducts(collection: Collection) {
  return collection.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
}
