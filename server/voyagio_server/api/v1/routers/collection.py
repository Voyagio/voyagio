import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import collection as collection_schemas
from api.v1.schemas import place as place_schemas
from crud import collection as collection_crud
from database import get_session
from dependencies import get_current_user
from models.user import User

collections_router = APIRouter(prefix="/collections", tags=["collection"])


@collections_router.get("", response_model=list[collection_schemas.Collection])
async def get_user_collections(user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    db_collections = collection_crud.get_user_collections(session=db, user_id=user.id)
    return db_collections


@collections_router.get("/{collection_id}/places", response_model=list[place_schemas.Place])
async def get_collection_places(collection_id: uuid.UUID, db: Session = Depends(get_session)):
    db_places = collection_crud.get_collection_places(session=db, collection_id=collection_id)
    return db_places


@collections_router.post("/{collection_id}/save", response_model=str)
async def save_collection(collection_id: uuid.UUID,
                          user: User = Depends(get_current_user),
                          db: Session = Depends(get_session)):
    collection_crud.update_collection_author(session=db, collection_id=collection_id, author_id=user.id)
    return "OK"


@collections_router.post("/{collection_id}/places")
async def add_place_to_collection(place: collection_schemas.CollectionAddPlace,
                                  collection_id: uuid.UUID,
                                  db: Session = Depends(get_session)):
    collection_crud.add_place_to_collection(session=db, collection_id=collection_id, place_id=place.place_id)
    return "OK"


@collections_router.delete("/{collection_id}/places")
async def remove_place_from_collection(place: collection_schemas.CollectionAddPlace,
                                       collection_id: uuid.UUID,
                                       db: Session = Depends(get_session)):
    collection_crud.remove_place_from_collection(session=db, collection_id=collection_id, place_id=place.place_id)
    return "OK"


@collections_router.get("/favorites", response_model=collection_schemas.Collection)
async def get_favorites_collection(user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    return collection_crud.get_collection(session=db, collection_id=user.favorites_collection_id)
