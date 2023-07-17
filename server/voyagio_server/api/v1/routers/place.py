import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import collection as collection_schemas
from api.v1.schemas import place as place_schemas
from crud import collection as collection_crud
from crud import place as place_crud
from database import get_session
from dependencies import get_current_user
from models.user import User

places_router = APIRouter(prefix="/places", tags=["place"])


@places_router.post("", response_model=place_schemas.Place)
async def create_place(place: place_schemas.PlaceCreate, db: Session = Depends(get_session)):
    place_schema = place_crud.create_place(session=db, place=place)
    return place_schema


@places_router.get("", response_model=list[place_schemas.Place])
async def get_places(offset: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    return place_crud.get_places(session=db, offset=offset, limit=limit)


@places_router.delete("", response_model=str)
async def remove_place(place_id: uuid.UUID, db: Session = Depends(get_session)):
    place_crud.remove_place_by_id(session=db, id=place_id)
    return "OK"


@places_router.get("/{place_id}/collections", response_model=list[collection_schemas.Collection])
async def get_place_belonging_user_collections(place_id: uuid.UUID,
                                               user: User = Depends(get_current_user),
                                               db: Session = Depends(get_session)):
    db_collections = collection_crud.get_user_collections_containing_place(
        session=db, place_id=place_id, user_id=user.id
    )
    db_collections_filtered = list(filter(
        lambda collection: collection.id != user.favorites_collection_id,
        db_collections
    ))
    return db_collections_filtered
