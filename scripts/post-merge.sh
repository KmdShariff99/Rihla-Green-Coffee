#!/bin/bash
set -e

npm ci --no-audit --no-fund
npm run build