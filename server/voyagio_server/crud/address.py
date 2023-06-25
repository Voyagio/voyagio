from sqlalchemy.orm import Session

from api.v1.schemas import address as address_schemas
from models import address as address_models


def create_address(session: Session, address: address_schemas.AddressCreate) -> address_models.Address:
    db_address = address_models.Address(lat=address.lat, lon=address.lon, value=address.value)
    session.add(db_address)
    session.commit()
    session.refresh(db_address)
    return db_address
