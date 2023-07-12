import styled from '@emotion/styled';

export const CollectionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  background: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05),
    0px 36px 28px -7px rgba(0, 0, 0, 0.05),
    0px 17px 17px -7px rgba(0, 0, 0, 0.04);
`;

export const CollectionImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 287px;
`;

export const CollectionInfo = styled.div`
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;

  & h3 {
    font-size: 20px;
    font-weight: 400;
  }
`;
