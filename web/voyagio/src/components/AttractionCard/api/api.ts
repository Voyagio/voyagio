import { CollectionDTO } from '/src/pages/PersonalAccount/api/api.ts';
import axios from 'axios';

export const addFavorite = async (placeId: string) => {
  const collectionResponse = await axios.get<CollectionDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/favorites`,
    { withCredentials: true },
  );

  const collectionId = collectionResponse.data.id;

  const favoritesResponse = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
    { place_id: placeId },
    { withCredentials: true },
  );

  return favoritesResponse.data;
};

export const deleteFavorite = async (placeId: string) => {
  const collectionResponse = await axios.get<CollectionDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/favorites`,
    { withCredentials: true },
  );

  const collectionId = collectionResponse.data.id;

  const favoritesResponse = await axios.delete(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
    { data: { place_id: placeId }, withCredentials: true },
  );

  return favoritesResponse.data;
};

export const addInCollection = async (collectionId: string, placeId: string) => axios.post(
  `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
  { place_id: placeId },
  { withCredentials: true },
);

export const removeFromCollection = async (collectionId: string, placeId: string) => axios.delete(
  `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
  { data: { place_id: placeId }, withCredentials: true },
);

export const getCollectionsOfPlace = async (placeId: string) => {
  const response = await axios.get<CollectionDTO[]>(
    `${import.meta.env.VITE_API_URL}/v1/places/${placeId}/collections`,
    { withCredentials: true },
  );

  return response.data;
};
