from fastapi.applications import FastAPI

from .routers.user import users_router


def get_app() -> FastAPI:
    app = FastAPI()

    app.include_router(users_router)

    return app
