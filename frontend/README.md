# Nelatalli Organics — Frontend

React frontend for the Nelatalli Organics e-commerce platform.

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove dist folder |

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling & dev server
- **TailwindCSS 4** for styling
- **Framer Motion** for animations
- **React Router 7** for routing
- **Lucide React** for icons
- **Google Fonts** — Newsreader (serif) + Manrope (sans-serif)

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, categories, featured products, testimonials |
| `/about` | About | Company story, values, timeline |
| `/products` | Products | Full product catalog with filters |
| `/products/:id` | Product Detail | Single product view |
| `/blog` | Blog | Articles & recipes |
| `/contact` | Contact | Contact form & info |
| `/wishlist` | Wishlist | Saved favorite products |
| `/profile` | Profile | User dashboard, orders, settings |

## API Proxy

The Vite dev server proxies `/api/*` requests to the FastAPI backend at `http://localhost:8000`. Make sure the backend is running before using API features.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini AI API key (optional) |
