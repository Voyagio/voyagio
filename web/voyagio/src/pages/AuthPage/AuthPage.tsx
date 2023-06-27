import { AuthPageContainer } from './AuthPage.styled';
import { AuthHeader } from '/src/components/AuthHeader';
import { FC } from 'react';
import { AuthMain } from '/src/components/AuthMain';
import { SignupContext } from '/src/contexts/signupContext';

type AuthPageProps = {
  signup?: boolean;
};

export const AuthPage: FC<AuthPageProps> = ({ signup = false }) => {
  return (
    <SignupContext.Provider value={signup}>
      <AuthPageContainer>
        <AuthHeader />
        <AuthMain />
      </AuthPageContainer>
    </SignupContext.Provider>
  );
};
