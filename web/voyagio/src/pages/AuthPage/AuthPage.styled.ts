import styled from '@emotion/styled';
import img from '/public/backgroundLogin.jpg';

export const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Lato, sans-serif;
  background-image: url(${img});
  background-size: 100% 100%;
  min-height: 100vh;
  padding-bottom: 25vh;
`;
