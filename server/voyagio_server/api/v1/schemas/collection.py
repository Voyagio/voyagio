import uuid

from pydantic import BaseModel, validator

from .user import User


class CollectionBase(BaseModel):
    id: uuid.UUID
    name: str
    # author: User | None
    image_url: str | None
    description: str = ""

    class Config:
        orm_mode = True


class CollectionCreate(BaseModel):
    name: str
    description: str = ""
    image_url: str | None


class CollectionUpdate(CollectionCreate):
    pass


class Collection(CollectionBase):
    pass


class CollectionAddPlace(BaseModel):
    place_id: uuid.UUID
