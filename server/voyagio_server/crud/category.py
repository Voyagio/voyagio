import uuid

from sqlalchemy.orm import Session

from api.v1.schemas import category as category_schemas
from models import category as category_models


def get_categories(session: Session, offset: int, limit: int):
    query = session.query(category_models.Category)
    query = query.offset(offset).limit(limit)
    return [category_schemas.Category(id=record.id, name=record.name) for record in query.all()]

def get_category_by_id(session: Session, id: uuid.UUID):
    query = session.query(category_models.Category).filter(category_models.Category.id==id)
    return query.all()