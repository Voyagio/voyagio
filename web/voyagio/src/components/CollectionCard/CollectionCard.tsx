import { useDisclosure } from '@mantine/hooks';
import { FC, useMemo } from 'react';
import {
  CollectionCardContainer,
  CollectionImage,
  CollectionInfo,
} from './CollectionCard.styled';

import { CollectionModal } from '../CollectionModal';
import { useCollectionPlaces } from './api';
import { CollectionAttractionCard } from '../CollectionAttractionCard';
import { CollectionContext } from '/src/contexts/collectionContext';
import { StyledModal } from '../StyledModal';

type CollectionCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  suggested?: boolean;
};

export const CollectionCard: FC<CollectionCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  suggested = false,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { collectionPlaces, fetchCollectionPlaces } = useCollectionPlaces(id);

  const collectionsCards = collectionPlaces.map((item) => (
    <CollectionAttractionCard
      key={item.id}
      id={item.id}
      name={item.name}
      imageUrl={item.image_url}
      address={item.address.value}
      rating={item.rating}
      type={item.category.name}
      fetchCollectionPlaces={() => fetchCollectionPlaces(id)}
      category={item.category.name}
    />
  ));

  const collectionContext = useMemo(() => ({
    id, title, description, imageUrl,
  }), [id, title, description, imageUrl]);

  return (
    <>
      <StyledModal opened={opened} onClose={close}>
        <CollectionContext.Provider
          value={collectionContext}
        >
          {suggested ? (
            <CollectionModal.Recommendation>
              {collectionsCards}
            </CollectionModal.Recommendation>
          ) : (
            <CollectionModal>{collectionsCards}</CollectionModal>
          )}
        </CollectionContext.Provider>
      </StyledModal>

      <CollectionCardContainer onClick={open}>
        <CollectionImage src={imageUrl} />
        <CollectionInfo>
          <h3>{title}</h3>
        </CollectionInfo>
      </CollectionCardContainer>
    </>
  );
};
