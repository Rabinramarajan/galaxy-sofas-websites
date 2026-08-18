export const site = {
  name: "Galaxy Sofas",
  legalName: "Galaxy Sofas",
  tagline: "Designed for the Way You Live.",
  description:
    "Discover thoughtfully crafted sofas, beds and furniture designed to bring comfort, character and timeless style into your home.",
  city: "Chennai",
  region: "Tamil Nadu",
  postalCode: "600017",
  country: "IN",
  countryName: "India",
  addressLine: "42, Furniture Avenue, T. Nagar",
  phoneDisplay: "+91 44 4567 8900",
  phoneE164: "+914445678900",
  whatsappE164: "919876543210",
  email: "hello@galaxysofas.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
    { dayOfWeek: "Sunday", opens: "11:00", closes: "18:00" },
  ],
  geo: { latitude: 13.0418, longitude: 80.2337 },
  serviceAreas: ["Chennai", "Chengalpattu", "Kanchipuram", "Tiruvallur"],
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    pinterest: "https://www.pinterest.com/",
  },
  warranty: "36-month structural warranty on sofas and beds for manufacturing defects.",
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

export function mapsEmbedSrc() {
  const query = encodeURIComponent(
    `${site.name}, ${site.addressLine}, ${site.city} ${site.postalCode}`,
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export function mapsLink() {
  const query = encodeURIComponent(
    `${site.name}, ${site.addressLine}, ${site.city} ${site.postalCode}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
