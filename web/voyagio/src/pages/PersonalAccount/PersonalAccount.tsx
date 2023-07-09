import { FC } from 'react';
import { Header } from '/src/components/Header';
import {
  AccountMainContainer,
  AccountPageContainer,
} from './PersonalAccount.styled';
import { AccountInfo } from '/src/components/AccountInfo';
import { StyledTabs } from '/src/components/StyledTabs';
import { Tabs } from '@mantine/core';
import { useFavourites } from './api';
import { AttractionCard } from '/src/components/AttractionCard';
import { CardsGrid } from '/src/components/Results/Results.styled';

export const PersonalAccount: FC = () => {
  const { favourites } = useFavourites();
  return (
    <AccountPageContainer>
      <Header isWithSearchField />
      <AccountMainContainer>
        <AccountInfo />
        <StyledTabs>
          <Tabs.List>
            <Tabs.Tab value="fav">Favourites</Tabs.Tab>
            <Tabs.Tab value="col">Trip Collections</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="fav">
            <CardsGrid>
              {favourites.map((item) => (
                <AttractionCard
                  key={item.id}
                  label={item.name}
                  address={item.address.value}
                  rating={item.rating}
                  imageUrl={item.image_url}
                  categoryName={item.category.name}
                />
              ))}
            </CardsGrid>
          </Tabs.Panel>
        </StyledTabs>
      </AccountMainContainer>
    </AccountPageContainer>
  );
};
