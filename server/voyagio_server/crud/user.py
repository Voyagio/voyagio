from sqlalchemy.orm import Session

from crud.collection import create_collection
from models import user as user_models


def create_user(session: Session, email: str, password: str) -> user_models.User | None:
    if session.query(user_models.User).filter(user_models.User.email == email).first():
        return None
    db_user = user_models.User(email=email)
    db_user.set_password(password)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    favorites_collection = create_collection(session, name="Favorites", author_id=db_user.id)
    current_trip_collection = create_collection(session, name="Current Trip", author_id=db_user.id)
    db_user.favorites_collection_id = favorites_collection.id
    db_user.current_trip_collection_id = current_trip_collection.id
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user(session: Session, email: str) -> user_models.User | None:
    return session.query(user_models.User).filter(user_models.User.email == email).first()
