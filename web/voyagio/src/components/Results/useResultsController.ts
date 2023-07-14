import { useRecommendedCollections } from './api/useRecommendedCollections';
import { RouterParams } from '/src/app/root';
import { useResults } from '/src/components/Results/api';
import { useParams } from 'react-router';

export const useResultsController = () => {
  const params = useParams<RouterParams>();
  const { results } = useResults(params.query);
  const { recommendations } = useRecommendedCollections(params.query);

  return { results, recommendations } as const;
};
