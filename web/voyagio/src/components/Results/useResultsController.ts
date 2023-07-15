import { RouterParams } from '/src/app/root';
import { useResults } from '/src/components/Results/api';
import { useParams } from 'react-router';

export const useResultsController = () => {
  const params = useParams<RouterParams>();
  const cityName = params.query;
  const { results } = useResults(cityName);

  return { results, cityName } as const;
};
