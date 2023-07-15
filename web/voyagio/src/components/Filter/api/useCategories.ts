import { CategoriesDTO, getCategories } from '/src/components/Filter/api/api.ts';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoriesDTO>([]);

  const fetchCategories = async () => {
    setCategories(await getCategories());
  };

  useEffect(() => {
    fetchCategories().then();
  }, []);

  return { categories } as const;
};
