import type { GalleryItem } from "@/types";

const IMG = "/images/sofas";

/**
 * Gallery captions describe what is visible in each photograph.
 * `image` doubles as the alt source, so captions stay honest and useful.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    title: "Light grey L shape sectional with chaise",
    category: "L Shape",
    image: `${IMG}/light-grey-l-shape-sectional-sofa.webp`,
  },
  {
    id: "g02",
    title: "Grey sectional arranged around wooden coffee tables",
    category: "L Shape",
    image: `${IMG}/grey-l-shape-sectional-living-room.webp`,
  },
  {
    id: "g03",
    title: "Green velvet three seater on wooden legs",
    category: "3 Seater",
    image: `${IMG}/green-velvet-three-seater-sofa.webp`,
  },
  {
    id: "g04",
    title: "Tan leather sofa below a gallery wall",
    category: "3 Seater",
    image: `${IMG}/tan-leather-sofa-gallery-wall.webp`,
  },
  {
    id: "g05",
    title: "Grey tufted sofa with teal cushions",
    category: "3 Seater",
    image: `${IMG}/grey-tufted-three-seater-sofa.webp`,
  },
  {
    id: "g06",
    title: "Rust orange two seater with a pale pink cushion",
    category: "2 Seater",
    image: `${IMG}/rust-orange-two-seater-sofa.webp`,
  },
  {
    id: "g07",
    title: "Brown leather sofa in a sunlit living room",
    category: "Custom",
    image: `${IMG}/brown-leather-sofa-sunlit-living-room.webp`,
  },
  {
    id: "g08",
    title: "Tan leather three seater after fabric and cushion work",
    category: "Services",
    image: `${IMG}/tan-leather-three-seater-sofa.webp`,
  },
];
