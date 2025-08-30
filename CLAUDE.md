# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Commit Guidelines

When creating commits:
- DO NOT add Claude as a co-author
- DO NOT include "Generated with Claude Code" or similar messages
- DO NOT add "Co-Authored-By: Claude" lines
- Keep commit messages clean and professional without AI attribution

## Project Overview

This is a static website for Lifters Link (lifterslink.com), a platform for the global powerlifting community. The site is built with vanilla HTML, CSS, and minimal JavaScript.

## Project Structure

- `index.html` - Main landing page with sections for hero, infrastructure, team, and footer
- `styles/styles.css` - All styling using Google Fonts (Inter and Syne)
- `scripts/header.js` - Small JavaScript file for header insertion (currently unused in index.html)
- `images/` - Team member photos and action images
- `logo.png` - Company logo
- `CNAME` - GitHub Pages custom domain configuration (lifterslink.com)

## Development Commands

Since this is a static website with no build process:
- Open `index.html` directly in a browser to preview changes
- Use a local web server for development: `python -m http.server 8000` or `npx serve`
- No build, lint, or test commands required

## Architecture Notes

- Pure static site - no framework or build tools
- Hosted on GitHub Pages with custom domain
- CSS uses custom properties for consistent theming with dark mode design
- Responsive design using flexbox layouts
- External font dependencies from Google Fonts (Inter and Syne families)

## Key Design Patterns

- All styles centralized in `styles/styles.css`
- Color scheme: Dark theme (#121212 background) with purple/blue accents (#8b98ea, #2f4a80)
- Typography: Syne for headers, Inter for body text
- Team section uses radial gradient backgrounds for visual depth