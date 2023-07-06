import { FC } from 'react';
import { Header } from '/src/components/Header';
import {
  AccountMainContainer,
  AccountPageContainer,
} from './PersonalAccount.styled';
import { AccountInfo } from '/src/components/AccountInfo';
import { StyledTabs } from '/src/components/StyledTabs';
import { Tabs } from '@mantine/core';

export const PersonalAccount: FC = () => {
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
        </StyledTabs>
      </AccountMainContainer>
    </AccountPageContainer>
  );
};
