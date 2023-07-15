import json

import requests

API_BASE = "http://127.0.0.1:8000/v1"
DATA_DIRECTORY = "data"


def data_path_builder(*path: str) -> str:
    return DATA_DIRECTORY + "/" + "/".join(path)


def api_url_builder(*path: str) -> str:
    return API_BASE + "/" + "/".join(path)


def find_category_id(name: str) -> str | None:
    response = requests.get(api_url_builder("categories"))
    categories_data = response.json()
    for category_data in categories_data:
        if category_data["name"] == name:
            return category_data["id"]
    return None


def create_category(name: str, image_url: str) -> str:
    response = requests.post(api_url_builder("categories"), json={
        "name": name,
        "image_url": image_url
    })
    print(f"Category {name} created")
    return response.json()["id"]


def find_city_id(name: str) -> str | None:
    response = requests.get(api_url_builder("cities"))
    cities_data = response.json()
    for city_data in cities_data:
        if city_data["name"] == name:
            return city_data["id"]
    return None


def create_city(name: str) -> str:
    response = requests.post(api_url_builder("cities"), json={
        "name": name
    })
    print(f"City {name} created")
    return response.json()["id"]


def create_place(
        name: str,
        category_id: str,
        image_url: str,
        rating: float,
        city_id: str,
        address: str,
        lat: float,
        lon: float
) -> str:
    response = requests.post(api_url_builder("places"), json={
        "name": name,
        "category_id": category_id,
        "image_url": image_url,
        "rating": rating,
        "address": {
            "city_id": city_id,
            "value": address,
            "lat": lat,
            "lon": lon
        }
    })
    print(f"Place {name} created")
    return response.json()["id"]


def populate_category_places(
        category_name: str,
        category_image_url: str,
        category_places_filename: str
) -> None:
    with open(data_path_builder(category_places_filename)) as f:
        data = json.load(f)

    category_id = find_category_id(category_name)
    if not category_id:
        category_id = create_category(category_name, category_image_url)

    for place_data in data:
        city_name = place_data["city"]
        if not city_name:
            continue
        image_url = place_data["imageUrls"][0] if place_data["imageUrls"] else None
        if not image_url:
            continue
        rating = place_data["totalScore"]
        if not rating:
            continue
        street = place_data["street"]
        if not street:
            continue

        city_id = find_city_id(city_name)
        if not city_id:
            city_id = create_city(city_name)
        create_place(
            name=place_data["title"],
            category_id=category_id,
            image_url=image_url,
            rating=rating,
            city_id=city_id,
            address=street,
            lat=place_data["location"]["lat"],
            lon=place_data["location"]["lng"]
        )


populate_category_places(
    category_name="Art galleries",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_art_galleries.svg",
    category_places_filename="artgalleries.json"
)
populate_category_places(
    category_name="Beaches",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_beaches.svg",
    category_places_filename="beaches.json"
)
populate_category_places(
    category_name="Malls and shops",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_malls_and_shops.svg",
    category_places_filename="mall.json"
)
populate_category_places(
    category_name="Museums",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_museums.svg",
    category_places_filename="museums.json"
)
populate_category_places(
    category_name="Parks",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_parks.svg",
    category_places_filename="parks.json"
)
populate_category_places(
    category_name="Pubs and bars",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_pubs_and_bars.svg",
    category_places_filename="pubs-bars.json"
)
populate_category_places(
    category_name="Restaurants",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_restaurants.svg",
    category_places_filename="restaurants.json"
)
populate_category_places(
    category_name="Theaters",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_theaters.svg",
    category_places_filename="theatres.json"
)
populate_category_places(
    category_name="Zoos",
    category_image_url="https://github.com/Voyagio/voyagio/raw/main/static/category_zoos.svg",
    category_places_filename="zoo.json"
)
