FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /env
RUN pip install poetry
COPY poetry.lock pyproject.toml /env/
RUN poetry config virtualenvs.create false && poetry install

COPY . /source

WORKDIR /source/voyagio_server

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

EXPOSE 8000