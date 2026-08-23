import type { Product, SubcategoryDefinition, SubcategoryMatch } from "@/types/product";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function productInSubcategory(product: Product, subcategory: SubcategoryDefinition) {
  if (product.category !== subcategory.category) return false;

  if (subcategory.match === "corner") {
    return product.subcategorySlug === "l-shaped-sofas" || product.tags.includes("l-shaped");
  }

  if (subcategory.match === "fabric") {
    const material = product.material.toLowerCase();
    const fabricLike = /fabric|linen|weave|cotton/.test(material);
    const leatherLed = material.startsWith("semi-aniline leather") || material.startsWith("leather");
    return fabricLike && !leatherLed;
  }

  return product.subcategorySlug === subcategory.slug;
}

export function unique<T>(values: T[]) {
  return [...new Set(values)];
}

export function filterCatalogue(
  products: Product[],
  options: {
    query?: string;
    subcategory?: string;
    subcategoryMatch?: SubcategoryMatch;
    material?: string;
    color?: string;
    availability?: string;
    sort?: string;
  },
) {
  let result = products;

  if (options.subcategory) {
    const slug = options.subcategory;
    const match = options.subcategoryMatch;
    if (match === "corner") {
      result = result.filter(
        (product) => product.subcategorySlug === "l-shaped-sofas" || product.tags.includes("l-shaped"),
      );
    } else if (match === "fabric") {
      result = result.filter((product) => {
        const material = product.material.toLowerCase();
        const fabricLike = /fabric|linen|weave|cotton/.test(material);
        const leatherLed = material.startsWith("semi-aniline leather") || material.startsWith("leather");
        return fabricLike && !leatherLed;
      });
    } else {
      result = result.filter((product) => product.subcategorySlug === slug);
    }
  }

  if (options.query) {
    const q = options.query.toLowerCase();
    result = result.filter((product) =>
      [product.name, product.category, product.subcategory, product.material, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  if (options.material) {
    result = result.filter((product) =>
      product.material.toLowerCase().includes(options.material!.toLowerCase()),
    );
  }

  if (options.color) {
    result = result.filter((product) =>
      product.colors.some((color) => color.name.toLowerCase() === options.color!.toLowerCase()),
    );
  }

  if (options.availability) {
    result = result.filter((product) => product.availability === options.availability);
  }

  if (options.sort === "price-asc") {
    result = [...result].sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
  } else if (options.sort === "price-desc") {
    result = [...result].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  } else if (options.sort === "name") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}
