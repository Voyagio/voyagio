import { Results } from '/src/components/Results';
import { SearchField } from '/src/components/SearchField';
import { SearchPageContainer, SearchPageContentContainer } from '/src/pages/Search/Search.styled.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';

interface SearchPageProps {
  isWithQuery?: boolean
}

export const SearchPage: FC<SearchPageProps> = ({ isWithQuery }) => (
  <SearchPageContainer>
    <Header isWithSearchField={isWithQuery} />
    <SearchPageContentContainer>
      {!isWithQuery && <SearchField fieldSize="large" />}
      <Results />
    </SearchPageContentContainer>
  </SearchPageContainer>
);
