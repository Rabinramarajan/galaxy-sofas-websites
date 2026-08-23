import { media } from "@/data/media";
import type { CategoryDefinition, Product, SubcategoryDefinition } from "@/types/product";
import { productInSubcategory } from "@/lib/utils";

function from(image: { src: string; alt: string; width: number; height: number }, alt?: string) {
  return { src: image.src, alt: alt ?? image.alt, width: image.width, height: image.height };
}

export const primaryCategories: CategoryDefinition[] = [
  {
    slug: "sofas",
    name: "Sofas",
    href: "/sofas",
    headline: "Sofas for Every Living Space",
    description:
      "Breathe new life into your living room with contemporary sofas designed around comfort, style and everyday living.",
    seoTitle: "Sofas in Chennai | Modern & Comfortable Sofas | Galaxy Sofas",
    seoDescription:
      "Explore sofas in Chennai at Galaxy Sofas, Virugambakkam. Discover contemporary, L-shaped, 3-seater, corner and other sofa styles for modern living spaces.",
    image: from(media.images.sofasLiving),
  },
  {
    slug: "beds",
    name: "Beds",
    href: "/beds",
    headline: "Beds Designed for Better Living",
    description:
      "Create a more comfortable bedroom with thoughtfully designed beds that balance functionality and timeless style.",
    seoTitle: "Beds in Chennai | Modern & Comfortable Beds | Galaxy Sofas",
    seoDescription:
      "Explore modern beds in Chennai at Galaxy Sofas. Discover practical and stylish bedroom furniture designed for comfortable everyday living.",
    image: from(media.images.bedsBedroom),
  },
  {
    slug: "furniture",
    name: "Furniture",
    href: "/furniture",
    headline: "Furniture for Modern Homes",
    description:
      "Complete your home with practical and stylish furniture for living, dining and everyday spaces.",
    seoTitle: "Furniture Store in Chennai | Home Furniture | Galaxy Sofas",
    seoDescription:
      "Explore home furniture in Chennai at Galaxy Sofas, Virugambakkam. Discover furniture for living rooms, bedrooms and everyday spaces.",
    image: from(media.images.furnitureDining),
  },
];

export const sofaSubcategories: SubcategoryDefinition[] = [
  {
    slug: "l-shaped-sofas",
    name: "L-Shaped Sofas",
    category: "sofas",
    description:
      "Discover L-shaped sofas designed to make the most of modern living spaces, with comfortable layouts for family rooms and open-plan homes.",
    seoTitle: "L-Shaped Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Discover L-shaped sofas in Chennai designed to make the most of modern living spaces. Explore comfortable layouts and contemporary styles at Galaxy Sofas, Virugambakkam.",
    image: from(media.images.sofasLiving, "Cream L-shaped sofa in a contemporary living room"),
  },
  {
    slug: "corner-sofas",
    name: "Corner Sofas",
    category: "sofas",
    match: "corner",
    description:
      "Corner sofas that use a wall junction well, giving more seating without stretching a straight sofa across the whole room.",
    seoTitle: "Corner Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore corner sofas in Chennai at Galaxy Sofas, Virugambakkam. See L-shaped and chaise layouts suited to living rooms that need extra seating in a defined corner.",
    image: from(media.images.sofasLiving, "Corner sofa arrangement in a living room at Galaxy Sofas"),
  },
  {
    slug: "3-seater-sofas",
    name: "3-Seater Sofas",
    category: "sofas",
    description: "Straight three-seat sofas for rectangular living rooms, apartments and spaces that still need a clear walkway.",
    seoTitle: "3 Seater Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse 3-seater sofas in Chennai at Galaxy Sofas. Comfortable straight sofas for apartments and family living rooms in Virugambakkam.",
    image: from(media.images.lifestyleGolden, "Low cream sofa in a sunlit living room"),
  },
  {
    slug: "2-seater-sofas",
    name: "2-Seater Sofas",
    category: "sofas",
    description: "Compact two-seat sofas for smaller rooms, studies and living spaces that need a lighter footprint.",
    seoTitle: "2 Seater Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "See 2-seater sofas in Chennai at Galaxy Sofas. Compact seating for smaller living rooms, guest rooms and apartment layouts.",
    image: from(media.images.heroPosterMobile, "Compact cream sofa arrangement in a vertical living room view"),
  },
  {
    slug: "recliner-sofas",
    name: "Recliner Sofas",
    category: "sofas",
    description: "Reclining sofas with a considered profile for sitting rooms and media corners — not only bulky theatre seating.",
    seoTitle: "Recliner Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore recliner sofas in Chennai at Galaxy Sofas, Virugambakkam. Comfortable reclining seating in leather and fabric finishes.",
    image: from(media.images.sofasLiving, "Deep-seated cream sofa suited to long sitting"),
  },
  {
    slug: "sofa-sets",
    name: "Sofa Sets",
    category: "sofas",
    description: "Coordinated sofa sets so seat height, arm profile and fabric batch match across the living room.",
    seoTitle: "Sofa Sets in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore sofa sets in Chennai at Galaxy Sofas. Coordinated seating for complete living rooms, available to view at our Virugambakkam showroom.",
    image: from(media.images.lifestyleGolden, "Sofa, coffee table and armchair composed as a sitting room"),
  },
  {
    slug: "fabric-sofas",
    name: "Fabric Sofas",
    category: "sofas",
    match: "fabric",
    description:
      "Fabric sofas in performance weaves, linen-look cloths and everyday upholstery suited to Chennai homes and family use.",
    seoTitle: "Fabric Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse fabric sofas in Chennai at Galaxy Sofas. Contemporary upholstery options for living rooms, from compact two-seaters to L-shaped layouts.",
    image: from(media.images.sofaStudio, "Studio views of a tailored fabric sofa"),
  },
  {
    slug: "sectional-sofas",
    name: "Sectional Sofas",
    category: "sofas",
    description: "Modular sectionals you can start as a smaller grouping and extend as the room changes.",
    seoTitle: "Sectional Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore sectional sofas in Chennai at Galaxy Sofas. Modular seating for open-plan living rooms, available from our Virugambakkam showroom.",
    image: from(media.images.lifestyleGolden, "Modular cream sofa with an organic walnut coffee table"),
  },
  {
    slug: "custom-sofas",
    name: "Custom Sofas",
    category: "sofas",
    description: "Made-to-measure sofas planned around your wall, doorway and fabric when a standard size will not fit.",
    seoTitle: "Custom Sofas in Chennai | Galaxy Sofas",
    seoDescription:
      "Enquire about custom sofas in Chennai at Galaxy Sofas. Plan size, fill and fabric around your living room at our Virugambakkam showroom.",
    image: from(media.images.sofaStudio, "Studio views of a tailored L-shaped sofa"),
  },
];

export const bedSubcategories: SubcategoryDefinition[] = [
  {
    slug: "king-size",
    name: "King Size Beds",
    category: "beds",
    description: "King frames for primary bedrooms that need width, a reading headboard and clear walkways.",
    seoTitle: "King Size Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore king size beds in Chennai at Galaxy Sofas. Upholstered and timber king frames for comfortable primary bedrooms.",
    image: from(media.images.bedsBedroom, "Upholstered king bed in a calm, panelled bedroom"),
  },
  {
    slug: "queen-size",
    name: "Queen Size Beds",
    category: "beds",
    description: "Queen beds sized for typical Chennai bedrooms without crowding wardrobes and side tables.",
    seoTitle: "Queen Size Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "See queen size beds in Chennai at Galaxy Sofas. Practical bedroom frames with upholstered and linen-look finishes.",
    image: from(media.images.bedsBedroom, "Upholstered bed dressed in cream linen"),
  },
  {
    slug: "storage",
    name: "Storage Beds",
    category: "beds",
    description: "Hydraulic storage beds that keep extra bedding out of sight when wardrobes are already full.",
    seoTitle: "Storage Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore storage beds in Chennai at Galaxy Sofas. Hydraulic lift beds for compact bedrooms in Virugambakkam and West Chennai.",
    image: from(media.images.bedsBedroom, "Low upholstered bed with a clear floor line"),
  },
  {
    slug: "upholstered",
    name: "Upholstered Beds",
    category: "beds",
    description: "Fabric-wrapped frames and padded headboards for a quieter, softer bedroom.",
    seoTitle: "Upholstered Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse upholstered beds in Chennai at Galaxy Sofas. Fabric headboards and wrapped frames for contemporary bedrooms.",
    image: from(media.images.bedsBedroom, "Curved oatmeal headboard with layered bedding"),
  },
  {
    slug: "wooden",
    name: "Wooden Beds",
    category: "beds",
    description: "Timber beds with honest grain, slatted bases and finishes you can live with daily.",
    seoTitle: "Wooden Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore wooden beds in Chennai at Galaxy Sofas. Hardwood frames with slatted headboards and natural finishes.",
    image: from(media.images.bedsBedroom, "Bedroom with walnut nightstand and timber accents"),
  },
  {
    slug: "modern",
    name: "Modern Beds",
    category: "beds",
    description: "Low-profile contemporary beds with clean lines for rooms that prefer a quieter silhouette.",
    seoTitle: "Modern Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "See modern beds in Chennai at Galaxy Sofas. Low platform and contemporary frames for everyday bedrooms.",
    image: from(media.images.bedsBedroom, "Low contemporary upholstered bed"),
  },
  {
    slug: "custom",
    name: "Custom Beds",
    category: "beds",
    description: "Custom headboards, sizes and storage planned around your mattress and wall.",
    seoTitle: "Custom Beds in Chennai | Galaxy Sofas",
    seoDescription:
      "Enquire about custom beds in Chennai at Galaxy Sofas, including wall-to-wall headboards and storage planned to your room.",
    image: from(media.images.bedsBedroom, "Tailored bedroom with a sculptural upholstered bed"),
  },
];

export const furnitureSubcategories: SubcategoryDefinition[] = [
  {
    slug: "dining-tables",
    name: "Dining Tables",
    category: "furniture",
    description: "Dining tables in oak and walnut tones for daily meals and extra guests.",
    seoTitle: "Dining Tables in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore dining tables in Chennai at Galaxy Sofas. Timber tables sized for everyday meals and living-dining rooms.",
    image: from(media.images.furnitureDining, "Walnut oval dining table with ceramic vessels"),
  },
  {
    slug: "dining-chairs",
    name: "Dining Chairs",
    category: "furniture",
    description: "Upholstered and timber dining chairs designed to sit comfortably through longer meals.",
    seoTitle: "Dining Chairs in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse dining chairs in Chennai at Galaxy Sofas. Upholstered chairs sold individually to pair with your table.",
    image: from(media.images.furnitureDining, "Upholstered dining chairs around a walnut table"),
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    category: "furniture",
    description: "Low tables that sit in front of a sofa without blocking circulation.",
    seoTitle: "Coffee Tables in Chennai | Galaxy Sofas",
    seoDescription:
      "See coffee tables in Chennai at Galaxy Sofas, sized to sit with our sofas in living rooms across Virugambakkam.",
    image: from(media.images.lifestyleGolden, "Organic dark wood coffee table in front of a cream sofa"),
  },
  {
    slug: "side-tables",
    name: "Side Tables",
    category: "furniture",
    description: "Compact side tables for lamps, books and evening tea beside a sofa or bed.",
    seoTitle: "Side Tables in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore side tables in Chennai at Galaxy Sofas. Compact living and bedside tables for everyday rooms.",
    image: from(media.images.sofasLiving, "Living room tables styled beside a cream sofa"),
  },
  {
    slug: "tv-units",
    name: "TV Units",
    category: "furniture",
    description: "Media units with cable routing and calm fronts so devices stay out of sight.",
    seoTitle: "TV Units in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse TV units in Chennai at Galaxy Sofas. Low media furniture with cable-aware storage for living rooms.",
    image: from(media.images.lifestyleGolden, "Living room with low furniture and built-in shelving"),
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    category: "furniture",
    description: "Sliding-door wardrobes planned for hanging, shelves and drawers in Indian bedrooms.",
    seoTitle: "Wardrobes in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore wardrobes in Chennai at Galaxy Sofas. Sliding-door bedroom storage planned for hanging and drawers.",
    image: from(media.images.bedsBedroom, "Bedroom storage and timber casework beside an upholstered bed"),
  },
  {
    slug: "cabinets",
    name: "Cabinets",
    category: "furniture",
    description: "Sideboards and cabinets for dining rooms and living walls.",
    seoTitle: "Cabinets & Sideboards in Chennai | Galaxy Sofas",
    seoDescription:
      "See dining cabinets and sideboards in Chennai at Galaxy Sofas. Storage furniture for living and dining spaces.",
    image: from(media.images.furnitureDining, "Fluted timber sideboard in a dining interior"),
  },
  {
    slug: "study-tables",
    name: "Study Tables",
    category: "furniture",
    description: "Desks with a clear work surface and a drawer that hides chargers and paper.",
    seoTitle: "Study Tables in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore study tables and home desks in Chennai at Galaxy Sofas. Practical work furniture for compact rooms.",
    image: from(media.images.furnitureDining, "Timber work surface in a quiet interior"),
  },
  {
    slug: "home-accessories",
    name: "Home Accessories",
    category: "furniture",
    description: "Lamps and finishing pieces that complete a sofa or bedroom arrangement.",
    seoTitle: "Home Accessories in Chennai | Galaxy Sofas",
    seoDescription:
      "Browse home accessories in Chennai at Galaxy Sofas, including lighting that sits with our sofas and beds.",
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

export function productsForSubcategory(products: Product[], subcategory: SubcategoryDefinition) {
  return products.filter((product) => productInSubcategory(product, subcategory));
}
