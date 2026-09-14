/**
 * Ionicons registry — the single place icon names are declared.
 *
 * Only the names listed here are copied into `public/ionicons/svg` at build
 * time (see scripts/copy-ionicons.mjs), so the deploy carries a handful of SVGs
 * instead of the 1,357 (2.6 MB) the package ships with. Add an icon here before
 * using it, or it will 404 at runtime.
 */
export const icons = {
  // Navigation and UI
  menu: "menu-outline",
  close: "close-outline",
  chevronRight: "chevron-forward-outline",
  arrowUpRight: "arrow-forward-outline",
  star: "star",

  // Contact
  phone: "call-outline",
  mail: "mail-outline",
  location: "location-outline",
  whatsapp: "logo-whatsapp",

  // Social
  instagram: "logo-instagram",
  facebook: "logo-facebook",

  // Why choose us
  materials: "sparkles-outline",
  customDesign: "color-palette-outline",
  craftsmanship: "hammer-outline",
  pricing: "pricetag-outline",
  comfort: "bed-outline",
  support: "chatbubbles-outline",

  // Services (keys match ServiceItem["icon"])
  factory: "business-outline",
  wrench: "construct-outline",
  refresh: "refresh-outline",
  layers: "layers-outline",
  armchair: "cube-outline",
  truck: "car-outline",
} as const;

export type IconName = keyof typeof icons;

/** Every ionicon file the build needs to copy. */
export const iconFiles: readonly string[] = [...new Set(Object.values(icons))];
