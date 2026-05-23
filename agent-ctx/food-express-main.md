# Task: Food Express Premium Fast Food Restaurant Website

## Summary
Built a complete premium fast food restaurant website called "Food Express" using Next.js 16 with App Router. The site features a dark theme with fire/red/orange accent colors, dramatic fire intro animation, 3D product viewer, and responsive design.

## Files Created/Modified

### Core Files
- `src/app/globals.css` - Complete dark fire theme with custom CSS utilities (text-fire-gradient, bg-fire-gradient, btn-fire-glow, card-glow, card-3d, custom scrollbar, glow-pulse animation, fire keyframes)
- `src/app/layout.tsx` - Updated with Playfair Display + Inter fonts, Food Express metadata, dark theme class
- `src/app/page.tsx` - Main page composing all sections with FireIntro state management and 3D viewer modal

### Components (14 total)
1. `src/components/FireIntro.tsx` - Dramatic fire particle animation with letter-by-letter "FOOD EXPRESS" reveal
2. `src/components/Navbar.tsx` - Fixed navbar with scroll-based transparency, mobile sheet menu, fire gradient logo
3. `src/components/HeroSection.tsx` - Full-screen hero with hero-banner.png background, animated text, CTA buttons
4. `src/components/TrustPanel.tsx` - Trust indicators (Fresh Ingredients, Fast Delivery, etc.) with animated counters
5. `src/components/MenuCategories.tsx` - 4 category cards (Burgers, Pizza, Chicken, Desserts) with 3D tilt hover
6. `src/components/PopularItems.tsx` - 6 product cards with ratings, tags, hover 3D viewer button
7. `src/components/SpecialsSection.tsx` - Today's special with countdown timer, price comparison
8. `src/components/AboutSection.tsx` - Restaurant story since 2009 with feature cards
9. `src/components/NewsletterSection.tsx` - Email subscription with fire-styled form
10. `src/components/Footer.tsx` - Sticky footer with brand, quick links, hours, contact, social icons
11. `src/components/Product3DViewer.tsx` - Full-screen 3D product modal with mouse parallax tilt and drag-to-rotate

### API
- `src/app/api/contact/route.ts` - POST endpoint for contact form

## Technical Details
- All components use 'use client' directive
- framer-motion for scroll animations (whileInView with once: true)
- CSS keyframe animations for fire particles, flicker, shimmer, float
- 3D perspective transforms on product viewer and category cards
- Responsive design: mobile-first with Tailwind breakpoints
- Sticky footer with min-h-screen flex flex-col and mt-auto
- HSL-based fire color scheme in CSS variables
- TypeScript throughout with proper typing
