import uuid

from pydantic import BaseModel


class FavoriteCategories(BaseModel):
    category_ids: list[uuid.UUID]

    class Config:
        orm_mode = True
