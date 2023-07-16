import os
os.chdir("ml/internal")

import tensorflow as tf
import tensorflow_recommenders as tfrs

from classes import MODELS


# INITIALIZE MODEL once

def build() -> tfrs.layers.factorized_top_k.BruteForce:
    model = MODELS()
    combined_model = model.CombinedModel
    combined_model.load_weights('WEIGHTS_2l')
    brute_force_recommender = tfrs.layers.factorized_top_k.BruteForce(combined_model.query_model)
    brute_force_recommender.index_from_dataset(
        tf.data.Dataset.zip((model.places.batch(100),
                             model.places.batch(100).map(combined_model.candidate_model)))
    )
    return brute_force_recommender


brute_force_recommender = build()

# # USER INFO <-----------
#
# USER_INFO = {
#     "user_id": 1,
#     "artgallery": 0,
#     "beaches": 1.4,
#     "mall": 0,
#     "museums": 1,
#     "parks": 0,
#     "pubs_bars": 1,
#     "resorts": 0,
#     "restaurants": 1,
#     "theatres": 1,
#     "zoo": 1,
#     "user_rating": 1,
#     "title": "Ostro"
# }
#
# USER_INFO = {key: tf.constant([value]) for (key, value) in USER_INFO.items()}
#
# # RECOMMENDATION
#
# _, titles = brute_force_recommender(USER_INFO, k=30)
#
# LIST_TO_RETURN = []
#
# for title in titles[0]:
#     place_title = title.numpy().decode("utf-8")
#     LIST_TO_RETURN.append(place_title)
#
# # left only unique values
# LIST_TO_RETURN = list(set(LIST_TO_RETURN))
#
# print(LIST_TO_RETURN)

