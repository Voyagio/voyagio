from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import setup_database
from api.v1 import app as app_v1

setup_database()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/v1", app_v1.get_app())
