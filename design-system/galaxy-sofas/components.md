# Galaxy Sofas — Component Specifications

> **Purpose:** enterprise specs for every UI component. All map to implemented shared components in `src/app/shared/components/*`.
> **Every component defines:** Purpose · Anatomy · Variants · Hover · Focus · Active · Disabled · Loading · Empty · Error · Accessibility.
> **Global interaction rules:** transitions 150–300ms · `ease-lux` for large reveals · `focus-gold` outline · `prefers-reduced-motion` respected · min touch target 44px.

---

## 1 · Buttons (`app-button`)

- **Purpose:** primary action trigger.
- **Anatomy:** optional icon + label (+ optional arrow), pill radius, `ripple` overflow, sheen sweep.
- **Variants:** `gold` (gradient fill), `primary` (ink), `outline`, `glass`, `white`; sizes `sm/md/lg`.
- **Hover:** lift + glow (`hover:shadow-glow`), brightness 105%, icon nudge.
- **Focus:** gold ring (`focus-gold`), visible offset.
- **Active:** press scale 0.98.
- **Disabled:** 45% opacity, `cursor-not-allowed`, no animation.
- **Loading:** inline spinner (`loader` icon) swaps label.
- **Empty:** n/a.
- **Error:** n/a (forms handle).
- **A11y:** real `<a>`/`<button>` semantics, `aria-disabled`, label never icon-only without aria-label.

## 2 · Cards (`glass-card`, product/category/collection cards)

- **Purpose:** group scannable content + imagery.
- **Anatomy:** media (optional), eyebrow, title, body, meta, hover action.
- **Variants:** glass, snow (light), espresso-soft (dark), image-first, icon-first, horizontal row.
- **Hover:** translateY(-4px) + `shadow-lift` + image zoom (scale 1.08–1.10) + gold ring.
- **Focus:** `focus-gold` on the wrapped anchor.
- **Active:** press 0.99.
- **Disabled:** n/a (cards are links).
- **Loading:** `skeleton` shimmer on media + text blocks.
- **Empty:** cards only render when data exists (`@if/@for`).
- **Error:** image `onerror` fallback background.
- **A11y:** alt text, visible link, no layout shift on hover.

## 3 · Forms (`app-search`, contact/newsletter forms)

- **Purpose:** capture enquiries, search, newsletter signup.
- **Anatomy:** label (visible or sr-only), input, helper, submit.
- **Variants:** search pill, newsletter pill, consultation (multi-field).
- **Hover:** border gold + soft shadow.
- **Focus:** gold border + ring (`focus-gold`).
- **Active:** pressed state on submit.
- **Disabled:** 45% opacity.
- **Loading:** submit spinner + `aria-busy`.
- **Empty:** required validation, `aria-invalid`.
- **Error:** inline error text near field, red border, `role="alert"`.
- **A11y:** labels bound via `for/id`, autocomplete on email/phone, visible focus.

## 4 · Navbar (`app-navbar`)

- **Purpose:** persistent navigation + primary conversion (Book Consultation).
- **Anatomy:** announcement bar → sticky header → logo · nav · actions (search/theme/wishlist/compare/CTA) → mobile drawer → mega menu panel.
- **Variants:** light (paper), dark (espresso), glass-on-scroll.
- **Hover:** nav link → gold; action icons → ink/bone + soft bg.
- **Focus:** gold ring on all icon buttons.
- **Active:** `routerLinkActive` → gold text; aria-current.
- **Disabled:** n/a.
- **Loading:** n/a (skeleton app loader precedes).
- **Empty:** counts (wishlist/compare) hidden at 0.
- **Error:** n/a.
- **A11y:** `aria-label` on nav, `aria-expanded`/`aria-controls` on drawer + mega menu, Escape closes, focus managed into drawer.

## 5 · Mega Menu

- **Purpose:** expose deep catalog in one glance.
- **Anatomy:** panel (inset-x-0 top-full), intro column (eyebrow/title/desc/link) + child link grid.
- **Variants:** one panel per top-level item.
- **Hover:** row hover → linen/mocha bg, gold icon, arrow drift.
- **Focus:** gold ring on links; keyboard tab opens panel.
- **Active:** current child highlighted.
- **Disabled:** n/a.
- **Loading/Empty/Error:** n/a.
- **A11y:** `mouseleave` close, keyboard `Escape`, focus trap within open panel.

## 6 · Product Cards (`app-product-card`)

- **Purpose:** sell a product with image, price, actions.
- **Anatomy:** image (zoom), badge, wishlist/compare actions, title, price/rating, quick CTA.
- **Variants:** bestseller, new, sale badge states.
- **Hover:** image scale + overlay + reveal quick actions.
- **Focus:** gold ring; keyboard reveals actions.
- **Active:** button press states.
- **Disabled:** sold-out overlay.
- **Loading:** `skeleton` image.
- **Empty:** hidden (no product data).
- **Error:** image fallback.
- **A11y:** alt text, aria-labels on icon buttons, price semantics.

## 7 · Galleries (`app-gallery`, `home-gallery`, masonry)

- **Purpose:** showcase real homes/projects.
- **Anatomy:** tile grid with hover caption.
- **Variants:** masonry (mixed aspect), asymmetric editorial, hover-reveal caption.
- **Hover:** image zoom + espresso scrim + caption rise.
- **Focus:** gold ring on linked tiles.
- **Active:** press 0.99.
- **Disabled:** n/a.
- **Loading:** `skeleton` per tile.
- **Empty:** message + CTA when none.
- **Error:** image fallback.
- **A11y:** captions via `aria-label`, decorative tiles `aria-hidden`.

## 8 · Tabs (used in product pages / collections filters)

- **Purpose:** switch views without page load.
- **Anatomy:** tab list (role=tablist), panels.
- **Variants:** underline, pill.
- **Hover:** gold text.
- **Focus:** gold ring.
- **Active:** gold underline/pill + `aria-selected`.
- **Disabled:** muted tab.
- **Loading:** `skeleton` in panel.
- **Empty:** empty panel message.
- **Error:** inline alert.
- **A11y:** arrow-key navigation, `aria-controls`, `tabindex` roving.

## 9 · Accordions / FAQs (`app-faq-item`)

- **Purpose:** progressive disclosure for questions.
- **Anatomy:** button header + animated panel.
- **Variants:** bordered row, card.
- **Hover:** header → gold.
- **Focus:** gold ring on header button.
- **Active:** chevron rotate 180°, panel height animation.
- **Disabled:** n/a.
- **Loading:** n/a.
- **Empty:** fallback "still curious" card (implemented in HomeFaqs).
- **Error:** n/a.
- **A11y:** `aria-expanded`, `aria-controls`, `aria-labelledby`, `role=region`.

## 10 · Modals / Dialogs (search overlay, image viewer)

- **Purpose:** focused task (search, lightbox, consultation).
- **Anatomy:** scrim + panel + close.
- **Variants:** search, lightbox, confirm.
- **Hover:** panel controls.
- **Focus:** focus trap, initial focus to input.
- **Active:** close press.
- **Disabled:** n/a.
- **Loading:** spinner in panel.
- **Empty:** "no results" state.
- **Error:** inline error.
- **A11y:** `role=dialog`, `aria-modal`, focus trap, `Escape` close, return focus.

## 11 · Tooltips / Badges (`app-badge`)

- **Purpose:** short contextual labels.
- **Anatomy:** text + optional icon in pill.
- **Variants:** gold, dark, success, glass.
- **Hover:** subtle brightness.
- **Focus:** n/a (informational).
- **Active:** n/a.
- **Disabled:** muted.
- **Loading/Empty/Error:** n/a.
- **A11y:** prefer visible text over tooltip-only; tooltips use `aria-describedby` where used.

## 12 · Breadcrumbs (`app-breadcrumb`)

- **Purpose:** orientation + back navigation.
- **Anatomy:** home icon → items separated by chevrons, current not linked.
- **Variants:** light/dark.
- **Hover:** link gold.
- **Focus:** gold ring.
- **Active:** current `aria-current="page"`.
- **Disabled:** current item non-interactive.
- **Loading/Empty/Error:** n/a.
- **A11y:** `nav aria-label="Breadcrumb"`, `<ol>` structure.

## 13 · Footer (`app-footer`)

- **Purpose:** brand close, newsletter, wayfinding, legal.
- **Anatomy:** oversized wordmark → newsletter band → link columns (Explore/Popular/Visit) → bottom bar.
- **Hover:** links gold + hairline grow; social lift.
- **Focus:** gold ring.
- **Active:** press states.
- **Disabled:** n/a.
- **Loading:** newsletter submit spinner.
- **Empty:** n/a.
- **Error:** newsletter invalid email inline.
- **A11y:** semantic `footer`, `nav` labels, `aria-live` on subscribe status.

## 14 · Hero (`home-hero`, `page-hero`)

- **Purpose:** cinematic first impression + primary CTA.
- **Anatomy:** full-bleed media, scrim, eyebrow, H1, body, CTAs, trust stats, scroll cue.
- **Variants:** home (film-style), page (editorial title band).
- **Hover:** CTA states only.
- **Focus:** gold ring on buttons/scroll cue.
- **Active:** scroll cue press.
- **Disabled:** n/a.
- **Loading:** ken-burns image with `fetchpriority=high`; no skeleton (above fold).
- **Empty:** gradient fallback scrim.
- **Error:** bg image fallback → gradient.
- **A11y:** decorative media `aria-hidden`, real text not overlaid, reduced-motion disables ken-burns.

## 15 · CTA Blocks (`home-contact`, banners)

- **Purpose:** conversion push at section/page end.
- **Anatomy:** gradient/espresso panel, headline, sub, CTAs, optional info card.
- **Variants:** gold-gradient, dark, glass.
- **Hover:** CTA lift + glow.
- **Focus:** gold ring.
- **Active:** press.
- **Disabled:** n/a.
- **Loading:** n/a.
- **Empty/Error:** n/a.
- **A11y:** text contrast on gradients verified, decorative noise `aria-hidden`.

## 16 · Testimonials (`app-testimonial-card`)

- **Purpose:** social proof.
- **Anatomy:** quote, avatar, name, role/location, rating.
- **Variants:** large voice card, compact card, carousel.
- **Hover:** soft lift.
- **Focus:** n/a unless linked.
- **Active:** n/a.
- **Disabled:** n/a.
- **Loading:** `skeleton`.
- **Empty:** fallback rating summary (implemented: 4.9 / 2.4L reviews).
- **Error:** n/a.
- **A11y:** `<blockquote>` + `<cite>`, structured rating.

## 17 · Pricing / Offer cards

- **Purpose:** transparent price + value framing.
- **Anatomy:** price, emi/offer line, features, CTA.
- **Variants:** standard, offer-highlighted.
- **Hover:** lift + gold ring.
- **Focus:** gold ring.
- **Active:** CTA press.
- **Disabled:** out-of-stock.
- **Loading:** `skeleton` price.
- **Empty:** n/a.
- **Error:** n/a.
- **A11y:** real price markup, no "starting from" confusion without context.

## 18 · Newsletter

- **Purpose:** capture email for the Galaxy circle.
- **Anatomy:** label, email input, submit, status.
- **Variants:** footer band, inline.
- **Hover:** border gold.
- **Focus:** gold ring.
- **Active:** press.
- **Disabled:** 45% opacity while submitting.
- **Loading:** spinner + `aria-busy`.
- **Empty:** required validation.
- **Error:** inline + `role="alert"`.
- **A11y:** `label for` + `id`, `autocomplete=email`, `role=status` on success.

---

## Shared state tokens

| State | Pattern |
|-------|---------|
| Hover | `hover:-translate-y-1`, `hover:shadow-lift`, `hover:ring-gold/30` |
| Focus | `focus-gold` (2px gold outline + 3px offset) |
| Active | `active:scale-[0.98]` |
| Disabled | `disabled:opacity-45 disabled:cursor-not-allowed` |
| Loading | `skeleton` shimmer / `loader` spinner |
| Empty | contextual empty copy + CTA |
| Error | `text-red`/`role=alert` + inline message near control |
