#!/bin/bash

# Rihla Global - Production Build Script
# Run this script on your AWS EC2 instance after cloning the repository

set -e

echo "=========================================="
echo "  Rihla Global - Production Build"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install dependencies
echo ""
echo "Step 1: Installing dependencies..."
npm install

# Build the application
echo ""
echo "Step 2: Building the application..."
npm run build

# Create logs directory
echo ""
echo "Step 3: Creating logs directory..."
mkdir -p logs

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo ""
    echo "Step 4: Installing PM2 globally..."
    npm install -g pm2
fi

echo ""
echo "=========================================="
echo "  Build Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Set your environment variables in .env file"
echo "2. Start the application with: pm2 start ecosystem.config.js"
echo "3. Save PM2 process list: pm2 save"
echo "4. Enable startup script: pm2 startup"
echo ""
