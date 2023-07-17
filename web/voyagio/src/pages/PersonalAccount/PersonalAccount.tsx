import { useDisclosure } from '@mantine/hooks';
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
import { useMainController } from '../Main/useMainController';

export const PersonalAccount: FC = () => {
  useMainController('/account');
  const { favorites, collections, userCredentials, fetchUserData } =
    useUserData();
  const [opened, { open, close: closeModal }] = useDisclosure(false);

  const close = async () => {
    await fetchUserData();
    closeModal();
  };

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
                  fetchUserData={fetchUserData}
                  collections={collections}
                  favorites={favorites}
                  id={item.id}
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
                <CreateCollectionCard
                  opened={opened}
                  open={open}
                  close={close}
                  key="create-collection"
                />,
              ]}
            </CollectionsGrid>
          </Tabs.Panel>
        </StyledTabs>
      </AccountMainContainer>
    </AccountPageContainer>
  );
};
