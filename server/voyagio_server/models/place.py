import uuid

from sqlalchemy import Table, Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Relationship

from database import Base


class Address(Base):
    __tablename__ = "addresses"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    city_id = Column(UUID(as_uuid=True), ForeignKey("cities.id"))
    city = Relationship("City")
    value = Column(String, nullable=False)


class Place(Base):
    __tablename__ = "places"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    image_url = Column(String)
    rating = Column(Float, default=0)
    address_id = Column(UUID(as_uuid=True), ForeignKey("addresses.id"))
    address = Relationship("Address")
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    category = Relationship("Category")
