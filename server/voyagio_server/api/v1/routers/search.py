from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import place as place_schemas
from api.v1.schemas import search as search_schemas
from crud import city as city_crud
from crud import place as place_crud
from database import get_session

search_router = APIRouter(prefix="/search", tags=["search"])


@search_router.get("/suggestions/{search_string}", response_model=list[search_schemas.SearchSuggestion])
async def get_suggestions(search_string: str, db: Session = Depends(get_session)):
    cities = city_crud.get_matching_cities(session=db, search_string=search_string)
    return [search_schemas.SearchSuggestion(value=city.name) for city in cities]


@search_router.get("/results/{search_string}", response_model=list[place_schemas.Place])
async def get_results(search_string: str, db: Session = Depends(get_session), offset: int = 0, limit: int = 100):
    city = city_crud.get_city_by_name(session=db, city_name=search_string)
    if not city:
        return []
    places = place_crud.get_city_places(session=db, city_id=city.id, offset=offset, limit=limit)
    return places
