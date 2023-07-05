import { CollectionAttractionCard } from '../CollectionAttractionCard';
import {
  MapButton,
  ModalContainer,
  ModalHeader,
  ModalHeaderIcon,
  ModalHeaderInfo,
  ModalMain,
} from './CollectionModal.styled';

import colIcon from '/public/col_attr_card_image.png';
import mapIcon from '/public/map_icon.svg';

export const CollectionModal = () => {
  const mockInfo = {
    name: 'Baumana Street',
    imageUrl: colIcon,
    address: 'Mazita Gafuri 46, Kazan Russia',
    rating: 5.0,
    type: 'Streets',
    category: 'Attraction',
  };

  const colAttrCards = [1, 2, 3].map((e) => (
    <CollectionAttractionCard {...mockInfo} key={e} />
  ));

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalHeaderIcon src={colIcon} />
        <ModalHeaderInfo>
          <h3>Kazan with friends</h3>
          <p>
            Team of the Voyagio created this list of attractions that we are
            planning to visit after our capsrtone project
          </p>
        </ModalHeaderInfo>
      </ModalHeader>
      <ModalMain>{colAttrCards}</ModalMain>
      <MapButton>
        <img src={mapIcon} />
      </MapButton>
    </ModalContainer>
  );
};
