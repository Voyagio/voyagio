from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from models import place as place_models


def create_address(session: Session, address: place_schemas.AddressCreate) -> place_models.Address:
    db_address = place_models.Address(
        lat=address.lat,
        lon=address.lon,
        city_id=address.city_id,
        value=address.value
    )
    session.add(db_address)
    session.commit()
    session.refresh(db_address)
    return db_address


def create_place(session: Session, place: place_schemas.PlaceCreate) -> place_schemas.Place:
    db_address = create_address(session, place.address)
    db_place = place_models.Place(
        name=place.name,
        address_id=db_address.id,
        category_id=place.category_id,
        image_url=place.image_url,
        rating=place.rating
    )

    create_address(session, place.address)

    session.add(db_place)
    session.commit()
    session.refresh(db_place)

    return place_schemas.Place(
        id=db_place.id,
        name=db_place.name,
        category=db_place.category,
        address=db_place.address,
        image_url=db_place.image_url,
        rating=db_place.rating
    )


def get_places(session: Session, offset: int, limit: int):
    places_models = session.query(place_models.Place).offset(offset).limit(limit).all()
    return [place_schemas.Place(
        id=place.id,
        name=place.name,
        category=place.category,
        address=place.address,
        image_url=place.image_url,
        rating=place.rating
    ) for place in places_models]
