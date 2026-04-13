# 🔐 Nelatalli Organics — Backend API

**FastAPI + SQLAlchemy + SQLite**

High-performance REST API backend for Nelatalli Organics e-commerce platform. Built with FastAPI for speed, Pydantic for validation, and SQLAlchemy for database management.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Development](#development)

---

## 🚀 Quick Start

### Prerequisites
- Python ≥ 3.10
- pip (Python package manager)
- Virtual environment (venv, virtualenv, or conda)

### Installation & Setup

```bash
# Navigate to backend directory
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

# Create .env file from template
cp .env.example .env

# Seed database with sample data
python seed.py

# Start FastAPI development server
uvicorn main:app --reload --port 8000
```

**API will be available at:**
- **REST Endpoints**: http://localhost:8000
- **Swagger UI (Interactive Docs)**: http://localhost:8000/docs
- **ReDoc (API Reference)**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

---

## 📁 Project Structure

```
backend/
│
├── routers/                     # API route handlers
│   ├── __init__.py
│   ├── products.py              # GET products, categories, filters
│   ├── auth_router.py           # POST /register, /login
│   ├── users.py                 # GET/PUT /profile, addresses
│   ├── orders.py                # GET/POST /orders
│   ├── cart.py                  # GET/POST/DELETE cart items
│   ├── wishlist.py              # GET/POST/DELETE wishlist items
│   ├── blog.py                  # GET blog posts
│   ├── contact.py               # POST contact form submissions
│   ├── search.py                # GET search results
│   └── admin.py                 # Admin-specific endpoints
│
├── models.py                    # SQLAlchemy ORM models
├── schemas.py                   # Pydantic request/response schemas
├── database.py                  # SQLAlchemy configuration & session
├── auth.py                      # JWT token generation & password hashing
├── main.py                      # FastAPI app setup, middleware, CORS
│
├── seed.py                      # Database seeder (sample data)
├── create_admin.py              # Admin user creation utility
├── migrate_admin.py             # Database migration helper
│
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variable template
├── .gitignore
└── README.md                    # This file
```

---

## 🛠️ Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Web Framework** | FastAPI | 0.115.0+ | Modern async Python web framework |
| **ASGI Server** | Uvicorn | 0.30.0+ | ASGI server for running FastAPI |
| **ORM** | SQLAlchemy | 2.0.35+ | Database abstraction & query builder |
| **Database** | SQLite | 3.x | Local relational database |
| **Validation** | Pydantic | 2.9.0+ | Data validation & serialization |
| **Authentication** | python-jose | 3.3.0+ | JWT token generation & verification |
| **Password Hashing** | bcrypt | 4.0.0+ | Secure password hashing |
| **Environment** | python-dotenv | 1.0.1+ | Environment variable management |
| **File Uploads** | python-multipart | 0.0.9+ | Multipart form data handling |

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000
```

### Response Format

All responses are JSON:

**Success Response (2xx)**
```json
{
  "status": "success",
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

**Error Response (4xx/5xx)**
```json
{
  "error": "Error message",
  "status": "error",
  "code": "ERROR_CODE"
}
```

### Authentication

Endpoints requiring authentication use JWT Bearer tokens:

```bash
Authorization: Bearer {token}
```

Obtain token via `/api/auth/login`.

---

## 📊 API Endpoints

### 🛒 Products (`/api/products/`)

#### Get All Products
```
GET /api/products/
Query Parameters:
  - category: string (optional)
  - sort_by: "price" | "rating" | "newest" (optional)
  - limit: integer (default: 20)
  - offset: integer (default: 0)

Response: {
  "items": [Product],
  "total": 20,
  "limit": 20,
  "offset": 0
}
```

#### Get Single Product
```
GET /api/products/{product_id}

Response: Product {
  id, title, price, category, description, rating, reviews, image, ...
}
```

#### Get Categories
```
GET /api/products/categories/

Response: [Category {
  id, name, count, image
}]
```

#### Search Products
```
GET /api/products/search/?q={query}

Response: [Product]
```

### 👤 Authentication (`/api/auth/`)

#### Register User
```
POST /api/auth/register

Body: {
  email: string,
  password: string,
  full_name: string
}

Response: {
  id: string,
  email: string,
  token: string
}
```

#### Login
```
POST /api/auth/login

Body: {
  email: string,
  password: string
}

Response: {
  access_token: string,
  token_type: "bearer",
  user: User
}
```

### 👨‍💼 Users (`/api/users/`)

#### Get Profile (requires auth)
```
GET /api/users/profile/
Headers: Authorization: Bearer {token}

Response: User {
  id, email, full_name, phone, profile_pic, created_at
}
```

#### Update Profile (requires auth)
```
PUT /api/users/profile/
Headers: Authorization: Bearer {token}

Body: {
  full_name?: string,
  phone?: string,
  profile_pic?: binary
}

Response: User
```

#### Get User Addresses (requires auth)
```
GET /api/users/addresses/
Headers: Authorization: Bearer {token}

Response: [Address {
  id, street, city, state, postal_code, is_default
}]
```

#### Add Address (requires auth)
```
POST /api/users/addresses/
Headers: Authorization: Bearer {token}

Body: {
  street: string,
  city: string,
  state: string,
  postal_code: string,
  is_default?: boolean
}

Response: Address
```

### 🛒 Cart (`/api/cart/`)

#### Get Cart Items (requires auth)
```
GET /api/cart/
Headers: Authorization: Bearer {token}

Response: [CartItem {
  id, product_id, quantity, product: Product
}]
```

#### Add to Cart (requires auth)
```
POST /api/cart/
Headers: Authorization: Bearer {token}

Body: {
  product_id: string,
  quantity: integer
}

Response: CartItem
```

#### Update Cart Item (requires auth)
```
PUT /api/cart/{item_id}
Headers: Authorization: Bearer {token}

Body: {
  quantity: integer
}

Response: CartItem
```

#### Remove from Cart (requires auth)
```
DELETE /api/cart/{item_id}
Headers: Authorization: Bearer {token}

Response: { "message": "Item removed" }
```

### 💖 Wishlist (`/api/wishlist/`)

#### Get Wishlist
```
GET /api/wishlist/
Headers: Authorization: Bearer {token}

Response: [WishlistItem {
  id, product_id, product: Product, added_at
}]
```

#### Add to Wishlist
```
POST /api/wishlist/
Headers: Authorization: Bearer {token}

Body: {
  product_id: string
}

Response: WishlistItem
```

#### Remove from Wishlist
```
DELETE /api/wishlist/{item_id}
Headers: Authorization: Bearer {token}

Response: { "message": "Item removed" }
```

### 📦 Orders (`/api/orders/`)

#### Get User Orders
```
GET /api/orders/
Headers: Authorization: Bearer {token}
Query Parameters:
  - status: "pending" | "confirmed" | "shipped" | "delivered"
  - limit: integer (default: 10)

Response: [Order {
  id, order_number, total, status, items: [OrderItem], created_at
}]
```

#### Create Order
```
POST /api/orders/
Headers: Authorization: Bearer {token}

Body: {
  address_id: string,
  payment_method: "razorpay" | "cod"
}

Response: Order {
  id, order_number, total, status, payment_link
}
```

#### Get Order Details
```
GET /api/orders/{order_id}
Headers: Authorization: Bearer {token}

Response: Order
```

### 📝 Blog (`/api/blog/`)

#### Get All Blog Posts
```
GET /api/blog/
Query Parameters:
  - limit: integer (default: 10)
  - offset: integer (default: 0)
  - category: string (optional)

Response: [BlogPost {
  id, title, content, author, published_date, image
}]
```

#### Get Single Post
```
GET /api/blog/{post_id}

Response: BlogPost
```

### 💬 Contact (`/api/contact/`)

#### Submit Contact Form
```
POST /api/contact/

Body: {
  name: string,
  email: string,
  subject: string,
  message: string
}

Response: {
  id: string,
  message: "Thank you for reaching out!"
}
```

---

## � Complete API Endpoints Reference

### 🛒 Products & Categories

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | List all products with filters | Public |
| GET | `/api/products/{slug}` | Get single product by slug | Public |
| GET | `/api/products/featured` | Get featured products | Public |
| GET | `/api/products/top-selling` | Get top-selling products | Public |
| GET | `/api/products/recently-added` | Get recently added products | Public |
| GET | `/api/products/top-rated` | Get top-rated products | Public |
| GET | `/api/categories` | List all product categories | Public |

**Query Parameters for `/api/products`:**
- `category`: Filter by category name
- `min_price`: Minimum price filter
- `max_price`: Maximum price filter
- `sort_by`: Sort option (`price_asc`, `price_desc`, `rating`, `newest`)

### 🔐 Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | User login | Public |

### 👤 User Profile & Addresses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/me` | Get current user profile | JWT |
| PUT | `/api/users/me` | Update user profile | JWT |
| GET | `/api/users/addresses` | Get all user addresses | JWT |
| POST | `/api/users/addresses` | Create new address | JWT |
| PUT | `/api/users/addresses/{id}` | Update address | JWT |
| DELETE | `/api/users/addresses/{id}` | Delete address | JWT |
| GET | `/api/users/payment-methods` | Get payment methods | JWT |
| POST | `/api/users/payment-methods` | Add payment method | JWT |

### 🛒 Shopping Cart

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/cart` | Get all cart items | JWT |
| POST | `/api/cart` | Add product to cart | JWT |
| PUT | `/api/cart/{id}` | Update cart item quantity | JWT |
| DELETE | `/api/cart/{id}` | Remove item from cart | JWT |

### 💖 Wishlist

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/wishlist` | Get wishlist items | JWT |
| POST | `/api/wishlist` | Add product to wishlist | JWT |
| DELETE | `/api/wishlist/{id}` | Remove from wishlist | JWT |

### 📦 Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Get user's orders | JWT |
| GET | `/api/orders/{id}` | Get order details | JWT |
| POST | `/api/orders` | Place new order | JWT |

### 📝 Blog Posts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/blog/posts` | Get all blog posts | Public |
| GET | `/api/blog/posts/{id}` | Get single blog post | Public |
| GET | `/api/blog/posts/featured` | Get featured blog post | Public |

### 💬 Contact & Support

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/search` | Search products | Public |

### 👨‍💼 Admin Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/auth/login` | Admin login | Public |
| GET | `/api/admin/dashboard/stats` | Get dashboard statistics | Admin |
| GET | `/api/admin/dashboard/revenue` | Get monthly revenue data | Admin |
| GET | `/api/admin/dashboard/order-status` | Get order status breakdown | Admin |
| GET | `/api/admin/dashboard/recent-orders` | Get recent orders | Admin |
| GET | `/api/admin/dashboard/low-stock` | Get low stock alerts | Admin |
| GET | `/api/admin/dashboard/top-products` | Get top products | Admin |

### 📦 Admin Product Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/products` | List products (paginated) | Admin |
| POST | `/api/admin/products` | Create new product | Admin |
| PUT | `/api/admin/products/{id}` | Update product | Admin |
| DELETE | `/api/admin/products/{id}` | Delete product | Admin |
| GET | `/api/admin/categories` | List categories | Admin |

### 📋 Admin Order Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/orders` | List all orders (paginated, filterable) | Admin |
| PUT | `/api/admin/orders/{id}` | Update order status | Admin |

### 👥 Admin Customer Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | List all customers | Admin |
| GET | `/api/admin/users/{id}` | Get customer details | Admin |

### 📊 Admin Analytics

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/analytics` | Get analytics overview | Admin |

### ⚙️ Admin Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/profile` | Get admin profile | Admin |
| PUT | `/api/admin/profile` | Update admin profile | Admin |
| POST | `/api/admin/password` | Change password | Admin |



### Models

#### User
```
- id: UUID (primary key)
- email: string (unique)
- password_hash: string
- full_name: string
- phone: string (optional)
- profile_pic: binary (optional)
- store_credits: float (default: 0)
- created_at: datetime
- updated_at: datetime
- is_admin: boolean (default: False)
```

#### Category
```
- id: UUID (primary key)
- name: string (unique)
- description: string
- image_url: string (optional)
- created_at: datetime
```

#### Product
```
- id: UUID (primary key)
- title: string
- description: text
- price: float
- discount_percent: float (optional)
- category_id: UUID (foreign key → Category)
- image_url: string
- stock_quantity: integer
- rating: float (default: 0)
- reviews_count: integer (default: 0)
- is_featured: boolean (default: False)
- is_on_sale: boolean (default: False)
- created_at: datetime
- updated_at: datetime
```

#### CartItem
```
- id: UUID (primary key)
- user_id: UUID (foreign key → User)
- product_id: UUID (foreign key → Product)
- quantity: integer
- added_at: datetime
```

#### WishlistItem
```
- id: UUID (primary key)
- user_id: UUID (foreign key → User)
- product_id: UUID (foreign key → Product)
- added_at: datetime
```

#### Order
```
- id: UUID (primary key)
- order_number: string (unique)
- user_id: UUID (foreign key → User)
- total_amount: float
- status: enum (pending, confirmed, shipped, delivered, cancelled)
- payment_status: enum (pending, completed, failed)
- shipping_address: text (JSON)
- created_at: datetime
- updated_at: datetime
```

#### OrderItem
```
- id: UUID (primary key)
- order_id: UUID (foreign key → Order)
- product_id: UUID (foreign key → Product)
- quantity: integer
- price_at_purchase: float
```

#### BlogPost
```
- id: UUID (primary key)
- title: string
- content: text
- author: string
- image_url: string (optional)
- category: string (optional)
- published_date: datetime
- created_at: datetime
- updated_at: datetime
```

#### ContactMessage
```
- id: UUID (primary key)
- name: string
- email: string
- subject: string
- message: text
- created_at: datetime
- is_read: boolean (default: False)
```

#### Address
```
- id: UUID (primary key)
- user_id: UUID (foreign key → User)
- street: string
- city: string
- state: string
- postal_code: string
- is_default: boolean (default: False)
- created_at: datetime
```

---

## 🔐 Authentication & Security

### JWT Authentication

**Token Generation**
```python
from datetime import timedelta
from auth import create_access_token

token = create_access_token(
    data={"sub": user.email},
    expires_delta=timedelta(hours=24)
)
```

**Token Usage**
```bash
# In request headers
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Password Security

- Passwords hashed with **bcrypt** (salted & hashed)
- Never stored in plain text
- Minimum validation in schemas

```python
from auth import hash_password, verify_password

hashed = hash_password("user_password")
is_valid = verify_password("user_password", hashed)
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)

```bash
# Secret key for JWT signing (change in production!)
SECRET_KEY=your-super-secret-key-change-in-production

# Database URL
DATABASE_URL=sqlite:///./nelatalli.db

# Optional: Admin email for admin creation
ADMIN_EMAIL=admin@nelatalli.com

# Optional: CORS origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Optional: Frontend URL
FRONTEND_URL=http://localhost:3000
```

### CORS Configuration

Configured in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🔧 Development

### Database Seeding

Populate database with sample data:
```bash
python seed.py
```

Creates:
- 4 product categories
- 20 sample products
- 4 blog posts
- 1 demo user (narenderkandhada.online@gmail.com / password123)
- 2 sample orders

### Creating Admin User

```bash
python create_admin.py
```

Follow prompts to create an admin user.

### Database Migrations

Reset database:
```bash
# Delete existing database
rm nelatalli.db

# Recreate tables
python seed.py
```

Or use migrations utility:
```bash
python migrate_admin.py
```

### Running in Production

Use Gunicorn ASGI server:
```bash
pip install gunicorn

gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

---

## 📝 Common Tasks

### Add New Endpoint

1. **Create router** in `routers/new_feature.py`
2. **Define Pydantic schemas** in `schemas.py`
3. **Add SQLAlchemy model** in `models.py`
4. **Import router** in `main.py`

```python
# routers/new_feature.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/new-feature", tags=["new-feature"])

@router.get("/")
async def get_items(db: Session = Depends(get_db)):
    return db.query(Model).all()

@router.post("/")
async def create_item(item: ItemSchema, db: Session = Depends(get_db)):
    # Logic here
    return item
```

3. Register in `main.py`:
```python
from routers import new_feature
app.include_router(new_feature.router)
```

### Test Endpoint

Using Swagger UI: http://localhost:8000/docs
Using cURL:
```bash
curl -X GET "http://localhost:8000/api/products/" -H "accept: application/json"
```

---

## 🐛 Debugging

### Enable SQL Logging

```python
# database.py
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

### Check Database

```bash
# Using sqlite3
sqlite3 nelatalli.db
.schema
.quit
```

### API Response Time Profiling

Use Uvicorn with profiling:
```bash
uvicorn main:app --reload --port 8000 --log-level debug
```

---

## 🚀 Performance Optimization

1. **Database Indexing**
   ```python
   Column(String, index=True)  # Add index to frequently queried columns
   ```

2. **Query Optimization**
   ```python
   # Use eager loading for relationships
   query.options(joinedload(Product.category))
   ```

3. **Caching** (Future enhancement)
   - Add Redis for session/query caching
   - Cache product list & categories

---

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org)
- [Pydantic Documentation](https://docs.pydantic.dev)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

## 📞 Support

For backend issues:
1. Check this README
2. Review API docs at http://localhost:8000/docs
3. Open GitHub issue
4. Contact: narenderkandhada.online@gmail.com

---

**Last Updated**: April 2026
**Backend Version**: 1.0.0
