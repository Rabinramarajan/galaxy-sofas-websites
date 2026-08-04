# Galaxy Sofas — Page Design Specifications

> **Purpose:** per-page design intent for every route. Maps to implemented lazy-loaded pages in `app.routes.ts`.
> **Every page includes:** UX Goal · Visual Hierarchy · Wireframe · Motion Plan · Responsive Behaviour · Accessibility · SEO Notes · Angular Component Breakdown.

---

## Home (`/`)

- **UX Goal:** cinematic arrival that builds trust and routes to consultation/products.
- **Visual hierarchy:** hero H1 (display) → stats → collections → categories → product proof → craft → invitation.
- **Wireframe:** 18 distinct sections — see `ux-strategy.md §5`.
- **Motion:** hero ken-burns + reveal; marquee ticker; scroll reveals per section; parallax on hero image; counters animate; gallery tiles stagger.
- **Responsive:** hero grid collapses 12→1 col; floating badges hidden on mobile; categories 2→4 cols; stats 2→4.
- **Accessibility:** skip nav, reduced-motion disables ken-burns/marquee, all CTAs focusable.
- **SEO:** title/desc in `home.page.ts`; `furnitureStoreSchema` + breadcrumb JSON-LD; hero `fetchpriority=high`.
- **Components:** `home.page` orchestrates 18 section components + `seo.service`.

## About (`/about`)

- **UX Goal:** make 450 artisans + 2012 heritage feel personal and trustworthy.
- **Hierarchy:** page hero → story (editorial split) → values → timeline → stats.
- **Wireframe:** page-hero band → alternating image/copy rows → timeline (`app-timeline`) → counter band.
- **Motion:** reveal per block; timeline steps slide in on scroll; counters animate.
- **Responsive:** split rows stack; timeline → vertical on mobile.
- **Accessibility:** semantic headings, timeline as list.
- **SEO:** unique title/desc, `aboutPageSchema` / Organization.
- **Components:** `about.page` + `page-hero`, `app-timeline`, `app-counter`.

## Products (`/products`)

- **UX Goal:** browsable catalog with fast filtering.
- **Hierarchy:** page hero → filter bar (category/material/price) → product grid → load more/pagination.
- **Wireframe:** sticky filter rail (desktop) → 3/4-col grid of `app-product-card`.
- **Motion:** grid cards stagger reveal; hover zoom; filter transition.
- **Responsive:** 1/2/3/4 columns; filters collapse to drawer on mobile.
- **Accessibility:** filter controls labelled, aria-sort/aria-pressed, card links.
- **SEO:** title/desc, `ItemList` schema, canonical, per-category prerender.
- **Components:** `products.page`, `app-product-card`, `app-breadcrumb`, filter panel.

## Product Details (`/products/:slug`)

- **UX Goal:** convert intent — imagery, proof, clear actions.
- **Hierarchy:** gallery (sticky) | title, price, variants, materials, CTAs, accordions.
- **Wireframe:** 2-col (media gallery + info) → trust strip → related products.
- **Motion:** image swap zoom, tabs/accordions animate, wishlist/compare micro-interactions.
- **Responsive:** gallery top, info below; sticky CTA bar on mobile.
- **Accessibility:** `aria-live` on variant change, labelled quantity, image alts.
- **SEO:** `Product` schema (price, availability, rating), OG image, canonical.
- **Components:** `product-details.page`, `viewer-360`, `before-after`, `app-rating`, `app-breadcrumb`.

## Categories (`/categories` + `/categories/:slug`)

- **UX Goal:** room-by-room wayfinding.
- **Hierarchy:** hero → category cards (asymmetric) → filtered products.
- **Wireframe:** index grid (2/4 col) → slug route renders product rail.
- **Motion:** cards reveal; hover zoom + caption.
- **Responsive:** 2→4 cols.
- **Accessibility:** link cards with visible focus.
- **SEO:** per-category titles/desc, `CollectionPage` schema.
- **Components:** `categories.page`, `category-card`, `app-product-card`.

## Collections (`/collections`)

- **UX Goal:** brand storytelling through curated stories.
- **Hierarchy:** hero → editorial numbered index → feature collection spotlight.
- **Wireframe:** sticky intro + numbered list rows (mirrors `home-collections`).
- **Motion:** row hover zoom + arrow drift; reveal stagger.
- **Responsive:** list rows compact on mobile.
- **Accessibility:** rows are real links with focus states.
- **SEO:** title/desc, `CollectionPage` schema.
- **Components:** `collections.page`, `collection-card`.

## Gallery (`/gallery`)

- **UX Goal:** prove real installations, inspire.
- **Hierarchy:** hero → masonry gallery with captions → CTA.
- **Wireframe:** masonry (mixed aspect) grid → lightbox.
- **Motion:** stagger reveal; hover zoom + caption rise; lightbox fade.
- **Responsive:** 2/3/4 columns; lightbox fullscreen on mobile.
- **Accessibility:** alts, lightbox focus trap + Escape, decorative aria-hidden.
- **SEO:** `ImageGallery` schema, lazy images.
- **Components:** `gallery.page`, `app-gallery`, lightbox (modals).

## Interior Inspiration (`/interior-inspiration`)

- **UX Goal:** help interior designers/homeowners style rooms.
- **Hierarchy:** hero → room-style guide cards → CTA.
- **Wireframe:** editorial cards with tags (mirrors `home-inspiration`).
- **Motion:** reveal + hover zoom.
- **Responsive:** 1/2/4 cols.
- **Accessibility:** labelled links, tags as text.
- **SEO:** `Article`/`HowTo` schema, descriptive titles.
- **Components:** `interior.page`, `section-header`, card grid.

## Custom Furniture (`/custom-furniture`)

- **UX Goal:** convert "measure → design → craft" into a consultation.
- **Hierarchy:** hero → how-it-works timeline → form → proof.
- **Wireframe:** editorial split + glass process panel (mirrors `home-custom`).
- **Motion:** reveal; step cards stagger; form focus micro-interactions.
- **Responsive:** split stacks; form full-width.
- **Accessibility:** labelled form fields, `aria-invalid`, error alerts.
- **SEO:** title/desc, `Service` schema.
- **Components:** `custom.page`, `app-timeline`, form controls.

## Manufacturing (`/manufacturing-process`)

- **UX Goal:** make craft tangible; justify price.
- **Hierarchy:** hero → 8-stage journey → stats → video/film callout.
- **Wireframe:** numbered ribbon grid + counters band (mirrors `home-manufacturing`).
- **Motion:** step reveal; counters; parallax workshop image.
- **Responsive:** ribbon 1→4 cols.
- **Accessibility:** `<ol>` semantics, reduced-motion counters static.
- **SEO:** title/desc, `HowTo` schema.
- **Components:** `manufacturing.page`, `app-counter`, `app-timeline`.

## Why Galaxy (`/why-galaxy-sofas`)

- **UX Goal:** overcome objections with proof.
- **Hierarchy:** hero → promise bento → warranty → comparisons → CTA.
- **Wireframe:** bento cards + comparison table.
- **Motion:** card reveal; table hover rows.
- **Responsive:** bento 1→3 cols; table scrolls horizontally.
- **Accessibility:** comparison table with headers.
- **SEO:** title/desc, FAQ schema.
- **Components:** `why-galaxy.page`, `app-icon` bento, table.

## Testimonials (`/testimonials`)

- **UX Goal:** social proof at scale.
- **Hierarchy:** hero (4.9 ★) → filtered review grid → CTA.
- **Wireframe:** rating summary + `app-testimonial-card` grid.
- **Motion:** stagger reveal.
- **Responsive:** 1/2/3 cols.
- **Accessibility:** `blockquote`/`cite`, structured ratings.
- **SEO:** `Review`/`AggregateRating` schema.
- **Components:** `testimonials.page`, `app-testimonial-card`, `app-rating`.

## FAQs (`/faqs`)

- **UX Goal:** remove friction before contact.
- **Hierarchy:** hero → category-filtered accordions → contact card.
- **Wireframe:** left sticky intro + right accordion list (mirrors `home-faqs`).
- **Motion:** accordion height animation.
- **Responsive:** stacks to single column.
- **Accessibility:** proper accordion ARIA.
- **SEO:** `FAQPage` schema.
- **Components:** `faqs.page`, `app-faq-item`.

## Blog (`/blog`, `/blog/:slug`)

- **UX Goal:** SEO + design authority.
- **Hierarchy:** hero → featured + grid → article detail with TOC.
- **Wireframe:** `blog-card` grid; details as editorial article.
- **Motion:** reveal; article images parallax.
- **Responsive:** 1/2/3 cols.
- **Accessibility:** article semantics, heading order, alts.
- **SEO:** `Article` schema, OG, sitemap.
- **Components:** `blog.page`, `blog-details.page`, `blog-card`.

## Contact (`/contact`)

- **UX Goal:** capture consultations by any channel.
- **Hierarchy:** hero → form + contact info → map.
- **Wireframe:** 2-col (form | details/map), WhatsApp/call prominent.
- **Motion:** form focus; success state reveal.
- **Responsive:** stacks; call/WA buttons sticky on mobile.
- **Accessibility:** labelled fields, error alerts, `role=status` on submit.
- **SEO:** `ContactPage` + LocalBusiness schema, embedded map.
- **Components:** `contact.page`, form controls, `app-icon`.

## Store Location (`/store-location`)

- **UX Goal:** drive showroom visits.
- **Hierarchy:** hero → showroom cards → map → CTA.
- **Wireframe:** card grid + embedded map.
- **Motion:** card reveal.
- **Responsive:** 1/2/3 cols.
- **Accessibility:** address text + link, map fallback link.
- **SEO:** `Store`/`LocalBusiness` schema per city.
- **Components:** `store.page`, `app-icon`, map embed.

---

## Support pages

- **Wishlist / Compare:** signal-driven UI in `wishlist.page` / `compare.page` with empty states + CTA.
- **Privacy / Terms:** legal text pages, semantic headings, no tracking claims beyond reality.
- **404 (`not-found.page`):** branded escape — big display type, "Find a sofa" + "Back home" CTAs.
- **sitemap.xml / robots.txt:** generated by `sitemap.component` / `robots.component` (all canonical routes, clean crawl directives).

---

## Editorial pages referenced but not yet routed (proposed)

`luxury-living`, `bedrooms`, `dining`, `office-furniture`, `projects`, `materials` — each would reuse the established page pattern (hero → editorial split → product/craft grid → CTA). The existing `/categories/*` and `/collections` routes already cover the catalogue intent; these become dedicated brand-showcase pages if a future navigation slot opens.
