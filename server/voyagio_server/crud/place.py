from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from models import place as place_models
from crud.category import get_category_by_id
from crud.address import create_address


def create_place(session: Session, place: place_schemas.PlaceCreate) -> place_models.Place:
    db_address = create_address(session, place.address)
    db_place = place_models.Place(name=place.name, address_id=db_address.id, image_url=place.image_url,
                                  rating=place.rating)
    for category_id in place.categories_id:
        db_place.categories.extend(get_category_by_id(session, category_id))

    create_address(session, place.address)

    session.add(db_place)
    session.commit()
    session.refresh(db_place)

    return db_place


def get_places(session: Session, offset: int, limit: int):
    query = session.query(place_models.Place)
    query = query.offset(offset).limit(limit)
    return [place_schemas.Place.from_model(record) for record in query.all()]
