import uuid

from pydantic import BaseModel, Field


class Category(BaseModel):
    id: uuid.UUID
    name: str

    class Config:
        orm_mode = True


class CategoryCreate(BaseModel):
    name: str
