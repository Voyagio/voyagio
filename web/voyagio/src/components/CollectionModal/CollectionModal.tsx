import { FC, PropsWithChildren } from 'react';
import {
  CloseButton,
  EditButton,
  MapButton,
  ModalContainer,
  ModalHeader,
  ModalHeaderIcon,
  ModalHeaderInfo,
  ModalMain,
  ModalTitleContainer,
  NewModalButtonGroup,
  NewModalContainer,
  NewModalImage,
  ReshuffleButton,
} from './CollectionModal.styled';

import mapIcon from '/public/map_icon.svg';
import editIcon from '/public/edit_icon.svg';
import reshuffleIcon from '/public/reshuffle_icon.svg';
import { Button, TextInput, Textarea } from '@mantine/core';
import { useToggleEdit } from './useToggleEdit';
import { useNewModalInfo } from './useNewModalInfo';

interface ICollectionModalComposition {
  New: FC<CollectionModalNewProps>;
}

type CollectionModalNewProps = {
  onSubmit: (name: string, description: string, imageUrl: string) => void;
  onClose: () => void;
};

const New: FC<CollectionModalNewProps> = ({ onSubmit, onClose }) => {
  const {
    title,
    description,
    imageUrl,
    handleReshuffle,
    handleTitleChange,
    handleDescriptionChange,
  } = useNewModalInfo();

  return (
    <NewModalContainer>
      <NewModalImage src={imageUrl}>
        <ReshuffleButton onClick={handleReshuffle}>
          <img src={reshuffleIcon} />
        </ReshuffleButton>
      </NewModalImage>
      <TextInput
        label="Name of the collection"
        placeholder="Trip with friends"
        radius="lg"
        size="lg"
        variant="default"
        value={title}
        onChange={handleTitleChange}
        styles={{ input: { fontSize: '14px', fontFamily: 'Lato, sans-serif' } }}
      />
      <Textarea
        label="Description"
        placeholder="Team of the Voyagio created this list of attractions that we are planning to visit"
        radius="lg"
        size="lg"
        variant="default"
        value={description}
        onChange={handleDescriptionChange}
        styles={{
          input: { fontSize: '14px', fontFamily: 'Lato, sans-serif' },
        }}
      />

      <NewModalButtonGroup>
        <Button
          onClick={() => onSubmit(title, description, imageUrl)}
          fullWidth
        >
          Save
        </Button>
        <CloseButton color="dark" variant="subtle" onClick={onClose} fullWidth>
          Close
        </CloseButton>
      </NewModalButtonGroup>
    </NewModalContainer>
  );
};

export const CollectionModal: FC<PropsWithChildren> &
  ICollectionModalComposition = ({ children }) => {
  const { toggleEdit, handleSubmit, toggle, rest } = useToggleEdit();
  const { title, description, imageUrl } = rest;
  return toggleEdit ? (
    <New onSubmit={handleSubmit} onClose={toggle} />
  ) : (
    <ModalContainer>
      <ModalHeader>
        <ModalHeaderIcon src={imageUrl} />
        <ModalHeaderInfo>
          <ModalTitleContainer>
            <h3>{title}</h3>
            <EditButton onClick={toggle}>
              <img src={editIcon} />
            </EditButton>
          </ModalTitleContainer>
          <p>{description}</p>
        </ModalHeaderInfo>
      </ModalHeader>
      <ModalMain>{children}</ModalMain>
      <MapButton>
        <img src={mapIcon} />
      </MapButton>
    </ModalContainer>
  );
};

CollectionModal.New = New;
