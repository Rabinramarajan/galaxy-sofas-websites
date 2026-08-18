import { unsplash } from "@/lib/images";
import type { CategoryDefinition, SubcategoryDefinition } from "@/types/product";

export const primaryCategories: CategoryDefinition[] = [
  {
    slug: "sofas",
    name: "Sofas",
    href: "/sofas",
    headline: "Sofas made for lingering.",
    description:
      "L-shaped, reclining and custom sofas tailored to how your family actually sits, gathers and rests.",
    image: unsplash(
      "photo-1555041469-a586c61ea9bc",
      "Olive green sofa in a bright living room with plants and timber floors",
    ),
  },
  {
    slug: "beds",
    name: "Beds",
    href: "/beds",
    headline: "Beds that hold the day still.",
    description:
      "King, queen, storage and upholstered beds built for quiet nights and considered bedrooms.",
    image: unsplash(
      "photo-1631049307264-da0ec9d70304",
      "Upholstered bed with layered linen in a calm bedroom with warm lighting",
    ),
  },
  {
    slug: "furniture",
    name: "Furniture",
    href: "/furniture",
    headline: "Pieces that complete the room.",
    description:
      "Dining, storage and living furniture in timber, fabric and quiet contemporary finishes.",
    image: unsplash(
      "photo-1577140917170-285929fb55b7",
      "Timber dining table set for a meal in a sunlit dining room",
    ),
  },
];

export const sofaSubcategories: SubcategoryDefinition[] = [
  {
    slug: "l-shaped",
    name: "L-Shaped Sofas",
    category: "sofas",
    description: "Corner sofas that define a living room and seat a household without crowding it.",
    image: unsplash(
      "photo-1540574163026-643ea20ade25",
      "Beige L-shaped sofa in a contemporary living room",
    ),
  },
  {
    slug: "3-seater",
    name: "3-Seater Sofas",
    category: "sofas",
    description: "Balanced three-seat sofas for apartments and family sitting rooms.",
    image: unsplash(
      "photo-1493663284031-b7e3aefcae8e",
      "Grey three-seater sofa against a white wall",
    ),
  },
  {
    slug: "2-seater",
    name: "2-Seater Sofas",
    category: "sofas",
    description: "Compact two-seat sofas and love seats for smaller rooms and reading corners.",
    image: unsplash(
      "photo-1484101403633-562f891dc89a",
      "Two-seater sofa in a softly lit living space",
    ),
  },
  {
    slug: "sectional",
    name: "Sectional Sofas",
    category: "sofas",
    description: "Modular sectionals you can reconfigure as your room — and your life — changes.",
    image: unsplash(
      "photo-1618220179428-22790b461013",
      "Large sectional sofa in an open-plan living room",
    ),
  },
  {
    slug: "recliner",
    name: "Recliner Sofas",
    category: "sofas",
    description: "Reclining sofas with considered proportions, not bulky cinema seating.",
    image: unsplash(
      "photo-1550254478-ead40cc54513",
      "Leather recliner sofa in a modern living room",
    ),
  },
  {
    slug: "sofa-sets",
    name: "Sofa Sets",
    category: "sofas",
    description: "Coordinated sofa and chair sets for complete living room compositions.",
    image: unsplash(
      "photo-1616486338812-3dadae4b4ace",
      "Matching sofa set in a styled living room",
    ),
  },
  {
    slug: "custom",
    name: "Custom Sofas",
    category: "sofas",
    description: "Made-to-measure sofas in your fabric, size and configuration.",
    image: unsplash(
      "photo-1615873968403-89e068629265",
      "Tailored custom sofa in a designer living room",
    ),
  },
];

export const bedSubcategories: SubcategoryDefinition[] = [
  {
    slug: "king-size",
    name: "King Size Beds",
    category: "beds",
    description: "Generous king frames for primary bedrooms that need width and presence.",
    image: unsplash("photo-1616594039964-ae9021a400a0", "King size bed in a hotel-style bedroom"),
  },
  {
    slug: "queen-size",
    name: "Queen Size Beds",
    category: "beds",
    description: "Queen beds that fit most Indian bedrooms without sacrificing comfort.",
    image: unsplash("photo-1560448204-e02f11c3d0e2", "Queen bed with white linen in a bright room"),
  },
  {
    slug: "storage",
    name: "Storage Beds",
    category: "beds",
    description: "Hydraulic and drawer storage beds that keep bedrooms uncluttered.",
    image: unsplash("photo-1505693416388-ac5ce068fe85", "Storage bed in a compact modern bedroom"),
  },
  {
    slug: "upholstered",
    name: "Upholstered Beds",
    category: "beds",
    description: "Fabric headboards and wrapped frames for a softer, quieter bedroom.",
    image: unsplash("photo-1631049307264-da0ec9d70304", "Upholstered bed with a tall fabric headboard"),
  },
  {
    slug: "wooden",
    name: "Wooden Beds",
    category: "beds",
    description: "Solid timber beds with honest grain, joinery and a lasting finish.",
    image: unsplash("photo-1505693314120-0d443867891c", "Wooden bed frame in a natural bedroom"),
  },
  {
    slug: "modern",
    name: "Modern Beds",
    category: "beds",
    description: "Low-profile contemporary beds with clean lines and calm palettes.",
    image: unsplash("photo-1616627561950-9f746e330187", "Modern platform bed in a minimal bedroom"),
  },
  {
    slug: "custom",
    name: "Custom Beds",
    category: "beds",
    description: "Custom headboards, sizes and storage planned around your mattress and room.",
    image: unsplash("photo-1631679706909-1844bbd07221", "Custom bedroom with a tailored bed and lighting"),
  },
];

export const furnitureSubcategories: SubcategoryDefinition[] = [
  {
    slug: "dining-tables",
    name: "Dining Tables",
    category: "furniture",
    description: "Dining tables in oak, walnut-tone and stone-top finishes for daily meals.",
    image: unsplash("photo-1577140917170-285929fb55b7", "Wooden dining table with ceramic tableware"),
  },
  {
    slug: "dining-chairs",
    name: "Dining Chairs",
    category: "furniture",
    description: "Upholstered and timber dining chairs designed to sit comfortably through long dinners.",
    image: unsplash("photo-1567538096630-e0c55bd6374c", "Upholstered dining chair in a pale interior"),
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    category: "furniture",
    description: "Low tables that anchor a sofa grouping without dominating the room.",
    image: unsplash("photo-1617093727343-374698b1b08d", "Coffee table in a contemporary living room"),
  },
  {
    slug: "side-tables",
    name: "Side Tables",
    category: "furniture",
    description: "Compact side tables for lamps, books and evening tea.",
    image: unsplash("photo-1532372320572-cda25653a26d", "Wooden side table beside a sofa"),
  },
  {
    slug: "tv-units",
    name: "TV Units",
    category: "furniture",
    description: "Media units with cable-aware storage and calm, uncluttered fronts.",
    image: unsplash("photo-1586023492125-27b2c045efd7", "Living room with a low media unit and sofa"),
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    category: "furniture",
    description: "Sliding and hinged wardrobes planned for Indian bedrooms and storage habits.",
    image: unsplash("photo-1594026112284-02bb6f3352fe", "Built-in wardrobe with timber doors"),
  },
  {
    slug: "cabinets",
    name: "Cabinets",
    category: "furniture",
    description: "Sideboards and display cabinets for dining rooms and hallways.",
    image: unsplash("photo-1551298370-9d3d53740c72", "Timber cabinet in a styled interior"),
  },
  {
    slug: "study-tables",
    name: "Study Tables",
    category: "furniture",
    description: "Desks with a clear work surface and storage that stays out of sight.",
    image: unsplash("photo-1518455027359-f3f8164ba6bd", "Wooden study desk in a quiet home office"),
  },
  {
    slug: "home-accessories",
    name: "Home Accessories",
    category: "furniture",
    description: "Lamps, mirrors and finishing pieces that complete a furniture arrangement.",
    image: unsplash("photo-1616486338812-3dadae4b4ace", "Styled living room accessories and lighting"),
  },
];

export const allSubcategories = [
  ...sofaSubcategories,
  ...bedSubcategories,
  ...furnitureSubcategories,
];

export function getSubcategories(category: CategoryDefinition["slug"]) {
  if (category === "sofas") return sofaSubcategories;
  if (category === "beds") return bedSubcategories;
  return furnitureSubcategories;
}

export function getPrimaryCategory(slug: string) {
  return primaryCategories.find((item) => item.slug === slug);
}

export function getSubcategory(category: string, slug: string) {
  return allSubcategories.find((item) => item.category === category && item.slug === slug);
}
