export interface PageContent {
  title: string;
  description: string;
  sections: Array<{ heading: string; body: string }>;
}

export const pageContent: Record<string, PageContent> = {
  about: {
    title: 'About Galaxy Sofas',
    description: 'A legacy luxury furniture house blending innovation and craftsmanship.',
    sections: [
      { heading: 'Our Philosophy', body: 'We design furniture as emotional architecture—premium, enduring, and deeply personal.' },
      { heading: 'Our Promise', body: 'Every project is engineered for comfort, beauty, and long-term durability.' }
    ]
  },
  categories: {
    title: 'Premium Categories',
    description: 'Explore luxury sofas, beds, dining, and office furniture categories.',
    sections: [
      { heading: 'Living Spaces', body: 'Luxury sofas, recliners, corner sofas, and curated coffee tables.' },
      { heading: 'Complete Homes', body: 'Beds, wardrobes, TV units, and coordinated furnishing solutions.' }
    ]
  },
  collections: {
    title: 'Curated Collections',
    description: 'Signature design collections for modern, minimal, and luxury interiors.',
    sections: [
      { heading: 'Signature Luxe', body: 'High-end silhouettes with soft textures and warm metallic accents.' },
      { heading: 'Contemporary Calm', body: 'Minimal forms and neutral palettes for serene premium spaces.' }
    ]
  },
  'why-galaxy-sofas': {
    title: 'Why Galaxy Sofas',
    description: 'Design-first processes, premium materials, and white-glove execution.',
    sections: [
      { heading: 'Crafted to Last', body: 'Kiln-dried wood frames, precision upholstery, and premium quality checks.' },
      { heading: 'Designed for You', body: 'Bespoke dimensions, curated finishes, and designer collaboration support.' }
    ]
  },
  'manufacturing-process': {
    title: 'Manufacturing Process',
    description: 'From sketches to final polish, each piece passes meticulous craftsmanship stages.',
    sections: [
      { heading: 'Material Selection', body: 'Only premium-grade timber, foam density, and upholstery are approved.' },
      { heading: 'Finishing Excellence', body: 'Multi-point inspection ensures consistency and long-term performance.' }
    ]
  },
  'custom-furniture': {
    title: 'Custom Furniture Studio',
    description: 'Commission fully bespoke furniture tailored to your space and lifestyle.',
    sections: [
      { heading: 'Consult', body: 'Share dimensions, references, and functionality goals with our experts.' },
      { heading: 'Create', body: 'Receive design renders, material boards, and handcrafted production.' }
    ]
  },
  gallery: {
    title: 'Interior Gallery',
    description: 'An evolving portfolio of completed luxury interior projects.',
    sections: [
      { heading: 'Residential', body: 'Elegant villas, apartments, and penthouse living spaces.' },
      { heading: 'Commercial', body: 'Boutique offices and hospitality-focused furniture styling.' }
    ]
  },
  'interior-inspiration': {
    title: 'Interior Inspiration',
    description: 'Luxury moodboards and ideas for elevated modern homes.',
    sections: [
      { heading: 'Color Stories', body: 'Pair stone neutrals with amber metallic accents for warm sophistication.' },
      { heading: 'Layout Intelligence', body: 'Balance movement, storage, and social zones with modular furniture planning.' }
    ]
  },
  testimonials: {
    title: 'Client Testimonials',
    description: 'Trusted by homeowners, architects, and design studios.',
    sections: [
      { heading: 'Experiences', body: 'Our clients value the tailored process and premium finish quality.' },
      { heading: 'Outcomes', body: 'Projects consistently improve function, aesthetics, and resale appeal.' }
    ]
  },
  faqs: {
    title: 'Frequently Asked Questions',
    description: 'Everything you need to know before ordering premium furniture.',
    sections: [
      { heading: 'Ordering', body: 'We offer guided ordering with material and dimension validation.' },
      { heading: 'Delivery & Care', body: 'White-glove delivery, setup, and ongoing maintenance advice included.' }
    ]
  },
  'store-location': {
    title: 'Store Location',
    description: 'Visit our luxury furniture studio for immersive product exploration.',
    sections: [
      { heading: 'Experience Center', body: 'Walk through curated room setups and finish libraries.' },
      { heading: 'Appointments', body: 'Schedule one-on-one design consultations with our product experts.' }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Galaxy Sofas handles your information responsibly and transparently.',
    sections: [
      { heading: 'Data Use', body: 'We collect only required details to process consultations and orders.' },
      { heading: 'Protection', body: 'Security protocols and limited access policies protect customer data.' }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    description: 'Purchase, customization, and warranty terms for Galaxy Sofas services.',
    sections: [
      { heading: 'Orders', body: 'Order confirmation includes approved dimensions, material, and timeline.' },
      { heading: 'Warranty', body: 'Coverage varies by product category with documented service terms.' }
    ]
  }
};
