import styled from '@emotion/styled';
import img from '/public/backgroundLogin.jpg';

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 124px;
  font-family: Lato, sans-serif;
  background-image: url(${img});
  background-size: 100% 100%;
  height: 100vh;
`;
