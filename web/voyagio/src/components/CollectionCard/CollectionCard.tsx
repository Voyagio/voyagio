import {
  CollectionCardContainer,
  CollectionImage,
  CollectionInfo,
} from './CollectionCard.style';

import { CollectionModal } from '../CollectionModal';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { useCollectionPlaces } from './api';
import { CollectionAttractionCard } from '../CollectionAttractionCard';
import { CollectionContext } from '/src/contexts/collectionContext';
import { StyledModal } from '../StyledModal';

type CollectionCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const CollectionCard: FC<CollectionCardProps> = ({
  id,
  title,
  description,
  imageUrl,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { collectionPlaces } = useCollectionPlaces(id);
  return (
    <>
      <StyledModal opened={opened} onClose={close}>
        <CollectionModal
          title={title}
          description={description}
          imageUrl={imageUrl}
        >
          <CollectionContext.Provider value={id}>
            {collectionPlaces.map((item) => (
              <CollectionAttractionCard
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.image_url}
                address={item.address.value}
                rating={item.rating}
                type={item.category.name}
                category={item.category.name}
              />
            ))}
          </CollectionContext.Provider>
        </CollectionModal>
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
