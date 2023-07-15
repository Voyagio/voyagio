import uuid

from sqlalchemy.orm import Session

from api.v1.schemas import category as category_schemas
from models import category as category_models


def create_category(session: Session, category: category_schemas.CategoryCreate) -> category_schemas.Category | None:
    if session.query(category_models.Category).filter(category_models.Category.name == category.name).first():
        return None
    db_category = category_models.Category(name=category.name, image_url=category.image_url)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return category_schemas.Category(id=db_category.id, name=db_category.name, image_url=db_category.image_url)


def get_categories(session: Session, offset: int, limit: int) -> list[category_schemas.Category]:
    query = session.query(category_models.Category)
    query = query.offset(offset).limit(limit)
    return [category_schemas.Category(id=record.id, name=record.name, image_url=record.image_url) for record in query.all()]

def get_category_by_id(session: Session, id: uuid.UUID) -> category_schemas.Category | None:
    category = session.query(category_models.Category).filter(category_models.Category.id==id).first()
    if not category:
        return None
    return category_schemas.Category(id=category.id, name=category.name, image_url=category.image_url)
