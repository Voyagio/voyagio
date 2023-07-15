import styled from '@emotion/styled';

export const RecommendationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const RecommendationsHeadingContainer = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  
  align-items: center;
  
  & > h2 {
    font-weight: 400;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(327px, auto));
`;

export const RecommendedCollectionsContainer = styled.div`
  display: flex;
  gap: 20px;
`;
