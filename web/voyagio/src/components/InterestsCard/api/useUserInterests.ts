import { CategoriesDTO } from '/src/components/Filter/api/api.ts';
import { getUserInterests } from '/src/components/InterestsCard/api/api.ts';
import { useEffect, useState } from 'react';

export const useUserInterests = () => {
  const [userInterests, setUserInterests] = useState<CategoriesDTO>([]);

  const fetchUserInterests = async () => {
    setUserInterests(await getUserInterests());
  };

  useEffect(() => {
    fetchUserInterests().then();
  }, []);

  return { userInterests, fetchUserInterests } as const;
};
