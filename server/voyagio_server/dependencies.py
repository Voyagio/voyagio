import uuid

from models import user as user_models


def get_current_user() -> user_models.User:
    user_id = uuid.UUID("b0322811-b1fd-420e-b8d3-afdc31cc7ec7")
    return user_models.User(user_id=user_id, email="mail@example.org")
