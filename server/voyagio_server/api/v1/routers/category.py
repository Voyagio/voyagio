from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud import category as category_crud
from database import get_session

category_router = APIRouter(prefix="", tags=["category"])


@category_router.get("/categories")
async def get_places(offset: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    return category_crud.get_categories(session=db, offset=offset, limit=limit)
