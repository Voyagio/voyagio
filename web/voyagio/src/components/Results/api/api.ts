import axios from 'axios';

export interface ResultDTO {
  id: string
  name: string
  category: {
    id: string
    name: string
  }
  address: {
    lat: number
    lon: number
    city: {
      id: string
      name: string
    }
    value: string
  }
  image_url: string
  rating: number
}

type ResultsDTO = ResultDTO[];

export const getResults = async (searchQuery: string) => {
  const result = await axios.get<ResultsDTO>(`${import.meta.env.VITE_API_URL}/v1/search/results/${searchQuery}`);
  return result.data;
};
