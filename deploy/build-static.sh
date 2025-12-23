#!/bin/bash

# Rihla Global - Static Site Build Script
# This script builds the static version of the website for deployment
# to GitHub Pages, Netlify, Vercel, or any static hosting service.

set -e

echo "=========================================="
echo "Rihla Global - Static Site Build"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Build the static site
echo -e "${YELLOW}Building static site...${NC}"
npx vite build --outDir dist-static

# Copy static assets
echo -e "${YELLOW}Copying static assets...${NC}"
cp client/public/e-catalogue.html dist-static/
cp client/public/logo.jpeg dist-static/
cp client/public/favicon.png dist-static/ 2>/dev/null || true

# Create 404.html for SPA routing (GitHub Pages)
echo -e "${YELLOW}Creating 404.html for SPA routing...${NC}"
cp dist-static/index.html dist-static/404.html

# Create a simple _redirects file for Netlify
echo -e "${YELLOW}Creating Netlify redirects...${NC}"
echo "/*    /index.html   200" > dist-static/_redirects

# Show build summary
echo ""
echo -e "${GREEN}=========================================="
echo "Build Complete!"
echo "==========================================${NC}"
echo ""
echo "Output directory: dist-static/"
echo ""
echo "Contents:"
ls -la dist-static/
echo ""
echo "Next steps:"
echo "1. Replace YOUR_FORM_ID in Contact.tsx with your Formspree form ID"
echo "2. Deploy the dist-static folder to your hosting platform"
echo ""
echo "See deploy/STATIC-DEPLOYMENT-GUIDE.md for detailed instructions."
