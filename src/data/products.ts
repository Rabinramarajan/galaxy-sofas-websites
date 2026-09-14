import type { Product, ProductCategory, ProductCategoryId } from "@/types";

export const productCategories: ProductCategory[] = [
  {
    id: "l-shape",
    slug: "l-shape",
    name: "L Shape Sofas",
    shortName: "L Shape",
    description: "Spacious corner sofas made for family living rooms.",
    image: "/images/products/l-shape-sofa-01.jpg",
  },
  {
    id: "recliner",
    slug: "recliner",
    name: "Recliner Sofas",
    shortName: "Recliner",
    description: "Relaxing recliner designs for comfort after a long day.",
    image: "/images/products/recliner-sofa-01.jpg",
  },
  {
    id: "sofa-cum-bed",
    slug: "sofa-cum-bed",
    name: "Sofa Cum Beds",
    shortName: "Sofa Cum Bed",
    description: "Daytime seating that converts into a comfortable bed.",
    image: "/images/products/sofa-cum-bed-01.jpg",
  },
  {
    id: "3-seater",
    slug: "3-seater",
    name: "3 Seater Sofas",
    shortName: "3 Seater",
    description: "Classic three-seater sofas for everyday living spaces.",
    image: "/images/products/3-seater-sofa-01.jpg",
  },
  {
    id: "2-seater",
    slug: "2-seater",
    name: "2 Seater Sofas",
    shortName: "2 Seater",
    description: "Compact two-seater sofas for apartments and lounges.",
    image: "/images/products/2-seater-sofa-01.jpg",
  },
  {
    id: "custom",
    slug: "custom",
    name: "Custom Sofas",
    shortName: "Custom",
    description: "Made-to-measure sofas designed around your space.",
    image: "/images/products/custom-sofa-01.jpg",
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
      "The Aurora L Shape Sofa is designed for spacious living rooms. It offers a wide chaise, supportive backrests and a clean modern silhouette that works with both contemporary and classic interiors.",
    image: "/images/products/l-shape-sofa-01.jpg",
    gallery: [
      "/images/products/l-shape-sofa-01.jpg",
      "/images/products/l-shape-sofa-02.jpg",
      "/images/gallery/work-01.jpg",
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
      "Nova is a modular L shape sofa built for flexible living. Rearrange the sections to suit your layout, then choose fabric and cushion firmness to match how you sit and relax at home.",
    image: "/images/products/l-shape-sofa-02.jpg",
    gallery: [
      "/images/products/l-shape-sofa-02.jpg",
      "/images/products/l-shape-sofa-01.jpg",
      "/images/gallery/work-02.jpg",
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
      "The Orbit Recliner Sofa combines a tailored look with a smooth recline. It is a strong choice for TV rooms and living spaces where comfort matters as much as appearance.",
    image: "/images/products/recliner-sofa-01.jpg",
    gallery: [
      "/images/products/recliner-sofa-01.jpg",
      "/images/products/recliner-sofa-02.jpg",
      "/images/gallery/work-03.jpg",
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
      "Luna gives two people independent recline without losing a refined sofa profile. It is well suited to couple-friendly living rooms that need both style and rest.",
    image: "/images/products/recliner-sofa-02.jpg",
    gallery: [
      "/images/products/recliner-sofa-02.jpg",
      "/images/products/recliner-sofa-01.jpg",
      "/images/gallery/work-04.jpg",
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
      "Cosmos is a sofa cum bed designed for homes that host guests often. The seating stays comfortable through the day, then converts into a supportive sleeping surface at night.",
    image: "/images/products/sofa-cum-bed-01.jpg",
    gallery: [
      "/images/products/sofa-cum-bed-01.jpg",
      "/images/products/sofa-cum-bed-02.jpg",
      "/images/gallery/work-05.jpg",
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
      "Eclipse is built for apartments and spare rooms. It keeps a neat sofa appearance while offering a practical sleeping solution whenever you need one.",
    image: "/images/products/sofa-cum-bed-02.jpg",
    gallery: [
      "/images/products/sofa-cum-bed-02.jpg",
      "/images/products/sofa-cum-bed-01.jpg",
      "/images/gallery/work-06.jpg",
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
      "Horizon is a three-seater sofa with generous seat depth and a tailored back. It fits most living rooms and can be customised in fabric, colour and cushion fill.",
    image: "/images/products/3-seater-sofa-01.jpg",
    gallery: [
      "/images/products/3-seater-sofa-01.jpg",
      "/images/products/3-seater-sofa-02.jpg",
      "/images/gallery/work-07.jpg",
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
      "Stellar is a three-seater designed for everyday use. The silhouette stays simple so the fabric and stitching can carry the character of the room.",
    image: "/images/products/3-seater-sofa-02.jpg",
    gallery: [
      "/images/products/3-seater-sofa-02.jpg",
      "/images/products/3-seater-sofa-01.jpg",
      "/images/gallery/work-08.jpg",
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
      "This compact two-seater keeps comfort without crowding the room. It is a practical choice for smaller homes, offices and lounge nooks.",
    image: "/images/products/2-seater-sofa-01.jpg",
    gallery: [
      "/images/products/2-seater-sofa-01.jpg",
      "/images/products/2-seater-sofa-02.jpg",
      "/images/gallery/work-01.jpg",
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
      "The Petite Lounge 2 Seater is made for slow evenings. Rounded arms and a slightly deeper sit give it a calm, residential look.",
    image: "/images/products/2-seater-sofa-02.jpg",
    gallery: [
      "/images/products/2-seater-sofa-02.jpg",
      "/images/products/2-seater-sofa-01.jpg",
      "/images/gallery/work-02.jpg",
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
      "Share your room size, seating needs and fabric preference. We build a custom corner sofa that fits wall to wall, with the comfort and finish you choose.",
    image: "/images/products/custom-sofa-01.jpg",
    gallery: [
      "/images/products/custom-sofa-01.jpg",
      "/images/products/custom-sofa-02.jpg",
      "/images/gallery/work-03.jpg",
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
      "The Signature Custom Sofa is for homeowners who already have a design in mind. We help refine the drawing, select materials and manufacture the sofa to match your space.",
    image: "/images/products/custom-sofa-02.jpg",
    gallery: [
      "/images/products/custom-sofa-02.jpg",
      "/images/products/custom-sofa-01.jpg",
      "/images/gallery/work-04.jpg",
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
