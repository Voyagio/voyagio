from pydantic import BaseModel


class SearchSuggestion(BaseModel):
    value: str
