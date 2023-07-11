import uuid

from sqlalchemy import Table, Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Relationship

from database import Base

CollectionPlace = Table('collection_place', Base.metadata,
                        Column('collection_id', UUID, ForeignKey('collections.id')),
                        Column('place_id', UUID, ForeignKey('places.id')))


class Collection(Base):
    __tablename__ = "collections"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    image_url = Column(String)
    places = Relationship('Place', secondary='collection_place')
    description = Column(String, nullable=False, default="")