import { FC, useContext } from 'react';
import {
  AuthCardContainer,
  AuthCardSpan,
  AuthCardTextGroup,
  AuthCardTitle,
  AuthLinkA,
  AuthLinkGroup,
  AuthLinkSpan,
} from './AuthCard.styled';
import { AuthForm } from '../AuthForm';
import { SignupContext } from '/src/contexts/signupContext';

export const AuthCard: FC = () => {
  const signup = useContext(SignupContext);
  return (
    <AuthCardContainer>
      <AuthCardTextGroup>
        <AuthCardTitle>{signup ? 'Sign up' : 'Sign in'}</AuthCardTitle>
        <AuthCardSpan>Welcome to VOYAGIO</AuthCardSpan>
      </AuthCardTextGroup>

      <AuthForm signup={signup} />

      <AuthLinkGroup>
        <AuthLinkSpan>Already have an account?</AuthLinkSpan>
        <AuthLinkA to={`/${signup ? 'login' : 'signup'}`}>
          {signup ? 'Sign In' : 'Sign Up'}
        </AuthLinkA>
      </AuthLinkGroup>
    </AuthCardContainer>
  );
};
