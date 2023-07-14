import axios from 'axios';
import { CollectionDTO } from '/src/pages/PersonalAccount/api/api';

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

export interface Filter {
  category_filter: {
    category_ids: string[];
  };
  rating_filter: {
    min_rating: number;
    max_rating: number;
  };
}

type ResultsDTO = ResultDTO[];
type CollectionsDTO = CollectionDTO[];

const defaultFilter: Filter = {
  category_filter: {
    category_ids: [],
  },
  rating_filter: {
    min_rating: 0,
    max_rating: 5,
  },
};

export const getResults = async (
  searchQuery: string,
  filter = defaultFilter
) => {
  const result = await axios.post<ResultsDTO>(
    `${import.meta.env.VITE_API_URL}/v1/search/places/${searchQuery}`,
    filter
  );
  return result.data;
};

export const getRecommendedCollections = async (searchQuery: string) => {
  const response = await axios.post<CollectionsDTO>(
    `${import.meta.env.VITE_API_URL}/v1/search/recommendations/${searchQuery}`,
    { withCredentials: true }
  );

  return response.data;
};
