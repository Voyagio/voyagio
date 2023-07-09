import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from crud import place as place_crud
from database import get_session

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
