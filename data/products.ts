import { galleryFor } from "@/data/media";
import type { Availability, Product, ProductCategory } from "@/types/product";

const CARE_FABRIC =
  "Vacuum weekly with a soft brush. Blot spills immediately with a clean, dry cloth. Avoid direct, prolonged sunlight. Professional cleaning is recommended for stubborn stains.";
const CARE_WOOD =
  "Dust with a dry microfibre cloth. Use a slightly damp cloth for marks, then dry immediately. Keep away from standing water and extreme heat. Use coasters on tabletops.";
const DELIVERY =
  "Delivery within Chennai is arranged after we confirm the piece, access and assembly. Lead times depend on whether the item is available to view or made to order — the showroom will confirm this when you enquire.";

type Draft = Omit<Product, "currency" | "careInstructions" | "deliveryInformation" | "images"> & {
  care?: string;
};

function make(draft: Draft): Product {
  return {
    ...draft,
    images: galleryFor(draft.category, draft.subcategorySlug, draft.name),
    currency: "INR",
    careInstructions: draft.care ?? CARE_FABRIC,
    deliveryInformation: DELIVERY,
  };
}

export const products: Product[] = [
  make({
    id: "sofa-01",
    slug: "modern-l-shaped-sofa",
    name: "Modern L-Shaped Sofa",
    category: "sofas",
    subcategory: "L-Shaped Sofas",
    subcategorySlug: "l-shaped-sofas",
    shortDescription: "A low, generous corner sofa with deep seats and a quiet contemporary profile.",
    description:
      "The Modern L-Shaped Sofa is designed for living rooms that need to host without looking overstuffed. Deep cushions, a chaise that can be specified left or right, and a timber plinth keep the silhouette calm. Upholstery is available in performance weaves suited to family use.",
    price: 124900,
    colors: [
      { name: "Sand", hex: "#D8C3A5" },
      { name: "Olive", hex: "#6B705C" },
      { name: "Charcoal", hex: "#3F3A36" },
    ],
    material: "High-density foam on a hardwood frame, performance fabric upholstery",
    finish: "Walnut-tone timber plinth",
    dimensions: { width: 280, depth: 180, height: 82, unit: "cm" },
    seatingCapacity: 5,
    features: ["Reversible chaise on request", "Performance fabric", "Kiln-dried hardwood frame"],
    tags: ["l-shaped", "family", "living room", "performance fabric"],
    featured: true,
    availability: "made-to-order",
    seoTitle: "Modern L-Shaped Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "Explore the Modern L-Shaped Sofa from Galaxy Sofas in Chennai. Deep seating, custom chaise orientation and performance fabrics for everyday living.",
    keywords: ["l shaped sofa", "corner sofa Chennai", "modern sofa"],
  }),
  make({
    id: "sofa-02",
    slug: "harbour-l-shaped-sofa",
    name: "Harbour L-Shaped Sofa",
    category: "sofas",
    subcategory: "L-Shaped Sofas",
    subcategorySlug: "l-shaped-sofas",
    shortDescription: "Soft rolled arms and a wider chaise for rooms that open onto a view or a garden.",
    description:
      "Harbour is a more traditional L-shape with rolled arms and a slightly higher back. It suits formal living rooms that still need to be comfortable for a full evening. Cushions are fibre-wrapped foam so they recover without looking rigid.",
    price: 139900,
    colors: [
      { name: "Ivory", hex: "#EFE6D6" },
      { name: "Slate", hex: "#6D7278" },
    ],
    material: "Fibre-wrapped foam, linen-blend upholstery, hardwood frame",
    finish: "Antique brass feet",
    dimensions: { width: 300, depth: 190, height: 88, unit: "cm" },
    seatingCapacity: 6,
    features: ["Higher back", "Linen-blend covers", "Optional contrasting piping"],
    tags: ["l-shaped", "formal", "linen"],
    featured: false,
    availability: "made-to-order",
    seoTitle: "Harbour L-Shaped Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "The Harbour L-Shaped Sofa offers rolled arms, a higher back and linen-blend upholstery. Available from Galaxy Sofas in Chennai.",
    keywords: ["linen l shaped sofa", "formal corner sofa"],
  }),
  make({
    id: "sofa-03",
    slug: "calicut-three-seater",
    name: "Calicut Three-Seater",
    category: "sofas",
    subcategory: "3-Seater Sofas",
    subcategorySlug: "3-seater-sofas",
    shortDescription: "A straight three-seater with slim arms so more of the width is actual sitting space.",
    description:
      "Calicut is the sofa we recommend when a room cannot take a corner piece. Slim track arms, a bench-style seat option, and legs that lift the frame keep the floor visually open. It pairs cleanly with our coffee tables and side chairs.",
    price: 68900,
    colors: [
      { name: "Fog", hex: "#C5C0B8" },
      { name: "Ink", hex: "#2C3136" },
      { name: "Terracotta", hex: "#A45A3A" },
    ],
    material: "Sinuous spring unit, high-resilience foam, cotton-linen upholstery",
    finish: "Blackened metal legs",
    dimensions: { width: 210, depth: 92, height: 84, unit: "cm" },
    seatingCapacity: 3,
    features: ["Slim track arms", "Optional bench seat", "Metal or timber legs"],
    tags: ["3-seater", "apartment", "track arm"],
    featured: true,
    availability: "in-stock",
    seoTitle: "Calicut Three-Seater Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "Shop the Calicut Three-Seater — a slim-arm sofa designed for Indian apartments. Available in Fog, Ink and Terracotta from Galaxy Sofas, Chennai.",
    keywords: ["3 seater sofa", "apartment sofa Chennai"],
  }),
  make({
    id: "sofa-04",
    slug: "nook-two-seater",
    name: "Nook Two-Seater",
    category: "sofas",
    subcategory: "2-Seater Sofas",
    subcategorySlug: "2-seater-sofas",
    shortDescription: "A compact two-seater for studies, guest rooms and tight city living rooms.",
    description:
      "Nook sits two adults comfortably without asking for a full wall. Use it opposite a three-seater, under a window, or as the only sofa in a studio. The seat depth is slightly reduced so conversation stays upright and easy.",
    price: 42900,
    colors: [
      { name: "Oatmeal", hex: "#D7C9B1" },
      { name: "Forest", hex: "#3E4A3D" },
    ],
    material: "Hardwood frame, foam seat, textured weave upholstery",
    finish: "Oak-tone tapered legs",
    dimensions: { width: 152, depth: 86, height: 80, unit: "cm" },
    seatingCapacity: 2,
    features: ["Compact depth", "Tapered timber legs", "Studio-friendly scale"],
    tags: ["2-seater", "compact", "studio"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Nook Two-Seater Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "The Nook Two-Seater is a compact sofa for smaller rooms. See sizes, fabrics and availability at Galaxy Sofas in Chennai.",
    keywords: ["2 seater sofa", "compact sofa", "love seat"],
  }),
  make({
    id: "sofa-05",
    slug: "atelier-sectional",
    name: "Atelier Sectional",
    category: "sofas",
    subcategory: "Sectional Sofas",
    subcategorySlug: "sectional-sofas",
    shortDescription: "A modular sectional you can start as a three-piece and grow as the room changes.",
    description:
      "Atelier is built as connected modules: armless seats, corners, ottomans and a chaise. Families who move homes, or who are still deciding how a room should work, can add pieces later in matching fabric. Hidden connectors keep the join tidy.",
    price: 168900,
    colors: [
      { name: "Stone", hex: "#C9C2B6" },
      { name: "Navy", hex: "#2B3A4A" },
    ],
    material: "Modular hardwood frames, pocket springs, performance weave",
    finish: "Concealed connectors, upholstered plinth",
    dimensions: { width: 340, depth: 220, height: 80, unit: "cm" },
    seatingCapacity: 7,
    features: ["Add-on modules", "Ottoman included", "Matching fabric batches"],
    tags: ["sectional", "modular", "open plan"],
    featured: true,
    availability: "made-to-order",
    seoTitle: "Atelier Sectional Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "Configure the Atelier Sectional with add-on modules, ottomans and chaises. Made to order at Galaxy Sofas, Chennai.",
    keywords: ["sectional sofa", "modular sofa"],
  }),
  make({
    id: "sofa-06",
    slug: "stillwater-recliner-sofa",
    name: "Stillwater Recliner Sofa",
    category: "sofas",
    subcategory: "Recliner Sofas",
    subcategorySlug: "recliner-sofas",
    shortDescription: "A three-seat recliner with a refined profile — not a bulky home-theatre silhouette.",
    description:
      "Stillwater reclines electrically with a slim mechanism hidden in the seat. The arm and back stay visually light, so it can live in a sitting room rather than only a media room. USB charging is optional, not default, so the piece stays calm.",
    price: 98900,
    colors: [
      { name: "Cognac", hex: "#8A4B2F" },
      { name: "Graphite", hex: "#4A4A48" },
    ],
    material: "Semi-aniline leather or performance fabric, steel recliner mechanism",
    finish: "Low timber runners",
    dimensions: { width: 218, depth: 98, height: 96, unit: "cm" },
    seatingCapacity: 3,
    features: ["Electric recline", "Wall-hugger mechanism", "Optional USB"],
    tags: ["recliner", "leather", "media"],
    featured: false,
    availability: "limited",
    seoTitle: "Stillwater Recliner Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "Stillwater is a refined three-seat recliner sofa in leather or fabric. Enquire with Galaxy Sofas in Chennai for finishes and lead times.",
    keywords: ["recliner sofa", "electric recliner sofa"],
  }),
  make({
    id: "sofa-07",
    slug: "pavilion-sofa-set",
    name: "Pavilion Sofa Set",
    category: "sofas",
    subcategory: "Sofa Sets",
    subcategorySlug: "sofa-sets",
    shortDescription: "A 3+2+1 set with shared timber legs and matching seat height for a complete living room.",
    description:
      "Pavilion is sold as a coordinated set so seat height, arm profile and fabric batch match. The single chair can sit opposite or to the side. If you only need the three-seater later, we can supply it from the same specification.",
    price: 154900,
    colors: [
      { name: "Parchment", hex: "#E4D7C3" },
      { name: "Moss", hex: "#5C6848" },
    ],
    material: "Hardwood frames, foam and fibre cushions, linen-look weave",
    finish: "Matched oak-tone legs across all pieces",
    dimensions: { width: 210, depth: 92, height: 86, unit: "cm" },
    seatingCapacity: 6,
    features: ["3+2+1 configuration", "Matched fabric batch", "Shared seat height"],
    tags: ["sofa set", "3+2+1", "living room"],
    featured: false,
    availability: "made-to-order",
    seoTitle: "Pavilion Sofa Set in Chennai | Galaxy Sofas",
    seoDescription:
      "The Pavilion 3+2+1 sofa set is designed as a complete living room. Available in Parchment and Moss from Galaxy Sofas, Chennai.",
    keywords: ["sofa set", "3 2 1 sofa set"],
  }),
  make({
    id: "sofa-08",
    slug: "bespoke-atelier-sofa",
    name: "Bespoke Atelier Sofa",
    category: "sofas",
    subcategory: "Custom Sofas",
    subcategorySlug: "custom-sofas",
    shortDescription: "A made-to-measure sofa planned around your wall, doorway and fabric choice.",
    description:
      "Bespoke Atelier starts with a site discussion or a drawing of your room. We confirm seat depth, arm width, cushion fill and fabric before production. This is the right path when a standard size will not clear a stair, or when you need a precise fabric match to existing curtains or walls.",
    price: null,
    colors: [
      { name: "By fabric", hex: "#C4B7A6" },
      { name: "COM", hex: "#8C7B6A" },
    ],
    material: "Specified with you: frame, fill, fabric or leather",
    finish: "Timber, metal or fully upholstered base",
    dimensions: { width: 240, depth: 95, height: 85, unit: "cm" },
    seatingCapacity: 4,
    features: ["Made to measure", "Customer’s own material welcome", "Showroom fabric library"],
    tags: ["custom sofa", "bespoke", "made to measure"],
    featured: true,
    availability: "made-to-order",
    seoTitle: "Bespoke Atelier Sofa in Chennai | Galaxy Sofas",
    seoDescription:
      "Commission a custom sofa in Chennai. Galaxy Sofas plans size, fill and fabric around your room, including customer’s own material.",
    keywords: ["custom sofa Chennai", "bespoke sofa", "made to measure sofa"],
  }),
  make({
    id: "bed-01",
    slug: "solstice-king-bed",
    name: "Solstice King Bed",
    category: "beds",
    subcategory: "King Size Beds",
    subcategorySlug: "king-size",
    shortDescription: "A king bed with a padded headboard tall enough to sit against while you read.",
    description:
      "Solstice is a king frame with a 120 cm upholstered headboard and a low footboard so the room still feels open. The frame accepts a standard Indian king mattress. Side rails are designed for easy assembly in apartments.",
    price: 79900,
    colors: [
      { name: "Dove", hex: "#C9C4BB" },
      { name: "Espresso", hex: "#3B2F2A" },
    ],
    material: "Hardwood rails, upholstered headboard, fabric or leather wrap",
    finish: "Walnut-tone feet",
    dimensions: { width: 198, depth: 218, height: 120, unit: "cm" },
    features: ["King mattress fit", "Tall reading headboard", "Apartment-friendly assembly"],
    tags: ["king bed", "headboard", "primary bedroom"],
    featured: true,
    availability: "in-stock",
    seoTitle: "Solstice King Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "The Solstice King Bed features a tall upholstered headboard and a low footboard. See dimensions and fabrics at Galaxy Sofas, Chennai.",
    keywords: ["king size bed", "king bed Chennai"],
  }),
  make({
    id: "bed-02",
    slug: "linen-queen-bed",
    name: "Linen Queen Bed",
    category: "beds",
    subcategory: "Queen Size Beds",
    subcategorySlug: "queen-size",
    shortDescription: "A queen bed wrapped in a linen-look weave for bedrooms that need softness, not bulk.",
    description:
      "Linen Queen is sized for typical Chennai bedrooms. The headboard is channelled rather than tufted, so it reads contemporary. A matching bench is available separately from our furniture collection.",
    price: 58900,
    colors: [
      { name: "Flax", hex: "#D5C7AE" },
      { name: "Cloud", hex: "#E8E4DC" },
    ],
    material: "Engineered hardwood, foam-padded headboard, linen-look fabric",
    finish: "Hidden platform base",
    dimensions: { width: 168, depth: 218, height: 110, unit: "cm" },
    features: ["Queen mattress fit", "Channelled headboard", "Optional storage upgrade"],
    tags: ["queen bed", "linen", "bedroom"],
    featured: true,
    availability: "in-stock",
    seoTitle: "Linen Queen Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "A queen bed in linen-look fabric with a channelled headboard. Available from Galaxy Sofas in Chennai, with an optional storage upgrade.",
    keywords: ["queen size bed", "linen bed"],
  }),
  make({
    id: "bed-03",
    slug: "hold-storage-bed",
    name: "Hold Storage Bed",
    category: "beds",
    subcategory: "Storage Beds",
    subcategorySlug: "storage",
    shortDescription: "Hydraulic lift storage with a gas mechanism rated for daily use, not occasional opening.",
    description:
      "Hold hides off-season bedding and spare pillows without a bulky chest. The lift is counterbalanced so one person can open it. Internal height is planned for folded quilts rather than loose clutter. We recommend this when wardrobes are already full.",
    price: 72900,
    colors: [
      { name: "Taupe", hex: "#B7A99A" },
      { name: "Midnight", hex: "#2A2E35" },
    ],
    material: "Hardwood and engineered panels, hydraulic lift, fabric wrap",
    finish: "Upholstered base with timber trim",
    dimensions: { width: 188, depth: 218, height: 105, unit: "cm" },
    features: ["Hydraulic storage", "King or queen", "Daily-use gas mechanism"],
    tags: ["storage bed", "hydraulic", "compact bedroom"],
    featured: false,
    availability: "made-to-order",
    seoTitle: "Hold Storage Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "Hold is a hydraulic storage bed for compact bedrooms. Available in king or queen from Galaxy Sofas, Chennai.",
    keywords: ["storage bed", "hydraulic bed"],
  }),
  make({
    id: "bed-04",
    slug: "velvet-upholstered-bed",
    name: "Velvet Upholstered Bed",
    category: "beds",
    subcategory: "Upholstered Beds",
    subcategorySlug: "upholstered",
    shortDescription: "A fully wrapped bed in a matte velvet that reads rich without looking formal.",
    description:
      "The Velvet Upholstered Bed wraps the frame so there is no exposed timber at the sides. Matte velvet is specified over high-shine pile so it photographs and lives more quietly. A stain-guard finish is available on request.",
    price: 84900,
    colors: [
      { name: "Clove", hex: "#6B4F4A" },
      { name: "Sage", hex: "#8A9A84" },
    ],
    material: "Hardwood frame, high-density foam wrap, matte velvet",
    finish: "Fully upholstered, no exposed side rails",
    dimensions: { width: 178, depth: 220, height: 118, unit: "cm" },
    features: ["Full wrap", "Matte velvet", "Optional stain-guard"],
    tags: ["upholstered bed", "velvet", "primary bedroom"],
    featured: false,
    availability: "limited",
    seoTitle: "Velvet Upholstered Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "A fully wrapped upholstered bed in matte velvet. See Clove and Sage colourways at the Galaxy Sofas showroom in Chennai.",
    keywords: ["upholstered bed", "velvet bed"],
  }),
  make({
    id: "bed-05",
    slug: "teak-line-wooden-bed",
    name: "Teak Line Wooden Bed",
    category: "beds",
    subcategory: "Wooden Beds",
    subcategorySlug: "wooden",
    shortDescription: "A timber bed with honest joinery, a slatted headboard and a natural oil finish.",
    description:
      "Teak Line is for bedrooms that want wood, not fabric. The slatted headboard adds texture without carving. We finish in a natural oil that can be maintained at home. Mattress slats are spaced for ventilation.",
    price: 67900,
    care: CARE_WOOD,
    colors: [
      { name: "Natural teak tone", hex: "#B08B5B" },
      { name: "Deep walnut tone", hex: "#5C4033" },
    ],
    material: "Seasoned hardwood, slatted base, oil finish",
    finish: "Natural oil, matte",
    dimensions: { width: 188, depth: 214, height: 102, unit: "cm" },
    features: ["Slatted headboard", "Ventilated slat base", "Home-maintainable oil"],
    tags: ["wooden bed", "teak", "slatted"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Teak Line Wooden Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "The Teak Line Wooden Bed features a slatted headboard and a natural oil finish. Available from Galaxy Sofas in Chennai.",
    keywords: ["wooden bed", "teak bed", "hardwood bed"],
  }),
  make({
    id: "bed-06",
    slug: "horizon-modern-bed",
    name: "Horizon Modern Bed",
    category: "beds",
    subcategory: "Modern Beds",
    subcategorySlug: "modern",
    shortDescription: "A low platform bed with a thin headboard for rooms that prefer a quiet, architectural line.",
    description:
      "Horizon sits lower than our upholstered beds, which makes tall ceilings feel calmer and small rooms feel less crowded. The headboard is a slim padded panel, not a wall of foam. Pair it with our side tables for a complete bedside.",
    price: 61900,
    colors: [
      { name: "Putty", hex: "#C8BDB0" },
      { name: "Blackened oak", hex: "#2F2C28" },
    ],
    material: "Engineered hardwood platform, slim padded headboard",
    finish: "Low plinth, no visible legs",
    dimensions: { width: 168, depth: 210, height: 86, unit: "cm" },
    features: ["Low platform", "Slim headboard", "Queen or king"],
    tags: ["modern bed", "platform", "minimal"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Horizon Modern Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "Horizon is a low platform bed with a slim headboard. Available in queen and king from Galaxy Sofas, Chennai.",
    keywords: ["modern bed", "platform bed"],
  }),
  make({
    id: "bed-07",
    slug: "custom-headboard-bed",
    name: "Custom Headboard Bed",
    category: "beds",
    subcategory: "Custom Beds",
    subcategorySlug: "custom",
    shortDescription: "A bed built around a wall-to-wall or shaped headboard, including storage if the room needs it.",
    description:
      "When a standard bed leaves awkward gaps on a long wall, we design the headboard to the wall. Lighting, niches and flanking storage can be included. This is planned in the showroom with measurements from your room.",
    price: null,
    colors: [
      { name: "By fabric", hex: "#D4C4B0" },
      { name: "Painted timber", hex: "#8A8175" },
    ],
    material: "Specified with you: timber, upholstery, lighting",
    finish: "Integrated wall panel or floating headboard",
    dimensions: { width: 200, depth: 220, height: 130, unit: "cm" },
    features: ["Wall-to-wall option", "Optional niches", "Storage on request"],
    tags: ["custom bed", "headboard", "bespoke bedroom"],
    featured: true,
    availability: "made-to-order",
    seoTitle: "Custom Headboard Bed in Chennai | Galaxy Sofas",
    seoDescription:
      "Commission a custom headboard bed in Chennai, including wall-to-wall panels, niches and storage. Speak to Galaxy Sofas.",
    keywords: ["custom bed Chennai", "custom headboard"],
  }),
  make({
    id: "fur-01",
    slug: "gather-dining-table",
    name: "Gather Dining Table",
    category: "furniture",
    subcategory: "Dining Tables",
    subcategorySlug: "dining-tables",
    shortDescription: "A six-to-eight seat timber table with eased edges and a calm, matte top.",
    description:
      "Gather is sized for everyday meals and the occasional extra guest. The top is eased so elbows are comfortable. A closed grain finish resists rings better than raw oil, while still showing timber movement.",
    price: 54900,
    care: CARE_WOOD,
    colors: [
      { name: "Oak tone", hex: "#C4A574" },
      { name: "Walnut tone", hex: "#6B4F32" },
    ],
    material: "Hardwood veneer on a stable core, solid timber edges",
    finish: "Matte closed-grain lacquer",
    dimensions: { width: 180, depth: 90, height: 75, unit: "cm" },
    seatingCapacity: 6,
    features: ["Seats 6–8", "Eased edges", "Matte, wipeable finish"],
    tags: ["dining table", "timber", "6 seater"],
    featured: true,
    availability: "in-stock",
    seoTitle: "Gather Dining Table in Chennai | Galaxy Sofas",
    seoDescription:
      "The Gather Dining Table seats six to eight in oak or walnut tone. See it at Galaxy Sofas, a furniture showroom in Chennai.",
    keywords: ["dining table", "wooden dining table Chennai"],
  }),
  make({
    id: "fur-02",
    slug: "curve-dining-chair",
    name: "Curve Dining Chair",
    category: "furniture",
    subcategory: "Dining Chairs",
    subcategorySlug: "dining-chairs",
    shortDescription: "An upholstered dining chair with a slightly curved back that supports longer meals.",
    description:
      "Curve is sold individually so you can mix timber and upholstered seats around Gather. The back is curved, not upright-office, and the seat foam is firm enough that guests do not sink after an hour.",
    price: 12900,
    colors: [
      { name: "Oat", hex: "#D9CCB6" },
      { name: "Ink", hex: "#2C3136" },
    ],
    material: "Hardwood legs, foam seat and back, performance fabric",
    finish: "Oak-tone or blackened legs",
    dimensions: { width: 48, depth: 56, height: 84, unit: "cm" },
    seatingCapacity: 1,
    features: ["Sold individually", "Curved back", "Performance fabric"],
    tags: ["dining chair", "upholstered chair"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Curve Dining Chair in Chennai | Galaxy Sofas",
    seoDescription:
      "Curve is an upholstered dining chair with a supportive curved back. Available individually from Galaxy Sofas in Chennai.",
    keywords: ["dining chairs", "upholstered dining chair"],
  }),
  make({
    id: "fur-03",
    slug: "plinth-coffee-table",
    name: "Plinth Coffee Table",
    category: "furniture",
    subcategory: "Coffee Tables",
    subcategorySlug: "coffee-tables",
    shortDescription: "A low rectangular table with a thick top and a recessed plinth, sized to our sofas.",
    description:
      "Plinth is designed to sit in front of our three-seaters and L-shapes without blocking circulation. The recessed base makes the top feel lighter. A lower shelf holds books without visual clutter.",
    price: 28900,
    care: CARE_WOOD,
    colors: [
      { name: "Stone oak", hex: "#C9B8A0" },
      { name: "Charred oak", hex: "#3A342E" },
    ],
    material: "Hardwood veneer, solid edge, lower shelf",
    finish: "Matte lacquer",
    dimensions: { width: 120, depth: 60, height: 40, unit: "cm" },
    features: ["Lower shelf", "Sized to Galaxy sofas", "Recessed plinth"],
    tags: ["coffee table", "living room"],
    featured: true,
    availability: "in-stock",
    seoTitle: "Plinth Coffee Table in Chennai | Galaxy Sofas",
    seoDescription:
      "The Plinth Coffee Table is sized to Galaxy sofas, with a lower shelf and a recessed base. Available in Chennai.",
    keywords: ["coffee table", "living room table"],
  }),
  make({
    id: "fur-04",
    slug: "ember-side-table",
    name: "Ember Side Table",
    category: "furniture",
    subcategory: "Side Tables",
    subcategorySlug: "side-tables",
    shortDescription: "A compact round side table for lamps and evening tea beside a sofa or bed.",
    description:
      "Ember takes a lamp without looking like a full console. The round top is kinder in tight circulation paths. Pair two as nightstands with Horizon or Linen Queen.",
    price: 14900,
    care: CARE_WOOD,
    colors: [
      { name: "Honey", hex: "#C4A265" },
      { name: "Ebony", hex: "#2B2622" },
    ],
    material: "Solid timber top, turned or block base",
    finish: "Oil or matte lacquer",
    dimensions: { width: 45, depth: 45, height: 52, unit: "cm" },
    features: ["Round top", "Nightstand scale", "Pairs with beds and sofas"],
    tags: ["side table", "nightstand"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Ember Side Table in Chennai | Galaxy Sofas",
    seoDescription:
      "Ember is a compact round side table for sofas and beds. See finishes at Galaxy Sofas in Chennai.",
    keywords: ["side table", "bedside table"],
  }),
  make({
    id: "fur-05",
    slug: "quiet-tv-unit",
    name: "Quiet TV Unit",
    category: "furniture",
    subcategory: "TV Units",
    subcategorySlug: "tv-units",
    shortDescription: "A low media unit with cable routing and doors that hide devices without looking busy.",
    description:
      "Quiet is a low unit so the television does not sit too high. Rear cut-outs and a ventilated shelf keep devices cool. Doors are handleless with a push-catch so the front stays a single plane.",
    price: 38900,
    care: CARE_WOOD,
    colors: [
      { name: "Greige", hex: "#B7AFA4" },
      { name: "Walnut tone", hex: "#6B4F32" },
    ],
    material: "Engineered panels, timber veneer, ventilated rear",
    finish: "Handleless doors, push-catch",
    dimensions: { width: 180, depth: 45, height: 50, unit: "cm" },
    features: ["Cable routing", "Ventilated shelf", "Handleless doors"],
    tags: ["tv unit", "media unit"],
    featured: false,
    availability: "made-to-order",
    seoTitle: "Quiet TV Unit in Chennai | Galaxy Sofas",
    seoDescription:
      "Quiet is a handleless TV unit with cable routing and ventilation. Made to order at Galaxy Sofas, Chennai.",
    keywords: ["tv unit", "tv cabinet Chennai"],
  }),
  make({
    id: "fur-06",
    slug: "fold-wardrobe",
    name: "Fold Wardrobe",
    category: "furniture",
    subcategory: "Wardrobes",
    subcategorySlug: "wardrobes",
    shortDescription: "A sliding-door wardrobe planned for hanging, shelves and a drawer bank.",
    description:
      "Fold uses sliding doors so it works in rooms where hinged doors would hit a bed. Interiors are planned with hanging, shelves and drawers rather than a single empty carcass. Sizes can be adjusted as a custom enquiry.",
    price: 89900,
    care: CARE_WOOD,
    colors: [
      { name: "Warm white", hex: "#EFE8DC" },
      { name: "Oak", hex: "#C4A574" },
    ],
    material: "Engineered carcass, timber or laminate doors, soft-close sliders",
    finish: "Sliding doors, optional mirror panel",
    dimensions: { width: 210, depth: 60, height: 220, unit: "cm" },
    features: ["Sliding doors", "Mixed interiors", "Custom widths on enquiry"],
    tags: ["wardrobe", "sliding", "bedroom storage"],
    featured: false,
    availability: "made-to-order",
    seoTitle: "Fold Wardrobe in Chennai | Galaxy Sofas",
    seoDescription:
      "Fold is a sliding-door wardrobe with planned interiors. Custom widths available from Galaxy Sofas in Chennai.",
    keywords: ["wardrobe", "sliding wardrobe Chennai"],
  }),
  make({
    id: "fur-07",
    slug: "sideboard-cabinet",
    name: "Sideboard Cabinet",
    category: "furniture",
    subcategory: "Cabinets",
    subcategorySlug: "cabinets",
    shortDescription: "A dining sideboard for crockery, with drawers that do not rattle on tiled floors.",
    description:
      "This sideboard is scaled to sit behind a dining table or on a living room wall. Soft-close drawers and adjustable shelves keep china and glassware stable. The top is finished to take a lamp or a pair of candlesticks.",
    price: 42900,
    care: CARE_WOOD,
    colors: [
      { name: "Walnut tone", hex: "#6B4F32" },
      { name: "Painted putty", hex: "#C8BDB0" },
    ],
    material: "Hardwood veneer, soft-close hardware, adjustable shelves",
    finish: "Matte lacquer, solid timber edge",
    dimensions: { width: 160, depth: 45, height: 78, unit: "cm" },
    features: ["Soft-close drawers", "Adjustable shelves", "Lamp-ready top"],
    tags: ["sideboard", "cabinet", "dining"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Sideboard Cabinet in Chennai | Galaxy Sofas",
    seoDescription:
      "A dining sideboard with soft-close drawers and adjustable shelves. Available from Galaxy Sofas, Chennai.",
    keywords: ["sideboard", "dining cabinet"],
  }),
  make({
    id: "fur-08",
    slug: "focus-study-table",
    name: "Focus Study Table",
    category: "furniture",
    subcategory: "Study Tables",
    subcategorySlug: "study-tables",
    shortDescription: "A desk with a clear span for a laptop and a drawer that hides chargers and paper.",
    description:
      "Focus keeps the work surface empty. Cable ports sit at the back, and a wide drawer takes adapters. The height is standard desk height, not dining height, so chairs from our dining range should be checked before pairing.",
    price: 24900,
    care: CARE_WOOD,
    colors: [
      { name: "Natural oak", hex: "#C4A574" },
      { name: "White oak", hex: "#E6DCC8" },
    ],
    material: "Hardwood veneer, cable port, wide drawer",
    finish: "Matte, fingerprint-resistant",
    dimensions: { width: 120, depth: 60, height: 75, unit: "cm" },
    features: ["Cable port", "Wide drawer", "Standard desk height"],
    tags: ["study table", "desk", "wfh"],
    featured: false,
    availability: "in-stock",
    seoTitle: "Focus Study Table in Chennai | Galaxy Sofas",
    seoDescription:
      "Focus is a home study table with a cable port and a wide drawer. See it at Galaxy Sofas in Chennai.",
    keywords: ["study table", "home desk"],
  }),
  make({
    id: "fur-09",
    slug: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    category: "furniture",
    subcategory: "Home Accessories",
    subcategorySlug: "home-accessories",
    shortDescription: "A floor lamp that throws light over a sofa corner without a ceiling point.",
    description:
      "Arc is useful in rental homes and in rooms where the ceiling rose is in the wrong place. The shade is fabric so the light stays warm. Pair it with Nook or Calicut when a side table lamp is not enough.",
    price: 18900,
    colors: [
      { name: "Antique brass", hex: "#B08D57" },
      { name: "Blackened steel", hex: "#2F2F2F" },
    ],
    material: "Metal stem, fabric shade, weighted base",
    finish: "Antique brass or blackened steel",
    dimensions: { width: 40, depth: 90, height: 175, unit: "cm" },
    features: ["Over-sofa reach", "Fabric shade", "Weighted base"],
    tags: ["lamp", "lighting", "accessory"],
    featured: false,
    availability: "limited",
    seoTitle: "Arc Floor Lamp in Chennai | Galaxy Sofas",
    seoDescription:
      "The Arc Floor Lamp lights a sofa corner without a ceiling point. Available in antique brass or blackened steel from Galaxy Sofas.",
    keywords: ["floor lamp", "living room lighting"],
  }),
];

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(category: ProductCategory, slug: string) {
  return products.find((product) => product.category === category && product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.subcategorySlug === product.subcategorySlug || item.category === product.category),
    )
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.subcategory,
      product.material,
      ...product.tags,
      ...product.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function availabilityLabel(status: Availability) {
  if (status === "in-stock") return "Available to view";
  if (status === "limited") return "Limited availability";
  return "Made to order";
}

export function formatPrice(price: number | null, currency: Product["currency"] = "INR") {
  if (price == null) return "Price on enquiry";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
