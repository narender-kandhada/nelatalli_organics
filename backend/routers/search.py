from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import get_db
from models import Product, Category
from schemas import ProductBrief

router = APIRouter(prefix="/api", tags=["Search"])


@router.get("/search", response_model=list[ProductBrief])
def search_products(
    q: str = Query("", description="Search query"),
    db: Session = Depends(get_db),
):
    if not q.strip():
        return []

    term = f"%{q.strip()}%"
    products = (
        db.query(Product)
        .filter(
            or_(
                Product.title.ilike(term),
                Product.description.ilike(term),
            )
        )
        .all()
    )
    return [
        ProductBrief(
            id=p.slug,
            title=p.title,
            price=p.price,
            rating=p.rating,
            image=p.image,
            category=p.category_rel.name if p.category_rel else "",
        )
        for p in products
    ]
