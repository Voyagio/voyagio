import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import category as category_schemas
from api.v1.schemas import user as user_schemas
from api.v1.schemas import user_favorite_category as user_favorite_category_schemas
from crud import user_favorite_category as user_favorite_category_crud
from database import get_session
from dependencies import get_current_user

user_favorite_category_router = APIRouter(prefix="/favorite-categories", tags=["user-favorite-category"])


@user_favorite_category_router.get("", response_model=list[category_schemas.Category])
async def get_favorite_categories(
        user: user_schemas.User = Depends(get_current_user),
        db: Session = Depends(get_session)
):
    return user_favorite_category_crud.get_favorite_categories(session=db, user_id=user.id)


@user_favorite_category_router.post("/{category_id}", response_model=list[category_schemas.Category])
async def add_favorite_category(
        category_id: uuid.UUID,
        user: user_schemas.User = Depends(get_current_user),
        db: Session = Depends(get_session)
):
    return user_favorite_category_crud.add_favorite_category(
        session=db, user_id=user.id, category_id=category_id
    )


@user_favorite_category_router.delete("/{category_id}", response_model=list[category_schemas.Category])
async def remove_favorite_category(
        category_id: uuid.UUID,
        user: user_schemas.User = Depends(get_current_user),
        db: Session = Depends(get_session)
):
    return user_favorite_category_crud.remove_favorite_category(
        session=db, user_id=user.id, category_id=category_id
    )


@user_favorite_category_router.put("", response_model=list[category_schemas.Category])
async def set_favorite_categories(
        favorite_categories: user_favorite_category_schemas.FavoriteCategories,
        user: user_schemas.User = Depends(get_current_user),
        db: Session = Depends(get_session)
):
    current_categories = user_favorite_category_crud.get_favorite_categories(session=db, user_id=user.id)
    current_category_ids = set()
    for category in current_categories:
        if category.id not in favorite_categories.category_ids:
            user_favorite_category_crud.remove_favorite_category(
                session=db, user_id=user.id, category_id=category.id
            )
        current_category_ids.add(category.id)
    for category_id in favorite_categories.category_ids:
        if category_id in current_category_ids:
            continue
        user_favorite_category_crud.add_favorite_category(
            session=db, user_id=user.id, category_id=category_id
        )
    return user_favorite_category_crud.get_favorite_categories(session=db, user_id=user.id)
