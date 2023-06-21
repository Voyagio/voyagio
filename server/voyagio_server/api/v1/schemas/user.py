import uuid

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str


class UserSignup(UserBase):
    pass
