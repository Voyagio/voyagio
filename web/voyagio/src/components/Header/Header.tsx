import { CircleImg, HeaderContainer, Logo } from '/src/components/Header/Header.styled';
import { SearchField } from '/src/components/SearchField';
import { Flex } from '/src/components/uikit/Flex.ts';
import { FC } from 'react';
import VoyagioLogo from '/src/assets/logos/voyagio.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isWithSearchField?: boolean
  fieldInitialValue?: string
}

export const Header: FC<HeaderProps> = ({ isWithSearchField, fieldInitialValue }) => (
  <HeaderContainer>
    <Flex gap={20} alignItems="center">
      <Link to="/search"><Logo alt="Voaygio" src={VoyagioLogo} /></Link>
      {isWithSearchField && <SearchField fieldSize="small" initialValue={fieldInitialValue} />}
    </Flex>
    <Flex gap={12}>
      <CircleImg src="/backgroundSearch.jpg" />
    </Flex>
  </HeaderContainer>
);
