import styled from '@emotion/styled';

interface InterestCardContainerProps {
  chosen: boolean
}

export const InterestCardContainer = styled.div<InterestCardContainerProps>`
  width: 144px;
  height: 144px;

  border-radius: 16px;
  
  box-shadow: 0 4px 17px 0 rgba(174, 171, 171, 0.15);

  cursor: pointer;
  
  background: ${({ chosen }) => (chosen ? '#D5EAFD' : 'white')};
  color: ${({ chosen }) => (chosen ? '#0B94F8' : 'black')};
  
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
