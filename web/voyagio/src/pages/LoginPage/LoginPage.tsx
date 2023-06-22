import { LoginPageContainer } from './LoginPage.styled';
import { LoginHeader } from '/src/components/LoginHeader';
import { FC } from 'react';
import { LoginMain } from '/src/components/LoginMain';

export const LoginPage: FC = () => {
  return (
    <LoginPageContainer>
      <LoginHeader />
      <LoginMain />
    </LoginPageContainer>
  );
};
