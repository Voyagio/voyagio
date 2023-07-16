import { getCollectionsOfPlace } from '/src/components/AttractionCard/api/api.ts';
import { CollectionDTO } from '/src/pages/PersonalAccount/api/api.ts';
import { useEffect, useState } from 'react';

export const useCollections = (placeId: string) => {
  const [placeCollections, setPlaceCollections] = useState<CollectionDTO[]>([]);

  const fetchCollections = async (newPlaceId: string) => {
    setPlaceCollections(await getCollectionsOfPlace(newPlaceId));
  };

  useEffect(() => {
    fetchCollections(placeId).then();
  }, [placeId]);

  return { placeCollections, fetchCollections };
};
