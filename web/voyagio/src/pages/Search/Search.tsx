import { Recommendations } from '/src/components/Recommendations';
import { SearchField } from '/src/components/SearchField';
import { SearchPageContainer, SearchPageContentContainer } from '/src/pages/Search/Search.styled.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';

export const SearchPage: FC = () => (
  <SearchPageContainer>
    <Header />
    <SearchPageContentContainer>
      <SearchField />
      <Recommendations />
    </SearchPageContentContainer>
  </SearchPageContainer>
);
