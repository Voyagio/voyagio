import { useContext } from 'react';
import { CollectionContext } from '/src/contexts/collectionContext';
import { removePlace } from './api';

export const useDeletePlaceHandler = (placeId: string) => {
  const { id: collectionId } = useContext(CollectionContext);

  const deletePlaceHandler = async () => {
    await removePlace(collectionId, placeId);
  };

  return { deletePlaceHandler } as const;
};
