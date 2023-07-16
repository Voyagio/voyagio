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

type ResultsDTO = ResultDTO[];
type CollectionsDTO = CollectionDTO[];

export const getResults = async (searchQuery: string, filterState: FilterState) => {
  const result = await axios.post<ResultsDTO>(`${import.meta.env.VITE_API_URL}/v1/search/places/${searchQuery}?limit=20`, {
    ...filterState,
  });
  return result.data;
};

export const getRecommendedCollections = async (searchQuery: string) => {
  const response = await axios.post<CollectionsDTO>(
    `${import.meta.env.VITE_API_URL}/v1/search/recommendations/${searchQuery}`,
    {},
    { withCredentials: true },
  );

  return response.data;
};
