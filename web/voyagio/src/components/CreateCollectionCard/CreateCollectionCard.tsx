import { useDisclosure } from '@mantine/hooks';
import { CreateColCardContainer } from './CreateCollectionCard.styled';

import plusIcon from '/public/col_card_plus.svg';
import { Modal } from '@mantine/core';
import { CollectionModal } from '../CollectionModal';
import { postNewCollection } from './api';

export const CreateCollectionCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = async (name: string, description: string) => {
    await postNewCollection(name, description);
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        withCloseButton={false}
        padding={0}
        radius={20}
        overlayProps={{
          blur: '2.5px',
          color: '#4e4e4e',
          opacity: 0.15,
        }}
        centered
      >
        <CollectionModal.New onSubmit={handleSubmit} onClose={close} />
      </Modal>
      <CreateColCardContainer onClick={open}>
        <img src={plusIcon} />
      </CreateColCardContainer>
    </>
  );
};
