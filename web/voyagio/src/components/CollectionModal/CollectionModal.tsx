import { FC, PropsWithChildren } from 'react';
import {
  MapButton,
  ModalContainer,
  ModalHeader,
  ModalHeaderIcon,
  ModalHeaderInfo,
  ModalMain,
} from './CollectionModal.styled';

import mapIcon from '/public/map_icon.svg';

type CollectionModalProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export const CollectionModal: FC<PropsWithChildren<CollectionModalProps>> = ({
  title,
  description,
  imageUrl,
  children,
}) => {
  return (
    <ModalContainer>
      <ModalHeader>
        <ModalHeaderIcon src={imageUrl} />
        <ModalHeaderInfo>
          <h3>{title}</h3>
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
