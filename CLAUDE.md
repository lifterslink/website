# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Commit Guidelines

When creating commits:
- DO NOT add Claude as a co-author
- DO NOT include "Generated with Claude Code" or similar messages
- DO NOT add "Co-Authored-By: Claude" lines
- Keep commit messages clean and professional without AI attribution

## Project Overview

Bia (buildingbia.com) is a comprehensive platform for the global powerlifting community. This is the marketing website built with modern web standards and deployed on Vercel.

## Current Design System

### Color Palette (Matching App Theme)
```css
--bg-primary: #11151c (Very dark navy/black)
--surface: #212d40 (Dark blue-gray for cards)
--surface-light: rgba(33, 45, 64, 0.6) (Glassmorphism)
--accent: #d66853 (Coral/salmon - primary accent)
--accent-secondary: #7d4e57 (Muted rose/mauve)
--text-primary: #ffffff
--text-secondary: #a8b2c7
--text-muted: #6b7585
```

### Typography
- **Primary Font**: Rubik (rounded, modern feel matching app)
- **Secondary Font**: Inter (clean, readable for body text)
- Font stack: `'Rubik', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Design Principles
1. **Glassmorphism**: Frosted glass effects with backdrop-filter blur
2. **Smooth Animations**: Cubic-bezier easing for premium feel
3. **Micro-interactions**: Hover effects, shimmer animations, floating backgrounds
4. **Dark Premium Aesthetic**: Matching the app's sophisticated look
5. **Coral Accent Usage**: CTAs, links, and important interactive elements

## Project Structure

- `index.html` - Main landing page with hero, waitlist form, content sections
- `styles/styles.css` - Complete styling with glassmorphism and animations
- `api/waitlist.js` - Vercel serverless function for email collection
- `bia_logo.png` - App logo/icon used in header and as favicon
- `images/` - Image assets including LifterInAction.png

## Key Features

### Waitlist System
- **Interactive Form**: Button reveals email input with smooth animation
- **Native Collection**: Emails collected via Vercel API (not Google Forms)
- **Serverless Backend**: `/api/waitlist` endpoint ready for database integration
- **Success States**: Visual feedback with animations

### Responsive Design
- Mobile-first approach with proper breakpoints
- Touch-friendly targets (44px minimum)
- Flexible grid layouts
- Optimized font sizes with clamp()

### Accessibility Features
- ARIA labels on all major sections
- Focus-visible styles for keyboard navigation
- Semantic HTML structure with main, section, nav tags
- Descriptive alt text for images
- Proper heading hierarchy

### Performance Optimizations
- Lazy loading on images
- Efficient CSS animations using transform/opacity
- Minimal JavaScript footprint
- Optimized font loading

## Development Commands

Since this is deployed on Vercel:
- `vercel dev` - Run locally with serverless functions
- `vercel` - Deploy to preview
- `vercel --prod` - Deploy to production

For simple preview:
- `python -m http.server 8000` or `npx serve`

## API Integration Notes

The waitlist API (`/api/waitlist.js`) is configured but needs backend storage:
- Currently logs to console
- Ready for integration with:
  - Supabase (recommended)
  - Airtable
  - Google Sheets
  - Email services (ConvertKit, Mailchimp)

See `api/README.md` for integration instructions.

## Recent Major Updates

1. **Complete Redesign** (Latest)
   - Implemented app-matching color scheme with coral accent
   - Added glassmorphism throughout site
   - Created reveal-style waitlist form
   - Enhanced with micro-interactions and animations

2. **Waitlist Integration**
   - Replaced Google Forms with native email collection
   - Added Vercel serverless function
   - Implemented loading states and error handling

3. **Logo Integration**
   - Added Lifters Link logo to navigation
   - Configured as favicon
   - Rounded corners for app icon consistency

4. **Best Practices Refactor**
   - Added comprehensive accessibility features
   - Implemented SEO meta tags and structured data
   - Added performance optimizations
   - Improved error handling and fallbacks

## Design Tokens Reference

```css
/* Shadows */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)
box-shadow: 0 4px 15px var(--glow-accent)

/* Borders */
border: 1px solid var(--border-subtle)
border-radius: 24px (cards)
border-radius: 50px (buttons)

/* Animations */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)

/* Glassmorphism */
background: var(--surface-light)
backdrop-filter: blur(20px)
-webkit-backdrop-filter: blur(20px)
```

## Important URLs
- Production: https://buildingbia.com
- Instagram: https://www.instagram.com/buildingbia/
- LinkedIn: https://www.linkedin.com/company/buildingbia/

## Database & Data Sources

### OpenPowerlifting Data
- **Location**: `/Users/zhast/Documents/lifters-link/Data/OpenPowerlifting/`
- **Main CSV**: `openpowerlifting-2025-08-30/openpowerlifting-2025-08-30-f5ba05c7.csv` (705MB)
- **2024 Statistics** (displayed on website):
  - 140,611 unique athletes competed
  - 3,937 meets held
  - 228 federations active
  - 279,864 competition results
- **All-time Statistics**:
  - 931,489 unique athletes
  - 3.6M+ competition results

### Supabase Database
- **Import Script**: `/Users/zhast/Documents/lifters-link/Data/Supabase/import_openpowerlifting_v2.py`
- **Database URL**: `https://vfycxzcpgsagcssshsyz.supabase.co`
- **Current Data**: Only ~2,500 athletes imported (test subset)
- **Tables**: athletes, meets, competition_results

### Airtable (Waitlist)
- **Base ID**: `appdlFtFZ1Th6ALxh`
- **Table**: `Waitlist` (single field: Email)
- **API Key**: Stored in `.env.local`