import axios from 'axios';

export interface CategoryDTO {
  id: string
  name: string
  image_url: string
}

export type CategoriesDTO = CategoryDTO[];

export const getCategories = async () => {
  const result = await axios.get<CategoriesDTO>(`${import.meta.env.VITE_API_URL}/v1/categories?offset=0&limit=100`);
  return result.data;
};
