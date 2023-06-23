from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from crud import place as place_crud
from database import get_session

places_router = APIRouter(prefix="", tags=["place"])


@places_router.post("/places")
async def add_place(place: place_schemas.PlaceCreate, db: Session = Depends(get_session)):
    db_user = place_crud.create_place(session=db, place=place)

    return "Succesfully inserted"


@places_router.get("/places")
async def get_places(offset: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    return place_crud.get_places(session=db, offset=offset, limit=limit)
