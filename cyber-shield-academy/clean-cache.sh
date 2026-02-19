#!/bin/bash
echo "Cleaning Next.js cache..."
rm -rf .next .turbo node_modules/.cache
echo "Cache cleaned! You can now run npm run dev or npm run build"
