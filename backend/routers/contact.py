from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ContactMessage
from schemas import ContactCreate, ContactOut

router = APIRouter(prefix="/api", tags=["Contact"])


@router.post("/contact", response_model=ContactOut)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
