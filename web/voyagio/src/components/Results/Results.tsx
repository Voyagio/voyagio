import { AttractionCard } from '/src/components/AttractionCard';
import { useResultsController } from '/src/components/Results/useResultsController.ts';
import { ActionIcon } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { FC } from 'react';
import {
  CardsGrid,
  RecommendationsContainer,
  RecommendationsHeadingContainer,
  RecommendedCollectionsContainer,
} from '/src/components/Results/Results.styled.ts';
import { CollectionCard } from '../CollectionCard';

export const Results: FC = () => {
  const { results, recommendations } = useResultsController();

  return (
    <RecommendationsContainer>
      <RecommendationsHeadingContainer>
        <p>Results:</p>
        <ActionIcon variant="transparent">
          <IconFilter color="#0B94F8" />
        </ActionIcon>
      </RecommendationsHeadingContainer>

      <RecommendedCollectionsContainer>
        {recommendations.map((item) => (
          <CollectionCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
            imageUrl={item.image_url}
            suggested
          />
        ))}
      </RecommendedCollectionsContainer>

      <CardsGrid>
        {results.map(
          ({
            id,
            rating,
            name,
            image_url,
            address: { value: addressValue },
            category: { name: categoryName },
          }) => (
            <AttractionCard
              key={id}
              imageUrl={image_url}
              rating={rating}
              address={addressValue}
              categoryName={categoryName}
              label={name}
            />
          )
        )}
      </CardsGrid>
    </RecommendationsContainer>
  );
};
