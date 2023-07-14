import uuid

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String)
    favorites_collection_id = Column(UUID(as_uuid=True), ForeignKey("collections.id"))
    favorite_categories = Relationship('Category', secondary='user_favorite_category')

    def set_password(self, password: str):
        self.hashed_password = pbkdf2_sha256.hash(password)

    def verify_password(self, password: str):
        return pbkdf2_sha256.verify(password, self.hashed_password)
