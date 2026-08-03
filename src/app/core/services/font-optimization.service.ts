import { Injectable, inject, PLATFORM_ID, makeStateKey, TransferState, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const FONT_STATE = makeStateKey<string[]>('galaxy-fonts-loaded');

export interface FontDefinition {
  family: string;
  weight: string;
  style: string;
  url: string;
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
}

const FONT_DEFINITIONS: FontDefinition[] = [
  {
    family: 'Plus Jakarta Sans',
    weight: '300 400 500 600 700 800',
    style: 'normal',
    url: '/fonts/plus-jakarta-sans-latin.woff2',
    display: 'swap',
  },
  {
    family: 'Playfair Display',
    weight: '400 500 600 700 800',
    style: 'normal',
    url: '/fonts/playfair-display-latin.woff2',
    display: 'swap',
  },
  {
    family: 'Playfair Display',
    weight: '400 500 600 700 800',
    style: 'italic',
    url: '/fonts/playfair-display-italic-latin.woff2',
    display: 'swap',
  },
];

@Injectable({ providedIn: 'root' })
export class FontOptimizationService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #transferState = inject(TransferState);
  readonly loadedFonts = signal<string[]>([]);

  constructor() {
    this.init();
  }

  private init(): void {
    if (isPlatformBrowser(this.#platformId)) {
      const cached = this.#transferState.get(FONT_STATE, []);
      if (cached.length) {
        this.loadedFonts.set(cached);
        this.applyFonts(cached);
      } else {
        this.preloadFonts();
      }
    }
  }

  private async preloadFonts(): Promise<void> {
    const loaded: string[] = [];

    for (const font of FONT_DEFINITIONS) {
      try {
        const fontFace = new FontFace(
          font.family,
          `url(${font.url})`,
          { weight: font.weight, style: font.style, display: font.display }
        );
        await fontFace.load();
        document.fonts.add(fontFace);
        loaded.push(`${font.family}-${font.weight}-${font.style}`);
      } catch (e) {
        console.warn(`Failed to load font: ${font.family}`, e);
      }
    }

    this.loadedFonts.set(loaded);
    this.#transferState.set(FONT_STATE, loaded);
    this.applyFonts(loaded);
  }

  private applyFonts(loaded: string[]): void {
    if (loaded.length) {
      document.documentElement.style.setProperty('--fonts-loaded', 'true');
    }
  }

  async loadFont(family: string, weight: string, style = 'normal'): Promise<FontFace | null> {
    const definition = FONT_DEFINITIONS.find(f =>
      f.family === family && f.weight.includes(weight) && f.style === style
    );
    if (!definition) return null;

    try {
      const fontFace = new FontFace(
        definition.family,
        `url(${definition.url})`,
        { weight: definition.weight, style: definition.style, display: definition.display }
      );
      await fontFace.load();
      document.fonts.add(fontFace);
      return fontFace;
    } catch (e) {
      console.warn(`Failed to load font: ${family}`, e);
      return null;
    }
  }

  async ensureFont(family: string, weight: string, style = 'normal'): Promise<void> {
    const key = `${family}-${weight}-${style}`;
    if (this.loadedFonts().includes(key)) return;
    await this.loadFont(family, weight, style);
  }

  readonly fontDisplayStyles = computed(() => {
    const fonts = this.loadedFonts();
    if (!fonts.length) return '';
    return fonts.map(f => {
      const [family = '', weight = '', style = ''] = f.split('-');
      return `@font-face { font-family: '${family}'; font-weight: ${weight}; font-style: ${style}; font-display: swap; src: url(/fonts/${family.toLowerCase().replace(/\s+/g, '-')}-${style}-${weight}.woff2) format('woff2'); }`;
    }).join('\n');
  });
}

export const FONT_PRELOAD_LINKS = FONT_DEFINITIONS.map(f =>
  `<link rel="preload" as="font" type="font/woff2" crossorigin href="${f.url}">`
).join('\n');