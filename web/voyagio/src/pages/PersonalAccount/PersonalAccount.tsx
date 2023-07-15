import { deleteFavorite } from '/src/components/Results/api/api.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';
import {
  AccountMainContainer,
  AccountPageContainer,
  CollectionsGrid,
} from './PersonalAccount.styled';
import { AccountInfo } from '/src/components/AccountInfo';
import { StyledTabs } from '/src/components/StyledTabs';
import { Tabs } from '@mantine/core';
import { AttractionCard } from '/src/components/AttractionCard';
import { CardsGrid } from '/src/components/Results/Results.styled';
import { useUserData } from './api';
import { CollectionCard } from '/src/components/CollectionCard';
import { CreateCollectionCard } from '/src/components/CreateCollectionCard';

export const PersonalAccount: FC = () => {
  const {
    favorites, collections, userCredentials, fetchFavorites,
  } = useUserData();
  return (
    <AccountPageContainer>
      <Header isWithSearchField />
      <AccountMainContainer>
        <AccountInfo email={userCredentials.email} />
        <StyledTabs defaultValue="col">
          <Tabs.List>
            <Tabs.Tab value="fav">Favourites</Tabs.Tab>
            <Tabs.Tab value="col">Trip Collections</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="fav" pt={43}>
            <CardsGrid>
              {favorites.map((item) => (
                <AttractionCard
                  key={item.id}
                  label={item.name}
                  address={item.address.value}
                  rating={item.rating}
                  imageUrl={item.image_url}
                  categoryName={item.category.name}
                  isFavourite
                  onFavoriteClick={() => {
                    deleteFavorite(item.id).then();
                    setTimeout(() => fetchFavorites(), 500);
                  }}
                />
              ))}
            </CardsGrid>
          </Tabs.Panel>

          <Tabs.Panel value="col" pt={43}>
            <CollectionsGrid>
              {[
                ...collections.map((item) => (
                  <CollectionCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    description={item.description}
                    imageUrl={item.image_url}
                  />
                )),
                <CreateCollectionCard key={'create-collection'} />,
              ]}
            </CollectionsGrid>
          </Tabs.Panel>
        </StyledTabs>
      </AccountMainContainer>
    </AccountPageContainer>
  );
};
