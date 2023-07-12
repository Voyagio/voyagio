import styled from '@emotion/styled';

export const AccountPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f9fd;
  min-height: 100vh;
  gap: 20px;
`;

export const AccountMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 50px;
`;

export const CollectionsGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(433px, auto));
`;
