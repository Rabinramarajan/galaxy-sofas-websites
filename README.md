# Galaxy Sofas

Production catalogue and enquiry website for a premium furniture showroom: sofas, beds, home furnishings and custom work. No checkout.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Edit `lib/site.ts` for brand, city, phone, WhatsApp and address.

## Email

Set SMTP variables in `.env.local`. The contact form posts to `POST /api/contact`. Credentials never ship to the browser. Without SMTP, the API returns a clear failure instead of pretending mail was sent.

## Analytics

Optional: `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CLARITY_ID`. Leave empty to keep the site tracker-free.
