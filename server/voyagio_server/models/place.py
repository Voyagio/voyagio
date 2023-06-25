import uuid

from sqlalchemy import Table, Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Relationship

from database import Base


PlaceCategory = Table('place_category', Base.metadata,
                       Column('place_id', UUID, ForeignKey('places.id')),
                       Column('category_id', UUID, ForeignKey('categories.id')))


class Place(Base):
    __tablename__ = "places"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    image_url = Column(String)
    rating = Column(Float, default=0)
    address_id = Column(UUID(as_uuid=True), ForeignKey("adresses.id"))
    categories = Relationship('Category', secondary='place_category', backref='places')
