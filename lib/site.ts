export const site = {
  name: "Galaxy Sofas",
  legalName: "Galaxy Sofas",
  tagline: "Comfort That Completes Your Home.",
  description:
    "Explore stylish sofas and furniture at Galaxy Sofas in Virugambakkam, Chennai. Discover contemporary designs for living rooms and bedrooms and visit our showroom to find the right fit for your home.",
  city: "Chennai",
  neighbourhood: "Virugambakkam",
  locality: "Nerkundram",
  region: "Tamil Nadu",
  postalCode: "600107",
  country: "IN",
  countryName: "India",
  streetAddress: "No. 19, Nerkundram, Virugambakkam",
  addressLine: "No. 19, Nerkundram, Virugambakkam",
  fullAddress: "No. 19, Nerkundram, Virugambakkam, Chennai, Tamil Nadu 600107",
  phoneDisplay: "097862 11128",
  phoneE164: "+919786211128",
  whatsappE164: "919786211128",
  email: "galaxysofas1717@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.galaxysofas.com",
  nearbyAreas: [
    "Virugambakkam",
    "Nerkundram",
    "Valasaravakkam",
    "Porur",
    "Koyambedu",
    "Arumbakkam",
    "Anna Nagar",
    "Saligramam",
    "KK Nagar",
    "Ashok Nagar",
    "Vadapalani",
    "Mogappair",
    "Choolaimedu",
    "West Chennai",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalised}`;
}

export function whatsappLink(text?: string) {
  const message = encodeURIComponent(
    text ?? `Hello ${site.name}, I would like to enquire about your furniture.`,
  );
  return `https://wa.me/${site.whatsappE164}?text=${message}`;
}

export function telLink() {
  return `tel:${site.phoneE164}`;
}

export function mapsQuery() {
  return `${site.name}, ${site.fullAddress}`;
}

export function mapsEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery())}&output=embed`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery())}`;
}
