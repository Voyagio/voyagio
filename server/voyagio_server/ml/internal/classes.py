# import os
# os.chdir("ml")

from typing import Dict, Text, Tuple, Any
import tensorflow as tf
import tensorflow_recommenders as tfrs
import numpy as np
import pandas as pd


class UserModel(tf.keras.Model):

    def __init__(self, unique_user_ids, artgallery_buckets, beaches_buckets, mall_buckets, museums_buckets,
                 parks_buckets, pubs_bars_buckets, resorts_buckets, theatres_buckets, zoo_buckets, restaurants_buckets,
                 rating_buckets, ratings):
        super().__init__()

        self.unique_user_ids = unique_user_ids
        self.artgallery_buckets = artgallery_buckets
        self.beaches_buckets = beaches_buckets
        self.mall_buckets = mall_buckets
        self.museums_buckets = museums_buckets
        self.parks_buckets = parks_buckets
        self.pubs_bars_buckets = pubs_bars_buckets
        self.resorts_buckets = resorts_buckets
        self.theatres_buckets = theatres_buckets
        self.zoo_buckets = zoo_buckets
        self.restaurants_buckets = restaurants_buckets
        self.rating_buckets = rating_buckets
        self.ratings = ratings

        max_tokens = 100000

        self.user_embedding = tf.keras.Sequential([
            tf.keras.layers.IntegerLookup(vocabulary=self.unique_user_ids, mask_token=None),
            tf.keras.layers.Embedding(len(self.unique_user_ids) + 1, 32)
        ])

        self.artgallery_embedding, self.artgallery_normalization = self.helper(self.artgallery_buckets,
                                                                               "artgallery")
        self.beaches_embedding, self.beaches_normalization = self.helper(self.beaches_buckets, "beaches")
        self.mall_embedding, self.mall_normalization = self.helper(self.mall_buckets, "mall")
        self.museums_embedding, self.museums_normalization = self.helper(self.museums_buckets, "museums")
        self.parks_embedding, self.parks_normalization = self.helper(self.parks_buckets, "parks")
        self.pubs_bars_embedding, self.pubs_bars_normalization = self.helper(self.pubs_bars_buckets, "pubs_bars")
        self.resorts_embedding, self.resorts_normalization = self.helper(self.resorts_buckets, "resorts")
        self.theatres_embedding, self.theatres_normalization = self.helper(self.theatres_buckets, "theatres")
        self.zoo_embedding, self.zoo_normalization = self.helper(self.zoo_buckets, "zoo")
        self.restaurants_embedding, self.restaurants_normalization = self.helper(self.restaurants_buckets,
                                                                                 "restaurants")
        self.rating_embedding, self.rating_normalization = self.helper(self.rating_buckets, "user_rating")

    def helper(self, buckets, feature_name: str):
        embedding = tf.keras.Sequential([
            tf.keras.layers.Discretization(buckets.tolist()),
            tf.keras.layers.Embedding(len(buckets) + 1, 32)
        ])
        normalized = tf.keras.layers.Normalization(
            axis=None
        )

        normalized.adapt(self.ratings.map(lambda x: x[feature_name]).batch(128))

        return embedding, normalized

    def call(self, inputs):
        return tf.concat([
            self.user_embedding(inputs["user_id"]),
            self.restaurants_embedding(inputs["restaurants"]),
            tf.reshape(self.restaurants_normalization(inputs["restaurants"]), (-1, 1)),
            self.rating_embedding(inputs["user_rating"]),
            tf.reshape(self.rating_normalization(inputs["user_rating"]), (-1, 1)),
            self.artgallery_embedding(inputs["artgallery"]),
            tf.reshape(self.artgallery_normalization(inputs["artgallery"]), (-1, 1)),
            self.beaches_embedding(inputs["beaches"]),
            tf.reshape(self.beaches_normalization(inputs["beaches"]), (-1, 1)),
            self.mall_embedding(inputs["mall"]),
            tf.reshape(self.mall_normalization(inputs["mall"]), (-1, 1)),
            self.museums_embedding(inputs["museums"]),
            tf.reshape(self.museums_normalization(inputs["museums"]), (-1, 1)),
            self.parks_embedding(inputs["parks"]),
            tf.reshape(self.parks_normalization(inputs["parks"]), (-1, 1)),
            self.pubs_bars_embedding(inputs["pubs_bars"]),
            tf.reshape(self.pubs_bars_normalization(inputs["pubs_bars"]), (-1, 1)),
            self.resorts_embedding(inputs["resorts"]),
            tf.reshape(self.resorts_normalization(inputs["resorts"]), (-1, 1)),
            self.theatres_embedding(inputs["theatres"]),
            tf.reshape(self.theatres_normalization(inputs["theatres"]), (-1, 1)),
            self.zoo_embedding(inputs["zoo"]),
            tf.reshape(self.zoo_normalization(inputs["zoo"]), (-1, 1)),
        ], axis=1)


class QueryModel(tf.keras.Model):

    def __init__(self,
                 unique_user_ids,
                 artgallery_buckets,
                 beaches_buckets, mall_buckets, museums_buckets,
                 parks_buckets,
                 pubs_bars_buckets,
                 resorts_buckets,
                 theatres_buckets,
                 zoo_buckets,
                 restaurants_buckets,
                 rating_buckets,
                 ratings,
                 layer_sizes=None):

        super().__init__()

        if layer_sizes is None:
            layer_sizes = [64, 32]

        self.embedding_model = UserModel(unique_user_ids,
                                              artgallery_buckets,
                                              beaches_buckets,
                                              mall_buckets,
                                              museums_buckets,
                                              parks_buckets,
                                              pubs_bars_buckets,
                                              resorts_buckets,
                                              theatres_buckets,
                                              zoo_buckets,
                                              restaurants_buckets,
                                              rating_buckets,
                                              ratings)

        self.dense_layers = tf.keras.Sequential()
        for layer_size in layer_sizes[:-1]:
            self.dense_layers.add(tf.keras.layers.Dense(layer_size, activation="relu"))
        for layer_size in layer_sizes[-1:]:
            self.dense_layers.add(tf.keras.layers.Dense(layer_size))

    def call(self, inputs: tf.Tensor) -> tf.Tensor:
        feature_embedding = self.embedding_model(inputs)
        return self.dense_layers(feature_embedding)


class PlaceModel(tf.keras.Model):

    def __init__(self,
                 unique_place_titles,
                 places):
        super().__init__()
        self.unique_place_titles = unique_place_titles
        self.places = places

        max_tokens = 10_000

        self.title_embedding = tf.keras.Sequential([
            tf.keras.layers.StringLookup(
                vocabulary=self.unique_place_titles, mask_token=None),
            tf.keras.layers.Embedding(len(self.unique_place_titles) + 1, 32)
        ])
        self.title_vectorizer = tf.keras.layers.TextVectorization(
            max_tokens=max_tokens)

        self.title_text_embedding = tf.keras.Sequential([
            self.title_vectorizer,
            tf.keras.layers.Embedding(max_tokens, 32, mask_zero=True),
            tf.keras.layers.GlobalAveragePooling1D(),
        ])
        self.title_vectorizer.adapt(self.places)

    def call(self, titles):
        return tf.concat([
            self.title_embedding(titles),
            self.title_text_embedding(titles),
        ], axis=1)


class CandidateModel(tf.keras.Model):

    def __init__(self,
                 unique_place_titles,
                 places,
                 layer_sizes=None):
        super().__init__()

        if layer_sizes is None:
            layer_sizes = [64, 32]
        self.embedding_model = PlaceModel(unique_place_titles, places)

        # Then construct the layers.
        self.dense_layers = tf.keras.Sequential()

        # Use the ReLU activation for all but the last layer.
        for layer_size in layer_sizes[:-1]:
            self.dense_layers.add(tf.keras.layers.Dense(layer_size, activation="relu"))

        # No activation for the last layer.
        for layer_size in layer_sizes[-1:]:
            self.dense_layers.add(tf.keras.layers.Dense(layer_size))

    def call(self, inputs):
        feature_embedding = self.embedding_model(inputs)
        return self.dense_layers(feature_embedding)


class CombinedModel(tfrs.models.Model):

    def __init__(self, rating_weight: float,
                 retrieval_weight: float,
                 unique_user_ids,
                 artgallery_buckets,
                 beaches_buckets,
                 mall_buckets,
                 museums_buckets,
                 parks_buckets,
                 pubs_bars_buckets,
                 resorts_buckets,
                 theatres_buckets,
                 zoo_buckets,
                 restaurants_buckets,
                 rating_buckets,
                 ratings,
                 unique_place_titles,
                 places):
        super().__init__()
        self.places = places
        self.ratings = ratings

        self.query_model = QueryModel(unique_user_ids,
                                      artgallery_buckets,
                                      beaches_buckets,
                                      mall_buckets,
                                      museums_buckets,
                                      parks_buckets,
                                      pubs_bars_buckets,
                                      resorts_buckets,
                                      theatres_buckets,
                                      zoo_buckets,
                                      restaurants_buckets,
                                      rating_buckets,
                                      ratings,
                                      )

        self.candidate_model = CandidateModel(unique_place_titles, places)

        self.rating_model = tf.keras.Sequential([
            tf.keras.layers.Dense(256, activation="relu"),
            tf.keras.layers.Dense(128, activation="relu"),
            tf.keras.layers.Dense(1),
        ])
        self.task = tfrs.tasks.Retrieval(
            metrics=tfrs.metrics.FactorizedTopK(
                candidates=self.places.batch(128).map(self.candidate_model),
            ),
        )
        # The tasks.
        self.rating_task = tfrs.tasks.Ranking(
            loss=tf.keras.losses.MeanSquaredError(),
            metrics=[tf.keras.metrics.RootMeanSquaredError()],
        )
        self.retrieval_task = tfrs.tasks.Retrieval(
            metrics=tfrs.metrics.FactorizedTopK(
                candidates=self.places.batch(128).map(self.candidate_model)
            )
        )

        # The loss weights.
        self.rating_weight = rating_weight
        self.retrieval_weight = retrieval_weight

    def compute_loss(self, features: Dict[Text, tf.Tensor], training=False) -> tf.Tensor:
        ratings_popped = features.get("user_rating")

        user_embeddings, place_embeddings, rating_predictions = self(features)

        # We compute the loss for each task.
        rating_loss = self.rating_task(
            labels=ratings_popped,
            predictions=rating_predictions,
        )
        retrieval_loss = self.retrieval_task(user_embeddings, place_embeddings)

        # And combine them using the loss weights.
        return (self.rating_weight * rating_loss
                + self.retrieval_weight * retrieval_loss)

    def call(self, features: Dict[Text, tf.Tensor]) -> Tuple[tf.Tensor, tf.Tensor, tf.Tensor]:
        # We first compute the embeddings.
        query_embeddings = self.query_model({
            "user_id": features["user_id"],
            "artgallery": features["artgallery"],
            "beaches": features["beaches"],
            "mall": features["mall"],
            "museums": features["museums"],
            "parks": features["parks"],
            "pubs_bars": features["pubs_bars"],
            "resorts": features["resorts"],
            "restaurants": features["restaurants"],
            "theatres": features["theatres"],
            "zoo": features["zoo"],
            "user_rating": features["user_rating"]
        })

        place_embeddings = self.candidate_model(features["title"])

        # And then compute the predictions.
        rating_predictions = self.rating_model(tf.concat([query_embeddings, place_embeddings], axis=1))

        return query_embeddings, place_embeddings, rating_predictions


class MODELS:

    def __init__(self):
        self.ratings = pd.read_csv("ratings_features_user_place_222222.csv")
        self.ratings = self.ratings.rename(columns={"place_title": "title"})
        self.places = pd.read_csv("places_new.csv")

        tf.random.set_seed(42)
        self.max_user_id = self.ratings["user_id"].max()

        # convert the ratings dataframe to tf dataset
        self.ratings = tf.data.Dataset.from_tensor_slices(dict(self.ratings))
        self.places = tf.data.Dataset.from_tensor_slices(dict(self.places))

        self.ratings = self.ratings.map(lambda x: {
            'artgallery': x['artgallery'],
            'beaches': x['beaches'],
            'mall': x['mall'],
            'museums': x['museums'],
            'parks': x['parks'],
            'pubs_bars': x['pubs_bars'],
            'resorts': x['resorts'],
            'restaurants': x['restaurants'],
            'theatres': x['theatres'],
            'title': x['title'],
            'user_id': x['user_id'],
            'user_rating': x['user_rating'],
            'zoo': x['zoo']
        })

        self.places = self.places.map(lambda x: x['title'])

        self.unique_user_ids = np.unique(np.concatenate(list(self.ratings.batch(1_000).map(lambda x: x["user_id"]))))
        self.unique_place_titles = np.unique(np.concatenate(list(self.ratings.batch(1_000).map(lambda x: x["title"]))))

        def make_buckets(feature_name: str, dataset) -> tf.feature_column.numeric_column:
            normalization = tf.keras.layers.experimental.preprocessing.Normalization(axis=None)
            normalization.adapt(dataset.map(lambda x: x[feature_name]).batch(1024))

            max = dataset.map(lambda x: x[feature_name]).reduce(
                tf.cast(0, tf.float64), tf.maximum).numpy().max()
            min = dataset.map(lambda x: x[feature_name]).reduce(
                np.float64(1e9), tf.minimum).numpy().min()

            buckets = np.linspace(
                min, max, num=1000)

            return buckets

        self.artgallery_buckets = make_buckets("artgallery", self.ratings)
        self.beaches_buckets = make_buckets("beaches", self.ratings)
        self.mall_buckets = make_buckets("mall", self.ratings)
        self.museums_buckets = make_buckets("museums", self.ratings)
        self.parks_buckets = make_buckets("parks", self.ratings)
        self.pubs_bars_buckets = make_buckets("pubs_bars", self.ratings)
        self.resorts_buckets = make_buckets("resorts", self.ratings)
        self.restaurants_buckets = make_buckets("restaurants", self.ratings)
        self.theatres_buckets = make_buckets("theatres", self.ratings)
        self.rating_buckets = make_buckets("user_rating", self.ratings)
        self.zoo_buckets = make_buckets("zoo", self.ratings)

        self.CombinedModel = CombinedModel(
            rating_weight=1.0,
            retrieval_weight=1.0,
            unique_user_ids=self.unique_user_ids,
            unique_place_titles=self.unique_place_titles,
            artgallery_buckets=self.artgallery_buckets,
            beaches_buckets=self.beaches_buckets,
            mall_buckets=self.mall_buckets,
            museums_buckets=self.museums_buckets,
            parks_buckets=self.parks_buckets,
            pubs_bars_buckets=self.pubs_bars_buckets,
            resorts_buckets=self.resorts_buckets,
            restaurants_buckets=self.restaurants_buckets,
            theatres_buckets=self.theatres_buckets,
            rating_buckets=self.rating_buckets,
            zoo_buckets=self.zoo_buckets,
            places=self.places,
            ratings=self.ratings
        )
