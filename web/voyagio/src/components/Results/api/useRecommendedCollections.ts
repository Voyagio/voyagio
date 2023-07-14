import { useEffect, useState } from 'react';
import { CollectionDTO } from '/src/pages/PersonalAccount/api/api';
import { getRecommendedCollections } from './api';

export const useRecommendedCollections = (searchQuery: string | undefined) => {
  const [recommendations, setRecommendations] = useState<CollectionDTO[]>([]);

  const fetchRecommendations = async (searchQuery: string) => {
    setRecommendations(await getRecommendedCollections(searchQuery));
  };

  useEffect(() => {
    if (searchQuery) fetchRecommendations(searchQuery).then();
  }, [searchQuery]);

  return { recommendations, fetchRecommendations } as const;
};
