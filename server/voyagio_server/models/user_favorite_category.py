from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from database import Base

UserFavoriteCategory = Table('user_favorite_category', Base.metadata,
                             Column('user_id', UUID, ForeignKey('users.id')),
                             Column('category_id', UUID, ForeignKey('categories.id')))
