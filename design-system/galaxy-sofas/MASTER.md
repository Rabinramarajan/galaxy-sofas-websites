# Design System Master File — Galaxy Sofas

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Galaxy Sofas — "Warm Editorial Luxury"
**Last updated:** 2026-08-04 (matches `src/styles.scss` implementation)
**Category:** Luxury furniture / premium corporate
**Mood:** warm ivory paper · espresso ink · champagne gold · editorial magazine rhythm

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (ink) | `#201b15` | `--color-ink` |
| Dark background | `#16130f` | `--color-espresso` |
| Accent (gold) | `#b98a2f` | `--color-gold` |
| Accent light | `#d9b458` | `--color-gold-light` |
| Background (light) | `#faf7f1` | `--color-paper` |
| Surface (cards) | `#ffffff` / `#f4eee3` | `--color-snow` / `--color-linen` |
| Muted text | `#857b6f` | `--color-taupe` |
| Hairline borders | `#e7dfcf` | `--color-line` |
| Dark surfaces | `#1d1914` / `#262017` | `--color-espresso-soft` / `--color-mocha` |
| Dark text | `#f2ebdf` | `--color-bone` |
| Success | `#4a7c59` | `--color-success` |

**Color Notes:** warm editorial luxury — cream page, espresso ink, champagne-gold accents; terracotta `#b06a4a` and sage `#7a7a5e` as tertiary accents. Full token set lives in `src/styles.scss` `@theme`.

### Typography

- **Display / Heading Font:** Fraunces (editorial serif, optical sizing)
- **Body / UI Font:** Manrope (humanist sans)
- **Mood:** luxury, editorial, warm, high-end, refined
- **Weights:** Fraunces 300–700 (incl. italics); Manrope 200–800
- **Google Fonts:** [Fraunces + Manrope](https://fonts.google.com/share?selection.family=Fraunces:opsz,wght@9..144,300..700|Manrope:wght@200..800)

**CSS Import (matches `src/styles.scss`):**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |
| `--shadow-glow` | `0 0 40px rgba(245, 158, 11, 0.3)` | Gold accent glow |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements |
| `--radius-md` | `12px` | Cards, buttons |
| `--radius-lg` | `16px` | Large cards, modals |
| `--radius-xl` | `24px` | Hero sections |
| `--radius-full` | `9999px` | Pills, badges |

### Z-Index Scale

| Level | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | `10` | Dropdowns |
| `--z-sticky` | `20` | Sticky headers |
| `--z-modal` | `30` | Modals, drawers |
| `--z-toast` | `40` | Toasts, notifications |
| `--z-tooltip` | `50` | Tooltips |
| `--z-cursor` | `60` | Custom cursor |

---

## Component Specs

### Buttons

```css
/* Primary Button - Gold Accent */
.btn-primary {
  background: #F59E0B;
  color: #111827;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  opacity: 0;
  transition: opacity 300ms ease;
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary span {
  position: relative;
  z-index: 1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
}

/* Secondary Button - Outline */
.btn-secondary {
  background: transparent;
  color: #111827;
  border: 2px solid #111827;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-secondary:hover {
  background: #111827;
  color: #FFFFFF;
  transform: translateY(-2px);
}

/* Glass Button */
.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #111827;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(245, 158, 11, 0.5);
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: rgba(245, 158, 11, 0.2);
}

.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-glass:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
```

### Inputs

```css
.input {
  padding: 14px 18px;
  border: 1px solid rgba(17, 24, 39, 0.15);
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #FFFFFF;
  color: #111827;
  transition: all 200ms ease;
  width: 100%;
}

.input::placeholder {
  color: #9CA3AF;
}

.input:focus {
  border-color: #F59E0B;
  outline: none;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
}

.input-error {
  border-color: #EF4444;
}

.input-error:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: 0.02em;
}

.badge-gold {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #111827;
}

.badge-dark {
  background: #111827;
  color: #FFFFFF;
}

.badge-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #111827;
}
```

---

## Style Guidelines

**Style:** Warm Editorial Luxury

**Keywords:** warm ivory paper, espresso ink, champagne gold, editorial magazine rhythm, generous white space, hairline rules, glass overlays, cinematic lighting

**Best For:** Premium luxury furniture, high-end brand showcase, editorial experiences

**Key Effects (implemented in `src/styles.scss` + shared components):**
- Scroll reveal engine (`RevealDirective`: fade-up/down/left/right/scale/blur/slide)
- Image parallax (`ParallaxDirective`) and ken-burns hero zoom
- Glass panels (`glass` / `glass-dark` utilities, backdrop blur 20px)
- Gold gradient accents, soft warm shadows, aurora glow blobs
- Floating badges, magnetic hover, ripple buttons, sheen sweep, marquee ticker
- Counter animation, scroll-progress bar, custom cursor (pointer:fine only)
- `prefers-reduced-motion` fully respected

### Page Pattern

**Pattern Name:** Editorial Journey (home page)

- **CTA Placement:** above fold + recurring section CTAs + floating WhatsApp/call
- **Section Order:** Hero → Marquee → Brand Story → Collections → Categories → Best Sellers → Craft → Materials → Manufacturing (+stats) → Custom → Why Us → Inspiration → Gallery → Video → Testimonials → Awards → FAQs → Contact → Footer

### Asset Prompts & Docs

| Doc | Contents |
|-----|----------|
| [`brand-guidelines.md`](./brand-guidelines.md) | Brand story, voice, logo, type, palette, tokens, icons, photography, textures, materials |
| [`ux-strategy.md`](./ux-strategy.md) | Personas/journeys, navigation map, IA, flows, CTA strategy |
| [`components.md`](./components.md) | Enterprise specs for all 18 components (all states + a11y) |
| [`pages.md`](./pages.md) | Per-page UX/hierarchy/wireframe/motion/responsive/a11y/SEO/Angular specs |
| [`ai-image-prompts.md`](./ai-image-prompts.md) | 105 image prompts (camera · lens · light · grade · DOF · 8K) |
| [`ai-video-prompts.md`](./ai-video-prompts.md) | 10 cinematic video prompts (duration · path · framerate · sound · loop · CTA) |
| [`gif-prompts.md`](./gif-prompts.md) | 12 seamless loop GIF concepts + technical budget notes |

---

## Animation Specifications

### Entrance Animations

| Animation | Duration | Easing | Delay Stagger |
|-----------|----------|--------|---------------|
| Fade Up | 800ms | cubic-bezier(0.16, 1, 0.3, 1) | 100ms |
| Fade In | 600ms | cubic-bezier(0.4, 0, 0.2, 1) | 50ms |
| Scale In | 700ms | cubic-bezier(0.34, 1.56, 0.64, 1) | 80ms |
| Slide From Left/Right | 800ms | cubic-bezier(0.16, 1, 0.3, 1) | 100ms |
| Text Reveal (Line by Line) | 1000ms | cubic-bezier(0.16, 1, 0.3, 1) | 150ms/line |

### Hover Interactions

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Card Lift | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Button Morph | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Image Zoom | 600ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Magnetic Pull | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Ripple Effect | 500ms | ease-out |

### Scroll Animations

| Trigger | Animation |
|---------|-----------|
| Element enters viewport (10%) | Fade Up + Scale |
| Element at center | Parallax (0.1-0.3 speed) |
| Section pin | Pin + reveal children |
| Counter visible | Count up (1500ms) |

---

## Anti-Patterns (Do NOT Use)

- ❌ Vibrant & Block-based
- ❌ Playful colors
- ❌ **Emojis as icons** — Use SVG icons (Lucide Angular)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-400ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y
- ❌ **Dense text blocks** — Use generous line-height (1.7) and max-width (65ch)
- ❌ **Rigid grids** — Use fluid, responsive layouts with container queries

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use Lucide Angular SVG instead)
- [ ] All icons from consistent icon set (Lucide Angular)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-400ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px, 1920px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Images use WebP/AVIF with fallbacks
- [ ] Lazy loading on all below-fold images
- [ ] SSR-ready (no window/document in constructor)
- [ ] Schema.org markup on all pages
- [ ] Meta tags, OG, Twitter cards on all pages