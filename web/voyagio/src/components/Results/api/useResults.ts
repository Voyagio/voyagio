import {
  getResults, ResultDTO,
} from '/src/components/Results/api/api.ts';
import { FilterState } from '/src/components/Results/useResultsController.ts';
import { useEffect, useState } from 'react';

export const useResults = (searchQuery: string | undefined, currentFilterState: FilterState) => {
  const [results, setResults] = useState<ResultDTO[]>([]);

  const fetchResults = async (newSearchQuery: string, filterState: FilterState) => {
    setResults(await getResults(newSearchQuery, filterState));
  };

  useEffect(() => {
    if (searchQuery) fetchResults(searchQuery, currentFilterState).then();
  }, [searchQuery, currentFilterState]);

  return {
    results, fetchResults,
  } as const;
};
