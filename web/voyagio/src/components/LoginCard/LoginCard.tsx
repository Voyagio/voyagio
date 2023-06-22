import { FC } from 'react';
import {
  LoginCardContainer,
  LoginCardSpan,
  LoginCardTextGroup,
  LoginCardTitle,
  LoginLinkA,
  LoginLinkGroup,
  LoginLinkSpan,
} from './LoginCard.styled';
import { LoginForm } from '../LoginForm';

export const LoginCard: FC = () => {
  return (
    <LoginCardContainer>
      <LoginCardTextGroup>
        <LoginCardTitle>Sign in</LoginCardTitle>
        <LoginCardSpan>Welcome to VOYAGIO</LoginCardSpan>
      </LoginCardTextGroup>

      <LoginForm />

      <LoginLinkGroup>
        <LoginLinkSpan>Already have an account?</LoginLinkSpan>
        <LoginLinkA href="/signup">Sign up</LoginLinkA>
      </LoginLinkGroup>
    </LoginCardContainer>
  );
};
