import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.v1.schemas import city as city_schemas
from crud import city as city_crud
from database import get_session

city_router = APIRouter(prefix="/cities", tags=["city"])

@city_router.post("", response_model=city_schemas.City)
async def create_city(city: city_schemas.CityCreate, db: Session = Depends(get_session)):
    city_schema = city_crud.create_city(session=db, city=city)
    if not city_schema:
        raise HTTPException(status_code=409, detail="City already exists")
    return city_schema


@city_router.get("", response_model=list[city_schemas.City])
async def get_cities(offset: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    return city_crud.get_cities(session=db, offset=offset, limit=limit)


@city_router.delete("/{city_id}", response_model=city_schemas.City)
async def delete_city(city_id: uuid.UUID, db: Session = Depends(get_session)):
    city_schema = city_crud.delete_city(session=db, city_id=city_id)
    if not city_schema:
        raise HTTPException(status_code=404, detail="City not found")
    return city_schema
