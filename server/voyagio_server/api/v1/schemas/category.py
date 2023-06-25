import uuid

from pydantic import BaseModel, Field


class Category(BaseModel):
    id: uuid.UUID
    name: str