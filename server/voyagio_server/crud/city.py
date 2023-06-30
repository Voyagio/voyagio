import uuid

from sqlalchemy.orm import Session

from api.v1.schemas import city as city_schemas
from models import city as city_models


def create_city(session: Session, city: city_schemas.CityCreate) -> city_schemas.City | None:
    if session.query(city_models.City).filter(city_models.City.name == city.name).first():
        return None
    db_city = city_models.City(name=city.name)
    session.add(db_city)
    session.commit()
    session.refresh(db_city)
    return city_schemas.City(id=db_city.id, name=db_city.name)


def get_cities(session: Session, offset: int, limit: int) -> list[city_schemas.City]:
    query = session.query(city_models.City)
    query = query.offset(offset).limit(limit)
    return [city_schemas.City(id=record.id, name=record.name) for record in query.all()]


def get_city(session: Session, city_id: uuid.UUID) -> city_schemas.City:
    city_schema = session.query(city_models.City).filter(city_models.City.id == city_id).first()
    return city_schemas.City(id=city_schema.id, name=city_schema.name)


def delete_city(session: Session, city_id: uuid.UUID) -> city_schemas.City | None:
    city = session.query(city_models.City).filter(city_models.City.id == city_id).first()
    if not city:
        return None
    session.delete(city)
    session.commit()
    return city_schemas.City(id=city.id, name=city.name)
