import uuid

from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID

from database import Base


class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    image_url = Column(String)
