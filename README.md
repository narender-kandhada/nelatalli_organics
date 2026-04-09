# Nelatalli Organics

**Hand-curated botanical remedies and artisanal kitchen staples — from the soil to your home.**

Nelatalli Organics is a full-stack e-commerce platform for organic products including grains, millets, fresh produce, dairy essentials, and pantry items. Built with a React frontend and FastAPI backend.

---

## 🏗️ Project Structure

```
nelatalli-organics/
├── frontend/          # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── constants.ts  # Product & category data
│   │   └── App.tsx       # Router setup
│   └── package.json
│
├── backend/           # Python FastAPI
│   ├── routers/          # API route handlers
│   ├── models.py         # SQLAlchemy ORM models
│   ├── schemas.py        # Pydantic schemas
│   ├── auth.py           # JWT authentication
│   ├── seed.py           # Database seeder
│   ├── main.py           # App entry point
│   └── requirements.txt
│
└── README.md
```

## ✨ Features

- **Product Catalog** — 20+ organic products across 4 categories with filtering, sorting & search
- **Product Detail** — Individual product pages with descriptions, ratings & social sharing
- **Shopping Cart** — Add/remove items, update quantities
- **Wishlist** — Save favorite products for later
- **User Authentication** — JWT-based register & login with email case-insensitivity
- **User Profile** — View/edit profile, order history, store credits
- **Address Management** — Add, edit, and select from multiple shipping addresses
- **Integrated Checkout** — Seamless multi-step checkout with integrated address creation and selection
- **Order Management** — Place orders from cart, track order status
- **Blog** — Wellness articles & recipes
- **Contact Form** — Submit inquiries directly
- **Responsive Design** — Mobile-first, animated UI with Framer Motion

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **pip**

### 1. Clone the Repository

```bash
git clone https://github.com/Ranjith2002k/nelatalli-organics.git
cd nelatalli-organics
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env       # Configure your secret key
python seed.py             # Seed the database
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Demo Account

| Email | Password |
|-------|----------|
| `narenderkandhada.online@gmail.com` | `password123` |

## 🔌 API Endpoints

| Area | Endpoints | Auth |
|------|-----------|------|
| Products | `GET /api/products`, `/api/products/{slug}`, `/api/products/featured`, `/top-selling`, `/recently-added`, `/top-rated` | Public |
| Categories | `GET /api/categories` | Public |
| Search | `GET /api/search?q=` | Public |
| Blog | `GET /api/blog/posts`, `/api/blog/posts/{id}`, `/api/blog/posts/featured` | Public |
| Contact | `POST /api/contact` | Public |
| Auth | `POST /api/auth/register`, `/api/auth/login` | Public |
| Profile | `GET/PUT /api/users/me` | JWT |
| Orders | `GET /api/orders`, `GET /api/orders/{id}`, `POST /api/orders` | JWT |
| Wishlist | `GET/POST /api/wishlist`, `DELETE /api/wishlist/{id}` | JWT |
| Cart | `GET/POST /api/cart`, `PUT/DELETE /api/cart/{id}` | JWT |

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
