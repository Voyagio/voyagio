import { FC } from 'react';
import { CreateColCardContainer } from './CreateCollectionCard.styled';

import plusIcon from '/public/col_card_plus.svg';
import { CollectionModal } from '../CollectionModal';
import { getRandomCollectionImage, postNewCollection } from './api';
import { StyledModal } from '../StyledModal';
import { CollectionContext } from '/src/contexts/collectionContext';

interface CreateCollectionCardProps {
  open: () => void
  close: () => void
  opened: boolean
  modalOnly?: boolean
}

export const CreateCollectionCard: FC<CreateCollectionCardProps> = ({
  modalOnly, opened, close, open,
}) => {
  const handleSubmit = async (name: string, description: string) => {
    await postNewCollection(name, description);
    close();
  };

  return (
    <>
      <StyledModal opened={opened} onClose={close}>
        <CollectionContext.Provider
          value={{
            id: '',
            title: '',
            description: '',
            imageUrl: getRandomCollectionImage(),
          }}
        >
          <CollectionModal.New onSubmit={handleSubmit} onClose={close} />
        </CollectionContext.Provider>
      </StyledModal>
      {
        !modalOnly && (
        <CreateColCardContainer onClick={open}>
          <img src={plusIcon} />
        </CreateColCardContainer>
        )
      }
    </>
  );
};
