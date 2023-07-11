import uuid

from pydantic import BaseModel, validator

from .user import User


class CollectionBase(BaseModel):
    id: uuid.UUID
    name: str
    # author: User | None
    image_url: str | None
    description: str | None

    @validator('description', always=True)
    def set_name(cls, description):
        if description is None: return ""
        return description

    class Config:
        orm_mode = True


class Collection(CollectionBase):
    pass


class CollectionAddPlace(BaseModel):
    place_id: uuid.UUID
