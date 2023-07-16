import {
  addFavorite, addInCollection, deleteFavorite, removeFromCollection,
} from '/src/components/AttractionCard/api';
import { useCollections } from '/src/components/AttractionCard/api/useCollections.ts';
import { CollectionDTO, FavoriteDTO } from '/src/pages/PersonalAccount/api/api.ts';
import { useDisclosure } from '@mantine/hooks';
import {
  useState, MouseEvent, ChangeEvent,
} from 'react';

export const useAttractionCardController = (
  id: string,
  favorites: FavoriteDTO[],
  collections: CollectionDTO[],
  fetchUserData: () => void,
) => {
  const [addingInCollectionId, setAddingInCollectionId] = useState<string | 'NEW_COLLECTION' | 'IDLE'>('IDLE');
  const [
    isNewCollectionOpened,
    { open: openNewCollection, close: closeNewCollection },
  ] = useDisclosure(false);

  const { placeCollections, fetchCollections } = useCollections(id);

  const isInCollection = placeCollections.length;
  const isFavourite = favorites.some((element) => element.id === id);

  const handleFavouriteClick = async () => {
    if (isFavourite) {
      await deleteFavorite(id);
    } else {
      await addFavorite(id);
    }
    fetchUserData();
  };

  const addCollectionInTrip = async () => {
    if (!isInCollection) {
      await addInCollection(addingInCollectionId, id);
    }
    await fetchCollections(id);
  };

  const handleRemoveFromTrip = async () => {
    if (isInCollection) {
      await removeFromCollection(placeCollections[0].id, id);
    }
    await fetchCollections(id);
  };

  const handleMouseLeft = (event: MouseEvent<HTMLDivElement | HTMLSelectElement>) => {
    if (event.relatedTarget !== window) {
      addCollectionInTrip().then();
      setAddingInCollectionId('IDLE');
    }
  };

  const handleAddInTrip = () => {
    if (!collections.length) {
      openNewCollection();
      return;
    }

    setAddingInCollectionId(collections.length ? collections[0].id : 'NEW_COLLECTION');
  };

  const handleCollectionChoose = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'NEW_COLLECTION') {
      openNewCollection();
      return;
    }

    setAddingInCollectionId(event.target.value);
  };

  return {
    isFavourite,
    handleFavouriteClick,
    handleMouseLeft,
    isInCollection,
    addingInCollectionId,
    handleAddInTrip,
    handleCollectionChoose,
    isNewCollectionOpened,
    openNewCollection,
    closeNewCollection,
    handleRemoveFromTrip,
  };
};
