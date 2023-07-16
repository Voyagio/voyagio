import axios from 'axios';

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

export interface CollectionDTO {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface UserCredentials {
  id: string;
  email: string;
}

type FavoritesDTO = FavoriteDTO[];
type CollectionsDTO = CollectionDTO[];

export const getFavorites = async (): Promise<FavoritesDTO> => {
  const collectionResponse = await axios.get<CollectionDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/favorites`,
    { withCredentials: true }
  );

  const collectionId = collectionResponse.data.id;

  const favoritesResponse = await axios.get<FavoritesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places`,
    { withCredentials: true }
  );

  return favoritesResponse.data;
};

export const getUserCollections = async (): Promise<CollectionsDTO> => {
  const response = await axios.get<CollectionsDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections`,
    { withCredentials: true }
  );
  return response.data;
};

export const getUserCredentials = async (): Promise<UserCredentials> => {
  const response = await axios.get<UserCredentials>(
    `${import.meta.env.VITE_API_URL}/v1/users/me`,
    { withCredentials: true }
  );

  return response.data;
};
