from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User, Address, PaymentMethod
from schemas import (
    UserOut, UserUpdate, 
    AddressOut, AddressCreate, AddressUpdate,
    PaymentMethodOut, PaymentMethodCreate
)
from auth import get_current_user

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserOut)
def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.name is not None:
        current_user.name = data.name
    if data.phone is not None:
        current_user.phone = data.phone
    if data.address is not None:
        current_user.address = data.address
    if data.avatar is not None:
        current_user.avatar = data.avatar

    db.commit()
    db.refresh(current_user)
    return current_user


# ──────────────────────────── Addresses ───────────────────────────

@router.get("/addresses", response_model=list[AddressOut])
def get_addresses(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Address).filter(Address.user_id == current_user.id).order_by(Address.is_default.desc()).all()

@router.post("/addresses", response_model=AddressOut)
def create_address(
    data: AddressCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.is_default:
        # Reset other defaults
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})

    address = Address(**data.model_dump(), user_id=current_user.id)
    db.add(address)
    db.commit()
    db.refresh(address)
    return address

@router.put("/addresses/{address_id}", response_model=AddressOut)
def update_address(
    address_id: int,
    data: AddressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    address = db.query(Address).filter(Address.id == address_id, Address.user_id == current_user.id).first()
    if not address:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Address not found")

    update_data = data.model_dump(exclude_unset=True)
    
    if update_data.get("is_default"):
        db.query(Address).filter(Address.user_id == current_user.id, Address.id != address_id).update({"is_default": False})

    for key, value in update_data.items():
        setattr(address, key, value)

    db.commit()
    db.refresh(address)
    return address

@router.delete("/addresses/{address_id}")
def delete_address(
    address_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    address = db.query(Address).filter(Address.id == address_id, Address.user_id == current_user.id).first()
    if not address:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Address not found")

    db.delete(address)
    db.commit()
    return {"status": "ok"}


# ──────────────────────────── Payment Methods ─────────────────────

@router.get("/payment-methods", response_model=list[PaymentMethodOut])
def get_payment_methods(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(PaymentMethod).filter(PaymentMethod.user_id == current_user.id).order_by(PaymentMethod.is_default.desc()).all()

@router.post("/payment-methods", response_model=PaymentMethodOut)
def create_payment_method(
    data: PaymentMethodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.is_default:
        db.query(PaymentMethod).filter(PaymentMethod.user_id == current_user.id).update({"is_default": False})

    pm = PaymentMethod(**data.model_dump(), user_id=current_user.id)
    db.add(pm)
    db.commit()
    db.refresh(pm)
    return pm

@router.delete("/payment-methods/{payment_id}")
def delete_payment_method(
    payment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    pm = db.query(PaymentMethod).filter(PaymentMethod.id == payment_id, PaymentMethod.user_id == current_user.id).first()
    if not pm:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Payment method not found")

    db.delete(pm)
    db.commit()
    return {"status": "ok"}

