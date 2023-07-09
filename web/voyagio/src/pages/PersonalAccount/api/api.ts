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

type FavouritesDTO = FavouriteDTO[];

export const getFavourites = async (): Promise<FavouritesDTO> => {
  const response = await axios.get<FavouritesDTO>(
    `${import.meta.env.VITE_API_URL}/collections/favourites`
  );
  return response.data;
};
