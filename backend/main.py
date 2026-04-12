from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import engine, Base
from routers import products, blog, contact, auth_router, users, orders, wishlist, cart, search, admin

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nelatalli Organics API",
    description="Backend API for Nelatalli Organics — pure & healthy organic products, delivered to your doorstep.",
    version="1.0.0",
)

# CORS — allow the Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve product images at /static/images/
app.mount("/static", StaticFiles(directory="static"), name="static")

# Register routers
app.include_router(products.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(auth_router.router)
app.include_router(users.router)
app.include_router(orders.router)
app.include_router(wishlist.router)
app.include_router(cart.router)
app.include_router(search.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {
        "name": "Nelatalli Organics API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok"}
