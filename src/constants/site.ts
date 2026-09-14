/**
 * Single source of truth for brand, contact and domain details.
 * Nothing here may be duplicated in components — import from this file instead.
 *
 * BASE URL
 * --------
 * `NEXT_PUBLIC_SITE_URL` overrides the production origin at build time, so the
 * canonical domain can be changed in one place (Vercel project settings or
 * `.env.local`) without touching code. The fallback below is the intended
 * production domain — if the final domain differs, set the env var BEFORE the
 * next production build so canonicals, sitemap and JSON-LD all follow.
 * Never point this at a preview deployment URL.
 */
const FALLBACK_SITE_URL = "https://galaxysofas.com";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL;
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const site = {
  name: "Galaxy Sofas",
  businessName: "Galaxy Sofas",
  tagline: "Comfort Crafted for Your Home",
  description:
    "Comfortable, stylish and custom-made sofa solutions for modern homes.",
  url: siteUrl,

  phone: "9786211128",
  phoneDisplay: "+91 97862 11128",
  phoneE164: "+919786211128",
  phoneHref: "tel:+919786211128",
  email: "galaxysofas1717@gmail.com",
  emailHref: "mailto:galaxysofas1717@gmail.com",
  whatsappNumber: "919786211128",
  whatsappUrl: "https://wa.me/919786211128",

  /** Street address and postal code are intentionally omitted until confirmed. */
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  countryCode: "IN",
  location: "Chennai, Tamil Nadu",
  serviceArea: "Chennai and surrounding areas",

  social: {
    instagram: "https://www.instagram.com/galaxysofas",
    facebook: "https://www.facebook.com/galaxysofas",
  },
  /**
   * Set to true ONLY once the profiles above are confirmed as the real, live
   * Galaxy Sofas accounts. Until then they are never emitted as schema.org
   * `sameAs`, because an unverified profile is a structured-data accuracy risk.
   */
  socialVerified: false,

  logo: "/images/logo/galaxy-sofas-logo.webp",
  ogImage: "/opengraph-image.jpg",

  /** Paste the real GA4 measurement ID here or set NEXT_PUBLIC_GA_ID. Empty = no analytics loaded. */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
  /** Paste the Google Search Console HTML-tag token here when verifying by meta tag. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
} as const;

export type Site = typeof site;
