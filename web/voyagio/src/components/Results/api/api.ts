import { FilterState } from '/src/components/Results/useResultsController.ts';
import { CollectionDTO } from '/src/pages/PersonalAccount/api/api.ts';
import axios from 'axios';

export interface ResultDTO {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  address: {
    lat: number;
    lon: number;
    city: {
      id: string;
      name: string;
    };
    value: string;
  };
  image_url: string;
  rating: number;
}

export interface FavoriteDTO {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  address: {
    lat: number;
    lon: number;
    city: {
      id: string;
      name: string;
    };
    value: string;
  };
  image_url: string;
  rating: number;
}

type FavoritesDTO = FavoriteDTO[];
type ResultsDTO = ResultDTO[];
type CollectionsDTO = CollectionDTO[];

export const getResults = async (searchQuery: string, filterState: FilterState) => {
  const result = await axios.post<ResultsDTO>(`${import.meta.env.VITE_API_URL}/v1/search/places/${searchQuery}`, {
    ...filterState,
  });
  return result.data;
};

export const getRecommendedCollections = async (searchQuery: string) => {
  const response = await axios.post<CollectionsDTO>(
    `${import.meta.env.VITE_API_URL}/v1/search/recommendations/${searchQuery}`
  );

  return response.data;
};

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

export const getFavorites = async (): Promise<FavoritesDTO> => {
  const collectionResponse = await axios.get<CollectionDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/favorites`,
    { withCredentials: true },
  );

  const collectionId = collectionResponse.data.id;

  const favoritesResponse = await axios.get<FavoritesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
    { withCredentials: true },
  );

  return favoritesResponse.data;
};
