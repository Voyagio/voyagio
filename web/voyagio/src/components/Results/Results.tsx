import { AttractionCard } from '/src/components/AttractionCard';
import { FilterModal } from '/src/components/Filter/FilterModal.tsx';
import { addFavorite, deleteFavorite } from '/src/components/Results/api/api.ts';
import { useResultsController } from '/src/components/Results/useResultsController.ts';
import { ActionIcon } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { FC } from 'react';
import {
  CardsGrid, RecommendationsContainer, RecommendationsHeadingContainer,
} from '/src/components/Results/Results.styled.ts';

export const Results: FC = () => {
  const {
    results,
    cityName,
    favourites,
    handleFilterOpen,
    handleFilterClose,
    filterOpened,
    fetchFavourites,
    handleFilterChange,
    currentFilterState,
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
      <CardsGrid>
        {results.map(
          ({
            id,
            rating,
            name,
            image_url,
            address: { value: addressValue },
            category: { name: categoryName },
          }) => {
            const isFavourite = favourites.some((element) => element.id === id);

            return (
              <AttractionCard
                key={id}
                imageUrl={image_url}
                rating={rating}
                address={addressValue}
                categoryName={categoryName}
                label={name}
                onFavoriteClick={() => {
                  if (isFavourite) {
                    deleteFavorite(id).then();
                  } else {
                    addFavorite(id).then();
                  }

                  setTimeout(() => {
                    fetchFavourites().then();
                  }, 500);
                }}
                isFavourite={isFavourite}
              />
            );
          },
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
