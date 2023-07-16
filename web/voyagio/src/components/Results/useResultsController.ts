import { RouterParams } from '/src/app/root';
import { useResults } from '/src/components/Results/api';
import { useUserData } from '/src/pages/PersonalAccount/api';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useRecommendedCollections } from './api/useRecommendedCollections';

export interface FilterState {
  category_filter: {
    category_ids: string[],
  },
  rating_filter: {
    min_rating: number,
    max_rating: number,
  }
}

export const useResultsController = () => {
  const params = useParams<RouterParams>();

  const cityName = params.query || 'Kazan';

  const {
    collections, favorites, fetchUserData,
  } = useUserData();

  const [filterOpened, setFilterOpened] = useState(false);
  const [currentFilterState, setCurrentFilterState] = useState<FilterState>({
    category_filter: {
      category_ids: [],
    },
    rating_filter: {
      min_rating: 0,
      max_rating: 5,
    },
  });
  const { recommendations } = useRecommendedCollections(cityName);
  const {
    results,
  } = useResults(cityName, currentFilterState);

  const handleFilterOpen = () => {
    setFilterOpened(true);
  };

  const handleFilterClose = () => {
    setFilterOpened(false);
  };

  const handleFilterChange = (newFilter: FilterState) => {
    setCurrentFilterState(newFilter);
  };

  return {
    collections,
    favorites,
    fetchUserData,
    results,
    cityName,
    filterOpened,
    currentFilterState,
    handleFilterOpen,
    handleFilterClose,
    handleFilterChange,
    recommendations,
  } as const;
};
