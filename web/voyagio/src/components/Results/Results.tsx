import { AttractionCard } from '/src/components/AttractionCard';
import { useResultsController } from '/src/components/Results/useResultsController.ts';
import { ActionIcon } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
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
        <ActionIcon variant="transparent">
          <IconFilter color="#0B94F8" />
        </ActionIcon>
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
