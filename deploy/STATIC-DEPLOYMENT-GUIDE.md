# Static Site Deployment Guide

This guide explains how to deploy Rihla Global as a static website on GitHub Pages, Netlify, Vercel, or any static hosting service.

## Overview

The static version of this site:
- **No backend server required** - Pure HTML/CSS/JS
- **Forms handled by Formspree** - Third-party form service
- **E-catalogue as static HTML** - Print-ready format
- **WhatsApp integration** - Works without server

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Formspree account (free tier available)

## Step 1: Configure Formspree

1. Go to [Formspree](https://formspree.io) and create a free account
2. Create a new form and copy your form endpoint (e.g., `https://formspree.io/f/xyzabcde`)
3. Edit `client/src/pages/Contact.tsx` and replace:
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   with your actual Formspree form ID.

## Step 2: Build the Static Site

Run the static build script:

```bash
./deploy/build-static.sh
```

Or manually:

```bash
# Install dependencies
npm install

# Build the static site
npx vite build --outDir dist-static

# Copy static catalogue and logo
cp client/public/e-catalogue.html dist-static/
cp client/public/logo.jpeg dist-static/
```

The build output will be in the `dist-static` folder.

## Step 3: Deploy to GitHub Pages

### Option A: Manual Deployment

1. Create a new GitHub repository
2. Push the contents of `dist-static` to the `gh-pages` branch:

```bash
cd dist-static
git init
git add .
git commit -m "Deploy static site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main:gh-pages --force
```

3. Go to Repository Settings > Pages
4. Set source to `gh-pages` branch

### Option B: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: |
          npx vite build --outDir dist-static
          cp client/public/e-catalogue.html dist-static/
          cp client/public/logo.jpeg dist-static/
          
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist-static
          branch: gh-pages
```

## Step 4: Deploy to Netlify

1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings:
   - **Build command**: `npm run build:static`
   - **Publish directory**: `dist-static`
4. Deploy!

### netlify.toml (optional)

Create `netlify.toml` in your repository root:

```toml
[build]
  command = "npm run build:static"
  publish = "dist-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Step 5: Deploy to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set build settings:
   - **Build Command**: `npm run build:static`
   - **Output Directory**: `dist-static`
4. Deploy!

## Handling Client-Side Routing

Since this is a Single Page Application (SPA), you need to configure your hosting to redirect all routes to `index.html`.

### GitHub Pages
Create a `404.html` file that's a copy of `index.html`:
```bash
cp dist-static/index.html dist-static/404.html
```

### Netlify
Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Custom Domain Setup

### GitHub Pages
1. Go to Settings > Pages
2. Add your custom domain
3. Enable HTTPS

### Netlify
1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Configure DNS as instructed

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS as instructed

## Formspree Alternatives

If you prefer other form services:

### Netlify Forms (Free with Netlify hosting)
Replace the form submit handler with native Netlify Forms:
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

### Google Forms
1. Create a Google Form with matching fields
2. Get the prefilled URL
3. Use the form action URL in your contact page

## File Structure After Build

```
dist-static/
├── index.html          # Main app entry
├── assets/            # JS, CSS, images
├── e-catalogue.html    # Product catalogue
├── logo.jpeg          # Company logo
└── favicon.png        # Site favicon
```

## Troubleshooting

### Form not submitting
- Verify your Formspree endpoint is correct
- Check browser console for errors
- Ensure you've replaced `YOUR_FORM_ID` with your actual form ID

### Routes not working (404 errors)
- Ensure you've set up proper redirects for your hosting platform
- For GitHub Pages, make sure `404.html` exists

### Images not loading
- Check image paths are relative
- Verify images are included in the build output

## Support

For questions about this deployment:
- Email: exports@rihlaglobal.com
- WhatsApp: +91 9398540256
