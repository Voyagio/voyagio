import axios from 'axios';

export interface FavouriteDTO {
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
  image_url: string;
}

export interface UserCredentials {
  id: string;
  email: string;
}

type FavouritesDTO = FavouriteDTO[];
type CollectionsDTO = CollectionDTO[];

export const getFavourites = async (): Promise<FavouritesDTO> => {
  const collectionResponse = await axios.get<CollectionDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/favourites`,
    { withCredentials: true }
  );

  const collectionId = collectionResponse.data.id;

  const favouritesResponse = await axios.get<FavouritesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collctions/${collectionId}/places`,
    { withCredentials: true }
  );

  return favouritesResponse.data;
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
