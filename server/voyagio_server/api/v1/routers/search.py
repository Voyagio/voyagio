from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import collection as collection_schemas
from api.v1.schemas import place as place_schemas
from api.v1.schemas import search as search_schemas
from crud import city as city_crud
from crud import collection as collection_crud
from crud import place as place_crud
from database import get_session

search_router = APIRouter(prefix="/search", tags=["search"])


@search_router.get("/suggestions/{search_string}", response_model=list[search_schemas.SearchSuggestion])
async def get_suggestions(search_string: str, db: Session = Depends(get_session)):
    cities = city_crud.get_matching_cities(session=db, search_string=search_string)
    return [search_schemas.SearchSuggestion(value=city.name) for city in cities]


def get_recommended_places(available_places: list[place_schemas.Place]):
    import random
    places = random.sample(available_places, min(len(available_places), 3))
    return places


@search_router.get("/results/{search_string}", response_model=list[collection_schemas.Collection])
async def get_results(search_string: str, db: Session = Depends(get_session), offset: int = 0, limit: int = 100):
    city = city_crud.get_city_by_name(session=db, city_name=search_string)
    if not city:
        return []
    city_places = place_crud.get_city_places(session=db, city_id=city.id, offset=offset, limit=limit)
    result = []
    recommendations_images = [
        "https://i.ibb.co/KjSH1HP/output-onlinepngtools.png",
        "https://i.ibb.co/dk7WdJm/output-onlinepngtools-1.png",
    ]
    for i in range(2):
        collection = collection_crud.create_collection(session=db,
                                                       name=f"Recommendation {i + 1}",
                                                       image_url=recommendations_images[i])
        for place in get_recommended_places(city_places):
            collection_crud.add_place_to_collection(session=db,
                                                    collection_id=collection.id,
                                                    place_id=place.id)
        result.append(collection)
    return result
