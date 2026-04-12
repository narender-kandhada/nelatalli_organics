# 👨‍💼 Nelatalli Organics — Admin Dashboard

**React 19 + Vite + TypeScript + TailwindCSS + Recharts**

A sophisticated, full-featured admin dashboard for managing the Nelatalli Organics e-commerce platform. Built with cutting-edge technologies for optimal performance, scalability, and user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Admin Screens](#admin-screens)
- [Components Architecture](#components-architecture)
- [Theme & Design System](#theme--design-system)
- [API Integration](#api-integration)
- [Development Guide](#development-guide)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

---

## 🎯 Overview

Nelatalli Organics Admin Dashboard is a comprehensive editorial management system designed to help administrators efficiently manage:

- **Inventory** — Product catalog with real-time stock levels
- **Orders** — Order fulfillment and status tracking
- **Customers** — Customer management and analytics
- **Analytics** — Sales performance and business insights
- **Settings** — Admin profile and system configuration
- **Support** — Customer support resources and FAQs

The dashboard uses **Material Design 3** theming with elegant botanical elements reflecting Nelatalli's organic brand identity.

---

## ✨ Features

### 🏠 Dashboard
- **Real-time KPI Cards** — Total revenue, orders, products, users, low stock alerts, pending orders
- **Revenue Analytics** — Month-over-month sales trends with interactive charts
- **Order Status Distribution** — Visual pie chart of order statuses
- **Recent Orders** — Quick overview of latest transactions
- **Low Stock Alerts** — Inventory management notifications
- **Top Products** — Best-selling products with performance metrics

### 📦 Inventory Management
- **Product Catalog** — Browse all products with pagination
- **Search & Filter** — Filter by category and stock status
- **Product Details** — SKU, category, price, discount, stock levels
- **Status Indicators** — Active, Low Stock, Out of Stock status
- **Add Products** — Create new products with full details
- **Bulk Operations** — Manage multiple products efficiently

### 📋 Order Management
- **Order Listing** — View all orders with customer information
- **Status Tracking** — Pending → Confirmed → Shipped → Delivered
- **Payment Status** — Paid, Unpaid, Refunded tracking
- **Advanced Filtering** — Filter by order status, payment status, date range
- **Order Details** — View items, totals, and customer information
- **Status Updates** — Update order progress in real-time

### 👥 Customer Management
- **Customer Database** — Complete customer profiles
- **Contact Information** — Email, phone, and location details
- **Order History** — View customer purchase history
- **Account Metrics** — Total orders and lifetime spent
- **Search Capabilities** — Find customers quickly
- **Location Filtering** — Filter customers by region

### 📊 Analytics & Reporting
- **Sales Performance** — Area charts showing revenue trends
- **Order Analytics** — Order volume and trends
- **Customer Metrics** — Total customers, average order value
- **Category Performance** — Sales breakdown by product category
- **Date Range Selection** — Analyze specific time periods
- **Export Functionality** — Export reports for further analysis

### ⚙️ Settings & Configuration
- **Profile Management** — Update admin profile and avatar
- **Notifications** — Configure email and push notifications
- **Security** — Password management and two-factor authentication
- **Appearance** — Theme customization (Light/Dark/System)
- **Color Scheme** — Custom primary color selection
- **Data Management** — Export and backup data options

### 🆘 Support Center
- **FAQ Database** — Common questions and answers
- **Live Chat** — Support representative assistance
- **Email Support** — Direct communication channel
- **Phone Support** — Call support line
- **Documentation** — Complete guides and tutorials
- **Search** — Find help articles quickly

### 🤖 AI Chatbot
- **Gemini AI Integration** — Intelligent assistant powered by Google Gemini
- **Context-Aware** — Understands admin dashboard context
- **Real-time Help** — Get instant answers to questions
- **Multi-turn Conversation** — Maintain conversation history
- **System Insights** — Access simulated business metrics
- **Professional Tone** — Botanical-themed assistant personality

---

## 📁 Project Structure

```
frontend-admin/
│
├── public/                      # Static assets
│   └── favicon.ico
│
├── src/
│   ├── assets/                  # Images & static files
│   │   └── logo.png            # Nelatalli Organics logo
│   │
│   ├── components/              # Reusable UI components
│   │   ├── LoginScreen.tsx      # Admin login page
│   │   ├── DashboardScreen.tsx  # Main dashboard with KPIs & charts
│   │   ├── InventoryScreen.tsx  # Product inventory management
│   │   ├── OrdersScreen.tsx     # Order fulfillment tracking
│   │   ├── CustomersScreen.tsx  # Customer database
│   │   ├── AnalyticsScreen.tsx  # Business analytics & reports
│   │   ├── SettingsScreen.tsx   # Admin settings & preferences
│   │   ├── SupportScreen.tsx    # Help center & FAQs
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── TopBar.tsx           # Header with search & notifications
│   │   └── Chatbot.tsx          # AI chatbot widget
│   │
│   ├── lib/                     # Utilities & helpers
│   │   └── utils.ts            # Tailwind utility functions (cn, clsx)
│   │
│   ├── App.tsx                  # Main app router & layout
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles & theme
│   ├── types.ts                 # TypeScript interfaces
│   ├── vite-env.d.ts            # Vite & image type declarations
│   └── main.ts                  # CLI entry (optional)
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & npm scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore patterns
├── tailwind.config.js           # Tailwind CSS config (optional)
└── README.md                    # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 19.0.0 | UI library with concurrent rendering |
| **Language** | TypeScript | ~5.8 | Static type checking & safety |
| **Build Tool** | Vite | 6.2.0 | Lightning-fast bundler & dev server |
| **Styling** | TailwindCSS | 4.1.14 | Utility-first CSS framework |
| **Animations** | Framer Motion | 12.23.24 | Smooth page transitions & effects |
| **Charts** | Recharts | 3.8.1 | React charting library |
| **Icons** | Lucide React | 0.546.0 | Beautiful SVG icon library |
| **Form Handling** | React Hook Form | Built-in | Efficient form validation |
| **HTTP Client** | Fetch API | Native | Browser HTTP requests |
| **Notifications** | Custom Hooks | Built-in | Toast notifications (can add react-hot-toast) |
| **AI Integration** | Google Gemini | 1.29.0 | Conversational AI assistant |
| **State Management** | React Hooks | Built-in | Context + useState for app state |
| **Utilities** | clsx + tailwind-merge | 2.1.1 + 3.5.0 | Class name utility functions |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 (or yarn/pnpm)
- **Backend API** running at `http://localhost:8000`
- **Google Gemini API Key** (for AI chatbot feature, optional)

### Installation

```bash
# Navigate to frontend-admin directory
cd frontend-admin

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The admin dashboard will be available at **http://localhost:3000** (or auto-assigned port if 3000 is busy).

### NPM Scripts

```bash
# Development server with HMR
npm run dev

# Type-check code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Clean artifacts
npm run clean
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local` in the project root:

```bash
# Google Gemini API Key (for AI chatbot feature)
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Admin Portal Settings
VITE_ADMIN_PORT=3000
VITE_APP_NAME=Nelatalli Organics Admin
```

### Vite Configuration

`vite.config.ts` includes:
- React plugin for JSX support
- TailwindCSS Vite plugin for optimal CSS
- Path aliases (@/src for imports)
- Dev server configuration

### TypeScript Configuration

`tsconfig.json` settings:
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- Path aliases configured

---

## 📄 Admin Screens

### 1. **Login Screen** (`/`)
**Purpose:** Admin authentication

**Features:**
- Email & password login
- Remember me checkbox
- Forgot password link
- Botanical aesthetic design
- Nelatalli Organics branding

**Access:** `LoginScreen` component

---

### 2. **Dashboard** (`/dashboard`)
**Purpose:** Executive summary and KPIs

**Sections:**
- **Stat Cards** (6 KPIs)
  - Total Revenue with trend
  - Total Orders with trend
  - Total Products count
  - Total Users count
  - Low Stock alerts
  - Pending Orders count

- **Revenue Over Time** (Area Chart)
  - Monthly sales performance
  - Period selector (Last 30 Days, Last Quarter)
  - Responsive chart

- **Order Status Distribution** (Pie Chart)
  - Delivered, Processing, Cancelled breakdown
  - Color-coded segments
  - Legend

- **Recent Orders** (Table)
  - Latest 4 orders
  - Customer name, total, status, date
  - Customer avatar with initials

- **Low Stock Alerts** (List)
  - 3 products with lowest inventory
  - Product name, category, stock level
  - Priority-sorted

**Access:** `DashboardScreen` component

---

### 3. **Inventory** (`/inventory`)
**Purpose:** Product catalog management

**Features:**
- **Filters:**
  - Category dropdown (Essential Oils, Botanical Skincare, Organic Teas, Aromatherapy)
  - Stock status (In Stock, Low Stock, Out of Stock)

- **Product Table:**
  - Product image & name
  - SKU (Stock Keeping Unit)
  - Category
  - Price & discount
  - Stock quantity
  - Rating
  - Status badge
  - Action buttons (Edit, Delete, View)

- **Product Information:**
  - Column-based display
  - Pagination controls
  - Responsive table scrolling

- **CTA:**
  - Add Product button for new inventory items

**Access:** `InventoryScreen` component

---

### 4. **Orders** (`/orders`)
**Purpose:** Order fulfillment and tracking

**Filtering Options:**
- Order Status (All, Pending, Confirmed, Shipped, Delivered)
- Payment Status (All, Paid, Unpaid, Refunded)
- Date Range selector (Last 30 days)

**Order Table Display:**
- Order ID
- Customer name
- Customer email
- Order items list
- Total amount (₹)
- Order status badge
- Payment status badge
- Order date
- Action menu (More options)

**Status Workflow:**
- Pending → Confirmed → Shipped → Delivered
- Can be cancelled at any stage

**Access:** `OrdersScreen` component

---

### 5. **Customers** (`/customers`)
**Purpose:** Customer management and analytics

**Features:**
- **Search & Filter:**
  - Search by customer name/email
  - Location dropdown filter (All Locations, Mumbai, Delhi, Bangalore, etc.)

- **Customer Information Table:**
  - Customer avatar with initials
  - Full name
  - Email address
  - Phone number
  - Location (City, State)
  - Number of orders
  - Total spent (₹)
  - Account creation date
  - Action menu

- **Customer Metrics:**
  - Total orders count
  - Lifetime value
  - Registration date tracking

- **Row Interactions:**
  - Hover to reveal action menu
  - View more details per customer

**Access:** `CustomersScreen` component

---

### 6. **Analytics** (`/analytics`)
**Purpose:** Business intelligence and reporting

**Content Sections:**

- **Date Range Controls:**
  - Last 7 Days (default)
  - Custom date range selector
  - Export Report button

- **Overview Statistics:**
  - Revenue (₹4,25,000, +12.5% trend)
  - Orders (1,240, +8.2% trend)
  - Customers (842, -2.4% trend)
  - Average Order Value (₹342, +4.1% trend)

- **Sales Performance** (Area Chart)
  - Daily sales breakdown
  - 7-day historical data
  - Responsive area chart

- **Product Sales** (Bar Chart)
  - Top 4 products by units sold
  - Sales percentage per product
  - Horizontal bar display

- **Sales by Category** (Pie Chart)
  - Organic Teas (45%)
  - Skincare (25%)
  - Aromatherapy (20%)
  - Pantry (10%)

**Exported Data:**
- Chart data export functionality
- Report generation

**Access:** `AnalyticsScreen` component

---

### 7. **Settings** (`/settings`)
**Purpose:** Admin preferences and configuration

**Tabs:**

1. **Profile**
   - Avatar edit
   - Full name, email
   - Phone number
   - Bio/Description
   - Save profile button

2. **Notifications**
   - Email notifications toggle
   - Push notifications toggle
   - Order alerts
   - Inventory alerts
   - Daily digest option

3. **Security**
   - Current password verification
   - Change password form
   - Two-factor authentication setup
   - Login activity log
   - Session management

4. **General**
   - Language selection
   - Timezone setting
   - Currency selection
   - Auto-logout timeout
   - Save preferences

5. **Appearance**
   - Theme selector (Light, Dark, System)
   - Primary color customization
   - Compact mode toggle
   - Font size adjustment

6. **Data**
   - Export user data
   - Download backup
   - Clear cache
   - Privacy & compliance options

**Access:** `SettingsScreen` component

---

### 8. **Support** (`/support`)
**Purpose:** Help center and customer support

**Features:**

- **Search Bar:**
  - Search articles and FAQs
  - Autocomplete suggestions

- **Contact Cards:**
  - **Live Chat:** 5-minute response time
  - **Email Support:** support@nelatalli.com
  - **Phone Support:** +91-XXXX-XXXX-XXXX
  - **Response Times:** Clearly displayed

- **FAQ Section:**
  - Q: "How do I update inventory levels?"
  - Q: "Can I export order reports?"
  - Q: "How to handle customer refunds?"
  - Q: "Is there a mobile app?"
  - Expandable answers

- **Documentation Links:**
  - Getting Started guide
  - Video tutorials
  - API documentation
  - Best practices

- **Support Resources:**
  - Status page
  - Community forum
  - Feature requests
  - Bug reporting

**Access:** `SupportScreen` component

---

## 🧩 Components Architecture

### Layout Components

#### **App.tsx** — Main Router
- Screen state management
- Route rendering logic
- Navigation between screens
- Conditional rendering (login vs dashboard)

```tsx
const [currentScreen, setCurrentScreen] = useState<Screen>('login');
// Routes based on currentScreen state
```

#### **Sidebar.tsx** — Navigation Menu
- Primary navigation for all screens
- Active screen highlighting
- Logout functionality
- Responsive (hidden on mobile)
- Icons + labels for each section

#### **TopBar.tsx** — Header
- Current screen title
- Search bar (responsive)
- Notifications bell icon
- User profile menu
- Sticky positioning

#### **Chatbot.tsx** — AI Assistant Widget
- Floating widget (bottom-right)
- Google Gemini AI integration
- Message history
- Minimize/expand controls
- Message threading

---

### Screen Components

Each screen is a complete feature module:

```tsx
export function DashboardScreen() {
  return (
    <div className="p-8 space-y-10">
      {/* KPI Cards */}
      {/* Charts */}
      {/* Tables */}
    </div>
  );
}
```

---

### UI Element Components

#### **StatsCard** (Inline)
```tsx
<div className="p-6 rounded-xl border">
  <span className="text-xs font-bold">{label}</span>
  <h3 className="font-serif text-3xl font-bold">{value}</h3>
  {trend && <span className="text-xs text-green-600">{trend}</span>}
</div>
```

#### **StatusBadge** (Inline)
```tsx
<span className={cn(
  "px-3 py-1 rounded-full text-sm font-bold",
  statusColors[status]
)}>
  {status}
</span>
```

#### **DataTable** (Inline)
```tsx
<table className="w-full text-left">
  <thead>...</thead>
  <tbody>
    {data.map(row => (...))}
  </tbody>
</table>
```

---

## 🎨 Theme & Design System

### Material Design 3 Colors

**Primary (Deep Brown):**
```css
--color-primary: #271310
--color-on-primary: #ffffff
--color-primary-container: #2b1613
```

**Secondary (Warm Brown):**
```css
--color-secondary: #725a39
--color-on-secondary: #ffffff
```

**Tertiary (Deep Orange):**
```css
--color-tertiary-container: #341001
```

**Surfaces:**
```css
--color-surface: #fef9f2 (Off-White)
--color-surface-container-low: #f8f3ec
--color-surface-container: #f2ede6
--color-surface-container-lowest: #ffffff
```

### Typography

- **Headlines:** "Newsreader", serif (elegant, traditional)
- **Body/UI:** "Manrope", sans-serif (modern, friendly)
- **Sizes:** xs, sm, base, lg, xl, 2xl, 3xl, 4xl+

### Spacing System

- Base unit: 4px
- Gap: p-4 (16px), p-8 (32px)
- Responsive: sm, md, lg, xl, 2xl breakpoints

---

## 🔌 API Integration

### API Base URL

```typescript
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

### Authentication

Admin uses JWT bearer token:
```bash
Authorization: Bearer {token}
```

### Mock Data

For development, components use hardcoded sample data:
```tsx
const orders: Order[] = [
  { id: '#ORD-9021', customerName: 'Amara Singh', ... },
  // ...
];
```

### Future API Integration Points

```
GET  /api/admin/dashboard/stats    # KPI metrics
GET  /api/admin/products/          # Product list
POST /api/admin/products/          # Create product
PUT  /api/admin/products/{id}      # Update product
GET  /api/admin/orders/            # Order list
PUT  /api/admin/orders/{id}        # Update order status
GET  /api/admin/customers/         # Customer list
GET  /api/admin/analytics/         # Analytics data
```

---

## 🔧 Development Guide

### Adding a New Screen

1. **Create Component** (`src/components/NewScreen.tsx`):
```tsx
import React from 'react';
import { cn } from '@/src/lib/utils';

export function NewScreen() {
  return (
    <div className="p-8 space-y-8">
      {/* Content */}
    </div>
  );
}
```

2. **Add to Types** (`src/types.ts`):
```tsx
export type Screen = 'login' | 'dashboard' | 'new-screen' | ...;
```

3. **Update Router** (`src/App.tsx`):
```tsx
case 'new-screen':
  return <NewScreen />;
```

4. **Add Sidebar Link** (`src/components/Sidebar.tsx`):
```tsx
{ id: 'new-screen', label: 'New Screen', icon: IconName },
```

---

### Working with Charts (Recharts)

```tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 600 },
];

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="value" />
  </AreaChart>
</ResponsiveContainer>
```

---

### Styling with Tailwind

Use utility classes:
```tsx
<div className="p-8 bg-surface-container rounded-xl shadow-sm border border-outline-variant/15">
  <h2 className="font-serif text-2xl font-bold text-primary">Title</h2>
  <p className="text-sm text-on-surface-variant mt-2">Description</p>
</div>
```

Custom utility function:
```tsx
import { cn } from '@/src/lib/utils';

<button className={cn(
  "px-4 py-2 rounded-lg font-bold",
  isActive ? "bg-primary text-white" : "bg-surface"
)}>
  Click me
</button>
```

---

## 🏗️ Build & Deployment

### Development Build

```bash
npm run dev
```

Starts Vite dev server on port 3000 with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript checking

---

### Production Build

```bash
npm run build
```

Outputs optimized files to `dist/`:
- Minified JavaScript & CSS
- Tree-shaking of unused code
- Code splitting for routes
- Asset optimization

**Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   ├── index-xxxxx.css
│   └── logo-xxxxx.png
└── ...
```

---

### Preview Production Build

```bash
npm run preview
```

Local server to test production build.

---

### Deploy to Hosting

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

**AWS S3 + CloudFront:**
```bash
npm run build
aws s3 sync dist/ s3://bucket-name/
```

**Traditional Server (nginx):**
```bash
npm run build
# Copy dist/ to /var/www/admin/
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use

**Solution:**
```bash
npm run dev -- --port 3001
```

Or kill process on port 3000.

---

### Issue: API 404 errors

**Solution:** Ensure backend is running:
```bash
cd ../backend
uvicorn main:app --reload --port 8000
```

---

### Issue: Gemini AI chatbot not responding

**Solution:** Verify `VITE_GEMINI_API_KEY` is set in `.env.local`

---

### Issue: Styles not loading correctly

**Solution:**
```bash
npm run clean && npm run dev
```

Clear Vite cache and rebuild.

---

### Issue: TypeScript errors after changes

**Solution:**
```bash
npm run lint
```

Check type errors and fix accordingly.

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Security Best Practices

- ✅ Never commit `.env.local` with real API keys
- ✅ Use HTTPS in production
- ✅ Validate all user input
- ✅ Implement proper authentication checks
- ✅ Use secure HTTP-only cookies for auth tokens
- ✅ Keep dependencies updated (`npm audit fix`)
- ✅ Sanitize data before rendering
- ✅ Implement rate limiting on API calls

---

## 📚 Useful Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [Google Gemini API](https://ai.google.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🚀 Performance Optimization

### Already Implemented

- Code splitting via Vite
- Lazy loading of components
- Optimized images
- CSS purging

### Recommended Enhancements

- Implement user authentication persistence
- Add caching layer for API responses
- Optimize chart rendering with memoization
- Implement virtual scrolling for large tables
- Preload critical resources

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](../LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Contact

For issues, questions, or feedback:

- 📧 Email: support@nelatalli.com
- 💬 Live Chat: Available in Support screen
- 📱 Phone: +91-XXXX-XXXX-XXXX
- 🐛 GitHub Issues: Report bugs here
- 💡 Feature Requests: Discuss new features

---

## 👨‍💼 Admin Portal Status

- **Version:** 1.0.0
- **Last Updated:** April 2026
- **Status:** ✅ Production Ready
- **Maintainer:** Naren Kandhada
- **Repository:** Nelatalli Organics

---

**Happy administrating! 🌿**
