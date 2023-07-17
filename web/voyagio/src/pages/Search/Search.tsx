import { RouterParams } from '/src/app/root';
import { Results } from '/src/components/Results';
import { SearchField } from '/src/components/SearchField';
import {
  SearchPageContainer,
  SearchPageContentContainer,
} from '/src/pages/Search/Search.styled.ts';
import { FC } from 'react';
import { Header } from '/src/components/Header';
import { useParams } from 'react-router';
import { useMainController } from '../Main/useMainController';

interface SearchPageProps {
  isWithQuery?: boolean;
}

export const SearchPage: FC<SearchPageProps> = ({ isWithQuery }) => {
  useMainController('/search');
  const params = useParams<RouterParams>();

  return (
    <SearchPageContainer>
      <Header
        isWithSearchField={isWithQuery}
        fieldInitialValue={params.query}
      />
      <SearchPageContentContainer>
        {!isWithQuery && <SearchField fieldSize="large" />}
        <Results isWithQuery={isWithQuery} />
      </SearchPageContentContainer>
    </SearchPageContainer>
  );
};
