import uuid

from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class Place(Base):
    __tablename__ = "places"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    image_url = Column(String)
    rating = Column(Float, nullable=False, default=0)
    address_id = Column(UUID(as_uuid=True), ForeignKey("adresses.id"))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))

