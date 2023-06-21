from fastapi import FastAPI

from database import setup_database
from api.v1 import app as app_v1

setup_database()

app = FastAPI()

app.mount("/v1", app_v1.get_app())
