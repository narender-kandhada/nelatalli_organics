from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import random
import string

from database import get_db
from models import User, Order, OrderItem, CartItem
from schemas import OrderOut, OrderItemOut, OrderCreate
from auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["Orders"])


def _generate_order_number() -> str:
    chars = string.digits
    return f"#NO-{''.join(random.choices(chars, k=4))}"


def _order_to_out(order: Order) -> OrderOut:
    return OrderOut(
        id=order.id,
        order_number=order.order_number,
        total=order.total,
        status=order.status,
        created_at=order.created_at,
        items=[
            OrderItemOut(
                id=item.id,
                product_id=item.product_id,
                product_title=item.product.title if item.product else "",
                quantity=item.quantity,
                price=item.price,
            )
            for item in order.items
        ],
    )


@router.get("", response_model=list[OrderOut])
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    return [_order_to_out(o) for o in orders]


@router.get("/{order_id}", response_model=OrderOut)
def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id, Order.user_id == current_user.id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return _order_to_out(order)


@router.post("", response_model=OrderOut)
def place_order(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create an order from the user's current cart items."""
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = sum(item.product.price * item.quantity for item in cart_items)

    order = Order(
        order_number=_generate_order_number(),
        user_id=current_user.id,
        total=total,
        status="Processing",
        created_at=datetime.now(timezone.utc),
    )
    db.add(order)
    db.flush()

    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price=cart_item.product.price,
        )
        db.add(order_item)

    # Clear the cart
    for cart_item in cart_items:
        db.delete(cart_item)

    db.commit()
    db.refresh(order)
    return _order_to_out(order)
