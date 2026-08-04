# Galaxy Sofas — UX Strategy

> **Purpose:** journeys, architecture and flows behind the site. Maps to the implemented routes in `app.routes.ts` and `site.config.ts`.

---

## 1 · Personas & User Journeys

### P1 — Home Owner (first-time visitor)
**Goal:** find a luxury sofa for a new home; feel trust before buying.
**Entry:** Google → Home hero.
**Journey:** Hero ("Explore the Collection") → Best Sellers → Product card → Product details → Book Consultation → WhatsApp call.
**Anxieties:** durability, delivery time, hidden costs.
**Proof needed:** warranty, real-home gallery, testimonials, showroom.
**Exit CTAs:** "Book a Consultation", "Find a Showroom", tel/WhatsApp floating.

### P2 — Interior Designer
**Goal:** specify furniture for client projects; need trade details.
**Entry:** interior-inspiration → projects gallery → manufacturing.
**Journey:** Inspiration guides → Project Gallery → Manufacturing ("450 artisans") → Materials → Contact with "I'm a designer" intent.
**Anxieties:** lead time, custom sizing, material certificates.
**Proof needed:** craft process, customization flow, bespoke atelier.
**Exit CTAs:** "Start a Custom Order", "Book a Consultation".

### P3 — Architect
**Goal:** source for new-build / villa fit-out; large specs.
**Entry:** Projects → Gallery → Villa imagery.
**Journey:** Gallery (real homes) → Manufacturing → Why Galaxy → Corporate/contact.
**Anxieties:** scale, timelines, contract support.
**Proof needed:** showroom count, atelier size, delivery track record.
**Exit CTAs:** contact form with project type, phone.

### P4 — Returning Customer
**Goal:** re-order / extend a room set / check wishlist.
**Entry:** direct URL or wishlist/compare from bookmark.
**Journey:** Navbar wishlist/compare → Product details → Shop → Book consultation.
**Anxieties:** stock, matching finishes.
**Proof needed:** consistent catalog, saved items.
**Exit CTAs:** quick "Shop all furniture", product actions.

### P5 — Corporate / Hospitality Buyer
**Goal:** fit-out offices, hotels, showrooms at scale.
**Entry:** Office Furniture category → Contact.
**Journey:** Office Furniture → Products → Manufacturing → Contact ("corporate enquiry").
**Anxieties:** bulk pricing, lead times, installation.
**Proof needed:** atelier capacity, white-glove delivery, 28 showrooms.
**Exit CTAs:** phone, email (`sales@`), consultation form.

---

## 2 · Navigation Map

```
Home
├─ Furniture (mega menu)
│   ├─ All Furniture
│   ├─ Sofas · Recliner Sofas · Wooden Sofas · L-Shape Sofas · Corner Sofas
│   ├─ Beds · Dining Tables · TV Units · Chairs · Coffee Tables
│   ├─ Wardrobes · Office Furniture
│   └─ Custom Furniture
├─ Collections (mega menu: The Heritage, Urban Nordic, Royal Velvet, Studio Raw, Cloud Nine, Executive Suite)
├─ Categories
├─ Gallery
├─ Inspiration (mega menu: Interior Inspiration, Gallery, Blog)
├─ Why Galaxy
└─ Company (mega menu: About, Manufacturing, Testimonials, FAQs, Contact, Store Location)
```

**Utility bar:** phone · showrooms · hours · social · search · theme · wishlist · compare · "Book Consultation".

---

## 3 · Information Architecture

- **Level 0 — Global chrome:** Navbar (announcement bar + mega menu), Footer (wordmark, newsletter, links), floating WhatsApp/call, scroll progress.
- **Level 1 — Primary pages:** Home, About, Products, Collections, Why Galaxy, Contact.
- **Level 2 — Catalog:** Categories (+slug), Product details (+slug), Custom furniture, Gallery, Manufacturing.
- **Level 3 — Support:** FAQs, Testimonials, Blog (+slug), Interior inspiration, Store location.
- **Level 4 — Legal/util:** Privacy, Terms, 404, sitemap.xml, robots.txt.

**Card-sort principle:** commerce under "Furniture"; story under "Company"; persuasion under "Why Galaxy"; trust under "Gallery/Testimonials/Awards".

---

## 4 · User Flow — Primary purchase intent

```
Land (Home hero)
  → Explore the Collection
      → Best Sellers / Products
          → Product Details (images, materials, price, actions)
              → Add to wishlist/compare
              → Book Consultation (Contact)
                  → WhatsApp / Call / Form
                  → Showroom visit
```

---

## 5 · Page Flow (Home)

| # | Section | Component(s) | Purpose |
|---|---------|--------------|---------|
| 1 | Hero | HomeHero | Cinematic arrival, headline, trust stats, scroll cue |
| 2 | Marquee | HomeMarquee | Brand promises ticker |
| 3 | Brand Story | HomeBrandStory | Belief + founder note |
| 4 | Collections | HomeCollections | Editorial numbered index |
| 5 | Categories | HomeCategories | Rooms of the home (asymmetric grid) |
| 6 | Best Sellers | HomeBestsellers | Product cards |
| 7 | Craft | HomeCraft | 4-step craftsmanship cards |
| 8 | Materials | HomeMaterials | Dark atelier tiles |
| 9 | Manufacturing | HomeManufacturing | 8-stage ribbon + animated counters |
| 10 | Custom | HomeCustom | Bespoke banner + glass panel |
| 11 | Why Us | HomeWhyUs | Six promises (bento) |
| 12 | Inspiration | HomeInspiration | Style guides |
| 13 | Gallery | HomeGallery | Real homes masonry |
| 14 | Video | HomeVideo | Craft film callout |
| 15 | Testimonials | HomeTestimonials | Proof (4.9 ★) |
| 16 | Awards | HomeAwards | Quiet recognition wall |
| 17 | FAQs | HomeFaqs | Objection handling |
| 18 | Contact | HomeContact | Final invitation + showroom card |

---

## 6 · CTA Strategy

| Intent stage | CTA | Variant | Placement |
|--------------|-----|---------|-----------|
| Discover | "Explore the Collection" | gold, lg | Hero |
| Explore | "Design Your Own" | glass | Hero, Custom |
| Convert | "Book a Consultation" | gold | Hero? Contact, Navbar, Custom |
| Trust | "See the Full Process" | outline | Craft, Manufacturing |
| Reassure | "Read All Stories" | outline | Testimonials |
| Navigate | "Browse all categories" | text-link | Categories |
| Visit | "Find a Showroom" | gold | Contact, footer |
| Always-on | Floating WhatsApp / Call | brand | Bottom-right |

**Rule:** one primary gold CTA per section; outline for secondary; text-links for tertiary; the floating WhatsApp/call is the permanent conversion net.

---

## 7 · Conversion & Measurement

- Primary: consultation bookings + call/WhatsApp clicks.
- Secondary: wishlist adds, compare adds, showroom lookups.
- Events to track: hero CTA, product view, wishlist/compare add, consultation submit, newsletter subscribe, outbound tel/WA clicks.
- Analytics ready: anchors/events on all CTAs; canonical URLs + prerender for crawlers.
