import { InterestsCard } from '/src/components/InterestsCard/InterestsCard.tsx';
import {
  InterestsContainer,
  InterestsPageContainer,
} from '/src/pages/Interests/Interests.styled.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';
import { useMainController } from '../Main/useMainController';

export const Interests: FC = () => {
  useMainController('/interests');
  return (
    <InterestsPageContainer>
      <Header contentCentered />
      <InterestsContainer>
        <InterestsCard />
      </InterestsContainer>
    </InterestsPageContainer>
  );
};
