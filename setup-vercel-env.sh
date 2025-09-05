#!/bin/bash

# Vercel Environment Variables Setup Script for Lifters Link
# This script helps you add the Airtable configuration to Vercel

echo "🚀 Setting up Vercel Environment Variables for Lifters Link"
echo "=================================================="
echo ""
echo "This will add the following environment variables to your Vercel project:"
echo "- AIRTABLE_API_KEY"
echo "- AIRTABLE_BASE_ID" 
echo "- AIRTABLE_TABLE_NAME"
echo ""
echo "Make sure you're logged into Vercel CLI first (run 'vercel login' if not)"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Add environment variables for all environments (development, preview, production)
echo ""
echo "📝 Adding AIRTABLE_API_KEY..."
echo "patIgbHo2CwvX8VHp.6f75e1d2815a0799b174d9bdeb72d0281e2103d0782a85d9e2efc0aca07e8d12" | vercel env add AIRTABLE_API_KEY production
echo "patIgbHo2CwvX8VHp.6f75e1d2815a0799b174d9bdeb72d0281e2103d0782a85d9e2efc0aca07e8d12" | vercel env add AIRTABLE_API_KEY preview  
echo "patIgbHo2CwvX8VHp.6f75e1d2815a0799b174d9bdeb72d0281e2103d0782a85d9e2efc0aca07e8d12" | vercel env add AIRTABLE_API_KEY development

echo ""
echo "📝 Adding AIRTABLE_BASE_ID..."
echo "appdlFtFZ1Th6ALxh" | vercel env add AIRTABLE_BASE_ID production
echo "appdlFtFZ1Th6ALxh" | vercel env add AIRTABLE_BASE_ID preview
echo "appdlFtFZ1Th6ALxh" | vercel env add AIRTABLE_BASE_ID development

echo ""
echo "📝 Adding AIRTABLE_TABLE_NAME..."
echo "Waitlist" | vercel env add AIRTABLE_TABLE_NAME production
echo "Waitlist" | vercel env add AIRTABLE_TABLE_NAME preview
echo "Waitlist" | vercel env add AIRTABLE_TABLE_NAME development

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'vercel --prod' to deploy with the new environment variables"
echo "2. Test the waitlist form on your live site"
echo "3. Check Airtable to see the submissions"
echo ""
echo "🎉 Setup complete!"