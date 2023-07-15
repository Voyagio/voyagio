import { useEffect, useState } from 'react';
import { CollectionPlaceDTO, getCollectionPlaces } from './api';

export const useCollectionPlaces = (id: string) => {
  const [collectionPlaces, setCollectionPlaces] = useState<
    CollectionPlaceDTO[]
  >([]);

  const fetchCollectionPlaces = async (id: string) => {
    setCollectionPlaces(await getCollectionPlaces(id));
  };

  useEffect(() => {
    fetchCollectionPlaces(id).then();
  }, []);

  return { collectionPlaces, fetchCollectionPlaces } as const;
};
