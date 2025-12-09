#!/bin/bash

echo "🚀 Deploying to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Deploy to production
echo "📦 Starting deployment..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 Your URLs:"
echo "   Main site: https://YOUR-PROJECT.vercel.app/"
echo "   Members (public): https://YOUR-PROJECT.vercel.app/membres"
echo "   Members (secret): https://YOUR-PROJECT.vercel.app/espace-membres-xK9mN2p"