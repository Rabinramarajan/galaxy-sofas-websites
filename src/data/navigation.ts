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

/** Category landing pages, not on-page anchors, so crawlers reach real URLs. */
export const footerProductLinks: NavLink[] = [
  { label: "L Shape Sofas", href: "/products/l-shape/" },
  { label: "Recliner Sofas", href: "/products/recliner/" },
  { label: "Sofa Cum Beds", href: "/products/sofa-cum-bed/" },
  { label: "3 Seater Sofas", href: "/products/3-seater/" },
  { label: "2 Seater Sofas", href: "/products/2-seater/" },
  { label: "Custom Sofas", href: "/products/custom/" },
];
