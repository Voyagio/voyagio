from fastapi.applications import FastAPI

from .routers.category import category_router
from .routers.city import city_router
from .routers.collection import collections_router
from .routers.place import places_router
from .routers.user import users_router
from .routers.search import search_router
from .routers.user_favorite_category import user_favorite_category_router


def get_app() -> FastAPI:
    app = FastAPI()

    app.include_router(users_router)
    app.include_router(places_router)
    app.include_router(category_router)
    app.include_router(collections_router)
    app.include_router(city_router)
    app.include_router(search_router)
    app.include_router(user_favorite_category_router)
    return app
