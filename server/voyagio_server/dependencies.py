import uuid

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()


def get_user_id_from_token(access_token: str) -> uuid.UUID | None:
    payload = jwt.decode(access_token, key="secret", algorithms=["HS256"])
    if "user_id" not in payload:
        return None
    return uuid.UUID(payload["user_id"])


def get_current_user_id(auth=Depends(security)) -> uuid.UUID:
    user_id = get_user_id_from_token(auth.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid access token")
    return user_id
