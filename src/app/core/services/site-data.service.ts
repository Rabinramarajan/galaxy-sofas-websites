import { Injectable, computed, signal } from '@angular/core';
import { BlogPost, Category, Collection, FaqItem, NavItem, Product, Testimonial } from '../models/site.models';

@Injectable({ providedIn: 'root' })
export class SiteDataService {
  private readonly image = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
  readonly navItems = signal<NavItem[]>([
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Collections', path: '/collections' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ]);

  readonly categories = signal<Category[]>([
    { slug: 'luxury-sofas', name: 'Luxury Sofas', description: 'Cloud-soft comfort with couture detailing.', image: this.image('6489117') },
    { slug: 'recliners', name: 'Recliner Sofas', description: 'Motorized lounging with silent precision.', image: this.image('6489084') },
    { slug: 'wooden', name: 'Wooden Sofas', description: 'Solid wood artistry for timeless living.', image: this.image('1350789') },
    { slug: 'beds', name: 'Beds', description: 'Luxury sleep systems with premium upholstery.', image: this.image('1648768') },
    { slug: 'dining', name: 'Dining Tables', description: 'Statement dining crafted in walnut and oak.', image: this.image('1571468') },
    { slug: 'office', name: 'Office Furniture', description: 'Executive ergonomics with elegant silhouettes.', image: this.image('1957477') }
  ]);

  readonly products = signal<Product[]>([
    { slug: 'aurora-l-shape', name: 'Aurora L Shape Sofa', category: 'L Shape Sofas', price: '₹1,89,000', description: 'Italian boucle, plush seating, and modular elegance.', image: this.image('6489037'), tags: ['L Shape', 'Custom', 'Premium'] },
    { slug: 'nova-recliner', name: 'Nova Recliner Sofa', category: 'Recliner Sofas', price: '₹2,25,000', description: 'Electric recline, USB controls, cloud-cushion backrest.', image: this.image('6782342'), tags: ['Recliner', 'Smart', 'Luxury'] },
    { slug: 'regal-wood-frame', name: 'Regal Wood Frame Sofa', category: 'Wooden Sofas', price: '₹1,35,000', description: 'Hand-finished teak frame with ultra-premium cushioning.', image: this.image('276528') , tags: ['Wood', 'Handcrafted', 'Classic'] },
    { slug: 'zenith-bed', name: 'Zenith Upholstered Bed', category: 'Beds', price: '₹1,75,000', description: 'Channel-tufted headboard and hidden soft-close storage.', image: this.image('271743') , tags: ['Bedroom', 'Storage', 'Luxury'] }
  ]);

  readonly collections = signal<Collection[]>([
    { slug: 'signature', name: 'Signature Collection', description: 'Our most exclusive design language.', image: this.image('3935350') },
    { slug: 'urban-luxe', name: 'Urban Luxe', description: 'Modern minimal interiors with warm accents.', image: this.image('2082087') },
    { slug: 'heritage-wood', name: 'Heritage Wood', description: 'Natural grains, sculpted forms, timeless comfort.', image: this.image('4846461') }
  ]);

  readonly testimonials = signal<Testimonial[]>([
    { name: 'Priya Menon', role: 'Interior Designer', quote: 'Galaxy Sofas elevates every project with museum-grade craftsmanship.', rating: 5 },
    { name: 'Arjun Rao', role: 'Villa Owner', quote: 'From consultation to delivery, every detail felt premium and personal.', rating: 5 },
    { name: 'Meera Iyer', role: 'Architect', quote: 'The custom furniture team translated our mood board flawlessly.', rating: 5 }
  ]);

  readonly faqs = signal<FaqItem[]>([
    { question: 'Do you offer fully custom furniture?', answer: 'Yes. We design, prototype, and manufacture furniture tailored to your exact dimensions, fabrics, and finishes.' },
    { question: 'What is the production timeline?', answer: 'Standard premium collections ship in 3-4 weeks. Custom builds usually take 5-8 weeks depending on complexity.' },
    { question: 'Do you provide warranty support?', answer: 'All Galaxy Sofas products include a structured warranty and doorstep post-sales assistance.' }
  ]);

  readonly blogPosts = signal<BlogPost[]>([
    { slug: 'luxury-living-room-ideas', title: '10 Luxury Living Room Styling Ideas', excerpt: 'Transform your home with layered textures, rich tones, and sculpted furniture.', category: 'Interior Inspiration', image: this.image('1571460'), readTime: '6 min read' },
    { slug: 'how-to-choose-l-shape-sofa', title: 'How to Choose the Perfect L Shape Sofa', excerpt: 'A practical guide to dimensions, ergonomics, and layout planning.', category: 'Buying Guide', image: this.image('6585605'), readTime: '5 min read' },
    { slug: 'wood-furniture-maintenance', title: 'Premium Wood Furniture Care Guide', excerpt: 'Protect finish quality and structural life with pro maintenance tips.', category: 'Care', image: this.image('5824908'), readTime: '4 min read' }
  ]);

  readonly featuredProducts = computed(() => this.products().slice(0, 3));
  readonly trendingCategories = computed(() => this.categories().slice(0, 4));
}
