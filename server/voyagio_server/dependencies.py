import uuid

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from database import get_session
from models.user import User

security = HTTPBearer()


def get_user_id_from_token(access_token: str) -> uuid.UUID | None:
    try:
        payload = jwt.decode(access_token, key="secret", algorithms=["HS256"])
    except jwt.exceptions.PyJWTError:
        return None
    if "user_id" not in payload:
        return None
    return uuid.UUID(payload["user_id"])


def get_current_user_id(auth=Depends(security)) -> uuid.UUID:
    user_id = get_user_id_from_token(auth.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid access token")
    return user_id


def get_current_user(db: Session = Depends(get_session), user_id: uuid.UUID = Depends(get_current_user_id)) -> User | None:
    return db.query(User).filter(User.id == user_id).one_or_none()
