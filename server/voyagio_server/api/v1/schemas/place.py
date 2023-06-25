from __future__ import annotations

import uuid

from pydantic import BaseModel
from typing import Optional
from .address import AddressResponse, AddressCreate
from models.place import Place as place_model


class PlaceCreate(BaseModel):
    name: str
    categories_id: list[uuid.UUID]
    address: AddressCreate
    image_url: str
    rating: float


class Place(BaseModel):
    id: uuid.UUID
    name: str
    category: list
    address: AddressResponse
    image_url: str
    rating: float

    @staticmethod
    def from_model(place: place_model) -> Place:
        address_param = None
        if place.address is not None:
            address_param = AddressResponse(id=place.address.id, lat=place.address.lat, lon=place.address.lon,
                                            value=place.address.value)
        return Place(id=place.id, name=place.name, address=address_param, category=place.categories, image_url=place.image_url, rating=place.rating)
