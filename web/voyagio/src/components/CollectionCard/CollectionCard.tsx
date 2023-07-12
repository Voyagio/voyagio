import { Modal } from '@mantine/core';
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
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        padding={0}
        radius={20}
        overlayProps={{
          blur: '2.5px',
          color: '#4e4e4e',
          opacity: 0.15,
        }}
        centered
      >
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
      </Modal>

      <CollectionCardContainer onClick={open}>
        <CollectionImage src={imageUrl} />
        <CollectionInfo>
          <h3>{title}</h3>
        </CollectionInfo>
      </CollectionCardContainer>
    </>
  );
};
