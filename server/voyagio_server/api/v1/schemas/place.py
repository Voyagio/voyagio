import uuid

from pydantic import BaseModel
from typing import Optional
from .address import AddressResponse, AddressCreate
from models.place import Place as place_model


class PlaceCreate(BaseModel):
    name: str
    categories_id: list[uuid.UUID]
    address: AddressCreate
    image_url: Optional[str]
    rating: Optional[float]


class PlaceResponse(BaseModel):
    name: str
    category: list
    address: AddressResponse
    image_url: Optional[str]
    rating: Optional[float]
    id: uuid.UUID
    def fromModel(place: place_model):
        address_param = None
        if place.address is not None:
            address_param = AddressResponse(id=place.address.id, lat=place.address.lat, lon=place.address.lon,
                                            value=place.address.value)
        return PlaceResponse(id=place.id, name=place.name, address=address_param, category=place.categories)
