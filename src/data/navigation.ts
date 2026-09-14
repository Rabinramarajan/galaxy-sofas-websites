import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Products", href: "/products/" },
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
];

/** Trimmed desktop navigation — Home lives on the logo, Contact lives on the CTA. */
export const headerNav: NavLink[] = [
  { label: "Products", href: "/products/" },
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
];

export const footerProductLinks: NavLink[] = [
  { label: "L Shape Sofa", href: "/products/#l-shape" },
  { label: "Recliner Sofa", href: "/products/#recliner" },
  { label: "Sofa Cum Bed", href: "/products/#sofa-cum-bed" },
  { label: "Custom Sofa", href: "/products/#custom" },
];
