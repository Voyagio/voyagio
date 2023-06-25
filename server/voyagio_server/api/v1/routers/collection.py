from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import collection as collection_schemas
from api.v1.schemas import place as place_schemas
from crud import collection as collection_crud
from database import get_session
from dependencies import get_current_user
from models.user import User

collections_router = APIRouter(prefix="/collections", tags=["collection"])


@collections_router.get("/favorites", response_model=list[place_schemas.Place])
async def get_favorites(user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    db_places = collection_crud.get_collection_places(session=db, collection_id=user.favorites_collection_id)

    return [place_schemas.Place.from_model(db_place) for db_place in db_places]


@collections_router.post("/favorites")
async def add_place_to_favorites(place: collection_schemas.CollectionAddPlace,
                                 user: User = Depends(get_current_user),
                                 db: Session = Depends(get_session)):
    collection_crud.add_place_to_collection(session=db, collection_id=user.favorites_collection_id,
                                            place_id=place.place_id)
    return "OK"


@collections_router.delete("/favorites")
async def remove_place_from_favorites(place: collection_schemas.CollectionAddPlace,
                                      user: User = Depends(get_current_user),
                                      db: Session = Depends(get_session)):
    collection_crud.remove_place_from_collection(session=db, collection_id=user.favorites_collection_id,
                                                 place_id=place.place_id)
    return "OK"


@collections_router.get("/current-trip", response_model=list[place_schemas.Place])
async def get_current_trip(user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    db_places = collection_crud.get_collection_places(session=db, collection_id=user.current_trip_collection_id)

    return [place_schemas.Place.from_model(db_place) for db_place in db_places]


@collections_router.post("/current-trip")
async def add_place_to_current_trip(place: collection_schemas.CollectionAddPlace,
                                    user: User = Depends(get_current_user),
                                    db: Session = Depends(get_session)):
    collection_crud.add_place_to_collection(session=db, collection_id=user.current_trip_collection_id,
                                            place_id=place.place_id)
    return "OK"


@collections_router.delete("/current-trip")
async def remove_place_from_current_trip(place: collection_schemas.CollectionAddPlace,
                                         user: User = Depends(get_current_user),
                                         db: Session = Depends(get_session)):
    collection_crud.remove_place_from_collection(session=db, collection_id=user.current_trip_collection_id,
                                                 place_id=place.place_id)
    return "OK"
