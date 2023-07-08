import json

import requests
from api.v1.schemas.city import City
from api.v1.schemas.place import AddressCreate, PlaceCreate
from pydantic import parse_obj_as

CITY_ID = "8f4ef6bd-fe45-4556-82ac-8bb7857ffa92"
# IP = "http://193.164.149.95:8000/v1"
IP = "http://localhost:8000/v1"
ip = "http://193.164.149.95:8000/v1/categories"
FILENAMES = ["artgalleries.json",
             "beaches.json",
             "mall.json",
             "museums.json",
             "parks.json",
             "pubs-bars.json",
             "Resorts.json",
             "restaurants.json",
             "theatres.json",
             "zoo.json"]

d = requests.get(IP + '/categories', params={'limit': 1000}).json()


def get_category_id_by_name(category):
    id = -1
    if category is None:
        print('kek')
        category = 'undef'
    for db_category in d:
        if db_category['name'] == category:
            id = db_category['id']
            break

    if id == -1:
        elem = requests.post(IP + '/categories', json={'name': category}).json()
        d.append({'id': elem['id'], 'name': elem['name']})
        id = elem['id']
    return id


for filename in FILENAMES:
    with open("raw_data/" + filename, encoding="utf-8") as src:
        data = json.loads(src.read())
        data = json.dumps(data, ensure_ascii=False)
        data = json.loads(data)
        places = []
        for place in data:
            value = ','.join(place['address'].split(',')[:-1])
            address = AddressCreate(lat=place['location']['lat'], lon=place['location']['lng'], value=value,
                                    city_id=CITY_ID)

            category_id = get_category_id_by_name(place['categoryName'])
            total_score = 0 if place['totalScore'] is None else place['totalScore']
            url = "" if len(place['imageUrls']) == 0 else place["imageUrls"][0]
            mem = PlaceCreate(name=place['title'], address=address, category_id=category_id, image_url=url,
                              rating=total_score)

            snd = {"name": place['title'],
                   "address": {"lat": place['location']['lat'], "lon": place['location']['lng'], "value": value,
                               "city_id": CITY_ID},
                   "category_id": get_category_id_by_name(place['categoryName']),
                   "image_url": url, "rating": total_score}
            print(json.dumps(snd, ensure_ascii=False, indent=4))
            kek = requests.post(IP+"/places", json=snd).json()