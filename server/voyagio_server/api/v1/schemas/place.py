from __future__ import annotations

import uuid

from pydantic import BaseModel

from . import category as category_schema
from . import city as city_schema


class AddressCreate(BaseModel):
    lat: float
    lon: float
    city_id: uuid.UUID
    value: str


class Address(BaseModel):
    lat: float
    lon: float
    city: city_schema.City
    value: str

    class Config:
        orm_mode = True


class PlaceCreate(BaseModel):
    name: str
    category_id: uuid.UUID
    address: AddressCreate
    image_url: str
    rating: float


class Place(BaseModel):
    id: uuid.UUID
    name: str
    category: category_schema.Category
    address: Address
    image_url: str
    rating: float

    class Config:
        orm_mode = True
