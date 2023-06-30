import uuid

from pydantic import BaseModel


class CityCreate(BaseModel):
    name: str


class City(BaseModel):
    id: uuid.UUID
    name: str

    class Config:
        orm_mode = True
