# 🌿 Nelatalli Organics

**Hand-curated botanical remedies and artisanal kitchen staples — from the soil to your home.**

Nelatalli Organics is a comprehensive full-stack e-commerce platform for organic products including grains, millets, fresh produce, dairy essentials, and pantry items. Built with **React 19** frontend (with TypeScript & Vite), **FastAPI** backend, and an **Admin Dashboard** for inventory management.

---

## 🏗️ Project Architecture

```
nelatalli-organics/
│
├── 📱 frontend/                 # Customer-facing React app (Vite 6 + React 19 + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI components (Header, Footer, etc.)
│   │   ├── pages/               # Route pages (Home, Products, Cart, Profile, etc.)
│   │   ├── api.ts               # API client for backend communication
│   │   ├── constants.ts         # Product & category data
│   │   ├── index.css            # Theme colors (Material Design System)
│   │   └── App.tsx              # React Router setup
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md               # Detailed frontend documentation
│
├── 🔐 backend/                  # FastAPI REST API (Python 3.10+)
│   ├── routers/                 # API route handlers (products, users, orders, etc.)
│   ├── models.py                # SQLAlchemy ORM models
│   ├── schemas.py               # Pydantic request/response schemas
│   ├── auth.py                  # JWT authentication & bcrypt password hashing
│   ├── database.py              # SQLAlchemy configuration
│   ├── main.py                  # FastAPI app setup & CORS middleware
│   ├── seed.py                  # Database seeder with demo data
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example
│   └── README.md               # Backend API documentation
│
├── 👨‍💼 frontend-admin/           # Admin dashboard (React 19 + Vite + Recharts)
│   ├── src/
│   │   ├── components/          # Admin UI components (DataTable, Modal, etc.)
│   │   ├── pages/               # Admin pages (Dashboard, Products, Users, Orders)
│   │   ├── api.ts               # Admin API client
│   │   └── App.tsx              # Admin router
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md               # Admin panel documentation
│
├── LICENSE
└── README.md                   # This file
```

## ✨ Core Features

### 🛍️ Customer Portal (Frontend)
- **Product Catalog** — 20+ organic products across 4 categories with advanced filtering, sorting & search
- **Product Details** — Rich product pages with descriptions, ratings, reviews, images & specifications
- **Shopping Cart** — Full cart management with quantity controls, price calculations & persistent storage
- **Wishlist** — Save favorite products for later viewing and quick access
- **User Authentication** — Secure JWT-based register & login with email validation
- **User Profile** — Dashboard with order history, profile settings, wishlist, and account management
- **Address Management** — Multiple shipping addresses with create/edit/delete capabilities
- **Checkout Flow** — Multi-step checkout with address selection, order summary & payment preparation
- **Order Tracking** — View complete order history with status updates (Pending → Confirmed → Shipped → Delivered)
- **Blog & Resources** — Wellness articles, recipes, health tips & organic living guides
- **Contact Management** — Direct contact form for inquiries with email support integration
- **Responsive Design** — Mobile-first UI with smooth animations and optimized performance
- **Advanced Search** — Full-text search across products with autocomplete suggestions
- **Product Filtering** — Filter by category, price range, ratings, and stock availability
- **Featured Collections** — Top-selling, top-rated, recently-added, and featured product sections

### 👨‍💼 Admin Dashboard (Frontend-Admin)
- **Dashboard Overview** — Real-time KPI cards (total revenue, orders, products, users, low stock, pending orders)
- **Revenue Analytics** — Month-over-month sales trends with interactive area charts
- **Order Status Distribution** — Visual pie charts showing order status breakdown
- **Recent Orders** — Quick overview of latest transactions with customer details
- **Low Stock Alerts** — Real-time inventory notifications for products with low stock levels
- **Top Products** — Best-selling products ranked by performance metrics
- **Product Management** — Create, read, update, delete products with full details (SKU, pricing, categories, stock)
- **Inventory Tracking** — Real-time stock level management and low-stock warnings
- **Order Management** — View all orders with filtering by status, payment status, and date range
- **Order Status Updates** — Update order progress through workflow (Pending → Confirmed → Shipped → Delivered)
- **Customer Management** — View customer profiles, contact information, order history, and lifetime metrics
- **Customer Search** — Find customers by name, email, phone, or order history
- **Analytics & Reporting** — Sales performance, order volume trends, customer metrics, category performance
- **Date Range Analytics** — Analyze specific time periods with customizable date selectors
- **Admin Profile** — Update admin credentials, security settings, and preferences
- **Settings & Configuration** — Manage notifications, theme preferences, appearance customization
- **Support Dashboard** — View and manage customer support tickets
- **Role-Based Access** — Admin-only protected endpoints with JWT authentication

### 🔌 Backend API (FastAPI 0.115+)
- **RESTful Architecture** — Organized API endpoints by domain (products, users, orders, etc.)
- **Automatic Documentation** — Interactive Swagger UI and ReDoc for API exploration
- **User Authentication** — JWT token-based authentication with secure token generation
- **Password Security** — bcrypt password hashing with salt for secure storage
- **Database ORM** — SQLAlchemy 2.0+ for robust data management
- **Data Validation** — Pydantic 2.0+ for request/response validation
- **CORS Support** — Cross-Origin Resource Sharing for frontend communication
- **Static File Serving** — Product images and media served via `/static/` endpoint
- **Error Handling** — Comprehensive error responses with meaningful status codes
- **Admin Authentication** — Separate admin login with elevated permissions




## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** or **yarn** ≥ 9.0.0
- **Python** ≥ 3.10
- **pip** (Python package manager)
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ranjith2002k/nelatalli-organics.git
cd nelatalli-organics
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and set your SECRET_KEY

# Seed the database with sample data
python seed.py

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```

The API will be available at:
- **REST API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 3️⃣ Frontend Setup (Customer Portal)

```bash
# From project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

### 4️⃣ Frontend-Admin Setup (Optional)

```bash
# From project root
cd frontend-admin

# Install dependencies
npm install

# Start admin dashboard
npm run dev
```

The admin dashboard will be available at **http://localhost:3001** or next available port

**Admin Login Credentials:**
- Email: `admin@organics.com`
- Password: `admin123`

---

## 📚 Documentation

Each subdirectory has its own comprehensive README:

- **[Frontend README](frontend/README.md)** — Detailed guide to customer portal, components, theme, and styling
- **[Backend README](backend/README.md)** — API endpoints, database models, and setup instructions
- **[Frontend-Admin README](frontend-admin/README.md)** — Admin dashboard features and usage

---

## 👥 Demo Credentials

| Email | Password |
|-------|----------|
| `narenderkandhada.online@gmail.com` | `password123` |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library & component framework |
| **TypeScript** | Static type checking |
| **Vite 6** | Fast build tool & dev server |
| **TailwindCSS 4** | Utility-first CSS framework |
| **React Router 7** | Client-side routing |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Icon library |
| **Material Design 3** | Color system & theming |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** | Modern Python web framework |
| **Uvicorn** | ASGI server |
| **SQLAlchemy 2** | ORM & database abstraction |
| **Pydantic** | Data validation & serialization |
| **Python-jose** | JWT token generation/verification |
| **bcrypt** | Password hashing |
| **SQLite** | Local database (development) |

### Admin Dashboard
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library & component framework |
| **Vite 6** | Fast build tool & dev server |
| **TypeScript** | Static type checking |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Recharts** | Data visualization & analytics charts |
| **Lucide React** | Icon library |
| **Framer Motion** | Smooth animations & transitions |

---

## 📋 Available Scripts

### Frontend (Customer Portal)

```bash
npm run dev      # Start Vite dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Type-check with TypeScript
npm run clean    # Remove build artifacts
```

### Backend

```bash
uvicorn main:app --reload              # Development server
uvicorn main:app --reload --port 8000  # Development on specific port
python seed.py                         # Seed database
python create_admin.py                 # Create admin user (if needed)
```

### Frontend-Admin

```bash
npm run dev      # Start admin dev server
npm run build    # Build admin dashboard
npm run preview  # Preview production build
```

---

## 🗄️ Database Models

All models use SQLAlchemy ORM with SQLite storage:

```
📦 Database Schema
├── User (Authentication & Profiles)
├── Category (Product Categories)
├── Product (Product Catalog)
├── Order & OrderItem (Order Management)
├── CartItem (Shopping Cart)
├── WishlistItem (Saved Products)
├── BlogPost (Blog Articles)
└── ContactMessage (Contact Submissions)
```

See [Backend README](backend/README.md) for detailed schema documentation.

---

## 🔌 API Architecture

The backend exposes RESTful endpoints organized by domain:

```
/api/products/      # Product catalog & categories
/api/users/         # User profile & authentication
/api/orders/        # Order management
/api/cart/          # Shopping cart operations
/api/wishlist/      # Wishlist items
/api/blog/          # Blog posts
/api/contact/       # Contact form
/api/search/        # Product search
/api/auth/          # Login & registration
```

Full API documentation available at http://localhost:8000/docs

---

## 🎨 Frontend Architecture

### Component Structure
```
src/
├── components/              # Reusable UI components
│   ├── Header.tsx          # Navigation & user menu
│   ├── Footer.tsx          # Footer with links
│   ├── ProductLists.tsx    # Product grid display
│   ├── Categories.tsx      # Category showcase
│   ├── FeaturedProducts.tsx # Featured items section
│   ├── Hero.tsx            # Landing hero section
│   ├── Testimonials.tsx    # Customer testimonials
│   ├── PromoBanners.tsx    # Promotional banners
│   ├── FeatureBadges.tsx   # Feature badges
│   └── ScrollToTop.tsx     # Scroll utility
│
├── pages/                   # Route-based pages
│   ├── Home.tsx            # Landing page
│   ├── Products.tsx        # Product listing
│   ├── ProductDetail.tsx   # Single product page
│   ├── Cart.tsx            # Shopping cart
│   ├── Checkout.tsx        # Checkout flow
│   ├── Wishlist.tsx        # Saved products
│   ├── Profile.tsx         # User dashboard
│   ├── Blog.tsx            # Blog articles
│   ├── Contact.tsx         # Contact form
│   ├── Login.tsx           # Login page
│   ├── Signup.tsx          # Registration page
│   └── About.tsx           # About page
│
├── api.ts                   # API client (fetch wrapper)
├── constants.ts            # Product & category data
├── App.tsx                 # Main router
└── index.css               # Global styles & theme
```

### Styling System

The frontend uses **Material Design 3** color tokens defined in `index.css`:

#### Primary Colors
- **Primary**: `#271310` (Deep Brown)
- **On Primary**: `#ffffff` (White)
- **Primary Container**: `#3e2723` (Darker Brown)

#### Secondary Colors
- **Secondary**: `#725a39` (Warm Brown)
- **On Secondary**: `#ffffff` (White)
- **Secondary Container**: Warm accent tones

#### Surface & Backgrounds
- **Surface**: `#fef9f2` (Off-White)
- **Surface Dim**: `#ded9d3` (Light Gray)
- **Inverse Surface**: `#32302c` (Dark Gray)

#### Accent Colors
- **Tertiary**: `#300d00` (Deep Orange-Red)
- **Error**: `#ba1a1a` (Red) — for warnings/errors
- **Success**: Green tones (implicitly used)

#### Typography Fonts
- **Headlines**: `"Newsreader", serif` — Elegant, readable serif
- **Body Text**: `"Manrope", sans-serif` — Modern, clean sans-serif
- **Labels**: `"Manrope", sans-serif` — Button labels, badges

---

## 🔐 Security Considerations

- **JWT Authentication**: Secure token-based auth for API
- **Password Hashing**: bcrypt with salt for user passwords
- **CORS Configuration**: Restricted to frontend origins
- **Environment Variables**: Sensitive data in `.env` files (not committed)
- **SQL Injection Protection**: SQLAlchemy parameterized queries
- **XSS Protection**: React's built-in XSS prevention

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🐛 Troubleshooting

### Backend Issues
- **`ModuleNotFoundError`**: Ensure virtual environment is activated and dependencies installed
- **`Port 8000 already in use`**: Change port with `--port 9000`
- **Database errors**: Run `python seed.py` to reset database

### Frontend Issues
- **`Cannot find module`**: Run `npm install` to install dependencies
- **`Port 3000 already in use`**: Vite will use next available port automatically
- **API 404 errors**: Ensure backend is running at `http://localhost:8000`

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Project Maintainer

**Naren Kandhada**
- GitHub: [@Ranjith2002k](https://github.com/Ranjith2002k)
- Email: narenderkandhada.online@gmail.com

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Contact via email: narenderkandhada.online@gmail.com

---

**Last Updated**: April 2026

| Area | Endpoints | Auth |
|------|-----------|------|
| Products | `GET /api/products`, `/api/products/{slug}`, `/api/products/featured`, `/top-selling`, `/recently-added`, `/top-rated` | Public |
| Categories | `GET /api/categories` | Public |
| Search | `GET /api/search?q=` | Public |
| Blog | `GET /api/blog/posts`, `/api/blog/posts/{id}`, `/api/blog/posts/featured` | Public |
| Contact | `POST /api/contact` | Public |
| Auth | `POST /api/auth/register`, `/api/auth/login` | Public |
| Profile | `GET/PUT /api/users/me`, Addresses, Payment Methods | JWT |
| Orders | `GET /api/orders`, `GET /api/orders/{id}`, `POST /api/orders` | JWT |
| Wishlist | `GET/POST /api/wishlist`, `DELETE /api/wishlist/{id}` | JWT |
| Cart | `GET /api/cart`, `POST /api/cart`, `PUT/DELETE /api/cart/{id}` | JWT |
| Admin Auth | `POST /api/admin/auth/login` | Admin Only |
| Admin Dashboard | `GET /api/admin/dashboard/stats`, `/revenue`, `/order-status`, `/recent-orders`, `/low-stock`, `/top-products` | Admin Only |
| Admin Products | `GET/POST /api/admin/products`, `PUT/DELETE /api/admin/products/{id}` | Admin Only |
| Admin Orders | `GET/PUT /api/admin/orders`, `GET /api/admin/orders/{id}` | Admin Only |
| Admin Users | `GET /api/admin/users`, `GET /api/admin/users/{id}` | Admin Only |
| Admin Analytics | `GET /api/admin/analytics`, `/refunds`, `/category-sales` | Admin Only |
| Admin Settings | `GET/PUT /api/admin/profile`, `/password`, `/preferences` | Admin Only |
| Admin Support | `GET/POST /api/admin/support`, `PUT /api/admin/support/{id}` | Admin Only |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, TailwindCSS 4, Framer Motion, React Router 7 |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic, SQLite |
| Auth | JWT (python-jose), bcrypt |
| Icons | Lucide React, Material Symbols |
| Fonts | Newsreader (serif), Manrope (sans-serif) |

## 📄 License

This project is licensed under the Apache-2.0 License.
