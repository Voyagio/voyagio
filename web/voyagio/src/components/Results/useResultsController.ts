import { RouterParams } from '/src/app/root';
import { useResults } from '/src/components/Results/api';
import { useState } from 'react';
import { useParams } from 'react-router';

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
  const cityName = params.query;

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

  const {
    results, favourites, fetchFavourites,
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
    results,
    cityName,
    favourites,
    filterOpened,
    currentFilterState,
    handleFilterOpen,
    handleFilterClose,
    fetchFavourites,
    handleFilterChange,
  } as const;
};
