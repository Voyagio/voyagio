import { useDisclosure } from '@mantine/hooks';
import { CreateColCardContainer } from './CreateCollectionCard.styled';

import plusIcon from '/public/col_card_plus.svg';
import { CollectionModal } from '../CollectionModal';
import { postNewCollection } from './api';
import { StyledModal } from '../StyledModal';

export const CreateCollectionCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = async (name: string, description: string) => {
    await postNewCollection(name, description);
    close();
  };

  return (
    <>
      <StyledModal opened={opened} onClose={close}>
        <CollectionModal.New onSubmit={handleSubmit} onClose={close} />
      </StyledModal>
      <CreateColCardContainer onClick={open}>
        <img src={plusIcon} />
      </CreateColCardContainer>
    </>
  );
};
