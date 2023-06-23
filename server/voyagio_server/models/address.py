import uuid

from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from database import Base


class Address(Base):
    __tablename__ = "adresses"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    value = Column(String, nullable=False)
    places = relationship("Place", backref='address')
