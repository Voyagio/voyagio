import uuid

from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Relationship

from database import Base
from .place_category import place_category
from .category import Category


class Place(Base):
    __tablename__ = "places"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    image_url = Column(String)
    rating = Column(Float, default=0)
    address_id = Column(UUID(as_uuid=True), ForeignKey("adresses.id"))
    categories = Relationship('Category', secondary='place_category', backref='places')
