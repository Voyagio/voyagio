import { getResults, ResultDTO } from '/src/components/Results/api/api.ts';
import { useEffect, useState } from 'react';

export const useResults = (searchQuery: string | undefined) => {
  const [results, setResults] = useState<ResultDTO[]>([]);

  const fetchResults = async (searchQuery: string) => {
    setResults(await getResults(searchQuery));
  };

  useEffect(() => {
    if (searchQuery) fetchResults(searchQuery).then();
  }, [searchQuery]);

  return { results, fetchResults } as const;
};
