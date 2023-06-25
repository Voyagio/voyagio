import { CircleImg, HeaderContainer, Logo } from '/src/components/Header/Header.styled';
import { Flex } from '/src/components/uikit/Flex.ts';
import { FC } from 'react';
import VoyagioLogo from '/src/assets/logos/voyagio.svg';

export const Header: FC = () => (
  <HeaderContainer>
    <Logo alt="Voaygio" src={VoyagioLogo} />
    <Flex gap={12}>
      <CircleImg src="/backgroundSearch.jpg" />
      <CircleImg src="/backgroundSearch.jpg" />
    </Flex>
  </HeaderContainer>
);
