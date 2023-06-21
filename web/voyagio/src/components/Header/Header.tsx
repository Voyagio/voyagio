import { HeaderContainer, Logo } from '/src/components/Header/Header.styled';
import { FC } from 'react';
import VoyagioLogo from '/src/assets/logos/voyagio.svg';

export const Header: FC = () => (
  <HeaderContainer>
    <Logo alt="Voaygio" src={VoyagioLogo} />
  </HeaderContainer>
);
