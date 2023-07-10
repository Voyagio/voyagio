import { FC, PropsWithChildren, useState } from 'react';
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
} from './CollectionModal.styled';

import mapIcon from '/public/map_icon.svg';
import editIcon from '/public/edit_icon.svg';
import { Button, TextInput } from '@mantine/core';
import { useToggleEdit } from './useToggleEdit';

interface ICollectionModalComposition {
  New: FC<CollectionModalNewProps>;
}

type CollectionModalNewProps = {
  onSubmit: (name: string, description: string) => void;
  onClose: () => void;
};

const New: FC<CollectionModalNewProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <NewModalContainer>
      <TextInput
        label="Name of the collection"
        placeholder="Trip with friends"
        radius="lg"
        size="lg"
        variant="default"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Description"
        placeholder="Team of the Voyagio created this list of attractions that we are planning to visit after our capsrtone project"
        radius="lg"
        size="lg"
        variant="default"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <NewModalButtonGroup>
        <Button onClick={() => onSubmit(name, desc)} fullWidth>
          Save
        </Button>
        <CloseButton color="dark" variant="subtle" onClick={onClose} fullWidth>
          Close
        </CloseButton>
      </NewModalButtonGroup>
    </NewModalContainer>
  );
};

type CollectionModalProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export const CollectionModal: FC<PropsWithChildren<CollectionModalProps>> &
  ICollectionModalComposition = ({
  title,
  description,
  imageUrl,
  children,
}) => {
  const { toggleEdit, handleSubmit, toggle } = useToggleEdit();
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
