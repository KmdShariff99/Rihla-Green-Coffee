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

# Base path configuration:
# For GitHub Pages subdirectory (username.github.io/repo-name/): use "/repo-name/"
# For custom domains (www.rihlaglobal.com) or root deployments: use "/"
#
# Usage examples:
#   ./deploy/build-static.sh                    # Uses default (subdirectory)
#   GITHUB_PAGES_BASE="/" ./deploy/build-static.sh  # For custom domain
#
BASE_PATH="${GITHUB_PAGES_BASE:-/}"

echo -e "${YELLOW}Base path: ${BASE_PATH}${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Build the static site with base path
echo -e "${YELLOW}Building static site...${NC}"

# Vite root is 'client/', so output is relative to that
# We use an absolute path to ensure consistent output location
OUTPUT_DIR="$(pwd)/dist-static"
rm -rf "${OUTPUT_DIR}"

npx vite build --outDir "${OUTPUT_DIR}" --base "${BASE_PATH}"

# Copy static assets from client/public
echo -e "${YELLOW}Copying static assets...${NC}"
cp client/public/e-catalogue.html "${OUTPUT_DIR}/"
cp client/public/logo.jpeg "${OUTPUT_DIR}/"
cp client/public/favicon.png "${OUTPUT_DIR}/" 2>/dev/null || true
cp client/public/CNAME "${OUTPUT_DIR}/" 2>/dev/null || true

# Create 404.html for SPA routing (GitHub Pages)
echo -e "${YELLOW}Creating 404.html for SPA routing...${NC}"
cp "${OUTPUT_DIR}/index.html" "${OUTPUT_DIR}/404.html"

# Create a simple _redirects file for Netlify
echo -e "${YELLOW}Creating Netlify redirects...${NC}"
echo "/*    /index.html   200" > "${OUTPUT_DIR}/_redirects"

# Create .nojekyll file for GitHub Pages (prevents Jekyll processing)
touch "${OUTPUT_DIR}/.nojekyll"

# Show build summary
echo ""
echo -e "${GREEN}=========================================="
echo "Build Complete!"
echo "==========================================${NC}"
echo ""
echo "Output directory: dist-static/"
echo "Base path: ${BASE_PATH}"
echo ""
echo "Contents:"
ls -la dist-static/
echo ""
echo "Next steps:"
echo "Deploy the dist-static folder to GitHub Pages"
echo ""
echo "To deploy to GitHub Pages:"
echo "  cd dist-static"
echo "  git init"
echo "  git add ."
echo "  git commit -m 'Deploy'"
echo "  git remote add origin https://github.com/KmdShariff99/Rihla-Green-Coffee.git"
echo "  git push -u origin main:gh-pages --force"
echo ""
if [ "${BASE_PATH}" = "/" ]; then
  echo "Your site will be at: https://www.rihlaglobal.com"
else
  echo "Your site will be at: https://kmdshairiff99.github.io${BASE_PATH}"
fi
echo ""
echo "See deploy/STATIC-DEPLOYMENT-GUIDE.md for detailed instructions."
