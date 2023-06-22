import styled from '@emotion/styled';

export const LoginPageMainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 70px;
  padding: 0 50px;
`;

export const LoginPageContactsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LoginPageKebabGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const KebabCircle = styled.div((props: { current?: boolean }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '10px',
  background: 'white',
  opacity: props.current ? '1' : '0.3',
}));

export const LoginUnderlay = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.01);
  box-shadow: 0px 4px 48px 0px rgba(31, 93, 151, 0.15);
  backdrop-filter: blur(50px);
  padding: 69px 60px;
  gap: 111px;
`;

export const LoginInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InformationHeaders = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InformationH1 = styled.h1((props: { current?: boolean }) => ({
  fontSize: '64px',
  color: 'white',
  fontWeight: '400',
  margin: '0',
  opacity: props.current ? '1' : '0.75',
}));

export const InformationH3 = styled.h3`
  font-size: 24px;
  color: white;
  font-weight: 400;
  margin: 0;
`;

export const ContactIcon = styled.img`
  size: 54px;
`;
