import uuid

import jwt
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from api.v1.schemas import user as user_schemas
from config import Config
from crud import user as user_crud
from database import get_session
from dependencies import get_current_user

users_router = APIRouter(prefix="/users", tags=["user"])


def get_user_access_token(user_id: uuid.UUID) -> str:
    return jwt.encode({"user_id": str(user_id)}, key=Config.JWT_SECRET, algorithm="HS256")


def set_access_token_cookie(response: Response, access_token: str):
    cookie_age = 60 * 60 * 24 * 30
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=cookie_age,
        expires=cookie_age
    )


@users_router.post("/signup")
async def sign_up(response: Response, user: user_schemas.UserLogin, db: Session = Depends(get_session)):
    db_user = user_crud.create_user(session=db, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    set_access_token_cookie(response, access_token=get_user_access_token(db_user.id))
    return {"message": "set cookie"}


@users_router.post("/login")
async def login(response: Response, user: user_schemas.UserLogin, db: Session = Depends(get_session)):
    db_user = user_crud.get_user(session=db, email=user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if not db_user.verify_password(user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")
    set_access_token_cookie(response, access_token=get_user_access_token(db_user.id))
    return {"message": "set cookie"}


@users_router.get("/me", response_model=user_schemas.User)
async def get_current_active_user(user: user_schemas.User = Depends(get_current_user)):
    return user_schemas.User(id=user.id, email=user.email)
