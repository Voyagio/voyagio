import { CategoriesDTO } from '/src/components/Filter/api/api.ts';
import axios from 'axios';

export const getUserInterests = async () => {
  const collectionResponse = await axios.get<CategoriesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/favorite-categories`,
    { withCredentials: true },
  );

  return collectionResponse.data;
};

export const putUserInterests = async (ids: string[]) => {
  const collectionResponse = await axios.put<CategoriesDTO>(
    `${import.meta.env.VITE_API_URL}/v1/favorite-categories`,
    { category_ids: ids },
    { withCredentials: true },
  );

  return collectionResponse.data;
};
