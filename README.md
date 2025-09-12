# Bia Website

The official marketing website for Bia - a comprehensive platform for the global powerlifting community.

🌐 **Live Site**: [buildingbia.com](https://buildingbia.com)

## 🎯 About Bia

Bia is building infrastructure as strong as the sport itself. We're creating a platform where athletes, coaches, and meet directors can:
- Connect with the global powerlifting community
- Register and organize competitions
- Track and showcase performance history
- Spectate and follow athletes' journeys

## 🎨 Design Philosophy

This website features a modern, premium design that matches our mobile app aesthetic:

- **Dark Theme**: Deep navy (#11151c) background with sophisticated layering
- **Coral Accent**: Vibrant coral (#d66853) for CTAs and interactive elements
- **Glassmorphism**: Frosted glass effects throughout for depth and elegance
- **Micro-interactions**: Smooth animations and hover effects for engagement
- **Responsive**: Mobile-first design that looks great on all devices

## 🚀 Features

### Interactive Waitlist
- Click-to-reveal email collection form
- Smooth animations and transitions
- Real-time validation and feedback
- Serverless backend ready for integration

### Modern UI/UX
- Glassmorphic cards with backdrop blur
- Floating gradient backgrounds
- Shimmer effects and hover animations
- Accessible design with ARIA labels
- Keyboard navigation support

### Performance Optimized
- Lazy loading for images
- Efficient CSS animations
- Minimal JavaScript footprint
- SEO optimized with meta tags

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Rubik & Inter (Google Fonts)
- **Hosting**: Vercel
- **API**: Vercel Serverless Functions
- **Domain**: Custom domain via Vercel

## 📁 Project Structure

```
website/
├── public/              # Static files (served root)
│   ├── index.html      # Main landing page
│   ├── manifest.json   # PWA manifest
│   ├── robots.txt      # SEO robots file
│   ├── sitemap.xml     # SEO sitemap
│   └── assets/         # Static assets
│       ├── styles/     # CSS files
│       ├── images/     # Content images
│       └── logos/      # Brand logos
├── src/                 # Source code
│   └── api/            # Serverless functions
│       └── waitlist.js # Email collection
├── docs/               # Documentation
│   ├── CLAUDE.md       # AI context
│   └── AIRTABLE_SETUP.md
├── config/             # Configuration
│   └── setup-vercel-env.sh
├── package.json        # Project config
└── vercel.json         # Deployment config
```

## 🔧 Development

### Prerequisites
- Node.js (for Vercel CLI)
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/lifterslink/website.git
cd website

# Install Vercel CLI (if not installed)
npm i -g vercel

# Run local development server
npm run dev
# or with API support
vercel dev

# Or use serve
npm run serve
```

### Deployment
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 📊 Waitlist Integration

The waitlist form is ready for backend integration. Current options:

1. **Supabase** (Recommended)
2. **Airtable**
3. **Google Sheets API**
4. **Email Services** (ConvertKit, Mailchimp)

See [`api/README.md`](api/README.md) for detailed integration instructions.

## 🎨 Design System

### Colors
- Background: `#11151c`
- Surface: `#212d40`
- Accent: `#d66853`
- Text Primary: `#ffffff`
- Text Secondary: `#a8b2c7`

### Typography
- Headers: Rubik (700-800 weight)
- Body: Inter (400-500 weight)

### Key Components
- Glass cards with blur backdrop
- Gradient buttons with hover effects
- Floating animation backgrounds
- Shimmer loading effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Connect

- **Instagram**: [@buildingbia](https://www.instagram.com/buildingbia/)
- **LinkedIn**: [Bia](https://www.linkedin.com/company/buildingbia/)
- **Website**: [buildingbia.com](https://buildingbia.com)

## 📄 License

© 2024 Bia. All rights reserved.

---

*Building infrastructure as strong as the sport.*