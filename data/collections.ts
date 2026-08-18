import { unsplash } from "@/lib/images";
import { products } from "@/data/products";
import type { Collection } from "@/types/product";

export const collections: Collection[] = [
  {
    slug: "the-living-edit",
    name: "The Living Edit",
    description:
      "Sofas, tables and lighting composed as a sitting room rather than a set of isolated products.",
    image: unsplash(
      "photo-1615873968403-89e068629265",
      "Living room collection with sofa, table and warm lighting",
    ),
    productIds: ["sofa-01", "sofa-03", "fur-03", "fur-04", "fur-09"],
  },
  {
    slug: "rest",
    name: "Rest",
    description: "Beds and bedroom storage planned for quiet rooms and uncluttered floors.",
    image: unsplash("photo-1631049307264-da0ec9d70304", "Bedroom collection with an upholstered bed"),
    productIds: ["bed-01", "bed-02", "bed-03", "fur-06", "fur-04"],
  },
  {
    slug: "dining-and-gather",
    name: "Dining & Gather",
    description: "Tables, chairs and sideboards for rooms that work as hard at breakfast as they do at dinner.",
    image: unsplash("photo-1577140917170-285929fb55b7", "Dining collection with a timber table and chairs"),
    productIds: ["fur-01", "fur-02", "fur-07"],
  },
  {
    slug: "custom-atelier",
    name: "Custom Atelier",
    description: "Made-to-measure sofas, beds and storage when a standard size will not serve the room.",
    image: unsplash("photo-1600210492493-0946911123ea", "Custom furniture atelier pieces in a refined interior"),
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
