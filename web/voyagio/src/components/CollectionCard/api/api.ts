import axios from 'axios';

export interface CollectionPlaceDTO {
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

type CollectionPlacesDTO = CollectionPlaceDTO[];

export const getCollectionPlaces = async (id: string) => {
  const res = await axios.get<CollectionPlacesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/collections/${id}/places`
  );
  return res.data;
};
