import type { NavItem } from '../models/navigation.model';

/** Global brand + site configuration. Single source of truth for the whole app. */
export const SITE = {
  name: 'Galaxy Sofas',
  tagline: 'Furniture Beyond Imagination',
  shortName: 'Galaxy',
  description:
    'India\u2019s most premium luxury furniture brand. Handcrafted sofas, recliners, beds, dining sets and bespoke interiors crafted from 100% solid wood.',
  url: 'https://www.galaxysofas.com',
  phone: '+91 97862 11128',
  phoneRaw: '+919786211128',
  whatsapp: '919786211128',
  email: 'care@galaxysofas.com',
  salesEmail: 'sales@galaxysofas.com',
  address: {
    street: 'No. 19, Nerkundram, Virugambakkam',
    city: 'Chennai',
    region: 'Tamil Nadu',
    postalCode: '600107',
    country: 'IN',
    full: 'No. 19, Nerkundram, Virugambakkam, Chennai, Tamil Nadu 600107, India',
  },
  geo: { lat: 13.0674, lng: 80.1915 },
  hours: 'Mon – Sun · 9:00 AM – 10:00 PM',
  founded: 2012,
  showroomCount: 28,
  craftsmen: 450,
  productsDelivered: '1.2M+',
  social: {
    instagram: 'https://instagram.com/galaxysofas',
    facebook: 'https://facebook.com/galaxysofas',
    youtube: 'https://youtube.com/@galaxysofas',
    pinterest: 'https://pinterest.com/galaxysofas',
    twitter: 'https://x.com/galaxysofas',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Furniture',
    path: '/products',
    children: [
      { label: 'All Furniture', path: '/products', description: 'Explore the complete collection' },
      { label: 'Sofas', path: '/categories/sofas', description: 'Luxury 3 & 2 seater masterpieces' },
      { label: 'Recliner Sofas', path: '/categories/recliner-sofas', description: 'Cinematic comfort, powered' },
      { label: 'Wooden Sofas', path: '/categories/wooden-sofas', description: 'Classic solid-wood elegance' },
      { label: 'L Shape Sofas', path: '/categories/l-shape-sofas', description: 'Maximal seating, minimal effort' },
      { label: 'Corner Sofas', path: '/categories/corner-sofas', description: 'Wraparound family comfort' },
      { label: 'Beds', path: '/categories/beds', description: 'Sanctuary-grade sleeping' },
      { label: 'Dining Tables', path: '/categories/dining-tables', description: 'Gather in grand style' },
      { label: 'TV Units', path: '/categories/tv-units', description: 'Statement entertainment walls' },
      { label: 'Chairs', path: '/categories/chairs', description: 'Signature seating' },
      { label: 'Coffee Tables', path: '/categories/coffee-tables', description: 'The room\u2019s centerpiece' },
      { label: 'Wardrobes', path: '/categories/wardrobes', description: 'Bespoke storage, refined' },
      { label: 'Office Furniture', path: '/categories/office-furniture', description: 'Productivity, elevated' },
      { label: 'Custom Furniture', path: '/custom-furniture', description: 'Designed around your life' },
    ],
  },
  {
    label: 'Collections',
    path: '/collections',
    children: [
      { label: 'All Collections', path: '/collections', description: 'Curated stories in furniture' },
      { label: 'The Heritage', path: '/collections', description: 'Classic, timeless, heirloom-grade' },
      { label: 'Urban Nordic', path: '/collections', description: 'Minimal, light, architectural' },
      { label: 'Royal Velvet', path: '/collections', description: 'Plush, regal, opulent' },
      { label: 'Studio Raw', path: '/collections', description: 'Artisanal, organic, tactile' },
      { label: 'Cloud Nine', path: '/collections', description: 'Ultra-soft relaxation systems' },
      { label: 'Executive Suite', path: '/collections', description: 'Boardroom-calibre office line' },
    ],
  },
  { label: 'Categories', path: '/categories' },
  { label: 'Gallery', path: '/gallery' },
  {
    label: 'Inspiration',
    path: '/interior-inspiration',
    children: [
      { label: 'Interior Inspiration', path: '/interior-inspiration', description: 'Room-by-room style guides' },
      { label: 'Gallery', path: '/gallery', description: 'Real homes, real Galaxy' },
      { label: 'Blog', path: '/blog', description: 'Design notes from our studio' },
    ],
  },
  { label: 'Why Galaxy', path: '/why-galaxy-sofas' },
  {
    label: 'Company',
    path: '/about',
    children: [
      { label: 'About Us', path: '/about', description: 'Our story since 2012' },
      { label: 'Manufacturing', path: '/manufacturing-process', description: '450 craftsmen, one obsession' },
      { label: 'Testimonials', path: '/testimonials', description: 'Love from 1.2M+ homes' },
      { label: 'FAQs', path: '/faqs', description: 'Answers, instantly' },
      { label: 'Contact', path: '/contact', description: 'We reply within hours' },
      { label: 'Store Location', path: '/store-location', description: 'Visit a Galaxy showroom' },
    ],
  },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Collections', path: '/collections' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Custom Furniture', path: '/custom-furniture' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];
