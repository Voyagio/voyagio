import uuid

from sqlalchemy import Column, String, Float, ForeignKey, Table, Integer
from sqlalchemy.dialects.postgresql import UUID
from database import Base

place_category = Table('place_category', Base.metadata,
                       Column('place_id', UUID, ForeignKey('places.id')),
                       Column('category_id', UUID, ForeignKey('categories.id')))
