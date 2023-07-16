import { FC, PropsWithChildren, useState } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import {
  CloseButton,
  EditButton,
  MapButton,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalHeaderIcon,
  ModalHeaderInfo,
  ModalMain,
  ModalTitleContainer,
  NewModalButtonGroup,
  NewModalContainer,
  NewModalImage,
  ReshuffleButton,
} from "./CollectionModal.styled";

import { CollectionPlaceDTO } from "/src/components/CollectionCard/api/api";
import mapIcon from "/public/map_icon.svg";
import placesIcon from "/public/places_icon.svg";
import editIcon from "/public/edit_icon.svg";
import reshuffleIcon from "/public/reshuffle_icon.svg";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useToggleEdit } from "./useToggleEdit";
import { useNewModalInfo } from "./useNewModalInfo";
import { useRecommendation } from "./useRecommendation";

interface ICollectionModalComposition {
  New: FC<CollectionModalNewProps>;
  Recommendation: FC<PropsWithChildren<RecommendationProps>>;
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
        styles={{ input: { fontSize: "14px", fontFamily: "Lato, sans-serif" } }}
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
          input: { fontSize: "14px", fontFamily: "Lato, sans-serif" },
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

interface RecommendationProps {
  close: () => void;
}

export const Recommendation: FC<PropsWithChildren<RecommendationProps>> = ({
  children,
  close,
}) => {
  const { title, description, imageUrl, handleSumbit } = useRecommendation();
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
      <ModalFooter>
        <Button
          onClick={() => {
            handleSumbit();
            close();
          }}
          fullWidth
        >
          Save Collection
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

interface CollectionModalProps {
  collectionPlaces: CollectionPlaceDTO[];
}

export const CollectionModal: FC<PropsWithChildren<CollectionModalProps>> &
  ICollectionModalComposition = ({ children, collectionPlaces }) => {
  const { toggleEdit, handleSubmit, toggle, rest } = useToggleEdit();
  const { title, description, imageUrl } = rest;

  const [isMapOpened, setIsMapOpened] = useState(false);

  let x1: number = 0;
  let x2: number = 0;
  let y1: number = 0;
  let y2: number = 0;
  collectionPlaces.forEach((collectionPlace) => {
    x1 = x1
      ? Math.min(x1, collectionPlace.address.lat)
      : collectionPlace.address.lat;
    x2 = x2
      ? Math.max(x2, collectionPlace.address.lat)
      : collectionPlace.address.lat;
    y1 = y1
      ? Math.min(y1, collectionPlace.address.lon)
      : collectionPlace.address.lon;
    y2 = y2
      ? Math.max(y2, collectionPlace.address.lon)
      : collectionPlace.address.lon;
  });

  const PADDING = 0.0009;
  const defaultState = {
    center: [(x1 + x2) / 2, (y1 + y2) / 2],
    bounds: [
      [x1 - PADDING, y1 - PADDING],
      [x2 + PADDING, y2 + PADDING],
    ],
  };

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
      <ModalMain>
        {isMapOpened ? (
          <div>
            <YMaps>
              <Map defaultState={defaultState} width={"100%"}>
                <ZoomControl></ZoomControl>
                {collectionPlaces.map(({ id, address: { lat, lon } }) => (
                  <Placemark key={id} geometry={[lat, lon]} />
                ))}
              </Map>
            </YMaps>
          </div>
        ) : (
          children
        )}
      </ModalMain>
      <MapButton onClick={() => setIsMapOpened(!isMapOpened)}>
        {/* <img src={mapIcon} /> */}
        <img src={ isMapOpened ? placesIcon : mapIcon } />
      </MapButton>
    </ModalContainer>
  );
};

CollectionModal.New = New;
CollectionModal.Recommendation = Recommendation;
