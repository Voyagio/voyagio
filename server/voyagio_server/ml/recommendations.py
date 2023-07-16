import random
import uuid

import tensorflow as tf
from sqlalchemy.orm import Session

from crud import place as place_crud
from crud import user_favorite_category as user_favorite_category_crud
from models import place as place_models
from .internal import brute_force_recommender

ML_CATEGORY_NAMES_MAPPER = {
    "artgallery": "Art galleries",
    "beaches": "Beaches",
    "mall": "Malls and shops",
    "museums": "Museums",
    "parks": "Parks",
    "pubs_bars": "Pubs and bars",
    "resorts": "Resorts",
    "restaurants": "Restaurants",
    "theatres": "Theaters",
    "zoo": "Zoos",
}

counter = 0


def get_user_recommended_places(
        session: Session,
        user_id: uuid.UUID
) -> list[place_models.Place]:
    user_favorite_categories = user_favorite_category_crud.get_favorite_categories(session, user_id)
    user_db_favorite_category_names = [category.name for category in user_favorite_categories]
    data = dict()
    data["user_id"] = random.randint(1, 1000)
    data["user_rating"] = 1
    data["title"] = "Ostro"
    for ml_category_name, db_category_name in ML_CATEGORY_NAMES_MAPPER.items():
        if db_category_name in user_db_favorite_category_names:
            data[ml_category_name] = 10
        else:
            data[ml_category_name] = 0

    ml_data = {key: tf.constant([value]) for (key, value) in data.items()}

    _, titles = brute_force_recommender(ml_data, k=30)
    place_names = list(set(
        [title.numpy().decode("utf-8") for title in titles[0]]
    ))

    places = []
    for place_name in place_names:
        place = place_crud.get_place_by_name(session, place_name)
        if place:
            places.append(place)

    return places
