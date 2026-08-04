# Galaxy Sofas — Brand Identity Guidelines

> **Purpose:** The complete brand world behind the digital experience. Everything here is implemented in `src/styles.scss`, `site.config.ts` and the shared components.

---

## 1 · Brand Story

**Tagline:** Furniture Beyond Imagination
**Founded:** 2012 · Nerkundram, Virugambakkam, Chennai · 450 artisans · 1,50,000 sq ft atelier · 28 experience centres

Galaxy Sofas began in 2012 with three craftsmen and a single rule — never compromise on the wood. Today 450 artisans work across a 1,50,000 sq ft atelier, yet every frame is still cut, carved and signed by hand. The brand pairs kiln-dried sheesham and teak with a decade of finish research, so a piece bought this year still looks newer than most furniture bought last week.

**Brand narrative arc (the site tells this story top-to-bottom):**
1. **The Arrival** — cinematic hero: light meets craft.
2. **The Belief** — brand story: "Built slowly, built to be kept."
3. **The Range** — collections, categories, best sellers.
4. **The Obsession** — craftsmanship, materials, manufacturing.
5. **The Promise** — why Galaxy, warranty, delivery.
6. **The Proof** — gallery, testimonials, awards.
7. **The Invitation** — FAQs, contact, showrooms.

**Key messages:**
- 100% solid sheesham & teak — no veneer, no compromise.
- Eight weeks, one signature — hands-first from plank to parlour.
- Seven-year frame warranty we actually honour.
- White-glove delivery, installed in your room, in ~30 days.

---

## 2 · Brand Voice

**Tone:** warm, confident, unhurried. Speaks like a master craftsman, not an advertiser.

| Do | Don't |
|----|-------|
| Short declarative sentences | Slick buzzwords, hype |
| Concrete craft words: plank, grain, kiln-dried, joints | Generic: "quality", "best", "modern" |
| Second person, inclusive ("your room") | Imperative shouting |
| Understated pride ("no shortcuts") | Overclaiming ("world's best") |
| Editorial, magazine-like rhythm | Dense paragraphs |

**Voice examples:**
- Hero: "Where light meets craft."
- Brand: "Built slowly, built to be kept."
- Craft: "Eight weeks. One signature."
- Materials: "Four honest materials. No imitations."
- Awards: "Trophies don't make sofas. Care does."

---

## 3 · Logo Direction

- **Primary lockup:** Wordmark "GALAXY SOFAS" in Fraunces SemiBold; "GALAXY" in ink, "SOFAS" set with a champagne-gold gradient (`text-gradient-gold`). Companion sub-line in Manrope Bold, letterspaced: "Furniture Beyond Imagination".
- **Mark:** a rounded squircle tile filled with the gold gradient carrying the sofa glyph (`app-icon name="sofa"`), used in navbar, footer, favicon and loader.
- **Inverse:** on espresso backgrounds the wordmark renders in bone (#f2ebdf) with the gold accent preserved.
- **Clear space:** mark radius on all sides; minimum size 24px favicon / 180px wordmark.
- **Do not:** stretch, rotate, add outlines, or place on busy imagery without a scrim.

---

## 4 · Typography System

| Token | Font | Weight | Size / clamp | Use |
|-------|------|--------|--------------|-----|
| Display | Fraunces | 300–700 | `clamp(3rem, 8vw, 7rem)` | Hero H1 |
| H1 | Fraunces | Medium (500) | `clamp(2.75rem, 6vw, 4.5rem)` | Page titles |
| H2 | Fraunces | Medium | `clamp(2.25rem, 5vw, 3.75rem)` | Section titles |
| H3 | Fraunces | SemiBold | `1.25–1.5rem` | Card titles |
| H4 | Manrope | Bold | `1rem` | Sub-heads |
| Body | Manrope | 400/500 | `0.9375–1.125rem` | Paragraphs (65–75ch) |
| Caption | Manrope | 500 | `0.75rem` | Meta |
| Button | Manrope | Bold 700 | `0.75rem` + `0.2em` tracking | CTAs |
| Eyebrow | Manrope | Bold 800 | `0.6875rem` + `0.32em` tracking | Section labels |

- Editorial italic accent: Fraunces Italic on key words inside headings (`em`).
- `font-feature-settings: 'ss01' 1`; optical sizing on; headings `tracking-tight`.
- Leading: headings 1.05–1.15, body 1.6–1.75.

---

## 5 · Color Palette

### Light (warm editorial)
| Token | Hex | Role |
|-------|-----|------|
| `--color-paper` | `#faf7f1` | Page background |
| `--color-linen` | `#f4eee3` | Alternating section wash |
| `--color-snow` | `#ffffff` | Cards / surfaces |
| `--color-ink` | `#201b15` | Primary text |
| `--color-umber` | `#4a4237` | Secondary text |
| `--color-taupe` | `#857b6f` | Muted text |
| `--color-line` | `#e7dfcf` | Hairline borders |
| `--color-gold` | `#b98a2f` | Accent / interactive |
| `--color-gold-light` | `#d9b458` | Accent highlights |
| `--color-gold-dark` | `#8f681d` | Accent press states |
| `--color-clay` | `#b06a4a` | Tertiary warm |
| `--color-sage` | `#7a7a5e` | Tertiary olive |
| `--color-success` | `#4a7c59` | Success |

### Dark (espresso)
| Token | Hex | Role |
|-------|-----|------|
| `--color-espresso` | `#16130f` | Page background |
| `--color-espresso-soft` | `#1d1914` | Card surface |
| `--color-mocha` | `#262017` | Elevated card |
| `--color-bone` | `#f2ebdf` | Primary text |
| `--color-fawn` | `#a89a86` | Muted text |
| `--color-line-dark` | `#2c261c` | Hairline borders |

**Rules:** gold is reserved for action + accent (never body text at small sizes); text contrast ≥ 4.5:1 (AA) in both themes; gold-on-ink and bone-on-espresso carry interactive states.

---

## 6 · Design Tokens

Full token set lives in `src/styles.scss` `@theme` (colors, fonts, shadows, radius, easing, animations). Key tokens:

| Group | Tokens |
|-------|--------|
| Shadows | `--shadow-soft`, `--shadow-lift`, `--shadow-gold`, `--shadow-glow`, `--shadow-inner` |
| Radius | `--radius-xl2` (1.25rem), `--radius-xl3` (1.75rem), `--radius-xl4` (2.25rem) |
| Easing | `--ease-lux: cubic-bezier(0.22, 1, 0.36, 1)` |
| Gradients | `--color-gold-gradient`, `text-gradient-gold`, `bg-gold-gradient` |
| Utilities | `glass`, `glass-dark`, `noise`, `hairline`, `skeleton`, `focus-gold`, `section-shell`, `eyebrow`, `badge-*` |

---

## 7 · Icon Style

- **Source:** Font Awesome (solid + brands) with Lucide-style SVG fallbacks in `app-icon`.
- **Language:** 1.8px stroke weight (SVG fallback), 1.5px optical size for FA glyphs; rounded caps/joins.
- **Size system:** 12/14/16/20/24px (`h-3` → `h-6`).
- **Colors:** ink/bone default, gold for accent moments, white on gold fills.
- **Do not:** mix icon families, use emoji, or scale below 12px.
- **Container:** 40px (h-10) and 44px (h-11) soft rounded tiles (`rounded-xl`/`rounded-full`) with gold/10 fills.

---

## 8 · Photography Style

- **Direction:** warm editorial — golden-hour light, deep soft shadows, breathing negative space.
- **Palette:** ivory, espresso, champagne-gold; consistent across every set.
- **Subjects:** rooms over products; furniture as sculpture; hands and grain over close-ups of logos.
- **Composition:** generous negative space (headline room), strong leading lines, low parallax-friendly angles.
- **Process:** shoot 2x display size → WebP (hero AVIF) → strip metadata → lazy-load below fold.
- **Full prompt library:** [`ai-image-prompts.md`](./ai-image-prompts.md).

---

## 9 · Illustration Style

- **Language:** minimal line + fill, warm neutrals with gold accents; used for icons, diagrammatic step cards, before/after and the 360° viewer placeholder.
- **Rules:** single stroke weight (1.8px), organic rounded forms, matte fills on paper/espresso backgrounds.
- **Do not:** use stock clip-art, 3D render placeholders, or cartoon mascots.

---

## 10 · Texture Library

| Texture | Token / utility | Use |
|---------|-----------------|-----|
| Film grain | `.noise` (SVG feTurbulence, 3.5% opacity) | Overlays on hero/CTA |
| Hairline rules | `.hairline` gradient rules | Editorial dividers |
| Skeleton shimmer | `.skeleton` | Loading surfaces |
| Sheen sweep | `.sheen` | Gif-like light glide |
| Glass | `.glass` / `.glass-dark` | Floating panels, navbar, cards |
| Mask fades | `.mask-fade-x` / `.mask-fade-b` | Marquees, hero scrims |

---

## 11 · Material Language

The tactile "material story" the brand repeats everywhere — name, promise, honesty:

| Material | Brand line | Visual cue |
|----------|------------|------------|
| Solid Sheesham | "The backbone" | Bold grain, warm amber |
| Breathable Velvet | "The touch" | Champagne pile sheen |
| High-Resilience Foam | "The support" | Clean sculptural form |
| Solid Brass | "The detail" | Warm antiqued highlights |
| Boucle | "The texture" | Ivory wool loops |
| Full-Grain Leather | "The character" | Cognac aged grain |

**Language rule:** always pair a material with an honest claim (rub-tested, kiln-dried, 35D, 1,00,000 rubs) — never "premium materials" without proof.
