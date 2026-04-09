# Nelatalli Organics — Backend API

FastAPI backend serving the Nelatalli Organics e-commerce platform.

## Quick Start

```bash
# Create & activate virtual environment
python -m venv venv
.\venv\Scripts\activate        # Windows
source venv/bin/activate       # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env           # Edit .env with your secret key

# Seed the database
python seed.py

# Start the server
uvicorn main:app --reload --port 8000
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | JWT signing secret | `your-super-secret-key-change-in-production` |
| `DATABASE_URL` | SQLAlchemy database URL | `sqlite:///./nelatalli.db` |

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Database

Uses **SQLite** by default (`nelatalli.db`). Tables are auto-created on startup.

### Models

| Model | Description |
|-------|-------------|
| `Category` | Product categories (Grains, Produce, Dairy, Pantry) |
| `Product` | Product catalog with pricing, ratings, flags |
| `BlogPost` | Blog articles and recipes |
| `ContactMessage` | Contact form submissions |
| `User` | User accounts with hashed passwords |
| `Order` / `OrderItem` | Order history and line items |
| `WishlistItem` | User's saved favorites |
| `CartItem` | Shopping cart items |

### Seed Data

Run `python seed.py` to populate:
- 4 categories, 20 products, 4 blog posts
- Demo user: `rajrajendar331@gmail.com` / `password123`
- 2 sample orders

## Project Structure

```
backend/
├── main.py           # FastAPI app, CORS, routers
├── database.py       # SQLAlchemy setup
├── models.py         # ORM models
├── schemas.py        # Pydantic schemas
├── auth.py           # JWT + bcrypt
├── seed.py           # Database seeder
├── requirements.txt  # Dependencies
├── .env.example      # Config template
└── routers/
    ├── products.py   # Products & categories
    ├── blog.py       # Blog posts
    ├── contact.py    # Contact form
    ├── auth_router.py# Register & login
    ├── users.py      # User profile
    ├── orders.py     # Order management
    ├── wishlist.py   # Wishlist
    ├── cart.py       # Shopping cart
    └── search.py     # Product search
```
