# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Galaxy Sofas
**Generated:** 2026-08-03 00:19:48
**Category:** E-commerce Luxury

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#111827` | `--color-primary` |
| Secondary / Accent | `#F59E0B` | `--color-secondary` |
| Background | `#FFFFFF` | `--color-background` |
| Surface | `#F9FAFB` | `--color-surface` |
| Text | `#111827` | `--color-text` |
| Success | `#10B981` | `--color-success` |

**Color Notes:** Premium dark charcoal + golden amber accent, clean white background

### Typography

- **Heading Font:** Playfair Display
- **Body Font:** Plus Jakarta Sans
- **Mood:** luxury, high-end, elegant, refined, premium, editorial
- **Google Fonts:** [Playfair Display + Plus Jakarta Sans](https://fonts.google.com/share?selection.family=Playfair+Display:wght@400;500;600;700;800;900|Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
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

**Style:** Liquid Glass / Editorial Luxury

**Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur, iridescent, editorial typography, generous whitespace, golden accents

**Best For:** Premium luxury e-commerce, high-end furniture, editorial experiences

**Key Effects:**
- Morphing elements (SVG/CSS clip-path animations)
- Fluid animations (400-600ms cubic-bezier curves)
- Dynamic blur (backdrop-filter: blur(20px))
- Color transitions with gold accent
- Parallax scroll reveals
- Magnetic hover interactions
- Text reveal animations (split text)
- Image zoom on hover
- Staggered entrance animations

### Page Pattern

**Pattern Name:** Editorial Luxury Showcase

- **CTA Placement:** Above fold + sticky CTA on scroll
- **Section Order:** Hero → Trust/Intro → Featured Collections → Categories → Trending → Why Choose → Craftsmanship → Process → Collections → Gallery → Reviews → Social Proof → Location → Contact → Footer

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