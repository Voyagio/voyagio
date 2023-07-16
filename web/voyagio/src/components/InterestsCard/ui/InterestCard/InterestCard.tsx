import { Icon } from '/src/components/AuthForm/AuthForm.styled.ts';
import { InterestCardContainer } from '/src/components/InterestsCard/ui/InterestCard/InterestCard.styled.ts';
import { FC } from 'react';
import { Text } from '@mantine/core';

interface InterestCardProps {
  name: string
  imageUrl: string
  chosen: boolean
  onClick: () => void
}

export const InterestCard: FC<InterestCardProps> = ({
  chosen, onClick, name, imageUrl,
}) => (
  <InterestCardContainer chosen={chosen} onClick={onClick}>
    <Icon isAccentColor={chosen} color="orange" src={imageUrl} />
    <Text>{name}</Text>
  </InterestCardContainer>
);
