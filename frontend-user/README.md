# 🛍️ Nelatalli Organics — Frontend (Customer Portal)

**React 19 + Vite + TypeScript + TailwindCSS**

Modern, responsive e-commerce customer portal for Nelatalli Organics. Built with cutting-edge frontend technologies for fast loading, smooth animations, and delightful user experience.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Theme & Design System](#theme--design-system)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Styling Architecture](#styling-architecture)
- [API Integration](#api-integration)
- [Environment Setup](#environment-setup)
- [Build & Deployment](#build--deployment)

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- npm or yarn
- Backend running at http://localhost:8000

### Installation

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check code
npm run lint

# Clean build artifacts
npm run clean
```

The app will be available at **http://localhost:3000**

Backend API proxy is configured in `vite.config.ts`:
- `/api/*` → `http://localhost:8000`
- `/static/*` → `http://localhost:8000`

---

## 📁 Project Structure

```
frontend/
│
├── public/                      # Static assets (optional)
├── 
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Header.tsx          # Navigation, logo, user menu
│   │   ├── Footer.tsx          # Footer with links & info
│   │   ├── Hero.tsx            # Landing page hero section
│   │   ├── FeaturedProducts.tsx# Featured products showcase
│   │   ├── Categories.tsx      # Category cards grid
│   │   ├── ProductLists.tsx    # Product grid with filters
│   │   ├── Testimonials.tsx    # Customer testimonials
│   │   ├── PromoBanners.tsx    # Promotional banners
│   │   ├── FeatureBadges.tsx   # Feature highlights
│   │   └── ScrollToTop.tsx     # Scroll-to-top button utility
│   │
│   ├── pages/                   # Route-based page components
│   │   ├── Home.tsx            # Landing page (/)
│   │   ├── About.tsx           # About page (/about)
│   │   ├── Products.tsx        # Product listing (/products)
│   │   ├── ProductDetail.tsx   # Single product (/products/:id)
│   │   ├── Blog.tsx            # Blog articles (/blog)
│   │   ├── Contact.tsx         # Contact form (/contact)
│   │   ├── Wishlist.tsx        # Saved products (/wishlist)
│   │   ├── Cart.tsx            # Shopping cart (/cart)
│   │   ├── Checkout.tsx        # Checkout flow (/checkout)
│   │   ├── Profile.tsx         # User dashboard (/profile)
│   │   ├── Login.tsx           # Login page (/login)
│   │   └── Signup.tsx          # Registration page (/signup)
│   │
│   ├── assets/                  # Images & static files
│   │   └── *.png               # Product images
│   │
│   ├── api.ts                   # API client & fetch wrapper
│   ├── constants.ts            # Product/category data & configs
│   ├── App.tsx                 # Main router & layout
│   ├── main.tsx                # React entry point
│   ├── index.css               # Theme colors & global styles
│   ├── vite-env.d.ts           # Vite type definitions
│   └── main.ts                 # TypeScript config
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── .env.example                 # Environment variables template
├── .gitignore
└── README.md                    # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 19.0.0 | UI library & component model |
| **Language** | TypeScript | ~5.8 | Static type checking |
| **Build Tool** | Vite | 6.2.0 | Fast bundler & dev server |
| **Styling** | TailwindCSS | 4.1.14 | Utility-first CSS framework |
| **Routing** | React Router | 7.14.0 | Client-side navigation |
| **Animations** | Framer Motion (motion) | 12.23.24 | Smooth page & component animations |
| **Icons** | Lucide React | 0.546.0 | SVG icon library |
| **Fonts** | Google Fonts | - | Newsreader (serif) + Manrope (sans-serif) |
| **AI Integration** | Google Gemini | 1.29.0 | Optional AI features |

---

## 🎨 Theme & Design System

### Material Design 3 Color Palette

The frontend uses a sophisticated **Material Design 3** color system for consistent, accessible theming.

#### Primary Colors (Deep Brown/Warm Tones)
```
Primary:                   #271310  (Deep Brown)
On Primary:                #ffffff  (White text on primary)
Primary Fixed:             #ffdad4  (Light primary)
On Primary Fixed:          #2b1613  (Dark text on light primary)
Primary Fixed Variant:     #5b403c  (Muted primary)
On Primary Fixed Variant:  #5b403c  (Text on muted primary)
Primary Container:         #3e2723  (Darker container)
On Primary Container:      #ae8d87  (Accent text on container)
```

**Usage**: Buttons, CTA elements, selected states, brand accents

#### Secondary Colors (Warm Brown)
```
Secondary:                 #725a39  (Warm Brown)
On Secondary:              #ffffff  (White text)
Secondary Fixed:           #feddb3  (Light secondary)
On Secondary Fixed:        #281801  (Dark text on light)
Secondary Fixed Variant:   #584324  (Muted secondary)
On Secondary Fixed Variant:#584324  (Text on muted)
Secondary Container:       Warm accent tones (secondary actions)
On Secondary Container:    #765f3d  (Text on containers)
```

**Usage**: Secondary buttons, links, hover states, accents

#### Tertiary Colors (Deep Orange)
```
Tertiary:                  #300d00  (Deep Orange-Red)
On Tertiary:               (auto calculated)
Tertiary Fixed:            #ffdbcd  (Light orange)
On Tertiary Fixed Variant: #76320f  (Dark orange-brown)
Tertiary Container:        #521b00  (Deep orange container)
On Tertiary Container:     #d67d54  (Light text on container)
```

**Usage**: Highlights, badges, special promotions, accent elements

#### Surface & Background Colors
```
Background:                #fef9f2  (Off-White)
On Background:             #1d1c18  (Dark text)
Surface:                   #fef9f2  (Content background)
On Surface:                #1d1c18  (Primary text)
Surface Dim:               #ded9d3  (Subtle background)
Surface Bright:            #fef9f2  (Brightest surface)
Surface Container:         #f2ede6  (Elevated surfaces)
Surface Container Low:     #f8f3ec  (Slightly elevated)
Surface Container High:    #ece7e1  (More elevated)
Surface Container Lowest:  #ffffff  (White surfaces)
```

**Usage**: Page backgrounds, cards, containers, elevated surfaces

#### Neutral & Outline Colors
```
Outline:                   #827472  (Medium brown outline)
Outline Variant:           #d3c3c0  (Light outline)
Surface Variant:           #e6e2db  (Subtle variant)
On Surface Variant:        #504442  (Text on surface variant)
Inverse Surface:           #32302c  (Dark inverse)
Inverse On Surface:        #f5f0e9  (Light text on inverse)
Inverse Primary:           #e3beb8  (Light primary on dark)
```

**Usage**: Borders, dividers, secondary text, disabled states

#### Semantic Colors
```
Error:                     #ba1a1a  (Red - deletions, errors)
On Error:                  #ffffff  (White on error)
Error Container:           #ffdad6  (Light error background)
On Error Container:        #93000a  (Dark text on error bg)
```

**Usage**: Error messages, validation states, destructive actions

### Typography System

Fonts are imported from **Google Fonts**:

```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
```

#### Font Families
```
Headlines:  "Newsreader", serif       /* Elegant, traditional */
Body Text:  "Manrope", sans-serif     /* Modern, friendly */
Labels:     "Manrope", sans-serif     /* Consistent with body */
```

#### Scale (Tailwind classes)
```
text-xs      → 12px
text-sm      → 14px
text-base    → 16px (default)
text-lg      → 18px
text-xl      → 20px
text-2xl     → 24px
text-3xl     → 30px
text-4xl     → 36px
```

### Spacing & Layout

Uses TailwindCSS default spacing (4px base):
```
p-1   → 4px padding
p-2   → 8px padding
p-4   → 16px padding
p-8   → 32px padding
gap-4 → 16px gap between items
```

### Dark Mode (if applicable)

Currently uses light theme by default. Dark mode can be enabled via:
```tsx
className="dark:bg-inverse-surface dark:text-inverse-on-surface"
```

---

## 📄 Pages & Routes

### Public Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.tsx | Landing page with hero, categories, featured products |
| `/about` | About.tsx | Company story, values, mission |
| `/products` | Products.tsx | Full catalog with filters, sorting, search |
| `/products/:id` | ProductDetail.tsx | Single product details, reviews, recommendations |
| `/blog` | Blog.tsx | Articles, recipes, wellness tips |
| `/contact` | Contact.tsx | Contact form & business information |

### User-Protected Pages

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---|
| `/login` | Login.tsx | User login form | ❌ |
| `/signup` | Signup.tsx | User registration form | ❌ |
| `/profile` | Profile.tsx | User dashboard, orders, settings | ✅ |
| `/wishlist` | Wishlist.tsx | Saved favorite products | ✅ |
| `/cart` | Cart.tsx | Shopping cart items | ✅ |
| `/checkout` | Checkout.tsx | Checkout flow & payment | ✅ |

---

## 🧩 Component Architecture

### Component Organization

#### Layout Components
- **Header** — Navigation bar, search, user menu, cart icon
- **Footer** — Links, contact info, newsletter signup
- **ScrollToTop** — Button for jumping to top of page

#### Feature Components (reusable snippets)
- **Hero** — Landing page hero section with CTA
- **Categories** — Category showcase grid
- **ProductLists** — Product grid with card components
- **FeaturedProducts** — Highlighted products section
- **Testimonials** — Customer testimonials carousel
- **PromoBanners** — Promotional/marketing banners
- **FeatureBadges** — Feature highlight badges

#### Page Components
Page components compose multiple feature components and handle routing logic.

### Component Props Pattern

All components follow this pattern:
```tsx
interface ComponentProps {
  // Required props
  className?: string;
  // Component-specific props
  // Optional event handlers
}

export default function Component({ 
  className = '', 
  ...props 
}: ComponentProps) {
  return (
    <div className={`theme-colors ${className}`}>
      {/* Component content */}
    </div>
  );
}
```

### Animation Patterns

Using **Framer Motion** for smooth animations:

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## 🎨 Styling Architecture

### Tailwind CSS Configuration

**TailwindCSS v4** with Vite plugin for optimal performance:
```
@tailwindcss/vite@4.1.14
```

### Theme Customization

Colors are defined in `src/index.css` using CSS custom properties:

```css
@theme {
  --color-primary: #271310;
  --color-on-primary: #ffffff;
  --color-secondary: #725a39;
  /* ... more colors ... */
}
```

### Global Styles

`src/index.css` includes:
- Font imports (Google Fonts)
- Color theme tokens
- Global Tailwind directives
- Custom utility classes (if any)

### Utility-First Approach

Styling uses Tailwind's utility classes:
```tsx
<button className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container">
  Click me
</button>
```

### Responsive Design

Mobile-first breakpoints:
```
sm:   640px     (small devices)
md:   768px     (tablets)
lg:   1024px    (desktops)
xl:   1280px    (large screens)
2xl:  1536px    (very large screens)
```

Usage:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

## 🔌 API Integration

### API Client (`api.ts`)

Centralized fetch wrapper for all API calls:

```tsx
import { API_BASE_URL } from './constants';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

export async function api(endpoint: string, options: FetchOptions = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}
```

### API Endpoints Used

```
GET  /api/products/             # Get all products
GET  /api/products/:id/         # Get single product
GET  /api/categories/           # Get categories
POST /api/auth/register         # User registration
POST /api/auth/login            # User login
GET  /api/users/profile         # Get user profile
PUT  /api/users/profile         # Update profile
GET  /api/orders/               # Get user orders
POST /api/orders/               # Create new order
GET  /api/cart/                 # Get cart items
POST /api/cart/                 # Add to cart
GET  /api/wishlist/             # Get wishlist
POST /api/wishlist/             # Add to wishlist
GET  /api/blog/                 # Get blog posts
POST /api/contact/              # Submit contact form
GET  /api/search/?q=query       # Search products
```

### Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000
VITE_GEMINI_API_KEY=your-optional-gemini-key
```

Access in code:
```tsx
import.meta.env.VITE_API_BASE_URL
import.meta.env.VITE_GEMINI_API_KEY
```

---

## 🔧 Environment Setup

### `.env` File Template

```bash
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000

# Google Gemini API (optional for AI features)
VITE_GEMINI_API_KEY=your-api-key-here
```

### Local Development

Make sure backend is running:
```bash
cd ../backend
uvicorn main:app --reload --port 8000
```

Then start frontend:
```bash
npm run dev
```

---

## 🏗️ Build & Deployment

### Development Build

```bash
npm run dev
```
Starts Vite dev server with HMR (Hot Module Replacement) enabled.

### Production Build

```bash
npm run build
```

Outputs optimized files to `dist/` directory:
- Minified JS & CSS
- Tree-shaking of unused code
- Code splitting for optimal loading

### Preview Production Build

```bash
npm run preview
```

Starts a local server to preview production build.

### Deployment Checklist

- [ ] Update `VITE_API_BASE_URL` to production backend
- [ ] Set `VITE_GEMINI_API_KEY` if using AI features
- [ ] Run `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Deploy `dist/` folder to hosting

### Hosting Options

- **Vercel** — Direct GitHub integration, automatic deployments
- **Netlify** — Same as Vercel
- **AWS S3 + CloudFront** — S3 for static files, CloudFront for CDN
- **Firebase Hosting** — Firebase project integration
- **Traditional Server** — Any static file server (nginx, Apache)

---

## 🧪 Testing & Linting

```bash
# Type check with TypeScript
npm run lint

# No built-in test runner (can add Jest/Vitest)
```

---

## 📦 Dependencies

### Production Dependencies

| Package | Purpose |
|---------|---------|
| react | UI framework |
| react-dom | React DOM rendering |
| react-router-dom | Client-side routing |
| @tailwindcss/vite | TailwindCSS integration |
| motion | Animations (Framer Motion) |
| lucide-react | Icon library |
| @google/genai | Google Gemini AI API |

### Development Dependencies

| Package | Purpose |
|---------|---------|
| typescript | Type checking |
| vite | Build tool |
| @vitejs/plugin-react | React support for Vite |
| tailwindcss | CSS framework |
| autoprefixer | CSS vendor prefixing |

---

## 🚨 Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution**: Vite automatically uses next available port, or specify with `--port`:
```bash
npm run dev -- --port 3001
```

### Issue: API 404 errors
**Solution**: Ensure backend is running:
```bash
cd ../backend && uvicorn main:app --reload --port 8000
```

### Issue: Styles not loading
**Solution**: Clear cache and reinstall:
```bash
npm run clean && npm install && npm run dev
```

### Issue: `Cannot find module` errors
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Hot reload not working
**Solution**: Check if `DISABLE_HMR` env var is set; it may be disabled intentionally

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` files with real API keys
- ✅ Use HTTPS in production
- ✅ Validate all user input before sending to API
- ✅ Store auth tokens securely (localStorage or secure cookie)
- ✅ Implement CSRF protection if needed
- ✅ Keep dependencies updated (`npm audit`)

---

## 📚 Additional Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

## 📞 Support

For frontend-specific issues:
1. Check this README
2. Open an issue on GitHub
3. Contact: narenderkandhada.online@gmail.com

---

**Last Updated**: April 2026
**Frontend Version**: 1.0.0
