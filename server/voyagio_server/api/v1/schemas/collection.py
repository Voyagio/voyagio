import uuid

from pydantic import BaseModel

from .user import User


class CollectionBase(BaseModel):
    id: uuid.UUID
    name: str
    # author: User | None
    image_url: str | None

    class Config:
        orm_mode = True


class Collection(CollectionBase):
    pass


class CollectionAddPlace(BaseModel):
    place_id: uuid.UUID
