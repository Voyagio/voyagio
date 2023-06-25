import { FC } from 'react';
import {
  LoginHeaderButtonGroup,
  LoginHeaderContainer,
  LoginHeaderLink,
} from './LoginHeader.styled';
import { Logo } from '../Header/Header.styled';
import VoyagioLogo from '/src/assets/logos/voyagio_white.svg';

export const LoginHeader: FC = () => {
  return (
    <LoginHeaderContainer>
      <Logo src={VoyagioLogo} alt="Voyagio" />
      <LoginHeaderButtonGroup>
        <LoginHeaderLink href="/policy">Policy</LoginHeaderLink>
        <LoginHeaderLink href="/login">Authorization</LoginHeaderLink>
      </LoginHeaderButtonGroup>
    </LoginHeaderContainer>
  );
};
