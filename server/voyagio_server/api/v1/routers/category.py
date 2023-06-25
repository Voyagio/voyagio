from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import category as category_schemas
from crud import category as category_crud
from database import get_session

category_router = APIRouter(prefix="", tags=["category"])


@category_router.post("/categories")
async def create_category(category: category_schemas.CategoryCreate, db: Session = Depends(get_session)):
    return category_crud.create_category(session=db, category=category)


@category_router.get("/categories")
async def get_categories(offset: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    return category_crud.get_categories(session=db, offset=offset, limit=limit)
