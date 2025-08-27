#!/bin/bash
echo "🔮 Building Melektron AI on Render..."
npm install --legacy-peer-deps
npm run build:packages
cd apps/web
npm run build