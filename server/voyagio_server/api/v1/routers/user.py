from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import user as user_schemas
from crud import user as user_crud
from database import get_session

users_router = APIRouter(prefix="", tags=["user"])


@users_router.post("/signup", response_model=user_schemas.UserBase)
async def sign_up(user: user_schemas.UserSignup, db: Session = Depends(get_session)):
    db_user = user_crud.create_user(session=db, user=user)

    return user_schemas.UserBase(email=db_user.email)
