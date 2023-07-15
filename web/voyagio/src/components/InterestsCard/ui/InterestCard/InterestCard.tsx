import { InterestCardContainer } from '/src/components/InterestsCard/ui/InterestCard/InterestCard.styled.ts';
import { FC } from 'react';
import { Text } from '@mantine/core';

interface InterestCardProps {
  chosen: boolean
  onClick: () => void
}

export const InterestCard: FC<InterestCardProps> = ({ chosen, onClick }) => (
  <InterestCardContainer chosen={chosen} onClick={onClick}>
    <Text>Museums</Text>
  </InterestCardContainer>
);
