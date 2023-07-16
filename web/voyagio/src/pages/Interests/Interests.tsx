import { InterestsCard } from '/src/components/InterestsCard/InterestsCard.tsx';
import { InterestsContainer, InterestsPageContainer } from '/src/pages/Interests/Interests.styled.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';

export const Interests: FC = () => (
  <InterestsPageContainer>
    <Header contentCentered />
    <InterestsContainer>
      <InterestsCard />
    </InterestsContainer>
  </InterestsPageContainer>
);
