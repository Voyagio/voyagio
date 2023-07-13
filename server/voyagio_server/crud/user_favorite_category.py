import uuid

from sqlalchemy.orm import Session

from models import category as category_models
from models import user as user_models


def get_favorite_categories(session: Session, user_id: uuid.UUID) -> list[category_models.Category]:
    user = session.query(user_models.User).get(user_id)
    return user.favorite_categories


def add_favorite_category(session: Session, user_id: uuid.UUID, category_id: uuid.UUID) -> list[
    category_models.Category]:
    user = session.query(user_models.User).get(user_id)
    category = session.query(category_models.Category).get(category_id)
    user.favorite_categories.append(category)
    session.commit()
    session.refresh(user)
    return user.favorite_categories


def remove_favorite_category(session: Session, user_id: uuid.UUID, category_id: uuid.UUID) -> list[
    category_models.Category]:
    user = session.query(user_models.User).get(user_id)
    category = session.query(category_models.Category).get(category_id)
    try:
        user.favorite_categories.remove(category)
        session.commit()
        session.refresh(user)
    except ValueError:
        pass
    return user.favorite_categories
