import uuid

from sqlalchemy.orm import Session

from api.v1.schemas import category as category_schemas
from models import category as category_models


def create_category(session: Session, category: category_schemas.CategoryCreate) -> category_models.Category:
    db_category = category_models.Category(name=category.name)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


def get_categories(session: Session, offset: int, limit: int):
    query = session.query(category_models.Category)
    query = query.offset(offset).limit(limit)
    return [category_schemas.Category(id=record.id, name=record.name) for record in query.all()]

def get_category_by_id(session: Session, id: uuid.UUID):
    query = session.query(category_models.Category).filter(category_models.Category.id==id)
    return query.all()