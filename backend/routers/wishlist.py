from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User, WishlistItem, Product
from schemas import WishlistAdd, WishlistItemOut, ProductBrief
from auth import get_current_user

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])


def _wishlist_to_out(item: WishlistItem) -> WishlistItemOut:
    return WishlistItemOut(
        id=item.id,
        product=ProductBrief(
            id=item.product.slug,
            title=item.product.title,
            price=item.product.price,
            rating=item.product.rating,
            image=item.product.image,
            category=item.product.category_rel.name if item.product.category_rel else "",
        ),
        created_at=item.created_at,
    )


@router.get("", response_model=list[WishlistItemOut])
def list_wishlist(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    items = (
        db.query(WishlistItem)
        .filter(WishlistItem.user_id == current_user.id)
        .all()
    )
    return [_wishlist_to_out(i) for i in items]


@router.post("", response_model=WishlistItemOut)
def add_to_wishlist(
    data: WishlistAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == data.product_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already in wishlist")

    item = WishlistItem(user_id=current_user.id, product_id=data.product_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return _wishlist_to_out(item)


@router.delete("/{product_id}")
def remove_from_wishlist(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == product_id,
        )
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Wishlist item not found")

    db.delete(item)
    db.commit()
    return {"detail": "Removed from wishlist"}
