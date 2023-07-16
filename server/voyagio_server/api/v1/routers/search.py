import random

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.v1.schemas import collection as collection_schemas
from api.v1.schemas import place as place_schemas
from api.v1.schemas import search as search_schemas
from crud import city as city_crud
from crud import collection as collection_crud
from crud import place as place_crud
from database import get_session
from dependencies import get_current_user
from ml.recommendations import get_user_recommended_places
from models import user as user_models

search_router = APIRouter(prefix="/search", tags=["search"])

AVAILABLE_COLLECTION_IMAGES = [
    "https://github.com/Voyagio/voyagio/raw/main/static/collection_1.svg",
    "https://github.com/Voyagio/voyagio/raw/main/static/collection_2.svg",
    "https://github.com/Voyagio/voyagio/raw/main/static/collection_3.svg",
    "https://github.com/Voyagio/voyagio/raw/main/static/collection_4.svg",
]
AVAILABLE_COLLECTION_PREFIXES = ["Adventurous", "Explorative", "Curious", "Open-minded", "Fearless", "Inquisitive",
                                 "Fearless", "Spirited", "Bold", "Discovering", "Limitless", "Wanderlust", "Expansive",
                                 "Daring", "Enthusiastic", "Boundless", "Thrill-seeking", "Intrepid", "Unrestrained",
                                 "Unbound", "Trailblazing", "Inspirational", "Empowering", "Transformative",
                                 "Liberating", "Awakening", "Illuminating", "Invigorating", "Awe-inspiring",
                                 "Exhilarating"]
RECOMMENDATIONS_NUMBER = 2


@search_router.get("/suggestions/{search_string}", response_model=list[search_schemas.SearchSuggestion])
async def get_suggestions(search_string: str, db: Session = Depends(get_session)):
    cities = city_crud.get_matching_cities(session=db, search_string=search_string)
    return [search_schemas.SearchSuggestion(value=city.name) for city in cities]


@search_router.post("/recommendations/{search_string}", response_model=list[collection_schemas.Collection])
async def get_search_recommendations(search_string: str,
                                     user: user_models.User = Depends(get_current_user),
                                     db: Session = Depends(get_session)):
    result = []
    collection_images = random.sample(AVAILABLE_COLLECTION_IMAGES, RECOMMENDATIONS_NUMBER)
    collection_names = random.sample(AVAILABLE_COLLECTION_PREFIXES, RECOMMENDATIONS_NUMBER)
    for i in range(RECOMMENDATIONS_NUMBER):
        collection = collection_crud.create_collection(session=db,
                                                       name=f"{collection_names[i]} voyage",
                                                       image_url=collection_images[i])
        recommended_places = get_user_recommended_places(session=db, user_id=user.id)
        for place in recommended_places:
            collection_crud.add_place_to_collection(session=db,
                                                    collection_id=collection.id,
                                                    place_id=place.id)
        result.append(collection)
    return result


@search_router.post("/places/{search_string}", response_model=list[place_schemas.Place])
async def get_search_places(search_string: str,
                            search_filter: search_schemas.SearchFilter,
                            db: Session = Depends(get_session), offset: int = 0, limit: int = 100):
    city = city_crud.get_city_by_name(session=db, city_name=search_string)
    if not city:
        return []
    places = place_crud.get_city_places(
        session=db,
        city_id=city.id,
        min_rating=search_filter.rating_filter.min_rating,
        max_rating=search_filter.rating_filter.max_rating,
        category_ids=search_filter.category_filter.category_ids,
        offset=offset, limit=limit
    )
    return places
