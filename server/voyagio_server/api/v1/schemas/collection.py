import uuid

from pydantic import BaseModel

from .user import User


class CollectionBase(BaseModel):
    id: uuid.UUID
    name: str
    author: User


class Collection(CollectionBase):
    pass


class CollectionAddPlace(BaseModel):
    place_id: uuid.UUID
