import { Modal } from '@mantine/core';
import {
  CollectionCardContainer,
  CollectionImage,
  CollectionInfo,
} from './CollectionCard.style';

import bgCollection from '/public/col_attr_card_image.png';
import { CollectionModal } from '../CollectionModal';
import { useDisclosure } from '@mantine/hooks';

export const CollectionCard = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
        <CollectionModal />
      </Modal>
      <CollectionCardContainer onClick={open}>
        <CollectionImage src={bgCollection} />
        <CollectionInfo>
          <h3>Kazan with friends</h3>
        </CollectionInfo>
      </CollectionCardContainer>
    </>
  );
};
