import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, furnitureStoreSchema } from '../../core/seo/schema';
import { HomeHero } from './sections/home-hero/home-hero';
import { HomeMarquee } from './sections/home-marquee/home-marquee';
import { HomeBrandStory } from './sections/home-brand-story/home-brand-story';
import { HomeCollections } from './sections/home-collections/home-collections';
import { HomeCategories } from './sections/home-categories/home-categories';
import { HomeBestsellers } from './sections/home-bestsellers/home-bestsellers';
import { HomeCraft } from './sections/home-craft/home-craft';
import { HomeMaterials } from './sections/home-materials/home-materials';
import { HomeManufacturing } from './sections/home-manufacturing/home-manufacturing';
import { HomeCustom } from './sections/home-custom/home-custom';
import { HomeWhyUs } from './sections/home-why-us/home-why-us';
import { HomeInspiration } from './sections/home-inspiration/home-inspiration';
import { HomeGallery } from './sections/home-gallery/home-gallery';
import { HomeVideo } from './sections/home-video/home-video';
import { HomeTestimonials } from './sections/home-testimonials/home-testimonials';
import { HomeAwards } from './sections/home-awards/home-awards';
import { HomeFaqs } from './sections/home-faqs/home-faqs';
import { HomeContact } from './sections/home-contact/home-contact';

/**
 * The Galaxy Sofas landing page — an editorial journey from first glance
 * to final invitation. Every section uses a distinct layout.
 */
@Component({
  selector: 'app-home-page',
  imports: [
    HomeHero,
    HomeMarquee,
    HomeBrandStory,
    HomeCollections,
    HomeCategories,
    HomeBestsellers,
    HomeCraft,
    HomeMaterials,
    HomeManufacturing,
    HomeCustom,
    HomeWhyUs,
    HomeInspiration,
    HomeGallery,
    HomeVideo,
    HomeTestimonials,
    HomeAwards,
    HomeFaqs,
    HomeContact,
  ],
  template: `
    <app-home-hero />
    <app-home-marquee />
    <app-home-brand-story />
    <app-home-collections />
    <app-home-categories />
    <app-home-bestsellers />
    <app-home-craft />
    <app-home-materials />
    <app-home-manufacturing />
    <app-home-custom />
    <app-home-why-us />
    <app-home-inspiration />
    <app-home-gallery />
    <app-home-video />
    <app-home-testimonials />
    <app-home-awards />
    <app-home-faqs />
    <app-home-contact />
  `,
})
export class HomePage implements OnInit {
  readonly #seo = inject(SeoService);

  ngOnInit(): void {
    this.#seo.set({
      title: 'Galaxy Sofas — Luxury Furniture & Premium Sofas',
      description:
        'India\u2019s most premium luxury furniture brand. Handcrafted sofas, recliners, beds, dining sets and bespoke interiors in 100% solid wood, delivered in 30 days.',
      canonical: '/',
      ogType: 'website',
      jsonLd: [
        furnitureStoreSchema(),
        breadcrumbSchema([{ label: 'Home', path: '/' }]),
      ],
    });
  }
}
