from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
from models import Product, Category
from schemas import ProductOut, ProductBrief, CategoryOut

router = APIRouter(prefix="/api", tags=["Products"])


def _product_to_out(p: Product) -> ProductOut:
    return ProductOut(
        id=p.id,
        slug=p.slug,
        title=p.title,
        price=p.price,
        category=p.category_rel.name if p.category_rel else "",
        image=p.image,
        rating=p.rating,
        reviews=p.reviews,
        description=p.description,
        is_top_rated=p.is_top_rated,
        is_featured=p.is_featured,
        is_top_selling=p.is_top_selling,
        is_recently_added=p.is_recently_added,
        asymmetry=p.asymmetry,
        in_stock=p.in_stock,
    )


def _product_to_brief(p: Product) -> ProductBrief:
    return ProductBrief(
        id=p.slug,
        title=p.title,
        price=p.price,
        rating=p.rating,
        image=p.image,
        category=p.category_rel.name if p.category_rel else "",
    )


# ──────────────── Categories ────────────────

@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


# ──────────────── Products ──────────────────

@router.get("/products/featured", response_model=list[ProductBrief])
def featured_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_featured == True).all()
    return [_product_to_brief(p) for p in products]


@router.get("/products/top-selling", response_model=list[ProductBrief])
def top_selling_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_top_selling == True).all()
    return [_product_to_brief(p) for p in products]


@router.get("/products/recently-added", response_model=list[ProductBrief])
def recently_added_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_recently_added == True).all()
    return [_product_to_brief(p) for p in products]


@router.get("/products/top-rated", response_model=list[ProductBrief])
def top_rated_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_top_rated == True).all()
    return [_product_to_brief(p) for p in products]


@router.get("/products", response_model=list[ProductOut])
def list_products(
    category: Optional[str] = Query(None, description="Filter by category name"),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sort_by: Optional[str] = Query(None, description="Sort: price_asc, price_desc, rating, newest"),
    db: Session = Depends(get_db),
):
    query = db.query(Product)

    if category:
        query = query.join(Category).filter(Category.name == category)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if sort_by == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Product.price.desc())
    elif sort_by == "rating":
        query = query.order_by(Product.rating.desc())
    elif sort_by == "newest":
        query = query.order_by(Product.created_at.desc())

    products = query.all()
    return [_product_to_out(p) for p in products]


@router.get("/products/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return _product_to_out(product)
