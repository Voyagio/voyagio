import { AttractionCard } from '/src/components/AttractionCard';
import { useResultsController } from '/src/components/Results/useResultsController.ts';
import { FC } from 'react';
import {
  CardsGrid, RecommendationsContainer, RecommendationsHeadingContainer,
} from '/src/components/Results/Results.styled.ts';

export const Results: FC = () => {
  const { results } = useResultsController();

  return (
    <RecommendationsContainer>
      <RecommendationsHeadingContainer>
        <p>Results:</p>
        <button>Filter</button>
      </RecommendationsHeadingContainer>
      <CardsGrid>
        {results.map(({
          rating,
          name,
          image_url,
          address: { value: addressValue },
          category: { name: categoryName },
        }) => (
          <AttractionCard
            key={name}
            imageUrl={image_url}
            rating={rating}
            address={addressValue}
            categoryName={categoryName}
            label={name}
          />
        ))}
      </CardsGrid>
    </RecommendationsContainer>
  );
};
