from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import BlogPost
from schemas import BlogPostOut

router = APIRouter(prefix="/api/blog", tags=["Blog"])


@router.get("/posts", response_model=list[BlogPostOut])
def list_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()


@router.get("/posts/featured", response_model=BlogPostOut)
def featured_post(db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.is_featured == True).first()
    if not post:
        post = db.query(BlogPost).first()
    if not post:
        raise HTTPException(status_code=404, detail="No blog posts found")
    return post


@router.get("/posts/{post_id}", response_model=BlogPostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post
