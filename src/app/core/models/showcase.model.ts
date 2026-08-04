export interface FurnitureItem {
  readonly id: string;
  readonly title: string;
  readonly category: 'living' | 'bedroom' | 'dining' | 'craftsmanship';
  readonly subtitle: string;
  readonly description: string;
  readonly price: number;
  readonly currency: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly badge?: string;
  readonly dimensions: {
    readonly width: string;
    readonly height: string;
    readonly depth: string;
  };
  readonly materials: readonly string[];
  readonly features: readonly string[];
  readonly isFeatured: boolean;
}

export interface CinematicBanner {
  readonly id: string;
  readonly title: string;
  readonly tag: string;
  readonly sceneType: 'Hero Banner' | 'Living Room' | 'Bedroom' | 'Dining' | 'Furniture Showcase' | 'Wood Workshop' | 'Luxury Apartment';
  readonly imageUrl: string;
  readonly promptStatic: string;
  readonly promptGif: string;
  readonly promptMp4: string;
  readonly cameraSpecs: {
    readonly movement: string;
    readonly lens: string;
    readonly lighting: string;
    readonly depthOfField: string;
    readonly colorGrading: string;
  };
}

export interface MetricCounter {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly description: string;
}

export interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly category: 'all' | 'living' | 'bedroom' | 'dining' | 'craftsmanship';
}
