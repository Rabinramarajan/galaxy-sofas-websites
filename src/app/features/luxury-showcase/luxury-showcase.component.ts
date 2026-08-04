import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxuryShowcaseService } from '../../core/services/luxury-showcase.service';
import { SeoService } from '../../core/services/seo.service';
import { FurnitureItem } from '../../core/models/showcase.model';
import { HERO_ANIMATIONS, CARD_ANIMATIONS, UI_ANIMATIONS } from '../../core/animations/luxury.animations';
import { LuxuryButtonComponent } from '../../shared/components/luxury-button/luxury-button.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { CinematicPromptCardComponent } from '../../shared/components/cinematic-prompt-card/cinematic-prompt-card.component';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-luxury-showcase',
  standalone: true,
  imports: [
    CommonModule,
    LuxuryButtonComponent,
    GlassCardComponent,
    CinematicPromptCardComponent,
    ParallaxDirective
  ],
  animations: [
    ...HERO_ANIMATIONS,
    ...CARD_ANIMATIONS,
    ...UI_ANIMATIONS
  ],
  templateUrl: './luxury-showcase.component.html'
})
export class LuxuryShowcaseComponent implements OnInit {
  public readonly service = inject(LuxuryShowcaseService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Galaxy Sofas | High Atelier & Sculptural Living',
      description: 'Discover bespoke Milanese furniture, bouclé curved sofas, and full-grain Tuscan leather sectionals.',
      keywords: ['luxury sofas', 'curved sofa', 'Italian furniture', 'bespoke furniture', 'Milan atelier'],
      ogImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85'
    });

    this.seoService.injectSchema({
      '@context': 'https://schema.org',
      '@type': 'FurnitureStore',
      'name': 'Galaxy Sofas High Atelier',
      'url': 'https://galaxy-sofas.com',
      'logo': 'https://galaxy-sofas.com/assets/logo.png',
      'description': 'Bespoke Milanese luxury sofas and sculptural living room architecture.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Milan',
        'addressCountry': 'Italy'
      }
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.service.setSearchQuery(input.value);
  }

  openModal(item: FurnitureItem): void {
    this.service.setSelectedItem(item.id);
  }

  closeModal(): void {
    this.service.setSelectedItem(null);
  }
}
