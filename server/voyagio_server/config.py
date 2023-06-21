import os


class Config:
    POSTGRES_CONNECTION_STRING = os.getenv(
        "POSTGRES_CONNECTION_STRING", "postgresql+psycopg2://postgres:postgres@localhost:5432/voyagio-server"
    )
