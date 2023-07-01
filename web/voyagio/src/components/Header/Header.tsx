import { CircleImg, HeaderContainer, Logo } from '/src/components/Header/Header.styled';
import { SearchField } from '/src/components/SearchField';
import { Flex } from '/src/components/uikit/Flex.ts';
import { FC } from 'react';
import VoyagioLogo from '/src/assets/logos/voyagio.svg';

interface HeaderProps {
  isWithSearchField?: boolean
}

export const Header: FC<HeaderProps> = ({ isWithSearchField }) => (
  <HeaderContainer>
    <Flex gap={20} alignItems="center">
      <Logo alt="Voaygio" src={VoyagioLogo} />
      {isWithSearchField && <SearchField fieldSize="small" />}
    </Flex>
    <Flex gap={12}>
      <CircleImg src="/backgroundSearch.jpg" />
    </Flex>
  </HeaderContainer>
);
