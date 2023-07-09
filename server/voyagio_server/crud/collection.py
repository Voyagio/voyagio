import uuid

from sqlalchemy.orm import Session

from models import collection as collection_models
from models import place as place_models


def get_user_collections(session: Session, user_id: uuid.UUID):
    return session.query(collection_models.Collection).filter(collection_models.Collection.author_id == user_id).all()


def create_collection(
        session: Session, name: str, author_id: uuid.UUID = None, image_url: str = None
) -> collection_models.Collection:
    db_collection = collection_models.Collection(name=name, author_id=author_id, image_url=image_url)
    session.add(db_collection)
    session.commit()
    session.refresh(db_collection)
    return db_collection


def get_collection_places(session: Session, collection_id: uuid.UUID):
    return session.query(collection_models.Collection).get(collection_id).places


def update_collection_author(session: Session, collection_id: uuid.UUID, author_id: uuid.UUID):
    collection = session.query(collection_models.Collection).get(collection_id)
    collection.author_id = author_id
    session.commit()


def get_collection(session: Session, collection_id: uuid.UUID):
    return session.query(collection_models.Collection).get(collection_id)


def add_place_to_collection(session: Session, collection_id: uuid.UUID, place_id: uuid.UUID):
    place = session.query(place_models.Place).get(place_id)
    collection = session.query(collection_models.Collection).get(collection_id)
    collection.places.append(place)
    session.commit()


def remove_place_from_collection(session: Session, collection_id: uuid.UUID, place_id: uuid.UUID):
    place = session.query(place_models.Place).get(place_id)
    collection = session.query(collection_models.Collection).get(collection_id)
    collection.places.remove(place)
    session.commit()
