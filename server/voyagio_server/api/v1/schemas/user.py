import uuid

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str
    
class User(UserBase):
    id: uuid.UUID

    class Config:
        orm_mode = True


class UserLogin(UserBase):
    password: str
