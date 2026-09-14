# Galaxy Sofas

Static marketing website for Galaxy Sofas — a sofa and furniture brand in Chennai.

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Static export (`output: "export"`)

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static files are written to the `out/` folder.

Preview the export:

```bash
npx serve out
```

## Update contact details

Edit `src/constants/site.ts`:

- `phone`
- `email`
- `whatsappNumber` / `whatsappUrl`
- `location`
- `social.instagram`
- `social.facebook`
- `url` (used by sitemap, robots, and Open Graph)

## Replace placeholder images

Put your photos in `public/images/` using these paths:

- `public/images/logo/galaxy-sofas-logo.png`
- `public/images/hero/galaxy-sofas-hero.jpg`
- `public/images/about/workshop.jpg`
- `public/images/about/custom-design.jpg`
- `public/images/products/*.jpg`
- `public/images/gallery/work-01.jpg` through `work-08.jpg`

Keep the filenames, or update the matching paths in `src/data/products.ts` and `src/data/gallery.ts`.

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Framework preset: **Next.js**.
4. Leave **Output Directory** empty (do not set `out` or any Angular `dist/...` path).
5. Set the production domain, then update `site.url` in `src/constants/site.ts`.

`output: "export"` is fine on Vercel. The Next.js preset finds `out/` automatically. Overriding Output Directory (for example leftover Angular `dist/galaxy-sofas/browser`) causes `now-next-routes-manifest` failures.

## Deploy on Netlify

1. Push the project to GitHub.
2. Create a new Netlify site from that repository.
3. Build command: `npm run build`
4. Publish directory: `out`
5. Add a `public/_redirects` file if you need custom redirects. With `trailingSlash: true`, most internal links already match static folders.

Optional `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

## WhatsApp

Enquiries use `https://wa.me/919786211128` with a prefilled message from `src/utils/whatsapp.ts`.

## SEO configuration

All brand, contact and domain details live in one file: `src/constants/site.ts`.
Nothing else in the codebase hardcodes a URL, phone number or email.

### Production domain

Canonical URLs, the sitemap, robots.txt and JSON-LD are all derived from
`site.url`, which resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` (set it in the hosting environment or `.env.local`)
2. the fallback constant in `src/constants/site.ts`

Set the env var to the final production domain **before** the next production
build. Never point it at a preview deployment URL.

### Things that need real business data

These are deliberately left empty or disabled until confirmed, because SEO
markup must not contain invented facts:

| Item | Where | Note |
| --- | --- | --- |
| Google Analytics 4 | `NEXT_PUBLIC_GA_ID` or `site.gaMeasurementId` | No script loads until an ID exists |
| Search Console meta token | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Only needed for HTML-tag verification |
| Social profiles | `site.social` + `site.socialVerified` | Set `socialVerified: true` only once the accounts are confirmed; they are then emitted as schema.org `sameAs` |
| Street address, postal code, opening hours | `src/lib/structured-data.ts` | Add to `organizationSchema()` once known |
| Prices, ratings, reviews | — | Intentionally absent from Product schema |

### Content freshness

`CONTENT_LAST_MODIFIED` in `src/lib/seo.ts` feeds `lastModified` in the sitemap.
Update it when page copy or product data genuinely changes — not on every build.

### Brand assets

- `assets/brand/galaxy-sofas-logo.png` is the master logo (not served).
- `public/images/logo/galaxy-sofas-logo.webp` is the web version.
- `src/app/favicon.ico`, `icon.png` and `apple-icon.png` are generated from the master.
- `src/app/opengraph-image.jpg` is the 1200x630 social preview.

### Google Search Console

1. Add the property (domain property preferred) at search.google.com/search-console.
2. Verify by DNS TXT record, or paste the HTML-tag token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
3. Submit `https://<domain>/sitemap.xml`.
4. Inspect the homepage URL and request indexing.
5. Repeat the inspection for `/products/`, `/services/` and the six category pages.
