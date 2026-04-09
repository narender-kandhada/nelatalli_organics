from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User, CartItem, Product
from schemas import CartAdd, CartUpdate, CartItemOut, ProductBrief
from auth import get_current_user

router = APIRouter(prefix="/api/cart", tags=["Cart"])


def _cart_to_out(item: CartItem) -> CartItemOut:
    return CartItemOut(
        id=item.id,
        product=ProductBrief(
            id=item.product.slug,
            title=item.product.title,
            price=item.product.price,
            rating=item.product.rating,
            image=item.product.image,
            category=item.product.category_rel.name if item.product.category_rel else "",
        ),
        quantity=item.quantity,
    )


@router.get("", response_model=list[CartItemOut])
def list_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    return [_cart_to_out(i) for i in items]


@router.post("", response_model=CartItemOut)
def add_to_cart(
    data: CartAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = (
        db.query(CartItem)
        .filter(
            CartItem.user_id == current_user.id,
            CartItem.product_id == data.product_id,
        )
        .first()
    )
    if existing:
        existing.quantity += data.quantity
        db.commit()
        db.refresh(existing)
        return _cart_to_out(existing)

    item = CartItem(
        user_id=current_user.id,
        product_id=data.product_id,
        quantity=data.quantity,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return _cart_to_out(item)


@router.put("/{item_id}", response_model=CartItemOut)
def update_cart_item(
    item_id: int,
    data: CartUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id, CartItem.user_id == current_user.id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if data.quantity <= 0:
        db.delete(item)
        db.commit()
        return {"detail": "Item removed from cart"}

    item.quantity = data.quantity
    db.commit()
    db.refresh(item)
    return _cart_to_out(item)


@router.delete("/{item_id}")
def remove_from_cart(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id, CartItem.user_id == current_user.id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(item)
    db.commit()
    return {"detail": "Removed from cart"}
