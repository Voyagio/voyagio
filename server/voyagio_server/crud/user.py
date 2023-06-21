from sqlalchemy.orm import Session

from api.v1.schemas import user as user_schemas
from models import user as user_models


def create_user(session: Session, user: user_schemas.UserSignup) -> user_models.User:
    db_user = user_models.User(email=user.email)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
