from contextlib import contextmanager
from typing import Iterator

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy_utils import database_exists, create_database

from config import Config

SQLALCHEMY_DATABASE_URL = Config.POSTGRES_CONNECTION_STRING

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


def fetch_metadata():
    from models import user
    from models import place
    from models import city
    from models import category
    from models import collection
    from models import user_favorite_category

# noinspection PyUnresolvedReferences
def setup_database():
    if not database_exists(engine.url):
        create_database(engine.url)

    fetch_metadata()
    Base.metadata.create_all(bind=engine)


def get_session() -> Iterator[Session]:
    session: Session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
