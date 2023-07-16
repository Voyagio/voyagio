import { AttractionCard } from '/src/components/AttractionCard';
import { FilterModal } from '/src/components/Filter/FilterModal.tsx';
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
  const {
    results,
    cityName,
    handleFilterOpen,
    handleFilterClose,
    filterOpened,
    handleFilterChange,
    currentFilterState,
    recommendations,
    fetchUserData,
    collections,
    favorites,
  } = useResultsController();

  return (
    <RecommendationsContainer>
      <RecommendationsHeadingContainer>
        <h2>
          Results for
          {' '}
          {cityName}
        </h2>
        <ActionIcon variant="transparent" onClick={handleFilterOpen}>
          <IconFilter color="#0B94F8" />
        </ActionIcon>
      </RecommendationsHeadingContainer>
      <p>Try personal list of places where to go: </p>

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
              collections={collections}
              favorites={favorites}
              id={id}
              key={id}
              imageUrl={image_url}
              rating={rating}
              address={addressValue}
              categoryName={categoryName}
              label={name}
              fetchUserData={fetchUserData}
            />
          ),
        )}
      </CardsGrid>
      <FilterModal
        opened={filterOpened}
        onClose={handleFilterClose}
        filterState={currentFilterState}
        onFilterChange={handleFilterChange}
      />
    </RecommendationsContainer>
  );
};
