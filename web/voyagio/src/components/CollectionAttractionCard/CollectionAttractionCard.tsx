import { FC } from 'react';
import {
  CardImage,
  CardName,
  CloseButton,
  CollectionAttractionCardContainer,
  HeadingsGroup,
  InfoAddress,
  InformationContainer,
  RatingGroup,
  RatingStar,
  TagsGroup,
  VDivider,
} from './CollectionAttractionCard.styled';

import StarIcon from '/public/rating_star.svg';
import CloseBtnIcon from '/public/close_button_icon.svg';
import { useDeletePlaceHandler } from './useDeletePlaceHandler';

type CollectionAttractionCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  rating: number;
  type: string;
  category: string;
  fetchCollectionPlaces: () => Promise<void>
};

export const CollectionAttractionCard: FC<CollectionAttractionCardProps> = ({
  id,
  name,
  imageUrl,
  address,
  rating,
  type,
  category,
  fetchCollectionPlaces,
}) => {
  const { deletePlaceHandler } = useDeletePlaceHandler(id);
  return (
    <CollectionAttractionCardContainer>
      <CloseButton onClick={() => {
        deletePlaceHandler().then(() => {
          fetchCollectionPlaces().then();
        });
      }}
      >
        <img src={CloseBtnIcon} alt="btn" />
      </CloseButton>
      <CardImage src={imageUrl} alt="bg" />

      <InformationContainer>
        <HeadingsGroup>
          <CardName>{name}</CardName>
          <InfoAddress>{address}</InfoAddress>
        </HeadingsGroup>

        <TagsGroup>
          <RatingGroup>
            <RatingStar src={StarIcon} alt="star" />
            <span>
              {rating}
              {' '}
              Rating
            </span>
          </RatingGroup>

          <VDivider />
          <span>{type}</span>
          <VDivider />
          <span>{category}</span>
        </TagsGroup>
      </InformationContainer>
    </CollectionAttractionCardContainer>
  );
};
