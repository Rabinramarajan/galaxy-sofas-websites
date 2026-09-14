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
