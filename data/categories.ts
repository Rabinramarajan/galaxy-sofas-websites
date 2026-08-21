import { media } from "@/data/media";
import type { CategoryDefinition, SubcategoryDefinition } from "@/types/product";

function from(image: { src: string; alt: string; width: number; height: number }, alt?: string) {
  return { src: image.src, alt: alt ?? image.alt, width: image.width, height: image.height };
}

export const primaryCategories: CategoryDefinition[] = [
  {
    slug: "sofas",
    name: "Sofas",
    href: "/sofas",
    headline: "Sofas made for lingering.",
    description:
      "L-shaped, reclining and custom sofas tailored to how your family actually sits, gathers and rests.",
    image: from(media.images.sofasLiving),
  },
  {
    slug: "beds",
    name: "Beds",
    href: "/beds",
    headline: "Beds that hold the day still.",
    description:
      "King, queen, storage and upholstered beds built for quiet nights and considered bedrooms.",
    image: from(media.images.bedsBedroom),
  },
  {
    slug: "furniture",
    name: "Furniture",
    href: "/furniture",
    headline: "Pieces that complete the room.",
    description:
      "Dining, storage and living furniture in timber, fabric and quiet contemporary finishes.",
    image: from(media.images.furnitureDining),
  },
];

export const sofaSubcategories: SubcategoryDefinition[] = [
  {
    slug: "l-shaped",
    name: "L-Shaped Sofas",
    category: "sofas",
    description: "Corner sofas that define a living room and seat a household without crowding it.",
    image: from(media.images.sofasLiving, "Cream L-shaped sofa in a contemporary living room"),
  },
  {
    slug: "3-seater",
    name: "3-Seater Sofas",
    category: "sofas",
    description: "Balanced three-seat sofas for apartments and family sitting rooms.",
    image: from(media.images.lifestyleGolden, "Low cream sofa in a sunlit living room"),
  },
  {
    slug: "2-seater",
    name: "2-Seater Sofas",
    category: "sofas",
    description: "Compact two-seat sofas and love seats for smaller rooms and reading corners.",
    image: from(media.images.heroPosterMobile, "Compact cream sofa arrangement in a vertical living room view"),
  },
  {
    slug: "sectional",
    name: "Sectional Sofas",
    category: "sofas",
    description: "Modular sectionals you can reconfigure as your room — and your life — changes.",
    image: from(media.images.lifestyleGolden, "Modular cream sofa with an organic walnut coffee table"),
  },
  {
    slug: "recliner",
    name: "Recliner Sofas",
    category: "sofas",
    description: "Reclining sofas with considered proportions, not bulky cinema seating.",
    image: from(media.images.sofasLiving, "Deep-seated cream sofa suited to long sitting"),
  },
  {
    slug: "sofa-sets",
    name: "Sofa Sets",
    category: "sofas",
    description: "Coordinated sofa and chair sets for complete living room compositions.",
    image: from(media.images.lifestyleGolden, "Sofa, coffee table and armchair composed as a sitting room"),
  },
  {
    slug: "custom",
    name: "Custom Sofas",
    category: "sofas",
    description: "Made-to-measure sofas in your fabric, size and configuration.",
    image: from(media.images.sofaStudio, "Studio views of a tailored L-shaped sofa"),
  },
];

export const bedSubcategories: SubcategoryDefinition[] = [
  {
    slug: "king-size",
    name: "King Size Beds",
    category: "beds",
    description: "Generous king frames for primary bedrooms that need width and presence.",
    image: from(media.images.bedsBedroom, "Upholstered king bed in a calm, panelled bedroom"),
  },
  {
    slug: "queen-size",
    name: "Queen Size Beds",
    category: "beds",
    description: "Queen beds that fit most Indian bedrooms without sacrificing comfort.",
    image: from(media.images.bedsBedroom, "Upholstered bed dressed in cream linen"),
  },
  {
    slug: "storage",
    name: "Storage Beds",
    category: "beds",
    description: "Hydraulic and drawer storage beds that keep bedrooms uncluttered.",
    image: from(media.images.bedsBedroom, "Low upholstered bed with a clear floor line"),
  },
  {
    slug: "upholstered",
    name: "Upholstered Beds",
    category: "beds",
    description: "Fabric headboards and wrapped frames for a softer, quieter bedroom.",
    image: from(media.images.bedsBedroom, "Curved oatmeal headboard with layered bedding"),
  },
  {
    slug: "wooden",
    name: "Wooden Beds",
    category: "beds",
    description: "Solid timber beds with honest grain, joinery and a lasting finish.",
    image: from(media.images.bedsBedroom, "Bedroom with walnut nightstand and timber accents"),
  },
  {
    slug: "modern",
    name: "Modern Beds",
    category: "beds",
    description: "Low-profile contemporary beds with clean lines and calm palettes.",
    image: from(media.images.bedsBedroom, "Low contemporary upholstered bed"),
  },
  {
    slug: "custom",
    name: "Custom Beds",
    category: "beds",
    description: "Custom headboards, sizes and storage planned around your mattress and room.",
    image: from(media.images.bedsBedroom, "Tailored bedroom with a sculptural upholstered bed"),
  },
];

export const furnitureSubcategories: SubcategoryDefinition[] = [
  {
    slug: "dining-tables",
    name: "Dining Tables",
    category: "furniture",
    description: "Dining tables in oak, walnut-tone and stone-top finishes for daily meals.",
    image: from(media.images.furnitureDining, "Walnut oval dining table with ceramic vessels"),
  },
  {
    slug: "dining-chairs",
    name: "Dining Chairs",
    category: "furniture",
    description: "Upholstered and timber dining chairs designed to sit comfortably through long dinners.",
    image: from(media.images.furnitureDining, "Upholstered dining chairs around a walnut table"),
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    category: "furniture",
    description: "Low tables that anchor a sofa grouping without dominating the room.",
    image: from(media.images.lifestyleGolden, "Organic dark wood coffee table in front of a cream sofa"),
  },
  {
    slug: "side-tables",
    name: "Side Tables",
    category: "furniture",
    description: "Compact side tables for lamps, books and evening tea.",
    image: from(media.images.sofasLiving, "Living room tables styled beside a cream sofa"),
  },
  {
    slug: "tv-units",
    name: "TV Units",
    category: "furniture",
    description: "Media units with cable-aware storage and calm, uncluttered fronts.",
    image: from(media.images.lifestyleGolden, "Living room with low furniture and built-in shelving"),
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    category: "furniture",
    description: "Sliding and hinged wardrobes planned for Indian bedrooms and storage habits.",
    image: from(media.images.bedsBedroom, "Bedroom storage and timber casework beside an upholstered bed"),
  },
  {
    slug: "cabinets",
    name: "Cabinets",
    category: "furniture",
    description: "Sideboards and display cabinets for dining rooms and hallways.",
    image: from(media.images.furnitureDining, "Fluted timber sideboard in a dining interior"),
  },
  {
    slug: "study-tables",
    name: "Study Tables",
    category: "furniture",
    description: "Desks with a clear work surface and storage that stays out of sight.",
    image: from(media.images.furnitureDining, "Timber work surface in a quiet interior"),
  },
  {
    slug: "home-accessories",
    name: "Home Accessories",
    category: "furniture",
    description: "Lamps, mirrors and finishing pieces that complete a furniture arrangement.",
    image: from(media.images.lifestyleGolden, "Ceramic vessels, lighting and books styled on living furniture"),
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
