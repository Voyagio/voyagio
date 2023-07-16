import { useAttractionCardController } from '/src/components/AttractionCard/useAttractionCardController.ts';
import { CreateCollectionCard } from '/src/components/CreateCollectionCard';
import { VerticalDivider } from '/src/components/uikit';
import { CollectionDTO, FavoriteDTO } from '/src/pages/PersonalAccount/api/api.ts';
import { ActionIcon, Button, Flex } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconStar } from '@tabler/icons-react';
import { FC } from 'react';
import {
  AdditionalInfoContainer,
  Address,
  AttractionImage,
  ButtonsContainer,
  CardBlurContainer,
  CardContainer, CategorySelect,
  CollectionChooseContainer,
} from './AttractionCard.styled';

interface AttractionCardProps {
  collections: CollectionDTO[]
  favorites: FavoriteDTO[]
  fetchUserData: () => void
  id: string
  label: string
  address: string
  rating: number
  categoryName: string
  imageUrl: string
}

export const AttractionCard: FC<AttractionCardProps> = ({
  id,
  fetchUserData,
  label,
  address,
  rating,
  categoryName,
  imageUrl,
  collections,
  favorites,
}) => {
  const {
    isFavourite,
    addingInCollectionId,
    isInCollection,
    handleFavouriteClick,
    handleAddInTrip,
    handleMouseLeft,
    handleCollectionChoose,
    isNewCollectionOpened,
    openNewCollection,
    closeNewCollection,
    handleRemoveFromTrip,
  } = useAttractionCardController(id, favorites, collections, fetchUserData);

  return (
    <CardContainer>
      <CardBlurContainer blur={addingInCollectionId !== 'IDLE'}>
        <AttractionImage src={imageUrl} />
        <Flex direction="column" justify="space-between">
          <div>
            <h3>{label}</h3>
            <Address>{address}</Address>
          </div>
          <div>
            <AdditionalInfoContainer>
              <Flex align="center" gap={6}>
                <IconStar size={17} />
                <p>
                  {rating.toFixed(1)}
                  {' '}
                  Rating
                </p>
              </Flex>
              <VerticalDivider />
              <p>{categoryName}</p>
              <VerticalDivider />
              <p>Attraction</p>
            </AdditionalInfoContainer>
            <ButtonsContainer>
              {addingInCollectionId !== 'IDLE' || isInCollection ? (
                <Button fullWidth variant="light" onClick={handleRemoveFromTrip}>
                  Already in voyage
                </Button>
              ) : (
                <Button fullWidth onClick={handleAddInTrip}>
                  Add to voyage
                </Button>
              )}
              <Flex justify="center" align="center">
                <ActionIcon
                  variant="transparent"
                  onClick={handleFavouriteClick}
                  color="red"
                >
                  {isFavourite ? (
                    <IconHeartFilled color="black" />
                  ) : (
                    <IconHeart color="black" />
                  )}
                </ActionIcon>
              </Flex>
            </ButtonsContainer>
          </div>
        </Flex>
      </CardBlurContainer>
      {
        addingInCollectionId !== 'IDLE' && (
          <CollectionChooseContainer onMouseLeave={handleMouseLeft}>
            <Flex justify="space-between" align="center">
              <h3>Saved In</h3>
              <CategorySelect
                onChange={handleCollectionChoose}
                value={addingInCollectionId}
              >
                {collections.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                <option value="NEW_COLLECTION">+ New Collection</option>
              </CategorySelect>
            </Flex>
          </CollectionChooseContainer>
        )
      }
      <CreateCollectionCard
        modalOnly
        opened={isNewCollectionOpened}
        open={openNewCollection}
        close={closeNewCollection}
      />
    </CardContainer>
  );
};
