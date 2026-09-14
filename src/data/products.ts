import type { Product, ProductCategory, ProductCategoryId } from "@/types";

const IMG = "/images/sofas";

export const productCategories: ProductCategory[] = [
  {
    id: "l-shape",
    slug: "l-shape",
    name: "L Shape Sofas",
    shortName: "L Shape",
    description: "Corner seating that uses a room's full width without blocking it.",
    image: `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
    imageAlt: "Light grey L shape sectional sofa with a chaise in a bright living room",
    heading: "L Shape Sofas in Chennai",
    metaTitle: "L Shape Sofas in Chennai",
    metaDescription:
      "L shape sofas built to your room size in Chennai. Choose chaise side, seat depth and fabric, then enquire on WhatsApp for options and lead time.",
    intro:
      "An L shape sofa turns a corner into usable seating, which is why it suits most Chennai apartment living rooms where one wall is taken by the TV unit and another by a window or balcony door.",
    body: [
      "We build the chaise on the left or right depending on how your room opens, and size the run to your wall measurement rather than a fixed catalogue width. That matters in flats where a standard sectional leaves either a gap at one end or blocks a walkway.",
      "Seat depth is the second decision. A deeper seat is comfortable for lounging but harder to sit upright in, so we usually suggest settling it after you have felt the foam samples or described how the family actually uses the room.",
    ],
    considerations: [
      "Measure the two walls the sofa will run along, and note doorway and lift width for delivery",
      "Decide the chaise side by where the TV and main walkway sit",
      "Modular sections can be rearranged later; a fixed frame is sturdier at the joint",
      "Lighter fabrics show use faster in a family room — ask about tighter weaves",
    ],
    related: ["3-seater", "custom"],
  },
  {
    id: "recliner",
    slug: "recliner",
    name: "Recliner Sofas",
    shortName: "Recliner",
    description: "Reclining seats for TV rooms, with support where you actually rest.",
    image: `${IMG}/light-grey-three-seater-sofa-patterned-cushions.webp`,
    imageAlt: "Light grey three seater sofa with patterned cushions in a living room",
    heading: "Recliner Sofas in Chennai",
    metaTitle: "Recliner Sofas in Chennai",
    metaDescription:
      "Recliner sofas made in Chennai with manual or motorised mechanisms and single or dual seats. Talk to Galaxy Sofas about sizing, headrest height and fabric.",
    intro:
      "A recliner earns its place in the room where you watch television and fall asleep halfway through. The mechanism and the headrest height matter more than the silhouette.",
    body: [
      "We fit manual or motorised mechanisms and build single, dual or three-seat layouts. Motorised seats need a socket within reach of the sofa, so it is worth planning the position before the order rather than running a cable across the floor afterwards.",
      "Recliners also need clearance behind them. Wall-hugger layouts open forward and suit tight rooms; a standard recline needs a few inches of gap from the wall. We check this against your measurements at the enquiry stage.",
    ],
    considerations: [
      "Leave clearance behind the sofa unless you choose a wall-hugger layout",
      "Motorised seats need a nearby power point",
      "Headrest height should match the tallest regular user",
      "Ask about servicing the mechanism later — it is the part that wears first",
    ],
    related: ["3-seater", "2-seater"],
  },
  {
    id: "sofa-cum-bed",
    slug: "sofa-cum-bed",
    name: "Sofa Cum Beds",
    shortName: "Sofa Cum Bed",
    description: "Everyday seating that converts for guests without a separate bedroom.",
    image: `${IMG}/tan-leather-three-seater-sofa.webp`,
    imageAlt: "Tan leather three seater sofa with loose back cushions",
    heading: "Sofa Cum Beds in Chennai",
    metaTitle: "Sofa Cum Beds in Chennai",
    metaDescription:
      "Sofa cum beds made in Chennai for guest rooms and compact flats. Pull-out or fold-down conversion, storage options and custom sizes from Galaxy Sofas.",
    intro:
      "A sofa cum bed has to do two jobs honestly: sit well every day, and sleep well the few nights a month guests stay. Most disappointment comes from a unit that only does one of them.",
    body: [
      "We build both pull-out and fold-down conversions. Pull-out mechanisms give a flatter sleeping surface; fold-down designs are simpler and take up less depth when closed, which helps in a room that doubles as a study.",
      "Storage under the seat is worth asking about if the sofa is going into a guest room, since bedding has to live somewhere. We size the compartment around what you actually plan to keep in it.",
    ],
    considerations: [
      "Check the open length against the room — conversion needs floor space in front",
      "A firmer seat foam usually sleeps better than a very soft one",
      "Storage under the seat keeps bedding in the same room",
      "Removable covers are easier to maintain on a piece used by guests",
    ],
    related: ["2-seater", "custom"],
  },
  {
    id: "3-seater",
    slug: "3-seater",
    name: "3 Seater Sofas",
    shortName: "3 Seater",
    description: "The standard living-room sofa, sized to your wall rather than a catalogue.",
    image: `${IMG}/green-velvet-three-seater-sofa.webp`,
    imageAlt: "Green velvet three seater sofa on wooden legs",
    heading: "3 Seater Sofas in Chennai",
    metaTitle: "3 Seater Sofas in Chennai",
    metaDescription:
      "Three seater sofas made to measure in Chennai. Choose frame, foam density, fabric and leg finish, then enquire on WhatsApp for sizes and lead time.",
    intro:
      "A three seater is the piece most living rooms are planned around. Getting the width right — usually somewhere between six and seven feet — decides whether the rest of the room still works.",
    body: [
      "We make three seaters in custom widths so the sofa finishes cleanly against a wall or leaves a deliberate gap for a side table. Kiln-dried frames and high-resilience foam are the two things that decide whether it still sits well in year five.",
      "Fabric choice is where most of the character comes from. Velvets read richer under warm light, tight-weave cottons handle daily family use better, and leather-look materials suit homes where spills are frequent.",
    ],
    considerations: [
      "Measure the wall and subtract space for side tables or walkways",
      "Higher foam density costs more but holds its shape far longer",
      "Loose back cushions feel relaxed; fixed backs look tidier day to day",
      "Leg height changes how heavy the sofa looks in a small room",
    ],
    related: ["2-seater", "l-shape"],
  },
  {
    id: "2-seater",
    slug: "2-seater",
    name: "2 Seater Sofas",
    shortName: "2 Seater",
    description: "Compact seating for flats, offices, balcony rooms and reading corners.",
    image: `${IMG}/rust-orange-two-seater-sofa.webp`,
    imageAlt: "Rust orange two seater sofa with a pale pink cushion",
    heading: "2 Seater Sofas in Chennai",
    metaTitle: "2 Seater Sofas in Chennai",
    metaDescription:
      "Two seater sofas and loveseats made in Chennai for apartments, offices and reading corners. Custom widths, arm profiles and fabrics from Galaxy Sofas.",
    intro:
      "Two seaters do the work in compact flats, and they pair well with a larger sofa when a room needs seating on two sides without crowding the centre.",
    body: [
      "Because the width is small, small changes matter: a thick arm can cost you four inches of seat, and a slim arm profile often buys back real comfort in a tight room.",
      "We also build two seaters for offices and clinic waiting areas, where the brief is usually different — harder wearing, easier to wipe down, and a colour that hides daily use.",
    ],
    considerations: [
      "Slim arms give more usable seat in the same overall width",
      "Check the lift or staircase width before finalising the frame size",
      "Pair with a three seater in the same fabric for a consistent room",
      "Ask about hard-wearing fabrics for office and commercial use",
    ],
    related: ["3-seater", "sofa-cum-bed"],
  },
  {
    id: "custom",
    slug: "custom",
    name: "Custom Sofas",
    shortName: "Custom",
    description: "Made to your measurements, from a reference photo or your own drawing.",
    image: `${IMG}/sofa-fabric-swatch-selection.webp`,
    imageAlt: "Hands comparing upholstery fabric swatches",
    heading: "Custom Sofas in Chennai",
    metaTitle: "Custom Sofas in Chennai",
    metaDescription:
      "Custom sofa makers in Chennai. Share your room measurements or a reference photo and Galaxy Sofas will build the sofa to the size, fabric and comfort you choose.",
    intro:
      "Custom work starts with a measurement and a reference — a photo you have saved, a drawing, or an existing sofa you want rebuilt to fit a different room.",
    body: [
      "From there the decisions are practical: overall size, seat height and depth, arm and back profile, foam density, and fabric. We talk through each one and say where a choice will cost comfort or durability, not only price.",
      "Delivery access is part of the design. If a finished sofa cannot make the turn on your staircase, we plan a sectional build or on-site assembly before manufacturing starts, not after.",
    ],
    considerations: [
      "Send room measurements and a photo of the space when you enquire",
      "Seat height matters if anyone in the house has knee or back trouble",
      "Confirm staircase, lift and doorway access before the build",
      "Keep a small piece of the chosen fabric for future repairs",
    ],
    related: ["l-shape", "3-seater"],
  },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "aurora-l-shape-sofa",
    name: "Aurora L Shape Sofa",
    category: "l-shape",
    shortDescription: "A generous corner sofa with deep seats and soft cushions.",
    description:
      "The Aurora L Shape Sofa is designed for spacious living rooms. It offers a wide chaise, supportive backrests and a clean modern silhouette that works with both contemporary and classic interiors. The chaise can be built on either side and the run is made to your wall measurement.",
    image: `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
    imageAlt: "Light grey L shape sectional sofa with a chaise in a bright living room",
    gallery: [
      `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
      `${IMG}/grey-l-shape-sectional-living-room.webp`,
      `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
    ],
    features: [
      "L-shaped layout for family seating",
      "High-density foam cushions",
      "Custom fabric options",
      "Solid hardwood frame",
    ],
    featured: true,
  },
  {
    id: "p02",
    slug: "nova-modular-l-shape",
    name: "Nova Modular L Shape",
    category: "l-shape",
    shortDescription: "A modular corner sofa you can arrange to fit your room.",
    description:
      "Nova is a modular L shape sofa built for flexible living. Rearrange the sections to suit your layout, then choose fabric and cushion firmness to match how you sit and relax at home. The modular build also makes delivery easier where staircases are narrow.",
    image: `${IMG}/grey-l-shape-sectional-living-room.webp`,
    imageAlt: "Grey L shape sectional sofa with wooden coffee tables in a living room",
    gallery: [
      `${IMG}/grey-l-shape-sectional-living-room.webp`,
      `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
      `${IMG}/grey-tufted-three-seater-sofa.webp`,
    ],
    features: [
      "Modular corner sections",
      "Choice of left or right chaise",
      "Stain-resistant fabric options",
      "Easy-to-clean removable covers",
    ],
    featured: true,
  },
  {
    id: "p03",
    slug: "orbit-recliner-sofa",
    name: "Orbit Recliner Sofa",
    category: "recliner",
    shortDescription: "A plush recliner sofa made for evening comfort.",
    description:
      "The Orbit Recliner Sofa combines a tailored look with a smooth recline. It is a strong choice for TV rooms and living spaces where comfort matters as much as appearance, and it can be built with manual or motorised seats.",
    image: `${IMG}/light-grey-three-seater-sofa-patterned-cushions.webp`,
    imageAlt: "Light grey three seater sofa with patterned cushions",
    gallery: [
      `${IMG}/light-grey-three-seater-sofa-patterned-cushions.webp`,
      `${IMG}/grey-tufted-three-seater-sofa.webp`,
      `${IMG}/tan-leather-sofa-gallery-wall.webp`,
    ],
    features: [
      "Manual or motorised recline options",
      "Headrest and lumbar support",
      "Durable reclining mechanism",
      "Premium upholstery choices",
    ],
    featured: true,
  },
  {
    id: "p04",
    slug: "luna-dual-recliner",
    name: "Luna Dual Recliner",
    category: "recliner",
    shortDescription: "Two recliner seats in one elegant sofa design.",
    description:
      "Luna gives two people independent recline without losing a refined sofa profile. It suits couple-friendly living rooms that need both style and rest, and works as a wall-hugger build where space behind the sofa is tight.",
    image: `${IMG}/grey-tufted-three-seater-sofa.webp`,
    imageAlt: "Grey tufted sofa with teal cushions beside a window",
    gallery: [
      `${IMG}/grey-tufted-three-seater-sofa.webp`,
      `${IMG}/light-grey-three-seater-sofa-patterned-cushions.webp`,
      `${IMG}/green-velvet-three-seater-sofa.webp`,
    ],
    features: [
      "Independent dual recliners",
      "Wide armrests",
      "Soft-touch upholstery",
      "Available in multiple sizes",
    ],
  },
  {
    id: "p05",
    slug: "cosmos-sofa-cum-bed",
    name: "Cosmos Sofa Cum Bed",
    category: "sofa-cum-bed",
    shortDescription: "A daily sofa that opens into a guest-ready bed.",
    description:
      "Cosmos is a sofa cum bed designed for homes that host guests often. The seating stays comfortable through the day, then converts into a supportive sleeping surface at night. A storage compartment for bedding can be built into the base.",
    image: `${IMG}/tan-leather-three-seater-sofa.webp`,
    imageAlt: "Tan leather three seater sofa with loose back cushions",
    gallery: [
      `${IMG}/tan-leather-three-seater-sofa.webp`,
      `${IMG}/tan-leather-sofa-open-plan-living-room.webp`,
      `${IMG}/tan-leather-sofa-gallery-wall.webp`,
    ],
    features: [
      "Easy pull-out bed mechanism",
      "Supportive mattress base",
      "Storage option available",
      "Compact when closed",
    ],
    featured: true,
  },
  {
    id: "p06",
    slug: "eclipse-sofa-bed",
    name: "Eclipse Sofa Bed",
    category: "sofa-cum-bed",
    shortDescription: "A space-saving sofa bed with a clean modern look.",
    description:
      "Eclipse is built for apartments and spare rooms. It keeps a neat sofa appearance while offering a practical sleeping solution whenever you need one, with a fold-down conversion that needs less depth than a pull-out.",
    image: `${IMG}/tan-leather-sofa-open-plan-living-room.webp`,
    imageAlt: "Tan leather sofa in an open-plan living and dining room",
    gallery: [
      `${IMG}/tan-leather-sofa-open-plan-living-room.webp`,
      `${IMG}/tan-leather-three-seater-sofa.webp`,
      `${IMG}/grey-tufted-three-seater-sofa.webp`,
    ],
    features: [
      "Quick conversion",
      "Firm yet comfortable sleep surface",
      "Custom size on request",
      "Family-friendly fabrics",
    ],
  },
  {
    id: "p07",
    slug: "horizon-three-seater",
    name: "Horizon 3 Seater Sofa",
    category: "3-seater",
    shortDescription: "A balanced three-seater with timeless proportions.",
    description:
      "Horizon is a three-seater sofa with generous seat depth and a tailored back. It fits most living rooms and can be customised in fabric, colour, leg finish and cushion fill.",
    image: `${IMG}/green-velvet-three-seater-sofa.webp`,
    imageAlt: "Green velvet three seater sofa on wooden legs",
    gallery: [
      `${IMG}/green-velvet-three-seater-sofa.webp`,
      `${IMG}/tan-leather-sofa-gallery-wall.webp`,
      `${IMG}/light-grey-three-seater-sofa-patterned-cushions.webp`,
    ],
    features: [
      "Seats three comfortably",
      "Kiln-dried wood frame",
      "High-resilience foam",
      "Made in custom sizes",
    ],
    featured: true,
  },
  {
    id: "p08",
    slug: "stellar-three-seater",
    name: "Stellar 3 Seater Sofa",
    category: "3-seater",
    shortDescription: "A refined three-seater with deep comfort and clean lines.",
    description:
      "Stellar is a three-seater designed for everyday use. The silhouette stays simple so the fabric and stitching carry the character of the room, which makes it an easy match for an existing interior.",
    image: `${IMG}/tan-leather-sofa-gallery-wall.webp`,
    imageAlt: "Tan leather sofa below a framed picture gallery wall",
    gallery: [
      `${IMG}/tan-leather-sofa-gallery-wall.webp`,
      `${IMG}/green-velvet-three-seater-sofa.webp`,
      `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
    ],
    features: [
      "Deep seat comfort",
      "Piped or plain stitching options",
      "Choice of legs and finish",
      "Long-lasting upholstery",
    ],
  },
  {
    id: "p09",
    slug: "compact-two-seater",
    name: "Compact 2 Seater Sofa",
    category: "2-seater",
    shortDescription: "A neat two-seater for apartments and reading corners.",
    description:
      "This compact two-seater keeps comfort without crowding the room. Slim arms give more usable seat in the same overall width, which makes it a practical choice for smaller homes, offices and lounge nooks.",
    image: `${IMG}/rust-orange-two-seater-sofa.webp`,
    imageAlt: "Rust orange two seater sofa with a pale pink cushion",
    gallery: [
      `${IMG}/rust-orange-two-seater-sofa.webp`,
      `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
      `${IMG}/grey-tufted-three-seater-sofa.webp`,
    ],
    features: [
      "Space-saving width",
      "Supportive two-seat comfort",
      "Custom fabric selection",
      "Light or dark wood legs",
    ],
    featured: true,
  },
  {
    id: "p10",
    slug: "petite-lounge-two-seater",
    name: "Petite Lounge 2 Seater",
    category: "2-seater",
    shortDescription: "A soft lounge two-seater with a relaxed, inviting feel.",
    description:
      "The Petite Lounge 2 Seater is made for slow evenings. Rounded arms and a slightly deeper sit give it a calm, residential look that works next to a larger sofa or on its own in a reading corner.",
    image: `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
    imageAlt: "Brown leather sofa and armchairs in a sunlit living room",
    gallery: [
      `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
      `${IMG}/rust-orange-two-seater-sofa.webp`,
      `${IMG}/tan-leather-three-seater-sofa.webp`,
    ],
    features: [
      "Relaxed lounge sit",
      "Rounded arm profile",
      "Soft cushion wrap",
      "Ideal for compact rooms",
    ],
  },
  {
    id: "p11",
    slug: "bespoke-corner-custom",
    name: "Bespoke Corner Custom Sofa",
    category: "custom",
    shortDescription: "A made-to-measure corner sofa built around your room.",
    description:
      "Share your room size, seating needs and fabric preference. We build a custom corner sofa that fits wall to wall, with the comfort and finish you choose, and plan delivery access before manufacturing starts.",
    image: `${IMG}/grey-l-shape-sectional-living-room.webp`,
    imageAlt: "Grey sectional sofa arranged around wooden coffee tables",
    gallery: [
      `${IMG}/grey-l-shape-sectional-living-room.webp`,
      `${IMG}/sofa-fabric-swatch-selection.webp`,
      `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
    ],
    features: [
      "Made to your measurements",
      "Fabric, foam and finish choices",
      "Site-friendly delivery planning",
      "One-to-one design discussion",
    ],
  },
  {
    id: "p12",
    slug: "signature-custom-sofa",
    name: "Signature Custom Sofa",
    category: "custom",
    shortDescription: "A fully custom sofa designed from sketch to stitching.",
    description:
      "The Signature Custom Sofa is for homeowners who already have a design in mind. We help refine the drawing, select materials and manufacture the sofa to match your space, including seat height and arm profile.",
    image: `${IMG}/sofa-fabric-swatch-selection.webp`,
    imageAlt: "Hands comparing upholstery fabric swatches",
    gallery: [
      `${IMG}/sofa-fabric-swatch-selection.webp`,
      `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
      `${IMG}/green-velvet-three-seater-sofa.webp`,
    ],
    features: [
      "Design from reference photos or drawings",
      "Custom dimensions and seating count",
      "Premium material options",
      "Crafted in our workshop",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const extras = products.filter(
    (item) => item.id !== product.id && item.category !== product.category,
  );

  return [...sameCategory, ...extras].slice(0, limit);
}

export function getProductsByCategory(categoryId: ProductCategoryId): Product[] {
  return products.filter((product) => product.category === categoryId);
}

export function getCategoryById(id: ProductCategoryId): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id);
}

export function getCategoryLabel(id: ProductCategoryId): string {
  return getCategoryById(id)?.name ?? id;
}

/** Category page URL — a real, crawlable route rather than an on-page anchor. */
export function getCategoryHref(category: Pick<ProductCategory, "slug">): string {
  return `/products/${category.slug}/`;
}
