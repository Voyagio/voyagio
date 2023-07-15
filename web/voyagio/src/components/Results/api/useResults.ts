import {
  FavoriteDTO, getFavorites, getResults, ResultDTO,
} from '/src/components/Results/api/api.ts';
import { FilterState } from '/src/components/Results/useResultsController.ts';
import { useEffect, useState } from 'react';

export const useResults = (searchQuery: string | undefined, currentFilterState: FilterState) => {
  const [results, setResults] = useState<ResultDTO[]>([]);
  const [favourites, setFavourites] = useState<FavoriteDTO[]>([]);

  const fetchResults = async (newSearchQuery: string, filterState: FilterState) => {
    setResults(await getResults(newSearchQuery, filterState));
  };

  const fetchFavourites = async () => {
    setFavourites(await getFavorites());
  };

  useEffect(() => {
    if (searchQuery) fetchResults(searchQuery, currentFilterState).then();
  }, [searchQuery, currentFilterState]);

  useEffect(() => {
    fetchFavourites().then();
  }, []);

  return {
    results, favourites, fetchResults, fetchFavourites,
  } as const;
};
