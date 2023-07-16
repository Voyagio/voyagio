import { FC } from 'react';
import {
  AuthHeaderButtonGroup,
  AuthHeaderContainer,
  AuthHeaderLink,
} from './AuthHeader.styled';
import { Logo } from '../Header/Header.styled';
import VoyagioLogo from '/src/assets/logos/voyagio_white.svg';

export const AuthHeader: FC = () => {
  return (
    <AuthHeaderContainer>
      <Logo src={VoyagioLogo} alt="Voyagio" />
      <AuthHeaderButtonGroup>
        <AuthHeaderLink href="/policy">Policy</AuthHeaderLink>
        <AuthHeaderLink href="/login">Authorization</AuthHeaderLink>
      </AuthHeaderButtonGroup>
    </AuthHeaderContainer>
  );
};
