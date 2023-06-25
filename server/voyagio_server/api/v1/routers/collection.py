import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from api.v1.schemas import collection as collection_schemas
from crud import collection as collection_crud
from database import get_session

collections_router = APIRouter(prefix="", tags=["collection"])


@collections_router.get("/{collection_id}/places", response_model=list[place_schemas.Place])
async def get_collection_places(collection_id: uuid.UUID, db: Session = Depends(get_session)):
    db_places = collection_crud.get_collection_places(session=db, collection_id=collection_id)

    return [place_schemas.Place.from_model(db_place) for db_place in db_places]


@collections_router.post("/{collection_id}/places")
async def add_place_to_collection(collection_id: uuid.UUID, place: collection_schemas.CollectionAddPlace,
                                  db: Session = Depends(get_session)):
    collection_crud.add_place_to_collection(session=db, collection_id=collection_id, place_id=place.place_id)
    return "OK"
