import { Injectable, signal, computed } from '@angular/core';
import { FurnitureItem, CinematicBanner, MetricCounter, FilterOption } from '../models/showcase.model';

@Injectable({
  providedIn: 'root'
})
export class LuxuryShowcaseService {
  // Signals State
  readonly activeCategory = signal<'all' | 'living' | 'bedroom' | 'dining' | 'craftsmanship'>('all');
  readonly selectedItemId = signal<string | null>(null);
  readonly activeBannerIndex = signal<number>(0);
  readonly searchQuery = signal<string>('');

  // Static Business Mock Data (Production Quality)
  readonly furnitureItems = signal<readonly FurnitureItem[]>([
    {
      id: 'gs-001',
      title: 'Aethelgard Royal Curved Sofa',
      category: 'living',
      subtitle: 'Sculptural Bouclé & Hand-Finished Brass',
      description: 'An architectural centerpiece crafted with organic curves, hand-tufted Italian bouclé fabric, and an invisible solid oak interior frame.',
      price: 12800,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Aethelgard Royal Curved Sofa in luxury living room',
      badge: 'Bestseller',
      dimensions: { width: '310 cm', height: '82 cm', depth: '115 cm' },
      materials: ['Italian Bouclé', 'FSC Solid Oak', 'Satin Brass Legs', 'High-Density Memory Foam'],
      features: ['Ergonomic Lumbar Support', 'Stain-Resistant Nano Treatment', 'Handcrafted in Milan'],
      isFeatured: true
    },
    {
      id: 'gs-002',
      title: 'Monolith Executive Sectional',
      category: 'living',
      subtitle: 'Full-Grain Tuscan Leather & Smoked Walnut',
      description: 'Expansive modular sectional featuring hand-selected Tuscan full-grain leather, integrated smoked walnut end tables, and brass accent trim.',
      price: 18500,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Monolith Executive Sectional in Tuscan leather',
      badge: 'Limited Edition',
      dimensions: { width: '380 cm', height: '78 cm', depth: '240 cm' },
      materials: ['Full-Grain Tuscan Leather', 'Smoked Walnut Wood', 'Polished Steel Chassis'],
      features: ['Modular Reconfiguration', 'Wireless Phone Charging Deck', 'Hand-Stitched Seams'],
      isFeatured: true
    },
    {
      id: 'gs-003',
      title: 'Celestia Canopy Sanctuary Bed',
      category: 'bedroom',
      subtitle: 'Silk-Touch Velvet & Champagne Gold Metal',
      description: 'A serene sanctuary featuring a floating canopy structure, padded velvet headboard with acoustic dampening, and integrated ambient LED glow.',
      price: 14200,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Celestia Canopy Sanctuary Bed',
      badge: 'New Arrival',
      dimensions: { width: '220 cm', height: '210 cm', depth: '230 cm' },
      materials: ['Silk-Touch Velvet', 'Champagne Gold Steel', 'Acoustic Wool Core'],
      features: ['Hidden Underbed Storage', 'Soft Ambient Lighting', 'Hypoallergenic Weave'],
      isFeatured: true
    },
    {
      id: 'gs-004',
      title: 'Solstice Grand Marble Dining Table',
      category: 'dining',
      subtitle: 'Calacatta Viola Marble & Sculptural Bronze',
      description: 'Rare honed Calacatta Viola marble tabletop with dramatic violet veining, supported by double sculptural lost-wax cast bronze pillars.',
      price: 21000,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Solstice Grand Marble Dining Table',
      badge: 'Artisan Masterpiece',
      dimensions: { width: '320 cm', height: '76 cm', depth: '120 cm' },
      materials: ['Calacatta Viola Marble', 'Lost-Wax Cast Bronze', 'Sealed Anti-Stain Coating'],
      features: ['Seats Up to 12 Guests', 'One-of-a-Kind Marble Pattern', 'Lifetime Structural Warranty'],
      isFeatured: false
    },
    {
      id: 'gs-005',
      title: 'Vanguard Master Wood Crafter Chair',
      category: 'craftsmanship',
      subtitle: 'Steam-Bent Walnut & Saddle Leather',
      description: 'A tribute to centuries of woodworking precision. Single steam-bent walnut frame with hand-strung saddle leather sling seat.',
      price: 4600,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Vanguard Master Wood Crafter Chair',
      badge: 'Craft Heritage',
      dimensions: { width: '75 cm', height: '85 cm', depth: '80 cm' },
      materials: ['American Black Walnut', 'Full Saddle Leather', 'Solid Brass Joinery'],
      features: ['Zero Glue Hardware Construction', 'Patina Aging Finish', 'Numbered Edition'],
      isFeatured: false
    }
  ]);

  readonly cinematicBanners = signal<readonly CinematicBanner[]>([
    {
      id: 'banner-01',
      title: 'The Art of Living Room Grandeur',
      tag: 'Hero Living Room Collection',
      sceneType: 'Hero Banner',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
      promptStatic: 'Hyper-realistic cinematic shot of a luxury modern living room with double-height floor-to-ceiling windows overlooking a foggy pine forest at sunrise. Centered curved bouclé sofa in warm champagne tone, brass coffee table with minimalist art books, warm golden lighting through sheer curtains. Shot on Hasselblad H6D-100c, 35mm lens, f/2.8, volumetric light rays, soft shadows, 8K ultra detailed --ar 16:9 --style raw --v 6.0',
      promptGif: 'Cinematic 4K GIF loop: Slow subtle camera push-in through volumetric dust motes toward a luxury curved sofa. Golden hour sun rays slowly shift across the velvet cushions, gentle curtain motion in breeze, seamlessly looping',
      promptMp4: 'Short 8K video hero loop: Ultra smooth drone camera dolly-in starting low over polished micro-cement floor, rising gently to reveal a penthouse living room with a custom leather sectional sofa. Sunset reflections on glass coffee table, cinematic color grading, 60fps slow motion',
      cameraSpecs: {
        movement: 'Slow linear push-in with gentle 5-degree tilt up',
        lens: '35mm anamorphic prime lens',
        lighting: 'Warm golden hour sunlight with soft diffuse bounce',
        depthOfField: 'Shallow depth of field (f/2.8), sharp focus on sofa texture',
        colorGrading: 'Rich warm tones, deep blacks, champagne highlights'
      }
    },
    {
      id: 'banner-02',
      title: 'Architectural Bedroom Sanctuary',
      tag: 'Master Suite Collection',
      sceneType: 'Bedroom',
      imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1920&q=85',
      promptStatic: 'Architectural Digest style bedroom scene featuring a floating velvet canopy bed with subtle ambient backlighting. Travertine stone wall behind headboard, minimalist silk rug, soft ambient dusk mood. Shot on Sony A7R V, 24mm f/1.4 lens, photorealistic textures, 8K resolution --ar 16:9',
      promptGif: 'Subtle atmospheric GIF loop: Gentle pulsation of warm headboard LED lighting, soft breathing effect of silk duvet in slow motion, continuous luxury mood loop',
      promptMp4: 'High-end interior cinematic trailer: Orbiting camera movement around floating sanctuary bed, revealing acoustic wooden slat paneling, fireplace flame flicker, 4K HDR 60fps',
      cameraSpecs: {
        movement: '360-degree slow pan around headboard',
        lens: '24mm wide prime lens',
        lighting: 'Atmospheric twilight with 2700K indirect LED strips',
        depthOfField: 'Deep focal plane, edge-to-edge detail',
        colorGrading: 'Muted sage greens, warm taupe, brushed gold'
      }
    },
    {
      id: 'banner-03',
      title: 'Master Woodcraft Workshop',
      tag: 'Heritage Atelier',
      sceneType: 'Wood Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1920&q=85',
      promptStatic: 'Close-up photorealistic shot of an artisan woodworker hand-shaving a piece of solid American walnut sofa armrest. Wood shavings floating in single warm spotlight beam, antique woodworking tools on workbench in soft background blur. Macro 85mm f/1.8 lens, 8K --ar 16:9',
      promptGif: 'Looping craftsmanship GIF: Wood plane tool smoothly sliding along walnut timber, thin wood curl peeling off in crisp high definition, golden dust particles floating in light beam',
      promptMp4: 'Cinematic craftsman spotlight: High-speed 120fps video showing precision hand-sanding of sofa frame, tactile wood grain detail, ambient craftsman studio audio atmosphere',
      cameraSpecs: {
        movement: 'Macro lateral tracking shot following craftsman hand',
        lens: '85mm f/1.8 macro lens',
        lighting: 'High-contrast single overhead warm spotlight',
        depthOfField: 'Razor-thin depth of field, focus on wood grain',
        colorGrading: 'Rich espresso walnuts, warm amber, deep shadow undertones'
      }
    }
  ]);

  readonly metrics = signal<readonly MetricCounter[]>([
    { id: 'm1', label: 'Bespoke Sofas Crafted', value: 4850, suffix: '+', description: 'Delivered to luxury residences globally' },
    { id: 'm2', label: 'Artisan Craftsmanship', value: 35, suffix: ' Years', description: 'Legacy of Milanese woodworking' },
    { id: 'm3', label: 'Custom Fabric Options', value: 180, suffix: '+', description: 'Velvets, bouclés & Tuscan leathers' },
    { id: 'm4', label: 'Structural Warranty', value: 25, suffix: ' Years', description: 'Uncompromising heirloom quality' }
  ]);

  readonly filterOptions: FilterOption[] = [
    { id: 'f-all', label: 'All Collections', category: 'all' },
    { id: 'f-living', label: 'Living Room', category: 'living' },
    { id: 'f-bedroom', label: 'Bedroom Sanctuary', category: 'bedroom' },
    { id: 'f-dining', label: 'Dining & Tables', category: 'dining' },
    { id: 'f-craft', label: 'Craftsmanship', category: 'craftsmanship' }
  ];

  // Computed Derived Signals
  readonly filteredItems = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();
    return this.furnitureItems().filter(item => {
      const matchesCategory = cat === 'all' || item.category === cat;
      const matchesSearch = !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  });

  readonly selectedItem = computed(() => {
    const id = this.selectedItemId();
    return this.furnitureItems().find(item => item.id === id) || null;
  });

  readonly currentBanner = computed(() => {
    const banners = this.cinematicBanners();
    const idx = this.activeBannerIndex() % banners.length;
    return banners[idx]!;
  });

  // Actions
  public setCategory(cat: 'all' | 'living' | 'bedroom' | 'dining' | 'craftsmanship'): void {
    this.activeCategory.set(cat);
  }

  public setSelectedItem(id: string | null): void {
    this.selectedItemId.set(id);
  }

  public setBannerIndex(index: number): void {
    this.activeBannerIndex.set(index);
  }

  public setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
}
