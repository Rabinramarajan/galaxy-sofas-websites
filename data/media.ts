import type { ProductCategory, ProductImage } from "@/types/product";

export type MediaImage = ProductImage & {
  objectPosition: string;
  objectPositionMobile?: string;
};

export type MediaVideo = {
  src: string;
  poster: string;
  alt: string;
  objectPosition: string;
  objectPositionMobile: string;
};

function img(
  src: string,
  alt: string,
  width: number,
  height: number,
  objectPosition: string,
  objectPositionMobile?: string,
): MediaImage {
  return { src, alt, width, height, objectPosition, objectPositionMobile };
}

export const media = {
  images: {
    sofasLiving: img(
      "/assets/sofas-l-shaped-living-room.png",
      "Cream L-shaped sofa on a timber plinth in a sunlit living room with a dark wood coffee table",
      1536,
      1024,
      "center 58%",
      "62% 55%",
    ),
    bedsBedroom: img(
      "/assets/beds-upholstered-bedroom.png",
      "Oatmeal upholstered bed with a curved headboard in a calm bedroom with walnut nightstand",
      1536,
      1024,
      "center 62%",
      "center 58%",
    ),
    furnitureDining: img(
      "/assets/furniture-dining-living.png",
      "Walnut oval dining table and upholstered chairs opening onto a living room with a cream sofa",
      1536,
      1024,
      "32% center",
      "28% 60%",
    ),
    lifestyleGolden: img(
      "/assets/lifestyle-golden-hour-living.png",
      "Modular cream sofa and organic walnut coffee table in golden-hour light against concrete walls",
      1024,
      1536,
      "center 68%",
      "center 72%",
    ),
    sofaStudio: img(
      "/assets/sofas-studio-views.png",
      "Studio and lifestyle views of a cream L-shaped sofa, including fabric and stitching detail",
      1536,
      1024,
      "center",
      "center",
    ),
    heroPoster: img(
      "/assets/sofas-l-shaped-living-room.png",
      "Cream L-shaped sofa in a cinematic living room, used as the hero still",
      1536,
      1024,
      "center 52%",
      "center 48%",
    ),
    heroPosterMobile: img(
      "/assets/hero-poster-mobile.png",
      "Portrait view of a cream L-shaped sofa with generous wall space above for overlay type",
      1024,
      1536,
      "center 72%",
      "center 78%",
    ),
  },
  videos: {
    hero: {
      src: "/assets/hero-cinematic.mp4",
      poster: "/assets/sofas-l-shaped-living-room.png",
      alt: "Cinematic walk through a furnished living room",
      objectPosition: "center center",
      objectPositionMobile: "62% center",
    } satisfies MediaVideo,
    sofas: {
      src: "/assets/sofas-cinematic.mp4",
      poster: "/assets/sofas-l-shaped-living-room.png",
      alt: "Cinematic sofa interiors",
      objectPosition: "center center",
      objectPositionMobile: "center 60%",
    } satisfies MediaVideo,
    beds: {
      src: "/assets/beds-cinematic.mp4",
      poster: "/assets/beds-upholstered-bedroom.png",
      alt: "Cinematic bedroom interiors",
      objectPosition: "center center",
      objectPositionMobile: "center 55%",
    } satisfies MediaVideo,
    furniture: {
      src: "/assets/furniture-cinematic.mp4",
      poster: "/assets/furniture-dining-living.png",
      alt: "Cinematic dining and living furniture",
      objectPosition: "center center",
      objectPositionMobile: "30% center",
    } satisfies MediaVideo,
    craftsmanship: {
      src: "/assets/craftsmanship.mp4",
      poster: "/assets/sofas-studio-views.png",
      alt: "Close views of furniture materials and making",
      objectPosition: "center center",
      objectPositionMobile: "center center",
    } satisfies MediaVideo,
  },
} as const;

export const categoryMedia: Record<
  ProductCategory,
  { image: MediaImage; video: MediaVideo }
> = {
  sofas: { image: media.images.sofasLiving, video: media.videos.sofas },
  beds: { image: media.images.bedsBedroom, video: media.videos.beds },
  furniture: { image: media.images.furnitureDining, video: media.videos.furniture },
};

function toProductImage(image: MediaImage, alt?: string): ProductImage {
  return {
    src: image.src,
    alt: alt ?? image.alt,
    width: image.width,
    height: image.height,
  };
}

const sofaGallery: MediaImage[] = [
  media.images.sofasLiving,
  media.images.lifestyleGolden,
  media.images.heroPosterMobile,
];

const bedGallery: MediaImage[] = [media.images.bedsBedroom];

const furnitureLivingGallery: MediaImage[] = [
  media.images.lifestyleGolden,
  media.images.sofasLiving,
  media.images.furnitureDining,
];

const furnitureDiningGallery: MediaImage[] = [
  media.images.furnitureDining,
  media.images.lifestyleGolden,
];

const furnitureBedroomGallery: MediaImage[] = [
  media.images.bedsBedroom,
  media.images.furnitureDining,
];

export function galleryFor(category: ProductCategory, subcategorySlug: string, name: string): ProductImage[] {
  if (category === "sofas") {
    const rotated = rotate(sofaGallery, hash(subcategorySlug + name));
    const images = rotated.map((image) => toProductImage(image, `${name} in a Galaxy Sofas interior`));
    if (subcategorySlug.includes("custom")) {
      images.push(toProductImage(media.images.sofaStudio, `${name} studio views and fabric detail`));
    }
    return images;
  }

  if (category === "beds") {
    return bedGallery.map((image) => toProductImage(image, `${name} in a calm bedroom setting`));
  }

  if (subcategorySlug === "dining-tables" || subcategorySlug === "dining-chairs" || subcategorySlug === "cabinets") {
    return rotate(furnitureDiningGallery, hash(name)).map((image) =>
      toProductImage(image, `${name} in a dining and living interior`),
    );
  }

  if (subcategorySlug === "wardrobes") {
    return furnitureBedroomGallery.map((image) => toProductImage(image, `${name} in a bedroom setting`));
  }

  return rotate(furnitureLivingGallery, hash(name)).map((image) =>
    toProductImage(image, `${name} in a living interior`),
  );
}

export function collectionImage(slug: string): ProductImage {
  if (slug === "rest") return toProductImage(media.images.bedsBedroom);
  if (slug === "dining-and-gather") return toProductImage(media.images.furnitureDining);
  if (slug === "custom-atelier") return toProductImage(media.images.sofaStudio);
  return toProductImage(media.images.sofasLiving);
}

function hash(value: string) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function rotate<T>(items: T[], offset: number) {
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}
