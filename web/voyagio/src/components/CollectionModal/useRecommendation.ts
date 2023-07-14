import { useContext } from 'react';
import { CollectionContext } from '/src/contexts/collectionContext';
import { saveRecommendation } from './api';

export const useRecommendation = () => {
  const { id, title, description, imageUrl } = useContext(CollectionContext);

  const handleSumbit = async () => {
    await saveRecommendation(id);
  };

  return { title, description, imageUrl, handleSumbit } as const;
};
