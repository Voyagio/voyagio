from pydantic import BaseModel


class AddressCreate(BaseModel):
    lat: float
    lon: float
    value: str


class AddressResponse(BaseModel):
    lat: float
    lon: float
    value: str
