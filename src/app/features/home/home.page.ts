import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, furnitureStoreSchema } from '../../core/seo/schema';
import { HomeHero } from './sections/home-hero/home-hero';
import { HomeLuxuryBanner } from './sections/home-luxury-banner/home-luxury-banner';
import { HomeCompanyIntro } from './sections/home-company-intro/home-company-intro';
import { HomeCollections } from './sections/home-collections/home-collections';
import { HomeCategories } from './sections/home-categories/home-categories';
import { HomeTrending } from './sections/home-trending/home-trending';
import { HomeWhyUs } from './sections/home-why-us/home-why-us';
import { HomeCraftsmanship } from './sections/home-craftsmanship/home-craftsmanship';
import { HomeProcess } from './sections/home-process/home-process';
import { HomeLatestCollections } from './sections/home-latest-collections/home-latest-collections';
import { HomeGallery } from './sections/home-gallery/home-gallery';
import { HomeReviews } from './sections/home-reviews/home-reviews';
import { HomeInstagram } from './sections/home-instagram/home-instagram';
import { HomeLocation } from './sections/home-location/home-location';
import { HomeContactCta } from './sections/home-contact-cta/home-contact-cta';
import { HomeLookbook } from './sections/home-lookbook/home-lookbook';

import { HomeMaterialAtelier } from './sections/home-material-atelier/home-material-atelier';

/** The Galaxy Sofas landing page — 17 crafted sections. */
@Component({
  selector: 'app-home-page',
  imports: [
    HomeHero,
    HomeLuxuryBanner,
    HomeCompanyIntro,
    HomeCollections,
    HomeCategories,
    HomeMaterialAtelier,
    HomeTrending,
    HomeWhyUs,
    HomeCraftsmanship,
    HomeProcess,
    HomeLatestCollections,
    HomeGallery,
    HomeReviews,
    HomeInstagram,
    HomeLocation,
    HomeContactCta,
    HomeLookbook,
  ],
  template: `
    <app-home-hero />
    <app-home-luxury-banner />
    <app-home-company-intro />
    <app-home-collections />
    <app-home-categories />
    <app-home-material-atelier />
    <app-home-trending />
    <app-home-why-us />
    <app-home-craftsmanship />
    <app-home-process />
    <app-home-latest-collections />
    <app-home-gallery />
    <app-home-reviews />
    <app-home-instagram />
    <app-home-lookbook />
    <app-home-location />
    <app-home-contact-cta />
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

import { OnInit } from '@angular/core';