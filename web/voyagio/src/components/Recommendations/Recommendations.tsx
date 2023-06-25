import { AttractionCard } from '/src/components/AttractionCard';
import { FC } from 'react';
import {
  CardsGrid, RecommendationsContainer, RecommendationsHeadingContainer,
} from '/src/components/Recommendations/Recommendations.styled.ts';

export const Recommendations: FC = () => (
  <RecommendationsContainer>
    <RecommendationsHeadingContainer>
      <p>Suggested for you:</p>
      <button>Filter</button>
    </RecommendationsHeadingContainer>
    <CardsGrid>
      {[...Array(50).keys()].map((element) => (
        <AttractionCard key={element} />
      ))}
    </CardsGrid>
  </RecommendationsContainer>
);
