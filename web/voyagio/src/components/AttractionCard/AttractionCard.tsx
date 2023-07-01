import { VerticalDivider } from '/src/components/uikit';
import { ActionIcon, Button, Flex } from '@mantine/core';
import { IconHeart, IconStar } from '@tabler/icons-react';
import { FC } from 'react';
import {
  AdditionalInfoContainer, Address, AttractionImage, ButtonsContainer, CardContainer,
} from './AttractionCard.styled';

interface AttractionCardProps {
  label: string
  address: string
  rating: number
  categoryName: string
  imageUrl: string
}

export const AttractionCard: FC<AttractionCardProps> = ({
  label, address, rating, categoryName, imageUrl,
}) => (
  <CardContainer>
    <AttractionImage src={imageUrl} />
    <div>
      <h3>{label}</h3>
      <Address>{address}</Address>
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
        <Button fullWidth>Add in trip</Button>
        <Flex justify="center" align="center">
          <ActionIcon variant="subtle">
            <IconHeart color="black" />
          </ActionIcon>
        </Flex>
      </ButtonsContainer>
    </div>
  </CardContainer>
);
