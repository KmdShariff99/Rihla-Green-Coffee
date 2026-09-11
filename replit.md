# Rihla Global — Static Next.js Website

## Purpose

Premium editorial website for Rihla Global, an Indian green coffee exporter based in Bengaluru. The site presents Coffee Board-aligned Arabica, Robusta, and specialty specifications for international buyers.

## Stack

- Next.js App Router with TypeScript
- Static export (`output: "export"`)
- Plain CSS, CSS keyframes/transitions, and one IntersectionObserver reveal hook
- `next/font` self-hosted Fraunces and Inter
- No backend, database, iframe, paid service, or animation library

## Run on Replit

The **Start application** workflow runs:

```bash
npm run dev
```

The development site is available on port 5000.

## Production build

```bash
npm run build
```

The fully static production site is generated in `out/`. To serve that exact export:

```bash
npm start
```

## Optional analytics

Set `NEXT_PUBLIC_GA_ID` to enable GA4 in production builds. If it is absent, no analytics script is emitted.

## Key content

- Product specification data: `lib/products.ts`
- App Router pages: `app/`
- Shared interactive components: `components/`
- Certificates and images: `public/`
- Vercel redirects and security headers: `vercel.json`