import uuid

from pydantic import BaseModel


class SearchSuggestion(BaseModel):
    value: str


class CategoryFilter(BaseModel):
    category_ids: list[uuid.UUID]


class RatingFilter(BaseModel):
    min_rating: float = 0.0
    max_rating: float = 5.0


class SearchFilter(BaseModel):
    category_filter: CategoryFilter = CategoryFilter(category_ids=[])
    rating_filter: RatingFilter = RatingFilter(min_rating=0.0, max_rating=5.0)
