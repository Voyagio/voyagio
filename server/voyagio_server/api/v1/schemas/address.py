import uuid

from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy.dialects.postgresql import UUID


class AddressCreate(BaseModel):
    lat: float
    lon: float
    value: str


class AddressResponse(BaseModel):
    lat: float
    lon: float
    value: str
    id: uuid.UUID
